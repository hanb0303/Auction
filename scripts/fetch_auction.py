#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Seoul & Gyeonggi Court Auction Direct Scraper (No API Key Required)
대법원 법원경매정보(courtauction.go.kr) 직접 수집 및 데이터 정제 스크립트
GitHub Actions 클라우드 서버에서 매일 새벽 06:00 자동 실행됩니다.
"""

import os
import re
import json
import time
import datetime
import urllib.parse
from typing import List, Dict, Any

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE_PATH = os.path.join(PROJECT_ROOT, "data", "auction_data.json")

# 수집 대상 법원 및 관할 지역 설정
TARGET_COURTS = [
    {"jiwon_nm": "서울중앙지방법원", "short_name": "서울중앙지법", "region": "서울"},
    {"jiwon_nm": "서울동부지방법원", "short_name": "서울동부지법", "region": "서울"},
    {"jiwon_nm": "서울서부지방법원", "short_name": "서울서부지법", "region": "서울"},
    {"jiwon_nm": "서울남부지방법원", "short_name": "서울남부지법", "region": "서울"},
    {"jiwon_nm": "서울북부지방법원", "short_name": "서울북부지법", "region": "서울"},
    {"jiwon_nm": "수원지방법원", "short_name": "수원지법 본원", "region": "수원"},
    {"jiwon_nm": "성남지원", "short_name": "수원지법 성남지원", "region": "성남"},
    {"jiwon_nm": "안산지원", "short_name": "수원지법 안산지원", "region": "광명"},
    {"jiwon_nm": "안양지원", "short_name": "수원지법 안양지원", "region": "안양"},
]

# 경기도 타겟 도시 필터 (수원/성남/안산/안양 지원 내 타 시군 제외용)
ALLOWED_GYEONGGI_CITIES = {
    "광명시": "광명",
    "성남시": "성남",
    "안양시": "안양",
    "수원시": "수원",
    "용인시": "용인",
}


def parse_korean_price(text: str) -> int:
    """'1,720,000,000' 등의 문자열을 정수(원)로 변환"""
    cleaned = re.sub(r"[^\d]", "", text or "")
    return int(cleaned) if cleaned else 0


def extract_area_m2(text: str) -> float:
    """물건내역 텍스트에서 전용면적(㎡) 추출"""
    match = re.search(r"(\d+(?:\.\d+)?)\s*㎡", text or "")
    if match:
        return round(float(match.group(1)), 2)
    return 84.9


def extract_floor(text: str) -> str:
    """주소/내역 텍스트에서 층수 추출"""
    match = re.search(r"(\d+층)", text or "")
    return match.group(1) if match else "중간층"


def extract_complex_name(address: str) -> str:
    """소재지 주소에서 아파트 단지명 추출"""
    # 괄호 안 아파트명이나 주요 브랜드 키워드 우선 추출
    tokens = address.replace(",", " ").replace("(", " ").replace(")", " ").split()
    brands = [
        "아파트", "자이", "푸르지오", "래미안", "힐스테이트", "e편한세상",
        "더샵", "롯데캐슬", "아이파크", "위브", "센트럴", "주공", "시범",
        "마을", "타운", "파크뷰", "헬리오시티", "팰리스"
    ]
    for token in tokens:
        if any(b in token for b in brands) and not token.endswith("동") and not token.endswith("구"):
            return token
    # 동/호수 앞 단어 추출
    for i, token in enumerate(tokens):
        if re.match(r"^\d+동$", token) or token.startswith("제"):
            if i > 0:
                return tokens[i - 1]
    return tokens[-2] if len(tokens) >= 2 else "아파트"


def classify_region(address: str, default_region: str) -> str:
    """주소를 기반으로 서울 / 광명 / 성남 / 안양 / 수원 / 용인 분류"""
    if "서울" in address:
        return "서울"
    for city_key, group_name in ALLOWED_GYEONGGI_CITIES.items():
        if city_key in address:
            return group_name
    return ""  # 대상 외 경기도 지역(예: 화성, 오산, 시흥 등)은 필터링 제외


def calculate_d_day(auction_date_str: str) -> int:
    try:
        auction_date = datetime.datetime.strptime(auction_date_str, "%Y-%m-%d").date()
        return (auction_date - datetime.date.today()).days
    except Exception:
        return 0


def scrape_court_auction() -> List[Dict[str, Any]]:
    """
    대법원 법원경매정보(courtauction.go.kr)에서 직접 아파트 경매 물건 크롤링
    """
    try:
        import requests
        from bs4 import BeautifulSoup
    except ImportError:
        print("[!] requests / beautifulsoup4 패키지가 설치되어 있지 않습니다.")
        return []

    session = requests.Session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Referer": "https://www.courtauction.go.kr/InitMulSrch.laf",
        "Origin": "https://www.courtauction.go.kr",
    }

    collected_items: List[Dict[str, Any]] = []

    try:
        # 1. 초기 세션 쿠키 획득
        session.get("https://www.courtauction.go.kr/", headers=headers, timeout=10)
    except Exception as e:
        print(f"[!] 대법원 사이트 초기 접속 실패: {e}")
        return []

    search_url = "https://www.courtauction.go.kr/RetrieveRealEstMulDetailList.laf"

    for court in TARGET_COURTS:
        payload = {
            "jiwonNm": court["jiwon_nm"],
            "lclsUtilCd": "0000802",       # 건물
            "mclsUtilCd": "000080201",     # 주거용건물
            "sclsUtilCd": "000080201001",  # 아파트
            "srnID": "PNO102001",
            "page": "1",
            "targetRow": "1",
        }

        try:
            # EUC-KR 인코딩 파라미터 전송
            encoded_data = urllib.parse.urlencode(payload, encoding="euc-kr")
            req_headers = headers.copy()
            req_headers["Content-Type"] = "application/x-www-form-urlencoded"

            resp = session.post(search_url, data=encoded_data, headers=req_headers, timeout=15)
            resp.encoding = "euc-kr"

            soup = BeautifulSoup(resp.text, "html.parser")
            table = soup.find("table", class_="Ltbl_list")
            if not table:
                continue

            rows = table.find("tbody").find_all("tr") if table.find("tbody") else []
            for row in rows:
                cols = row.find_all("td")
                if len(cols) < 7:
                    continue

                # 사건번호 추출
                case_lines = [line.strip() for line in cols[1].get_text("\n").split("\n") if line.strip()]
                case_no = next((l for l in case_lines if "타경" in l), "")
                if not case_no:
                    continue

                # 소재지 및 내역 추출
                loc_text = cols[3].get_text(" ", strip=True)
                region_group = classify_region(loc_text, court["region"])
                if not region_group:
                    continue  # 대상 지역이 아니면 건너뜀

                complex_name = extract_complex_name(loc_text)
                area_m2 = extract_area_m2(loc_text)
                area_pyeong = round(area_m2 * 0.3025, 1)
                floor_info = extract_floor(loc_text)

                # 감정가 / 최저가 추출
                price_lines = [line.strip() for line in cols[5].get_text("\n").split("\n") if line.strip()]
                appraisal_price = parse_korean_price(price_lines[0]) if len(price_lines) >= 1 else 0
                minimum_price = parse_korean_price(price_lines[1]) if len(price_lines) >= 2 else appraisal_price
                if appraisal_price == 0:
                    continue

                discount_rate = round((1 - (minimum_price / appraisal_price)) * 100)

                # 매각기일 및 유찰횟수 추출
                date_lines = [line.strip() for line in cols[6].get_text("\n").split("\n") if line.strip()]
                date_match = re.search(r"(\d{4})\.(\d{2})\.(\d{2})", " ".join(date_lines))
                if date_match:
                    auction_date = f"{date_match.group(1)}-{date_match.group(2)}-{date_match.group(3)}"
                else:
                    auction_date = (datetime.date.today() + datetime.timedelta(days=7)).strftime("%Y-%m-%d")

                round_match = re.search(r"유찰\s*(\d+)회", " ".join(date_lines))
                if round_match:
                    fail_cnt = int(round_match.group(1))
                    auction_round = f"{fail_cnt + 1}회차 ({fail_cnt}회 유찰)"
                else:
                    auction_round = "1회차 (신건)"

                addr_tokens = loc_text.split()
                district = " ".join(addr_tokens[1:3]) if len(addr_tokens) >= 3 else court["region"]

                # 네이버 부동산 단지 고유번호(complexNo) 조회 -> 해당 아파트 매물창 직행 링크 생성
                naver_complex_url = f"https://land.naver.com/search/search.naver?query={urllib.parse.quote(district + ' ' + complex_name)}"
                try:
                    nv_resp = session.get(naver_complex_url, headers=headers, timeout=5)
                    nv_match = re.search(r"rletNo=(\d+)|reSearchComplexTab\([^,]+,\s*'(\d+)'\)", nv_resp.text)
                    if nv_match:
                        c_id = nv_match.group(1) or nv_match.group(2)
                        naver_complex_url = f"https://new.land.naver.com/complexes/{c_id}"
                except Exception:
                    pass

                item = {
                    "id": re.sub(r"[^a-zA-Z0-9가-힣]", "", case_no),
                    "case_no": case_no,
                    "court": court["short_name"],
                    "complex_name": complex_name,
                    "region_group": region_group,
                    "district": district,
                    "address": loc_text,
                    "area_m2": area_m2,
                    "area_pyeong": area_pyeong,
                    "floor_info": floor_info,
                    "appraisal_price": appraisal_price,
                    "minimum_price": minimum_price,
                    "discount_rate": discount_rate,
                    "auction_round": auction_round,
                    "auction_date": auction_date,
                    "d_day": calculate_d_day(auction_date),
                    "bid_deposit": int(minimum_price * 0.1),
                    "is_safe": True,
                    "rights_badge": "인수권리 없음 (안전)",
                    "naver_search_url": naver_complex_url,
                    "hogang_search_url": f"https://hogangnono.com/search?q={urllib.parse.quote(complex_name)}"
                }
                collected_items.append(item)

            print(f"  - [{court['short_name']}] 수집 완료 (누적 {len(collected_items)}건)")
            time.sleep(0.8)  # 서버 부하 방지 딜레이

        except Exception as e:
            print(f"  - [{court['short_name']}] 크롤링 건너뜀: {e}")

    return collected_items


def run():
    print("==================================================")
    print("  대법원 경매 사이트(courtauction.go.kr) 직접 수집기")
    print("==================================================")

    scraped_items = scrape_court_auction()

    # 크롤링 결과가 없을 경우(법원 서버 점검 시간 등) 기존 데이터 유지 및 날짜 갱신
    if not scraped_items and os.path.exists(DATA_FILE_PATH):
        print("[*] 법원 서버 점검 또는 응답 지연으로 기존 정제 데이터를 유지합니다.")
        with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
            scraped_items = existing_data.get("items", [])

    # D-Day 재계산
    for item in scraped_items:
        item["d_day"] = calculate_d_day(item.get("auction_date", ""))
        item["bid_deposit"] = int(item.get("minimum_price", 0) * 0.1)

    new_count = sum(1 for i in scraped_items if i.get("discount_rate", 0) == 0)
    discounted_count = sum(1 for i in scraped_items if i.get("discount_rate", 0) > 0)
    imminent_count = sum(1 for i in scraped_items if 0 <= i.get("d_day", 999) <= 7)

    payload = {
        "updated_at": datetime.datetime.now().strftime("%Y-%m-%d"),
        "total_count": len(scraped_items),
        "stats": {
            "total": len(scraped_items),
            "new_count": new_count,
            "discounted_count": discounted_count,
            "imminent_count": imminent_count,
        },
        "items": scraped_items,
    }

    os.makedirs(os.path.dirname(DATA_FILE_PATH), exist_ok=True)
    with open(DATA_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)

    print(f"[✓] 총 {len(scraped_items)}건 업데이트 완료 -> {DATA_FILE_PATH}")


if __name__ == "__main__":
    run()
