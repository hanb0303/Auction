#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Seoul & Gyeonggi Court Auction Direct Scraper (No API Key Required)
대법원 법원경매정보(courtauction.go.kr) 차세대 JSON API(/pgj/) 직접 수집 및 데이터 정제 스크립트
GitHub Actions 클라우드 서버에서 매일 새벽 06:00 자동 실행됩니다.
"""

import os
import re
import json
import time
import datetime
import urllib.parse
from typing import List, Dict, Any, Optional, Tuple, Set

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE_PATH = os.path.join(PROJECT_ROOT, "data", "auction_data.json")
HISTORY_FILE_PATH = os.path.join(PROJECT_ROOT, "data", "auction_history.json")
COMPLEX_CACHE_PATH = os.path.join(PROJECT_ROOT, "data", "complex_cache.json")

BASE_URL = "https://www.courtauction.go.kr"
SEARCH_MAIN_URL = f"{BASE_URL}/pgj/pgjsearch/searchControllerMain.on"
SEARCH_REFERER_URL = f"{BASE_URL}/pgj/index.on?w2xPath=/pgj/ui/pgj100/PGJ151F00.xml"
NOTICE_LIST_URL = f"{BASE_URL}/pgj/pgj143/selectRletDspslPbanc.on"
NOTICE_DETAIL_URL = f"{BASE_URL}/pgj/pgj143/selectRletDspslPbancDtl.on"
REFERER_URL = f"{BASE_URL}/pgj/index.on?w2xPath=/pgj/ui/pgj100/PGJ143M01.xml&pgjId=143M01"

# 수집 대상 법원 코드 및 관할 지역 설정 (대법원 차세대 표준 법원코드)
TARGET_COURTS = [
    {"cort_cd": "B000210", "short_name": "서울중앙지법", "region": "서울", "max_notices": 2},
    {"cort_cd": "B000211", "short_name": "서울동부지법", "region": "서울", "max_notices": 2},
    {"cort_cd": "B000212", "short_name": "서울남부지법", "region": "서울", "max_notices": 2},
    {"cort_cd": "B000213", "short_name": "서울북부지법", "region": "서울", "max_notices": 1},
    {"cort_cd": "B000215", "short_name": "서울서부지법", "region": "서울", "max_notices": 1},
    {"cort_cd": "B000250", "short_name": "수원지법 본원", "region": "수원", "max_notices": 3},
    {"cort_cd": "B000251", "short_name": "수원지법 성남지원", "region": "성남", "max_notices": 2},
    {"cort_cd": "B000254", "short_name": "수원지법 안양지원", "region": "안양", "max_notices": 2},
    {"cort_cd": "B250826", "short_name": "수원지법 안산지원", "region": "광명", "max_notices": 2},
]

# 경기도 타겟 도시 필터 (수원/성남/안산/안양 지원 내 타 시군 제외용)
ALLOWED_GYEONGGI_CITIES = {
    "광명시": "광명",
    "성남시": "성남",
    "안양시": "안양",
    "수원시": "수원",
    "용인시": "용인",
}

# 주요 단지 네이버 부동산 고유번호(complexNo) 캐시 (네이버 어뷰징 차단 방지용)
KNOWN_NAVER_COMPLEX_IDS = {
    "위례센트럴푸르지오": "107661",
    "성원초원아파트": "1747",
    "철산래미안자이": "25902",
    "한라타운아파트": "10966",
    "스카이써밋아파트": "17690",
    "건영아파트": "3168",
    "관악푸르지오": "107439",
    "메르디안하우스": "26368",
    "래미안포레": "107457",
    "관악산휴먼시아": "100344",
    "도곡삼성아파트": "10828",
    "삼성아파트": "10828",
    "프라이어팰리스": "19578",
    "강동리버스트4단지": "127671",
    "현대아파트": "355",
    "성수현대그린아파트": "561",
    "장미아파트": "22",
    "염창동아아파트": "869",
    "힐탑이루미아파트": "17522",
    "우리유앤미아파트": "10547",
    "그랜드아이파크": "27553",
    "목동트라팰리스 이스턴에비뉴": "24841",
    "버들치마을 성복자이2차": "27006",
    "서수원레이크푸르지오2단지": "104300",
    "공세성원상떼레이크뷰": "27707",
    "버들치마을성복자이1차": "26925",
    "버들치마을성복힐스테이트3차": "26926",
    "서수원엠코타운르본느": "104971",
    "동수원2차쌍용스윗닷홈": "11502",
    "인계한양수자인": "115681",
    "금오베스트샵아파트": "24625",
    "주공뜨란채": "9223",
    "제나시티": "122093",
    "호계e편한세상": "8036",
    "호계이-편한세상아파트": "8036",
    "두산위브더아티움": "127667",
    "관악아파트": "1985",
    "초원아파트": "1477",
    "동신벨로스": "26739",
    "래미안안양메가트리아": "112054",
    "월계로즈빌": "18471",
    "두산위브트레지움아파트": "27413",
}


def strip_html(text: str) -> str:
    if not text:
        return ""
    cleaned = re.sub(r"<[^>]+>", " ", str(text))
    return re.sub(r"\s+", " ", cleaned).strip()


def parse_korean_price(text: str) -> int:
    """'1,720,000,000' 또는 HTML 포함 가격 문자열에서 첫 번째 금액(원)을 정수로 변환"""
    cleaned = strip_html(text)
    match = re.search(r"(\d{1,3}(?:,\d{3})+|\d+)", cleaned)
    if not match:
        return 0
    digits = re.sub(r"[^\d]", "", match.group(1))
    return int(digits) if digits else 0


def extract_area_m2(detail_text: str) -> float:
    """상세내역 텍스트에서 전유부분 전용면적(㎡) 추출 (제시외 제외한 마지막 ㎡ 값)"""
    clean = re.sub(r"제시외.*$", "", strip_html(detail_text))
    matches = re.findall(r"(\d+(?:\.\d+)?)\s*㎡", clean)
    if matches:
        return round(float(matches[-1]), 2)
    return 84.9


def extract_floor(addr_text: str) -> str:
    """주소 텍스트에서 층수 추출"""
    match = re.search(r"제?(\d+층)", addr_text or "")
    return match.group(1) if match else "중간층"


def extract_dong_ho(addr_text: str) -> str:
    """주소 텍스트에서 동·호수(예: '109동 1502호') 추출"""
    clean = re.sub(r"\([^)]*\)", "", addr_text or "").strip()
    dong_m = re.search(r"(?:^|\s)제?(\d+동|[가-힣A-Za-z]동)(?=\s+제?\d+층|\s*$)", clean)
    ho_m = re.search(r"제?(?:\d+층)?\s*제?([\d\-]+호|[가-힣A-Za-z]+-[\d]+호)", clean)
    dong = dong_m.group(1) if dong_m else ""
    ho = ho_m.group(1) if ho_m else ""
    if dong and ho:
        return f"{dong} {ho}"
    return dong or ho or ""


def extract_complex_name(addr_text: str) -> str:
    """소재지 주소에서 아파트 단지명 추출"""
    paren = re.search(r"\(([^)]+)\)", addr_text)
    if paren:
        parts = [p.strip() for p in paren.group(1).split(",")]
        if len(parts) >= 2 and parts[-1]:
            return parts[-1]

    s = re.sub(r"^(서울특별시|경기도)\s+\S+\s+(\S+구\s+)?\S+(?:동|가|읍|면|로|길)\s+[\d\-]+(?:,\s*)?", "", addr_text)
    s = re.sub(r"\s+(?:제?\d+동|[가-힣]동)\s+.*$", "", s)
    s = re.sub(r"\s+제?\d+층.*$", "", s).strip()
    if s:
        if "공세성원상떼" in s:
            return "공세성원상떼레이크뷰"
        if s == "호계이-편한세상아파트":
            return "호계e편한세상"
        return s
    return "아파트"


def classify_region(address: str) -> str:
    """주소를 기반으로 서울 / 광명 / 성남 / 안양 / 수원 / 용인 분류"""
    if "서울" in address:
        return "서울"
    for city_key, group_name in ALLOWED_GYEONGGI_CITIES.items():
        if city_key in address:
            return group_name
    return ""


KST = datetime.timezone(datetime.timedelta(hours=9))


def get_kst_now() -> datetime.datetime:
    """한국 표준시(KST, UTC+9) 현재 시각 (GitHub Actions UTC 서버 호환)"""
    return datetime.datetime.now(KST)


def get_kst_today() -> datetime.date:
    """한국 표준시(KST, UTC+9) 오늘 날짜"""
    return get_kst_now().date()


def calculate_d_day(auction_date_str: str) -> int:
    try:
        auction_date = datetime.datetime.strptime(auction_date_str, "%Y-%m-%d").date()
        return (auction_date - get_kst_today()).days
    except Exception:
        return 999


def safe_int(val: Any, default: int = 0) -> int:
    """숫자 문자열/정수를 안전하게 int로 변환 (실패 시 default 반환)"""
    if val is None or val == "":
        return default
    try:
        return int(float(str(val).replace(",", "").strip()))
    except (ValueError, TypeError):
        return default


def safe_json(resp: Any, context: str = "") -> Optional[Dict[str, Any]]:
    """HTTP 200 응답이라도 WAF/HTML 페이지가 올 수 있으므로 안전하게 JSON 디코딩"""
    try:
        data = resp.json()
        if isinstance(data, dict):
            return data
        print(f"  [!] 예상치 못한 JSON 형식 ({context or 'response'}): {type(data).__name__}")
        return None
    except Exception as e:
        snippet = (getattr(resp, "text", "") or "")[:120].replace("\n", " ").strip()
        print(f"  [!] JSON 파싱 실패 ({context or 'response'}): {e} | 응답 일부: {snippet}")
        return None


def atomic_write_json(path: str, payload: Any) -> None:
    """임시 파일(.tmp)에 먼저 기록한 뒤 os.replace로 원자적 교체"""
    parent = os.path.dirname(path)
    if parent:
        os.makedirs(parent, exist_ok=True)
    tmp_path = f"{path}.tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
    os.replace(tmp_path, path)


def format_ymd(ymd: str) -> str:
    s = re.sub(r"[^\d]", "", str(ymd or ""))
    if len(s) == 8:
        return f"{s[:4]}-{s[4:6]}-{s[6:8]}"
    return get_kst_today().strftime("%Y-%m-%d")


def resolve_naver_complex_url(session, headers: dict, district: str, complex_name: str) -> str:
    """네이버 부동산 단지 고유번호(complexNo) 조회 -> 해당 아파트 매물창 직행 링크 반환"""
    if complex_name in KNOWN_NAVER_COMPLEX_IDS:
        return f"https://new.land.naver.com/complexes/{KNOWN_NAVER_COMPLEX_IDS[complex_name]}"

    query = urllib.parse.quote(f"{district} {complex_name}".strip())
    nexearch_url = f"https://search.naver.com/search.naver?where=nexearch&query={query}"
    try:
        time.sleep(0.15)
        nv_resp = session.get(nexearch_url, headers={"User-Agent": headers["User-Agent"]}, timeout=6)
        m_cid = re.search(r"complexes/(\d+)", nv_resp.text)
        if m_cid:
            return f"https://new.land.naver.com/complexes/{m_cid.group(1)}"
    except Exception:
        pass
    return f"https://new.land.naver.com/search?sk={query}"


def resolve_households(session, headers: dict, district: str, complex_name: str) -> str:
    """네이버 통합검색에서 해당 아파트 단지의 총 세대수(예: '1,622세대') 조회"""
    query = urllib.parse.quote(f"{district} {complex_name} 세대수".strip())
    url = f"https://search.naver.com/search.naver?where=nexearch&query={query}"
    try:
        time.sleep(0.2)
        resp = session.get(url, headers={"User-Agent": headers["User-Agent"]}, timeout=5)
        m_total = re.search(r"총\s*(\d{1,3}(?:,\d{3})*)\s*세대", resp.text)
        if m_total:
            return f"{m_total.group(1)}세대"
        all_m = re.findall(r"(\d{2,3}(?:,\d{3})*|\d,\d{3})\s*세대", resp.text)
        if all_m:
            from collections import Counter
            most_common = Counter(all_m).most_common(1)[0][0]
            return f"{most_common}세대"
    except Exception:
        pass
    return ""


def scrape_court_auction() -> Tuple[List[Dict[str, Any]], Set[str]]:
    """
    대법원 법원경매정보(courtauction.go.kr) 차세대 JSON API에서 직접 아파트 경매 물건 수집
    """
    all_courts = {c["short_name"] for c in TARGET_COURTS}
    try:
        import requests
    except ImportError:
        print("[!] requests 패키지가 설치되어 있지 않습니다.")
        return [], all_courts

    session = requests.Session()
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
        "Origin": BASE_URL,
        "Referer": REFERER_URL,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json; charset=UTF-8",
    }

    try:
        session.get(f"{BASE_URL}/", headers={"User-Agent": headers["User-Agent"]}, timeout=10)
    except Exception as e:
        print(f"[!] 대법원 사이트 초기 접속 실패: {e}")
        return [], all_courts

    today = get_kst_today()
    bgng_ymd = today.strftime("%Y%m%d")
    end_ymd = (today + datetime.timedelta(days=30)).strftime("%Y%m%d")
    srch_ym = today.strftime("%Y%m")
    collected_items: List[Dict[str, Any]] = []
    seen_cases = set()
    failed_courts: Set[str] = set()

    search_headers = dict(headers)
    search_headers["SC-Userid"] = "SYSTEM"
    search_headers["Submissionid"] = "mf_wfm_mainFrame_sbm_selectGdsDtlSrch"
    search_headers["Referer"] = SEARCH_REFERER_URL

    # 1) 4주(30일) 기일 물건 통합 상세검색 (searchControllerMain.on - 아파트 전용코드 20000/20100/20104)
    for court in TARGET_COURTS:
        for page_no in range(1, 5):
            try:
                time.sleep(1.8)
                srch_payload = {
                    "dma_pageInfo": {
                        "pageNo": page_no,
                        "pageSize": 40,
                        "bfPageNo": "",
                        "startRowNo": "",
                        "totalCnt": "",
                        "totalYn": "Y",
                        "groupTotalCount": "",
                    },
                    "dma_srchGdsDtlSrchInfo": {
                        "rletDspslSpcCondCd": "",
                        "bidDvsCd": "000331",
                        "mvprpRletDvsCd": "00031R",
                        "cortAuctnSrchCondCd": "0004601",
                        "rprsAdongSdCd": "",
                        "rprsAdongSggCd": "",
                        "rprsAdongEmdCd": "",
                        "rdnmSdCd": "",
                        "rdnmSggCd": "",
                        "rdnmNo": "",
                        "cortOfcCd": court["cort_cd"],
                        "jdbnCd": "",
                        "execrOfcDvsCd": "",
                        "lclDspslGdsLstUsgCd": "20000",
                        "mclDspslGdsLstUsgCd": "20100",
                        "sclDspslGdsLstUsgCd": "20104",
                        "cortAuctnMbrsId": "",
                        "theraExclAreaFrom": "",
                        "theraExclAreaTo": "",
                        "aeeEvlAmtFrom": "",
                        "aeeEvlAmtTo": "",
                        "lwsDspslPrcRateFrom": "",
                        "lwsDspslPrcRateTo": "",
                        "flbdNcntFrom": "",
                        "flbdNcntTo": "",
                        "objctArDts": "",
                        "LafjOrderBy": "",
                        "pgmId": "PGJ151F01",
                        "csNo": "",
                        "cortStDvs": "1",
                        "statNum": 1,
                        "bidBgngYmd": bgng_ymd,
                        "bidEndYmd": end_ymd,
                        "dspslDxdyYmd": "",
                        "fstDspslYn": "",
                        "scndDspslYn": "",
                        "thrdDspslYn": "",
                        "fothDspslYn": "",
                        "dspslGdsSpcCondCd": "",
                        "lwsDspslPrcFrom": "",
                        "lwsDspslPrcTo": "",
                        "sideDvsCd": "",
                    },
                }
                s_resp = session.post(SEARCH_MAIN_URL, json=srch_payload, headers=search_headers, timeout=20)
                if s_resp.status_code != 200:
                    print(f"  [!] [{court['short_name']}] 4주 물건 검색 HTTP {s_resp.status_code}")
                    failed_courts.add(court["short_name"])
                    break
                s_json = safe_json(s_resp, f"{court['short_name']} 4주 물건 검색 p.{page_no}")
                if s_json is None:
                    failed_courts.add(court["short_name"])
                    break
                s_list = (s_json.get("data") or {}).get("dlt_srchResult") or []
                if not s_list:
                    break

                for r in s_list:
                    case_no = str(r.get("srnSaNo") or "").strip()
                    maemul_ser = str(r.get("maemulSer") or "1").strip()
                    seen_key = f"{court['short_name']}|{case_no}|{maemul_ser}"
                    if not case_no or seen_key in seen_cases:
                        continue
                    buld_nm = str(r.get("buldNm") or "").strip()
                    if not buld_nm or re.search(r"오피스텔|다세대|빌라|연립|도시형|생활주택|해담채|원룸", buld_nm):
                        continue
                    bigo = str(r.get("mulBigo") or "").strip()
                    if bigo and re.search(r"지분|미등기|유치권|법정지상권|분묘|선순위|건물만|토지별도|가처분|매각제외|맹지", bigo):
                        continue

                    addr_part = str(r.get("printSt") or "").strip()
                    region_group = classify_region(addr_part)
                    if not region_group:
                        continue

                    app_price = parse_korean_price(str(r.get("gamevalAmt") or "0"))
                    if app_price < 350_000_000:
                        continue
                    min1 = parse_korean_price(str(r.get("minmaePrice") or "0"))
                    min2 = parse_korean_price(str(r.get("notifyMinmaePrice1") or "0"))
                    min_price = min2 if (0 < min2 < min1 or min1 == 0) else min1
                    if min_price <= 0:
                        min_price = app_price

                    area_m2 = extract_area_m2(str(r.get("areaList") or ""))
                    if area_m2 < 35 or area_m2 > 300:
                        continue

                    buld_list = str(r.get("buldList") or "").strip()
                    dong_ho = extract_dong_ho(buld_list) or buld_list
                    if "동" not in dong_ho and app_price < 700_000_000:
                        continue

                    sigu = str(r.get("hjguSigu") or "").strip()
                    dong = str(r.get("hjguDong") or "").strip()
                    district = f"서울 {sigu} {dong}".strip() if region_group == "서울" else f"{sigu} {dong}".strip()

                    naver_url = resolve_naver_complex_url(session, headers, district, buld_nm)
                    households = resolve_households(session, headers, district, buld_nm)

                    seen_cases.add(seen_key)
                    seen_cases.add(f"{court['short_name']}|{case_no}")
                    area_pyeong = round(area_m2 * 0.3025, 1)
                    floor_info = extract_floor(buld_list)
                    discount_rate = max(0, round((1 - (min_price / app_price)) * 100))
                    yuchal = safe_int(r.get("yuchalCnt"), 0)
                    auction_round = f"{yuchal + 1}회차 ({yuchal}회 유찰)" if yuchal > 0 else "1회차 (신건)"
                    auction_date = format_ymd(r.get("maeGiil") or "")

                    collected_items.append({
                        "id": re.sub(r"[^a-zA-Z0-9가-힣]", "", f"{court['cort_cd']}_{case_no}_{maemul_ser}"),
                        "case_no": case_no,
                        "court": court["short_name"],
                        "complex_name": buld_nm,
                        "dong_ho": dong_ho,
                        "households": households,
                        "region_group": region_group,
                        "district": district,
                        "address": addr_part,
                        "area_m2": area_m2,
                        "area_pyeong": area_pyeong,
                        "floor_info": floor_info,
                        "appraisal_price": app_price,
                        "minimum_price": min_price,
                        "discount_rate": discount_rate,
                        "auction_round": auction_round,
                        "auction_date": auction_date,
                        "d_day": calculate_d_day(auction_date),
                        "bid_deposit": int(min_price * 0.1),
                        "is_safe": True,
                        "rights_badge": "인수권리 없음 (안전)",
                        "naver_search_url": naver_url,
                        "hogang_search_url": f"https://hogangnono.com/search?q={urllib.parse.quote(district + ' ' + buld_nm)}",
                    })

                if len(s_list) < 40:
                    break
            except Exception as e:
                print(f"  - [{court['short_name']}] 4주 물건 검색 건너뜀: {e}")
                failed_courts.add(court["short_name"])
                break

    # 2) 기일별 공고 상세 보조 수집
    for idx, court in enumerate(TARGET_COURTS):
        try:
            time.sleep(2.0)  # 대법원 서버 차단 방지 딜레이
            list_body = {
                "dma_srchDspslPbanc": {
                    "srchYmd": srch_ym,
                    "cortOfcCd": court["cort_cd"],
                    "bidDvsCd": "000331",
                    "srchBtnYn": "Y",
                }
            }
            resp = session.post(NOTICE_LIST_URL, json=list_body, headers=headers, timeout=15)
            if resp.status_code != 200:
                print(f"  [!] [{court['short_name']}] 기일별 공고 목록 HTTP {resp.status_code}")
                failed_courts.add(court["short_name"])
                continue

            resp_json = safe_json(resp, f"{court['short_name']} 기일별 공고 목록")
            if resp_json is None:
                failed_courts.add(court["short_name"])
                continue
            data = resp_json.get("data") or {}
            if data.get("ipcheck") is False:
                print("[!] 대법원 IP 일시 제한 감지 - 수집 중단")
                for rem_court in TARGET_COURTS[idx:]:
                    failed_courts.add(rem_court["short_name"])
                break

            notices = (data.get("dlt_rletDspslPbancLst") or [])[: court["max_notices"]]
            for notice in notices:
                time.sleep(2.0)
                dtl_body = {
                    "dma_srchGnrlPbanc": {
                        "cortOfcCd": str(notice.get("cortOfcCd") or court["cort_cd"]),
                        "dspslDxdyYmd": str(notice.get("dspslDxdyYmd") or ""),
                        "bidBgngYmd": str(notice.get("bidBgngYmd") or ""),
                        "bidEndYmd": str(notice.get("bidEndYmd") or ""),
                        "jdbnCd": str(notice.get("jdbnCd") or ""),
                        "cortAuctnJdbnNm": str(notice.get("cortAuctnJdbnNm") or ""),
                        "jdbnTelno": str(notice.get("jdbnTelno") or ""),
                        "dspslPlcNm": str(notice.get("dspslPlcNm") or ""),
                        "fstDspslHm": str(notice.get("fstDspslHm") or ""),
                        "scndDspslHm": str(notice.get("scndDspslHm") or ""),
                        "thrdDspslHm": str(notice.get("thrdDspslHm") or ""),
                        "fothDspslHm": str(notice.get("fothDspslHm") or ""),
                        "bidDvsCd": str(notice.get("bidDvsCd") or "000331"),
                    }
                }
                dtl_resp = session.post(NOTICE_DETAIL_URL, json=dtl_body, headers=headers, timeout=15)
                if dtl_resp.status_code != 200:
                    print(f"  [!] [{court['short_name']}] 공고 상세 HTTP {dtl_resp.status_code}")
                    failed_courts.add(court["short_name"])
                    continue

                dtl_json = safe_json(dtl_resp, f"{court['short_name']} 공고 상세")
                if dtl_json is None:
                    failed_courts.add(court["short_name"])
                    continue
                rows = (
                    dtl_json.get("data", {})
                    .get("result", {})
                    .get("dspslPbanc", {})
                    .get("pbancInfo", {})
                    .get("lst")
                    or []
                )

                for row in rows:
                    usg_nm = str(row.get("usgNm") or "")
                    if "아파트" not in usg_nm:
                        continue

                    raw_cs = str(row.get("csNo") or "")
                    case_no = re.split(r"<br\s*/?>", raw_cs, flags=re.IGNORECASE)[0].strip()
                    seen_court_case = f"{court['short_name']}|{case_no}"
                    if not case_no or seen_court_case in seen_cases:
                        continue

                    rmk = strip_html(row.get("dspslRmk") or "")
                    if re.search(r"지분|미등기|유치권|법정지상권|선순위|맹지", rmk):
                        continue
                    if "대항력" in rmk and "포기" not in rmk:
                        continue

                    raw_st = str(row.get("st") or "")
                    st_parts = re.split(r"<br\s*/?>", raw_st, flags=re.IGNORECASE)
                    addr_part = strip_html(st_parts[0]) if st_parts else strip_html(raw_st)
                    detail_Split = raw_st.split("[상세내역]")
                    detail_part = detail_Split[1] if len(detail_Split) > 1 else raw_st

                    region_group = classify_region(addr_part)
                    if not region_group:
                        continue

                    appraisal_price = parse_korean_price(row.get("aeeEvlAmt") or "")
                    minimum_price = parse_korean_price(row.get("lwsDspslPrc") or "") or appraisal_price
                    if appraisal_price < 350_000_000:
                        continue

                    complex_name = extract_complex_name(addr_part)
                    if complex_name == "아파트":
                        continue

                    area_m2 = extract_area_m2(detail_part)
                    if area_m2 < 30 or area_m2 > 300:
                        continue

                    seen_cases.add(seen_court_case)
                    area_pyeong = round(area_m2 * 0.3025, 1)
                    floor_info = extract_floor(addr_part)
                    discount_rate = round((1 - (minimum_price / appraisal_price)) * 100)

                    fail_cnt = 0
                    if discount_rate >= 65:
                        fail_cnt = 4
                    elif discount_rate >= 45:
                        fail_cnt = 3
                    elif discount_rate >= 32:
                        fail_cnt = 2
                    elif discount_rate >= 15:
                        fail_cnt = 1
                    auction_round = f"{fail_cnt + 1}회차 ({fail_cnt}회 유찰)" if fail_cnt > 0 else "1회차 (신건)"

                    auction_date = format_ymd(notice.get("dspslDxdyYmd") or "")
                    tokens = addr_part.split()
                    district = f"{tokens[1]} {tokens[2]}".replace(",", "") if len(tokens) >= 3 else region_group

                    naver_url = resolve_naver_complex_url(session, headers, district, complex_name)
                    dong_ho = extract_dong_ho(addr_part)
                    households = resolve_households(session, headers, district, complex_name)

                    item = {
                        "id": re.sub(r"[^a-zA-Z0-9가-힣]", "", f"{court['cort_cd']}_{case_no}"),
                        "case_no": case_no,
                        "court": court["short_name"],
                        "complex_name": complex_name,
                        "dong_ho": dong_ho,
                        "households": households,
                        "region_group": region_group,
                        "district": district,
                        "address": addr_part,
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
                        "naver_search_url": naver_url,
                        "hogang_search_url": f"https://hogangnono.com/search?q={urllib.parse.quote(district + ' ' + complex_name)}",
                    }
                    collected_items.append(item)

            print(f"  - [{court['short_name']}] 수집 완료 (누적 {len(collected_items)}건)")
        except Exception as e:
            print(f"  - [{court['short_name']}] 크롤링 건너뜀: {e}")
            failed_courts.add(court["short_name"])

    return collected_items, failed_courts


def run():
    print("==================================================")
    print("  대법원 경매 사이트(courtauction.go.kr) 직접 수집기")
    print("==================================================")

    # 기존 데이터에서 세대수(households) 및 네이버 단지번호(naver_search_url) 캐시 로드
    existing_items = []
    hh_cache: Dict[str, str] = {}
    url_cache: Dict[str, str] = {}
    if os.path.exists(COMPLEX_CACHE_PATH):
        try:
            with open(COMPLEX_CACHE_PATH, "r", encoding="utf-8") as f:
                c_cache = json.load(f)
                hh_cache.update(c_cache)
        except Exception:
            pass

    if os.path.exists(DATA_FILE_PATH):
        try:
            with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
                existing_data = json.load(f)
                existing_items = existing_data.get("items", [])
                for ex in existing_items:
                    c_no = ex.get("case_no", "")
                    k_dc = f"{ex.get('district', '')}|{ex.get('complex_name', '')}"
                    c_nm = ex.get("complex_name", "")
                    hh = ex.get("households", "")
                    n_url = ex.get("naver_search_url", "")
                    cc_ex = f"{ex.get('court', '')}|{c_no}"
                    if hh:
                        if c_no:
                            hh_cache[cc_ex] = hh
                        hh_cache[k_dc] = hh
                        if c_nm not in hh_cache:
                            hh_cache[c_nm] = hh
                    if "complexes/" in n_url:
                        if c_no:
                            url_cache[cc_ex] = n_url
                        url_cache[k_dc] = n_url
                        if c_nm not in url_cache:
                            url_cache[c_nm] = n_url
        except Exception:
            pass

    scraped_items, failed_courts = scrape_court_auction()

    if failed_courts and existing_items:
        print(f"[*] 일부 법원 수집 실패({', '.join(sorted(failed_courts))}) -> 해당 법원 기존 물건을 유지합니다.")
        scraped_keys = {f"{i.get('court', '')}|{i.get('case_no', '')}" for i in scraped_items}
        for ex in existing_items:
            ex_court = ex.get("court", "")
            ex_key = f"{ex_court}|{ex.get('case_no', '')}"
            if ex_court in failed_courts and ex_key not in scraped_keys:
                scraped_items.append(ex)
                scraped_keys.add(ex_key)

    # 크롤링 결과가 적거나 없을 경우(법원 서버 점검 시간 등) 기존 데이터 유지
    if len(scraped_items) < 5 and existing_items:
        print("[*] 법원 서버 점검 또는 응답 지연으로 기존 정제 데이터를 유지합니다.")
        scraped_items = existing_items

    first_seen_map = {}
    today_str = get_kst_today().strftime("%Y-%m-%d")
    for ex in existing_items:
        if ex.get("case_no"):
            ex_cc_key = f"{ex.get('court', '')}|{ex['case_no']}"
            first_seen_map[ex_cc_key] = ex.get("first_seen", today_str)

    # 해외 GitHub Actions 서버에서 네이버 검색 차단 시 기존 캐시된 세대수/단지링크 복원 및 D-Day 재계산
    for item in scraped_items:
        c_no = item.get("case_no", "")
        cc_key = f"{item.get('court', '')}|{c_no}"
        fs = first_seen_map.get(cc_key, today_str)
        item["first_seen"] = fs
        item["is_today_new"] = (fs == today_str)
        k_dc = f"{item.get('district', '')}|{item.get('complex_name', '')}"
        c_nm = item.get("complex_name", "")
        if not item.get("households"):
            item["households"] = hh_cache.get(cc_key) or hh_cache.get(k_dc) or hh_cache.get(c_nm, "")
        if "complexes/" not in str(item.get("naver_search_url", "")):
            cached_url = url_cache.get(cc_key) or url_cache.get(k_dc) or url_cache.get(c_nm, "")
            if cached_url:
                item["naver_search_url"] = cached_url
        item["d_day"] = calculate_d_day(item.get("auction_date", ""))
        item["bid_deposit"] = int(item.get("minimum_price", 0) * 0.1)

    new_count = sum(1 for i in scraped_items if i.get("discount_rate", 0) == 0)
    discounted_count = sum(1 for i in scraped_items if i.get("discount_rate", 0) > 0)
    imminent_count = sum(1 for i in scraped_items if 0 <= i.get("d_day", 999) <= 7)

    payload = {
        "updated_at": get_kst_today().strftime("%Y-%m-%d"),
        "total_count": len(scraped_items),
        "stats": {
            "total": len(scraped_items),
            "new_count": new_count,
            "discounted_count": discounted_count,
            "imminent_count": imminent_count,
            "today_new_count": sum(1 for i in scraped_items if i.get("is_today_new")),
        },
        "items": scraped_items,
    }

    atomic_write_json(DATA_FILE_PATH, payload)

    # 영구 단지 캐시 DB 업데이트
    for item in scraped_items:
        hh = item.get("households", "")
        c_nm = item.get("complex_name", "")
        c_no = item.get("case_no", "")
        k_dc = f"{item.get('district', '')}|{c_nm}"
        if hh and c_nm:
            hh_cache[c_nm] = hh
            hh_cache[k_dc] = hh
            if c_no:
                hh_cache[f"{item.get('court', '')}|{c_no}"] = hh
    try:
        atomic_write_json(COMPLEX_CACHE_PATH, hh_cache)
    except Exception:
        pass

    print(f"[✓] 총 {len(scraped_items)}건 업데이트 완료 -> {DATA_FILE_PATH}")

    # 사라진 매물 결과 추적 -> data/auction_history.json (60일 롤링)
    try:
        import requests
        court_cd_map = {c["short_name"]: c["cort_cd"] for c in TARGET_COURTS}
        cur_keys = {f"{i.get('court', '')}|{i.get('case_no', '')}" for i in scraped_items}
        disappeared = [
            ex for ex in existing_items
            if f"{ex.get('court', '')}|{ex.get('case_no', '')}" not in cur_keys
            and ex.get("court", "") not in failed_courts
        ]
        existing_hist = []
        if os.path.exists(HISTORY_FILE_PATH):
            with open(HISTORY_FILE_PATH, "r", encoding="utf-8") as f:
                existing_hist = json.load(f).get("items", [])

        hist_map = {f"{h.get('court', '')}|{h.get('case_no', '')}": h for h in existing_hist}
        # 현재 다시 진행 목록에 복귀한 물건은 결과 탭에서 제외
        for k in cur_keys:
            hist_map.pop(k, None)

        if disappeared:
            h_sess = requests.Session()
            h_headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Origin": BASE_URL,
                "Referer": f"{BASE_URL}/pgj/index.on?w2xPath=/pgj/ui/pgj100/PGJ159M00.xml",
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json; charset=UTF-8",
                "SC-Userid": "SYSTEM",
            }
            for item in disappeared:
                c_name = item.get("court", "")
                cort_cd = court_cd_map.get(c_name, "")
                m_cno = re.search(r"\d{4}타경\d+", str(item.get("case_no", "")))
                clean_cno = m_cno.group(0) if m_cno else ""
                status_label, result_detail, winning_price, next_date = "목록 종료", "", 0, ""
                if cort_cd and clean_cno:
                    try:
                        time.sleep(0.15)
                        r1 = h_sess.post(
                            f"{BASE_URL}/pgj/pgj15A/selectAuctnCsSrchRslt.on",
                            headers={**h_headers, "Submissionid": "mf_wfm_mainFrame_sbm_selectCsDtlInf"},
                            json={"dma_srchCsDtlInf": {"cortOfcCd": cort_cd, "csNo": clean_cno}},
                            timeout=8,
                        )
                        if r1.status_code == 200:
                            j1 = safe_json(r1, f"이력 조회 {clean_cno}")
                            d1 = (j1.get("data") or {}) if j1 else {}
                            bas = d1.get("dma_csBasInf") or {}
                            objs = d1.get("dlt_dspslGdsDspslObjctLst") or []
                            for o in objs:
                                amt = safe_int(o.get("dspslAmt"), 0)
                                if amt > 0:
                                    winning_price = amt
                                if len(str(o.get("dspslDxdyYmd") or "")) == 8:
                                    ymd = str(o["dspslDxdyYmd"])
                                    next_date = f"{ymd[:4]}-{ymd[4:6]}-{ymd[6:8]}"
                            int_cs_no = bas.get("csNo", "")
                            dxdy_list = []
                            if int_cs_no:
                                time.sleep(0.15)
                                r2 = h_sess.post(
                                    f"{BASE_URL}/pgj/pgj15A/selectCsDtlDxdyDts.on",
                                    headers={**h_headers, "Submissionid": "mf_wfm_mainFrame_wfm_dxdyDts_sbm_selectDxdyDtsLst"},
                                    json={"dma_srchDxdyDtsLst": {"cortOfcCd": cort_cd, "csNo": int_cs_no}},
                                    timeout=8,
                                )
                                if r2.status_code == 200:
                                    j2 = safe_json(r2, f"기일내역 조회 {clean_cno}")
                                    dxdy_list = ((j2.get("data") or {}).get("dlt_dxdyDtsLst") or []) if j2 else []
                            non_empty = [x for x in dxdy_list if strip_html(x.get("dxdyRslt") or "")]
                            if non_empty:
                                rslt = strip_html(non_empty[-1].get("dxdyRslt") or "")
                                result_detail = rslt
                                if "매각" in rslt and "불허가" not in rslt:
                                    status_label = "매각"
                                elif "유찰" in rslt:
                                    status_label = "유찰"
                                elif "변경" in rslt:
                                    status_label = "기일변경"
                                else:
                                    status_label = rslt[:14]
                            elif bas.get("ultmtDvsCd", "000") != "000":
                                status_label = "종국(취하·완결)"
                    except Exception:
                        pass
                hist_map[f"{c_name}|{clean_cno or item.get('case_no', '')}"] = {
                    **item,
                    "status_label": status_label,
                    "result_detail": result_detail,
                    "winning_price": winning_price,
                    "next_date": next_date,
                    "archived_at": today_str,
                }

        cutoff_str = (get_kst_today() - datetime.timedelta(days=60)).strftime("%Y-%m-%d")
        pruned_hist = [h for h in hist_map.values() if (h.get("archived_at") or today_str) >= cutoff_str]
        atomic_write_json(
            HISTORY_FILE_PATH,
            {"updated_at": today_str, "total_count": len(pruned_hist), "items": pruned_hist},
        )
    except Exception as he:
        print(f"[!] 이력 아카이브 저장 건너뜀: {he}")


if __name__ == "__main__":
    run()
