/**
 * Seoul & Gyeonggi Auction Radar - Apple & Toss Design System Engine
 */

(function () {
  'use strict';

  // Fallback Data for offline or direct file:// opening (Real Live Court Auction Data)
  const FALLBACK_DATA = {
    "updated_at":  "2026-10-19",
    "total_count":  41,
    "stats":  {
                  "total":  41,
                  "new_count":  27,
                  "discounted_count":  14,
                  "imminent_count":  35
              },
    "items":  [
                  {
                      "id":  "2023타경60686",
                      "case_no":  "2023타경60686",
                      "court":  "수원지법 성남지원",
                      "complex_name":  "위례센트럴푸르지오",
                      "region_group":  "성남",
                      "district":  "성남시 수정구",
                      "address":  "경기도 성남시 수정구 위례순환로 211, 5403동 7층704호 (창곡동, 위례센트럴푸르지오)",
                      "area_m2":  94.99,
                      "area_pyeong":  28.7,
                      "floor_info":  "7층",
                      "appraisal_price":  1870000000,
                      "minimum_price":  1309000000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  130900000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/107661",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%84%B1%EB%82%A8%EC%8B%9C%20%EC%88%98%EC%A0%95%EA%B5%AC%20%EC%9C%84%EB%A1%80%EC%84%BC%ED%8A%B8%EB%9F%B4%ED%91%B8%EB%A5%B4%EC%A7%80%EC%98%A4"
                  },
                  {
                      "id":  "2025타경52944",
                      "case_no":  "2025타경52944",
                      "court":  "수원지법 성남지원",
                      "complex_name":  "성원초원아파트",
                      "region_group":  "성남",
                      "district":  "성남시 중원구",
                      "address":  "경기도 성남시 중원구 하대원동 115-3 성원초원아파트 101동 4층402호",
                      "area_m2":  84.98,
                      "area_pyeong":  25.7,
                      "floor_info":  "4층",
                      "appraisal_price":  626000000,
                      "minimum_price":  626000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  62600000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/1747",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%84%B1%EB%82%A8%EC%8B%9C%20%EC%A4%91%EC%9B%90%EA%B5%AC%20%EC%84%B1%EC%9B%90%EC%B4%88%EC%9B%90%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경104110",
                      "case_no":  "2025타경104110",
                      "court":  "서울중앙지법",
                      "complex_name":  "한라타운아파트",
                      "region_group":  "서울",
                      "district":  "관악구 신림동",
                      "address":  "서울특별시 관악구 신림동 763 한라타운아파트 4층404호",
                      "area_m2":  78.04,
                      "area_pyeong":  23.6,
                      "floor_info":  "4층",
                      "appraisal_price":  650000000,
                      "minimum_price":  650000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  65000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/10966",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B4%80%EC%95%85%EA%B5%AC%20%EC%8B%A0%EB%A6%BC%EB%8F%99%20%ED%95%9C%EB%9D%BC%ED%83%80%EC%9A%B4%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경103542",
                      "case_no":  "2025타경103542",
                      "court":  "서울중앙지법",
                      "complex_name":  "스카이써밋아파트",
                      "region_group":  "서울",
                      "district":  "강남구 대치동",
                      "address":  "서울특별시 강남구 대치동 915-13 스카이써밋아파트 3층302호",
                      "area_m2":  120,
                      "area_pyeong":  36.3,
                      "floor_info":  "3층",
                      "appraisal_price":  1660000000,
                      "minimum_price":  1328000000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  132800000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/17690",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%8C%80%EC%B9%98%EB%8F%99%20%EC%8A%A4%EC%B9%B4%EC%9D%B4%EC%8D%A8%EB%B0%8B%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경3006",
                      "case_no":  "2025타경3006",
                      "court":  "서울중앙지법",
                      "complex_name":  "건영아파트",
                      "region_group":  "서울",
                      "district":  "관악구 신림동",
                      "address":  "서울특별시 관악구 신림동 1703-1 건영아파트 4동 13층1302호",
                      "area_m2":  84.82,
                      "area_pyeong":  25.7,
                      "floor_info":  "13층",
                      "appraisal_price":  768000000,
                      "minimum_price":  768000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  76800000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/3168",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B4%80%EC%95%85%EA%B5%AC%20%EC%8B%A0%EB%A6%BC%EB%8F%99%20%EA%B1%B4%EC%98%81%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경2768",
                      "case_no":  "2025타경2768",
                      "court":  "서울중앙지법",
                      "complex_name":  "관악푸르지오",
                      "region_group":  "서울",
                      "district":  "관악구 봉천동",
                      "address":  "서울특별시 관악구 봉천동 1717 관악푸르지오 119동 3층303호",
                      "area_m2":  84.2,
                      "area_pyeong":  25.5,
                      "floor_info":  "3층",
                      "appraisal_price":  994000000,
                      "minimum_price":  994000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  99400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/107439",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B4%80%EC%95%85%EA%B5%AC%20%EB%B4%89%EC%B2%9C%EB%8F%99%20%EA%B4%80%EC%95%85%ED%91%B8%EB%A5%B4%EC%A7%80%EC%98%A4"
                  },
                  {
                      "id":  "2025타경2485",
                      "case_no":  "2025타경2485",
                      "court":  "서울중앙지법",
                      "complex_name":  "메르디안하우스",
                      "region_group":  "서울",
                      "district":  "서초구 양재동",
                      "address":  "서울특별시 서초구 양재동 122-2 메르디안하우스 6층602호",
                      "area_m2":  206.12,
                      "area_pyeong":  62.4,
                      "floor_info":  "6층",
                      "appraisal_price":  2210000000,
                      "minimum_price":  2210000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  221000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/26368",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%84%9C%EC%B4%88%EA%B5%AC%20%EC%96%91%EC%9E%AC%EB%8F%99%20%EB%A9%94%EB%A5%B4%EB%94%94%EC%95%88%ED%95%98%EC%9A%B0%EC%8A%A4"
                  },
                  {
                      "id":  "2025타경104025",
                      "case_no":  "2025타경104025",
                      "court":  "서울중앙지법",
                      "complex_name":  "래미안포레",
                      "region_group":  "서울",
                      "district":  "강남구 자곡동",
                      "address":  "서울특별시 강남구 자곡동 687 래미안포레 315동 1층104호",
                      "area_m2":  84.89,
                      "area_pyeong":  25.7,
                      "floor_info":  "1층",
                      "appraisal_price":  1730000000,
                      "minimum_price":  1730000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-22",
                      "d_day":  3,
                      "bid_deposit":  173000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/107457",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%82%A8%EA%B5%AC%20%EC%9E%90%EA%B3%A1%EB%8F%99%20%EB%9E%98%EB%AF%B8%EC%95%88%ED%8F%AC%EB%A0%88"
                  },
                  {
                      "id":  "2025타경103555",
                      "case_no":  "2025타경103555",
                      "court":  "서울중앙지법",
                      "complex_name":  "관악산휴먼시아",
                      "region_group":  "서울",
                      "district":  "관악구 신림동",
                      "address":  "서울특별시 관악구 신림동 1735 관악산휴먼시아 229동 7층704호",
                      "area_m2":  84.96,
                      "area_pyeong":  25.7,
                      "floor_info":  "7층",
                      "appraisal_price":  730000000,
                      "minimum_price":  584000000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-22",
                      "d_day":  3,
                      "bid_deposit":  58400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/100344",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B4%80%EC%95%85%EA%B5%AC%20%EC%8B%A0%EB%A6%BC%EB%8F%99%20%EA%B4%80%EC%95%85%EC%82%B0%ED%9C%B4%EB%A8%BC%EC%8B%9C%EC%95%84"
                  },
                  {
                      "id":  "2025타경101801",
                      "case_no":  "2025타경101801",
                      "court":  "서울중앙지법",
                      "complex_name":  "도곡삼성아파트",
                      "region_group":  "서울",
                      "district":  "강남구 도곡동",
                      "address":  "서울특별시 강남구 남부순환로379길 14, 1동 10층1003호 (도곡동,삼성아파트)",
                      "area_m2":  84.91,
                      "area_pyeong":  25.7,
                      "floor_info":  "10층",
                      "appraisal_price":  2270000000,
                      "minimum_price":  2270000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-22",
                      "d_day":  3,
                      "bid_deposit":  227000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/10828",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%82%A8%EB%B6%80%EC%88%9C%ED%99%98%EB%A1%9C379%EA%B8%B8%20%EC%82%BC%EC%84%B1%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2026타경50077",
                      "case_no":  "2026타경50077",
                      "court":  "서울동부지법",
                      "complex_name":  "프라이어팰리스",
                      "region_group":  "서울",
                      "district":  "강동구 암사동",
                      "address":  "서울특별시 강동구 암사동 413 프라이어팰리스 109동 15층1502호",
                      "area_m2":  114.27,
                      "area_pyeong":  34.6,
                      "floor_info":  "15층",
                      "appraisal_price":  1830000000,
                      "minimum_price":  1830000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  183000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/19578",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%8F%99%EA%B5%AC%20%EC%95%94%EC%82%AC%EB%8F%99%20%ED%94%84%EB%9D%BC%EC%9D%B4%EC%96%B4%ED%8C%B0%EB%A6%AC%EC%8A%A4"
                  },
                  {
                      "id":  "2026타경50047",
                      "case_no":  "2026타경50047",
                      "court":  "서울동부지법",
                      "complex_name":  "강동리버스트4단지",
                      "region_group":  "서울",
                      "district":  "강동구 강일동",
                      "address":  "서울특별시 강동구 강일동 114 강동리버스트4단지 401동 2층201호",
                      "area_m2":  59.99,
                      "area_pyeong":  18.1,
                      "floor_info":  "2층",
                      "appraisal_price":  932000000,
                      "minimum_price":  932000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  93200000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/127671",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%8F%99%EA%B5%AC%20%EA%B0%95%EC%9D%BC%EB%8F%99%20%EA%B0%95%EB%8F%99%EB%A6%AC%EB%B2%84%EC%8A%A4%ED%8A%B84%EB%8B%A8%EC%A7%80"
                  },
                  {
                      "id":  "2025타경52589",
                      "case_no":  "2025타경52589",
                      "court":  "서울동부지법",
                      "complex_name":  "현대아파트",
                      "region_group":  "서울",
                      "district":  "송파구 거여동",
                      "address":  "서울특별시 송파구 거여동 44 현대아파트 202동 4층404호",
                      "area_m2":  82.96,
                      "area_pyeong":  25.1,
                      "floor_info":  "4층",
                      "appraisal_price":  1070000000,
                      "minimum_price":  1070000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  107000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/355",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%86%A1%ED%8C%8C%EA%B5%AC%20%EA%B1%B0%EC%97%AC%EB%8F%99%20%ED%98%84%EB%8C%80%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경465",
                      "case_no":  "2025타경465",
                      "court":  "서울동부지법",
                      "complex_name":  "성수현대그린아파트",
                      "region_group":  "서울",
                      "district":  "성동구 성수동1가",
                      "address":  "서울특별시 성동구 성수동1가 33-2 성수현대그린아파트 101동 7층713호",
                      "area_m2":  81.48,
                      "area_pyeong":  24.6,
                      "floor_info":  "7층",
                      "appraisal_price":  1670000000,
                      "minimum_price":  1336000000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  133600000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/561",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%84%B1%EB%8F%99%EA%B5%AC%20%EC%84%B1%EC%88%98%EB%8F%991%EA%B0%80%20%EC%84%B1%EC%88%98%ED%98%84%EB%8C%80%EA%B7%B8%EB%A6%B0%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2026타경3433",
                      "case_no":  "2026타경3433",
                      "court":  "서울남부지법",
                      "complex_name":  "장미아파트",
                      "region_group":  "서울",
                      "district":  "강서구 방화동",
                      "address":  "서울특별시 강서구 방화동 841 장미아파트 제101동 제7층 제707호",
                      "area_m2":  59.04,
                      "area_pyeong":  17.9,
                      "floor_info":  "7층",
                      "appraisal_price":  594000000,
                      "minimum_price":  594000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  59400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/22",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EC%84%9C%EA%B5%AC%20%EB%B0%A9%ED%99%94%EB%8F%99%20%EC%9E%A5%EB%AF%B8%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경13877",
                      "case_no":  "2025타경13877",
                      "court":  "서울남부지법",
                      "complex_name":  "염창동아아파트",
                      "region_group":  "서울",
                      "district":  "강서구 염창동",
                      "address":  "서울특별시 강서구 염창동 292 염창동아아파트 제101동 제3층 제303호",
                      "area_m2":  114.84,
                      "area_pyeong":  34.7,
                      "floor_info":  "3층",
                      "appraisal_price":  1240000000,
                      "minimum_price":  992000000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  99200000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/869",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EC%84%9C%EA%B5%AC%20%EC%97%BC%EC%B0%BD%EB%8F%99%20%EC%97%BC%EC%B0%BD%EB%8F%99%EC%95%84%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2026타경4958",
                      "case_no":  "2026타경4958",
                      "court":  "서울남부지법",
                      "complex_name":  "힐탑이루미아파트",
                      "region_group":  "서울",
                      "district":  "양천구 신정동",
                      "address":  "서울특별시 양천구 신정동 1305 힐탑이루미아파트 제2층 제202호",
                      "area_m2":  81.08,
                      "area_pyeong":  24.5,
                      "floor_info":  "2층",
                      "appraisal_price":  597000000,
                      "minimum_price":  597000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  59700000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/17522",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%96%91%EC%B2%9C%EA%B5%AC%20%EC%8B%A0%EC%A0%95%EB%8F%99%20%ED%9E%90%ED%83%91%EC%9D%B4%EB%A3%A8%EB%AF%B8%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2026타경3063",
                      "case_no":  "2026타경3063",
                      "court":  "서울남부지법",
                      "complex_name":  "우리유앤미아파트",
                      "region_group":  "서울",
                      "district":  "구로구 구로동",
                      "address":  "서울특별시 구로구 구로동 1277 우리유앤미아파트 제101동 제9층 제902호",
                      "area_m2":  84.42,
                      "area_pyeong":  25.5,
                      "floor_info":  "9층",
                      "appraisal_price":  656000000,
                      "minimum_price":  524800000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  52480000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/10547",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B5%AC%EB%A1%9C%EA%B5%AC%20%EA%B5%AC%EB%A1%9C%EB%8F%99%20%EC%9A%B0%EB%A6%AC%EC%9C%A0%EC%95%A4%EB%AF%B8%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2026타경84",
                      "case_no":  "2026타경84",
                      "court":  "서울남부지법",
                      "complex_name":  "그랜드아이파크",
                      "region_group":  "서울",
                      "district":  "강서구 화곡동",
                      "address":  "서울특별시 강서구 화곡동 1095 그랜드아이파크 제12층 제102-1202호",
                      "area_m2":  149.32,
                      "area_pyeong":  45.2,
                      "floor_info":  "12층",
                      "appraisal_price":  1250000000,
                      "minimum_price":  1250000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  125000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/27553",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EC%84%9C%EA%B5%AC%20%ED%99%94%EA%B3%A1%EB%8F%99%20%EA%B7%B8%EB%9E%9C%EB%93%9C%EC%95%84%EC%9D%B4%ED%8C%8C%ED%81%AC"
                  },
                  {
                      "id":  "2023타경105218",
                      "case_no":  "2023타경105218",
                      "court":  "서울남부지법",
                      "complex_name":  "목동트라팰리스 이스턴에비뉴",
                      "region_group":  "서울",
                      "district":  "양천구 목동",
                      "address":  "서울특별시 양천구 오목로 299, 제9층 제비-904호 (목동, 목동트라팰리스 이스턴에비뉴)",
                      "area_m2":  124.95,
                      "area_pyeong":  37.8,
                      "floor_info":  "9층",
                      "appraisal_price":  2450000000,
                      "minimum_price":  2450000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  245000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/24841",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%96%91%EC%B2%9C%EA%B5%AC%20%EC%98%A4%EB%AA%A9%EB%A1%9C%20%EB%AA%A9%EB%8F%99%ED%8A%B8%EB%9D%BC%ED%8C%B0%EB%A6%AC%EC%8A%A4%20%EC%9D%B4%EC%8A%A4%ED%84%B4%EC%97%90%EB%B9%84%EB%89%B4"
                  },
                  {
                      "id":  "2025타경57182",
                      "case_no":  "2025타경57182",
                      "court":  "수원지법 본원",
                      "complex_name":  "버들치마을 성복자이2차",
                      "region_group":  "용인",
                      "district":  "용인시 수지구",
                      "address":  "경기도 용인시 수지구 성복동 767 버들치마을 성복자이2차 207동 2층202호",
                      "area_m2":  179.99,
                      "area_pyeong":  54.4,
                      "floor_info":  "2층",
                      "appraisal_price":  1290000000,
                      "minimum_price":  1290000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  129000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/27006",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EC%88%98%EC%A7%80%EA%B5%AC%20%EB%B2%84%EB%93%A4%EC%B9%98%EB%A7%88%EC%9D%84%20%EC%84%B1%EB%B3%B5%EC%9E%90%EC%9D%B42%EC%B0%A8"
                  },
                  {
                      "id":  "2025타경56714",
                      "case_no":  "2025타경56714",
                      "court":  "수원지법 본원",
                      "complex_name":  "서수원레이크푸르지오2단지",
                      "region_group":  "수원",
                      "district":  "수원시 권선구",
                      "address":  "경기도 수원시 권선구 입북동 815 서수원레이크푸르지오2단지 208동 23층2301호",
                      "area_m2":  84.93,
                      "area_pyeong":  25.7,
                      "floor_info":  "23층",
                      "appraisal_price":  529000000,
                      "minimum_price":  529000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  52900000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/104300",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%88%98%EC%9B%90%EC%8B%9C%20%EA%B6%8C%EC%84%A0%EA%B5%AC%20%EC%84%9C%EC%88%98%EC%9B%90%EB%A0%88%EC%9D%B4%ED%81%AC%ED%91%B8%EB%A5%B4%EC%A7%80%EC%98%A42%EB%8B%A8%EC%A7%80"
                  },
                  {
                      "id":  "2026타경50079",
                      "case_no":  "2026타경50079",
                      "court":  "수원지법 본원",
                      "complex_name":  "공세성원상떼레이크뷰",
                      "region_group":  "용인",
                      "district":  "용인시 기흥구",
                      "address":  "경기도 용인시 기흥구 공세동 692 공세 호수마을 공세성원상떼 레이크뷰 107동 8층801호",
                      "area_m2":  188.97,
                      "area_pyeong":  57.2,
                      "floor_info":  "8층",
                      "appraisal_price":  906000000,
                      "minimum_price":  906000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  90600000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/27707",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EA%B8%B0%ED%9D%A5%EA%B5%AC%20%EA%B3%B5%EC%84%B8%20%ED%98%B8%EC%88%98%EB%A7%88%EC%9D%84%20%EA%B3%B5%EC%84%B8%EC%84%B1%EC%9B%90%EC%83%81%EB%96%BC%20%EB%A0%88%EC%9D%B4%ED%81%AC%EB%B7%B0"
                  },
                  {
                      "id":  "2025타경59303",
                      "case_no":  "2025타경59303",
                      "court":  "수원지법 본원",
                      "complex_name":  "공세성원상떼레이크뷰",
                      "region_group":  "용인",
                      "district":  "용인시 기흥구",
                      "address":  "경기도 용인시 기흥구 공세동 692 공세 호수마을 공세성원상떼레이크뷰 102동 6층601호",
                      "area_m2":  188.97,
                      "area_pyeong":  57.2,
                      "floor_info":  "6층",
                      "appraisal_price":  904000000,
                      "minimum_price":  632800000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  63280000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/27707",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EA%B8%B0%ED%9D%A5%EA%B5%AC%20%EA%B3%B5%EC%84%B8%20%ED%98%B8%EC%88%98%EB%A7%88%EC%9D%84%20%EA%B3%B5%EC%84%B8%EC%84%B1%EC%9B%90%EC%83%81%EB%96%BC%EB%A0%88%EC%9D%B4%ED%81%AC%EB%B7%B0"
                  },
                  {
                      "id":  "2025타경57942",
                      "case_no":  "2025타경57942",
                      "court":  "수원지법 본원",
                      "complex_name":  "버들치마을성복자이1차",
                      "region_group":  "용인",
                      "district":  "용인시 수지구",
                      "address":  "경기도 용인시 수지구 성복동 758 버들치마을성복자이1차 101동 10층1002호",
                      "area_m2":  124.86,
                      "area_pyeong":  37.8,
                      "floor_info":  "10층",
                      "appraisal_price":  940000000,
                      "minimum_price":  940000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  94000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/26925",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EC%88%98%EC%A7%80%EA%B5%AC%20%EB%B2%84%EB%93%A4%EC%B9%98%EB%A7%88%EC%9D%84%EC%84%B1%EB%B3%B5%EC%9E%90%EC%9D%B41%EC%B0%A8"
                  },
                  {
                      "id":  "2025타경55580",
                      "case_no":  "2025타경55580",
                      "court":  "수원지법 본원",
                      "complex_name":  "버들치마을성복힐스테이트3차",
                      "region_group":  "용인",
                      "district":  "용인시 수지구",
                      "address":  "경기도 용인시 수지구 성복동 760 버들치마을성복힐스테이트3차 304동 2층203호",
                      "area_m2":  167.58,
                      "area_pyeong":  50.7,
                      "floor_info":  "2층",
                      "appraisal_price":  1015000000,
                      "minimum_price":  710500000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  71050000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/26926",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%9A%A9%EC%9D%B8%EC%8B%9C%20%EC%88%98%EC%A7%80%EA%B5%AC%20%EB%B2%84%EB%93%A4%EC%B9%98%EB%A7%88%EC%9D%84%EC%84%B1%EB%B3%B5%ED%9E%90%EC%8A%A4%ED%85%8C%EC%9D%B4%ED%8A%B83%EC%B0%A8"
                  },
                  {
                      "id":  "2025타경1743",
                      "case_no":  "2025타경1743",
                      "court":  "수원지법 본원",
                      "complex_name":  "서수원엠코타운르본느",
                      "region_group":  "수원",
                      "district":  "수원시 권선구",
                      "address":  "경기도 수원시 권선구 구운동 973 서수원엠코타운르본느 101동 3층302호",
                      "area_m2":  84.9,
                      "area_pyeong":  25.7,
                      "floor_info":  "3층",
                      "appraisal_price":  428000000,
                      "minimum_price":  299600000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  29960000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/104971",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%88%98%EC%9B%90%EC%8B%9C%20%EA%B6%8C%EC%84%A0%EA%B5%AC%20%EC%84%9C%EC%88%98%EC%9B%90%EC%97%A0%EC%BD%94%ED%83%80%EC%9A%B4%EB%A5%B4%EB%B3%B8%EB%8A%90"
                  },
                  {
                      "id":  "2025타경57392",
                      "case_no":  "2025타경57392",
                      "court":  "수원지법 본원",
                      "complex_name":  "동수원2차쌍용스윗닷홈",
                      "region_group":  "수원",
                      "district":  "수원시 영통구",
                      "address":  "경기도 수원시 영통구 망포동 702 동수원2차쌍용스윗닷홈 204동 3층301호",
                      "area_m2":  84.89,
                      "area_pyeong":  25.7,
                      "floor_info":  "3층",
                      "appraisal_price":  385000000,
                      "minimum_price":  188650000,
                      "discount_rate":  51,
                      "auction_round":  "4회차 (3회 유찰)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  18865000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/11502",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%88%98%EC%9B%90%EC%8B%9C%20%EC%98%81%ED%86%B5%EA%B5%AC%20%EB%8F%99%EC%88%98%EC%9B%902%EC%B0%A8%EC%8C%8D%EC%9A%A9%EC%8A%A4%EC%9C%97%EB%8B%B7%ED%99%88"
                  },
                  {
                      "id":  "2025타경56987",
                      "case_no":  "2025타경56987",
                      "court":  "수원지법 본원",
                      "complex_name":  "인계한양수자인",
                      "region_group":  "수원",
                      "district":  "수원시 팔달구",
                      "address":  "경기도 수원시 팔달구 인계동 1170 인계한양수자인 101동 4층404호",
                      "area_m2":  59.98,
                      "area_pyeong":  18.1,
                      "floor_info":  "4층",
                      "appraisal_price":  426000000,
                      "minimum_price":  102282000,
                      "discount_rate":  76,
                      "auction_round":  "5회차 (4회 유찰)",
                      "auction_date":  "2026-10-21",
                      "d_day":  2,
                      "bid_deposit":  10228200,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/115681",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%88%98%EC%9B%90%EC%8B%9C%20%ED%8C%94%EB%8B%AC%EA%B5%AC%20%EC%9D%B8%EA%B3%84%ED%95%9C%EC%96%91%EC%88%98%EC%9E%90%EC%9D%B8"
                  },
                  {
                      "id":  "2025타경3854",
                      "case_no":  "2025타경3854",
                      "court":  "수원지법 성남지원",
                      "complex_name":  "금오베스트샵아파트",
                      "region_group":  "성남",
                      "district":  "성남시 중원구",
                      "address":  "경기도 성남시 중원구 하대원동 105-7 금오베스트샵아파트 10층1003호",
                      "area_m2":  84.03,
                      "area_pyeong":  25.4,
                      "floor_info":  "10층",
                      "appraisal_price":  570000000,
                      "minimum_price":  399000000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-19",
                      "d_day":  0,
                      "bid_deposit":  39900000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/24625",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%84%B1%EB%82%A8%EC%8B%9C%20%EC%A4%91%EC%9B%90%EA%B5%AC%20%EA%B8%88%EC%98%A4%EB%B2%A0%EC%8A%A4%ED%8A%B8%EC%83%B5%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경101431",
                      "case_no":  "2025타경101431",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "주공뜨란채",
                      "region_group":  "안양",
                      "district":  "안양시 만안구",
                      "address":  "경기도 안양시 만안구 안양동 1380 주공뜨란채 109동 20층2004호",
                      "area_m2":  84.8,
                      "area_pyeong":  25.7,
                      "floor_info":  "20층",
                      "appraisal_price":  793000000,
                      "minimum_price":  793000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  79300000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/9223",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EC%A3%BC%EA%B3%B5%EB%9C%A8%EB%9E%80%EC%B1%84"
                  },
                  {
                      "id":  "2025타경1543",
                      "case_no":  "2025타경1543",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "제나시티",
                      "region_group":  "안양",
                      "district":  "안양시 만안구",
                      "address":  "경기도 안양시 만안구 안양동 517-12 제나시티 4층402호",
                      "area_m2":  83.24,
                      "area_pyeong":  25.2,
                      "floor_info":  "4층",
                      "appraisal_price":  381000000,
                      "minimum_price":  381000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  38100000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/122093",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EC%A0%9C%EB%82%98%EC%8B%9C%ED%8B%B0"
                  },
                  {
                      "id":  "2024타경109310",
                      "case_no":  "2024타경109310",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "호계e편한세상",
                      "region_group":  "안양",
                      "district":  "안양시 동안구",
                      "address":  "경기도 안양시 동안구 경수대로 430, 113동 3층302호 (호계동,호계이-편한세상아파트)",
                      "area_m2":  143.33,
                      "area_pyeong":  43.4,
                      "floor_info":  "3층",
                      "appraisal_price":  980000000,
                      "minimum_price":  784000000,
                      "discount_rate":  20,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  78400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/8036",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%8F%99%EC%95%88%EA%B5%AC%20%ED%98%B8%EA%B3%84%EC%9D%B4-%ED%8E%B8%ED%95%9C%EC%84%B8%EC%83%81%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경101688",
                      "case_no":  "2025타경101688",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "두산위브더아티움",
                      "region_group":  "안양",
                      "district":  "안양시 만안구",
                      "address":  "경기도 안양시 만안구 안양동 1438 두산위브더아티움 103동 7층701호",
                      "area_m2":  74.93,
                      "area_pyeong":  22.7,
                      "floor_info":  "7층",
                      "appraisal_price":  717000000,
                      "minimum_price":  717000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-27",
                      "d_day":  8,
                      "bid_deposit":  71700000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/127667",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EB%91%90%EC%82%B0%EC%9C%84%EB%B8%8C%EB%8D%94%EC%95%84%ED%8B%B0%EC%9B%80"
                  },
                  {
                      "id":  "2025타경101612",
                      "case_no":  "2025타경101612",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "관악아파트",
                      "region_group":  "안양",
                      "district":  "안양시 동안구",
                      "address":  "경기도 안양시 동안구 비산동 1102 관악아파트 125동 8층801호",
                      "area_m2":  84.9,
                      "area_pyeong":  25.7,
                      "floor_info":  "8층",
                      "appraisal_price":  974000000,
                      "minimum_price":  974000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-27",
                      "d_day":  8,
                      "bid_deposit":  97400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/1985",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%8F%99%EC%95%88%EA%B5%AC%20%EA%B4%80%EC%95%85%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경101578",
                      "case_no":  "2025타경101578",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "초원아파트",
                      "region_group":  "안양",
                      "district":  "안양시 동안구",
                      "address":  "경기도 안양시 동안구 평촌동 896-6 초원아파트 704동 9층911호",
                      "area_m2":  37.85,
                      "area_pyeong":  11.4,
                      "floor_info":  "9층",
                      "appraisal_price":  443000000,
                      "minimum_price":  443000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-27",
                      "d_day":  8,
                      "bid_deposit":  44300000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/1477",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%8F%99%EC%95%88%EA%B5%AC%20%EC%B4%88%EC%9B%90%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경101401",
                      "case_no":  "2025타경101401",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "동신벨로스",
                      "region_group":  "안양",
                      "district":  "안양시 만안구",
                      "address":  "경기도 안양시 만안구 석수동 297-1 동신벨로스 11층1104호",
                      "area_m2":  82.3,
                      "area_pyeong":  24.9,
                      "floor_info":  "11층",
                      "appraisal_price":  518000000,
                      "minimum_price":  518000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-27",
                      "d_day":  8,
                      "bid_deposit":  51800000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/26739",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EB%8F%99%EC%8B%A0%EB%B2%A8%EB%A1%9C%EC%8A%A4"
                  },
                  {
                      "id":  "2025타경101364",
                      "case_no":  "2025타경101364",
                      "court":  "수원지법 안양지원",
                      "complex_name":  "래미안안양메가트리아",
                      "region_group":  "안양",
                      "district":  "안양시 만안구",
                      "address":  "경기도 안양시 만안구 안양동 1393 래미안안양메가트리아 115동 10층1001호",
                      "area_m2":  39.5,
                      "area_pyeong":  11.9,
                      "floor_info":  "10층",
                      "appraisal_price":  384000000,
                      "minimum_price":  384000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-27",
                      "d_day":  8,
                      "bid_deposit":  38400000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/112054",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EC%95%88%EC%96%91%EC%8B%9C%20%EB%A7%8C%EC%95%88%EA%B5%AC%20%EB%9E%98%EB%AF%B8%EC%95%88%EC%95%88%EC%96%91%EB%A9%94%EA%B0%80%ED%8A%B8%EB%A6%AC%EC%95%84"
                  },
                  {
                      "id":  "2025타경13622",
                      "case_no":  "2025타경13622",
                      "court":  "서울북부지법",
                      "complex_name":  "월계로즈빌",
                      "region_group":  "서울",
                      "district":  "노원구 월계동",
                      "address":  "서울특별시 노원구 월계동 387 월계로즈빌 8층801호",
                      "area_m2":  75.42,
                      "area_pyeong":  22.8,
                      "floor_info":  "8층",
                      "appraisal_price":  625000000,
                      "minimum_price":  625000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  62500000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/18471",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EB%85%B8%EC%9B%90%EA%B5%AC%20%EC%9B%94%EA%B3%84%EB%8F%99%20%EC%9B%94%EA%B3%84%EB%A1%9C%EC%A6%88%EB%B9%8C"
                  },
                  {
                      "id":  "2025타경13595",
                      "case_no":  "2025타경13595",
                      "court":  "서울북부지법",
                      "complex_name":  "두산위브트레지움아파트",
                      "region_group":  "서울",
                      "district":  "강북구 미아동",
                      "address":  "서울특별시 강북구 미아동 811 두산위브트레지움아파트 305동 4층 401호",
                      "area_m2":  114.88,
                      "area_pyeong":  34.8,
                      "floor_info":  "4층",
                      "appraisal_price":  1020000000,
                      "minimum_price":  1020000000,
                      "discount_rate":  0,
                      "auction_round":  "1회차 (신건)",
                      "auction_date":  "2026-10-20",
                      "d_day":  1,
                      "bid_deposit":  102000000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/27413",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B0%95%EB%B6%81%EA%B5%AC%20%EB%AF%B8%EC%95%84%EB%8F%99%20%EB%91%90%EC%82%B0%EC%9C%84%EB%B8%8C%ED%8A%B8%EB%A0%88%EC%A7%80%EC%9B%80%EC%95%84%ED%8C%8C%ED%8A%B8"
                  },
                  {
                      "id":  "2025타경51029",
                      "case_no":  "2025타경51029",
                      "court":  "수원지법 안산지원",
                      "complex_name":  "철산래미안자이",
                      "region_group":  "광명",
                      "district":  "광명시 철산동",
                      "address":  "경기도 광명시 철산동 634 철산래미안자이 107동 18층",
                      "area_m2":  84.95,
                      "area_pyeong":  25.7,
                      "floor_info":  "18층",
                      "appraisal_price":  1280000000,
                      "minimum_price":  896000000,
                      "discount_rate":  30,
                      "auction_round":  "2회차 (1회 유찰)",
                      "auction_date":  "2026-10-29",
                      "d_day":  10,
                      "bid_deposit":  89600000,
                      "is_safe":  true,
                      "rights_badge":  "인수권리 없음 (안전)",
                      "naver_search_url":  "https://new.land.naver.com/complexes/25902",
                      "hogang_search_url":  "https://hogangnono.com/search?q=%EA%B4%91%EB%AA%85%EC%8B%9C%20%EC%B2%A0%EC%82%B0%EB%8F%99%20%EC%B2%A0%EC%82%B0%EB%9E%98%EB%AF%B8%EC%95%88%EC%9E%90%EC%9D%B4"
                  }
              ]
};

  // 네이버 부동산 단지 고유번호 매핑 (호가 버튼 클릭 시 해당 단지 매물창 직행)
  const NAVER_COMPLEX_ID_MAP = {
    "송파 헬리오시티":  "111515",
    "헬리오시티":  "111515",
    "마포래미안푸르지오":  "104917",
    "분당 시범한양":  "1879",
    "시범한양":  "1879",
    "철산래미안자이":  "25902",
    "광교자연앤힐스테이트":  "101273",
    "평촌 목련마을 두산":  "1456",
    "e편한세상수지":  "109948",
    "래미안대치팰리스":  "180280",
    "상계주공7단지":  "921",
    "목동신시가지7단지":  "659",
    "DMC파크뷰자이":  "108064",
    "강동헤리티지자이":  "154118",
    "당산삼성래미안":  "2981",
    "위례센트럴푸르지오":  "107661",
    "성원초원아파트":  "1747",
    "한라타운아파트":  "10966",
    "스카이써밋아파트":  "17690",
    "건영아파트":  "3168",
    "관악푸르지오":  "107439",
    "메르디안하우스":  "26368",
    "래미안포레":  "107457",
    "관악산휴먼시아":  "100344",
    "도곡삼성아파트":  "10828",
    "프라이어팰리스":  "19578",
    "강동리버스트4단지":  "127671",
    "현대아파트":  "355",
    "성수현대그린아파트":  "561",
    "장미아파트":  "22",
    "염창동아아파트":  "869",
    "힐탑이루미아파트":  "17522",
    "우리유앤미아파트":  "10547",
    "그랜드아이파크":  "27553",
    "목동트라팰리스 이스턴에비뉴":  "24841",
    "버들치마을 성복자이2차":  "27006",
    "서수원레이크푸르지오2단지":  "104300",
    "공세성원상떼레이크뷰":  "27707",
    "버들치마을성복자이1차":  "26925",
    "버들치마을성복힐스테이트3차":  "26926",
    "서수원엠코타운르본느":  "104971",
    "동수원2차쌍용스윗닷홈":  "11502",
    "인계한양수자인":  "115681",
    "금오베스트샵아파트":  "24625",
    "주공뜨란채":  "9223",
    "제나시티":  "122093",
    "호계e편한세상":  "8036",
    "두산위브더아티움":  "127667",
    "관악아파트":  "1985",
    "초원아파트":  "1477",
    "동신벨로스":  "26739",
    "래미안안양메가트리아":  "112054",
    "월계로즈빌":  "18471",
    "두산위브트레지움아파트":  "27413"
};
  // State
  let state = {
    items: [],
    stats: {},
    updatedAt: '',
    bookmarks: new Set(JSON.parse(localStorage.getItem('sar_bookmarks') || '[]')),
    filters: {
      regionGroup: 'ALL',
      priceRange: 'ALL',
      discount: 'ALL',
      safeOnly: false,
      bookmarkedOnly: false,
      sort: 'dday_asc',
      search: ''
    },
    activeCalcItem: null
  };

  // DOM Elements
  const el = {
    headerMeta: document.getElementById('header-meta'),
    statTotal: document.getElementById('stat-total'),
    statDiscount: document.getElementById('stat-discount'),
    statNew: document.getElementById('stat-new'),
    statImminent: document.getElementById('stat-imminent'),
    regionButtons: document.querySelectorAll('.pill-btn[data-region]'),
    selectPrice: document.getElementById('select-price'),
    selectDiscount: document.getElementById('select-discount'),
    selectSort: document.getElementById('select-sort'),
    chkSafe: document.getElementById('chk-safe'),
    chkBookmark: document.getElementById('chk-bookmark'),
    inputSearch: document.getElementById('input-search'),
    resultCount: document.getElementById('result-count'),
    auctionGrid: document.getElementById('auction-grid'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-complex-title'),
    modalCaseNo: document.getElementById('modal-case-no'),
    modalClose: document.getElementById('modal-close'),
    calcInput: document.getElementById('calc-input-price'),
    resDeposit: document.getElementById('res-deposit'),
    resBalance: document.getElementById('res-balance'),
    resLoan: document.getElementById('res-loan'),
    resTax: document.getElementById('res-tax'),
    resExtra: document.getElementById('res-extra'),
    resTotal: document.getElementById('res-total'),
    toast: document.getElementById('toast')
  };

  // Format Korean Currency (e.g. 17억 2,000만)
  function formatMoney(amount) {
    if (!amount || isNaN(amount)) return '0원';
    const eok = Math.floor(amount / 100000000);
    const man = Math.floor((amount % 100000000) / 10000);
    let str = '';
    if (eok > 0) str += `${eok}억 `;
    if (man > 0) str += `${man.toLocaleString()}만`;
    return (str.trim() || '0') + '원';
  }

  // Format Date (Strictly YY.MM.DD, e.g. 2026-10-22 -> 26.10.22)
  function formatDate(item) {
    if (item && item.auction_date) {
      try {
        const parts = item.auction_date.split('-');
        if (parts.length === 3) {
          const yy = parts[0].slice(-2);
          const mm = parts[1].padStart(2, '0');
          const dd = parts[2].padStart(2, '0');
          return `${yy}.${mm}.${dd}`;
        }
      } catch (e) {}
    }
    // Fallback: calculate from d_day if auction_date string is missing
    const base = new Date();
    base.setDate(base.getDate() + (item.d_day || 0));
    const yy = String(base.getFullYear()).slice(-2);
    const mm = String(base.getMonth() + 1).padStart(2, '0');
    const dd = String(base.getDate()).padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
  }

  // Toast
  function toast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    setTimeout(() => el.toast.classList.remove('show'), 1800);
  }

  // Load Data
  async function loadData() {
    try {
      const res = await fetch('data/auction_data.json?t=' + Date.now());
      if (!res.ok) throw new Error();
      const data = await res.json();
      state.items = data.items || [];
      state.stats = data.stats || {};
      state.updatedAt = data.updated_at || '';
    } catch (e) {
      state.items = FALLBACK_DATA.items;
      state.stats = FALLBACK_DATA.stats;
      state.updatedAt = FALLBACK_DATA.updated_at;
    }
    renderHeader();
    renderCards();
  }

  // Render Header & Stats
  function renderHeader() {
    let dateLabel = '26.10.19';
    if (state.updatedAt && state.updatedAt.includes('-')) {
      const p = state.updatedAt.split('-');
      if (p.length === 3) {
        dateLabel = `${p[0].slice(-2)}.${p[1].padStart(2, '0')}.${p[2].padStart(2, '0')}`;
      }
    }
    el.headerMeta.textContent = `서울 · 경기 핵심지 자동 업데이트 (${dateLabel} 기준)`;
    el.statTotal.textContent = `${state.stats.total || state.items.length}`;
    el.statDiscount.textContent = `${state.stats.discounted_count || 0}`;
    el.statNew.textContent = `${state.stats.new_count || 0}`;
    el.statImminent.textContent = `${state.stats.imminent_count || 0}`;
  }

  // Filter Items
  function getFilteredItems() {
    return state.items.filter(item => {
      // Region Filter
      if (state.filters.regionGroup !== 'ALL') {
        if (state.filters.regionGroup === '서울') {
          if (item.region_group !== '서울' && !item.court?.includes('서울') && !item.address?.includes('서울')) {
            return false;
          }
        } else if (item.region_group !== state.filters.regionGroup) {
          return false;
        }
      }

      // Price Range Filter
      const p = item.minimum_price;
      if (state.filters.priceRange === 'under5' && p > 500000000) return false;
      if (state.filters.priceRange === '5to9' && (p < 500000000 || p > 900000000)) return false;
      if (state.filters.priceRange === '9to15' && (p < 900000000 || p > 1500000000)) return false;
      if (state.filters.priceRange === 'over15' && p < 1500000000) return false;

      // Discount Filter
      if (state.filters.discount === 'new' && item.discount_rate !== 0) return false;
      if (state.filters.discount === 'disc20' && item.discount_rate < 20) return false;
      if (state.filters.discount === 'disc36' && item.discount_rate < 30) return false;

      // Safe rights only
      if (state.filters.safeOnly && !item.is_safe) return false;

      // Bookmarked only
      if (state.filters.bookmarkedOnly && !state.bookmarks.has(item.id)) return false;

      // Keyword Search
      if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        const text = `${item.complex_name} ${item.district} ${item.case_no} ${item.court}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (state.filters.sort === 'dday_asc') return a.d_day - b.d_day;
      if (state.filters.sort === 'discount_desc') return b.discount_rate - a.discount_rate;
      if (state.filters.sort === 'min_price_asc') return a.minimum_price - b.minimum_price;
      if (state.filters.sort === 'appraisal_desc') return b.appraisal_price - a.appraisal_price;
      return 0;
    });
  }

  // Resolve exact Naver Real Estate complex URL for 호가 button
  function getNaverComplexUrl(item) {
    if (item && item.complex_name && NAVER_COMPLEX_ID_MAP[item.complex_name]) {
      return `https://new.land.naver.com/complexes/${NAVER_COMPLEX_ID_MAP[item.complex_name]}`;
    }
    const raw = item.naver_url || item.naver_search_url || '';
    if (/\/complexes\/\d+/.test(raw)) {
      return raw;
    }
    const q = `${item.district || ''} ${item.complex_name || ''}`.trim();
    return `https://land.naver.com/search/search.naver?query=${encodeURIComponent(q)}`;
  }

  // Render Card HTML (Clean & Informative)
  function renderCard(item) {
    const isBookmarked = state.bookmarks.has(item.id);
    const dDayClass = item.d_day <= 5 ? 'chip chip-dday imminent' : 'chip chip-dday';
    // 100% Guaranteed YY.MM.DD Format
    const dateLabel = formatDate(item);
    
    const discountChip = item.discount_rate > 0
      ? `<span class="chip chip-discount">-${item.discount_rate}%</span>`
      : `<span class="chip chip-new">신건</span>`;

    // 단지명 클릭 시 사건번호+단지명 경매 상세 검색결과 연결
    const auctionDetailUrl = `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(item.case_no + ' ' + item.complex_name + ' 경매')}`;
    const naverLink = getNaverComplexUrl(item);
    const hogangLink = item.hogang_url || item.hogang_search_url || '#';
    const rightsText = item.rights_badge || (item.is_safe ? '인수권리 없음 (안전)' : '권리확인 필요');

    return `
      <article class="auction-card" data-id="${item.id}">
        <div>
          <div class="card-top">
            <span class="meta-case">${item.case_no} · ${item.court}</span>
            <div class="badge-row">
              ${discountChip}
              <span class="${dDayClass}" title="매각기일">${dateLabel}</span>
            </div>
          </div>

          <div class="complex-header">
            <h3 class="complex-name">
              <a href="${auctionDetailUrl}" target="_blank" rel="noopener" class="complex-name-link" title="법원 매물 상세공고 확인 (새 탭)">
                ${item.complex_name}
              </a>
            </h3>
            <div class="complex-spec">${item.district} · 전용 ${item.area_m2}㎡ (${item.area_pyeong}평) · ${item.floor_info} · ${item.auction_round}</div>
          </div>

          <div class="price-section">
            <div class="price-main-row">
              <span class="price-target-label">최저가</span>
              <span class="price-target-val">${formatMoney(item.minimum_price)}</span>
            </div>
            <div class="price-sub-row">
              <span>감정가 <span class="appraisal-val">${formatMoney(item.appraisal_price)}</span></span>
              <span>보증금 ${formatMoney(item.bid_deposit)}</span>
            </div>
          </div>

          <div class="rights-note">
            🛡️ <strong>${rightsText}</strong>
          </div>
        </div>

        <div class="card-actions">
          <a href="${naverLink}" target="_blank" rel="noopener" class="btn-secondary">호가</a>
          <a href="${hogangLink}" target="_blank" rel="noopener" class="btn-secondary">실거래</a>
          <button type="button" class="btn-primary" data-action="calc" data-id="${item.id}">계산기</button>
          <button type="button" class="btn-fav ${isBookmarked ? 'active' : ''}" data-action="fav" data-id="${item.id}">
            ★
          </button>
        </div>
      </article>
    `;
  }

  // Render All Cards
  function renderCards() {
    const list = getFilteredItems();
    el.resultCount.textContent = list.length;

    if (list.length === 0) {
      el.auctionGrid.innerHTML = `<div class="empty-box">해당하는 경매 물건이 없습니다.</div>`;
      return;
    }
    el.auctionGrid.innerHTML = list.map(renderCard).join('');
  }

  // Toggle Favorite
  function toggleFav(id) {
    if (state.bookmarks.has(id)) {
      state.bookmarks.delete(id);
      toast('관심 목록에서 해제되었습니다.');
    } else {
      state.bookmarks.add(id);
      toast('★ 관심 목록에 저장되었습니다.');
    }
    localStorage.setItem('sar_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
    renderCards();
  }

  // Calculator
  function openCalculator(id) {
    const item = state.items.find(i => i.id === id);
    if (!item) return;

    state.activeCalcItem = item;
    el.modalTitle.textContent = item.complex_name;
    el.modalCaseNo.textContent = `${item.case_no} · 감정가 ${formatMoney(item.appraisal_price)}`;
    el.calcInput.value = item.minimum_price;
    updateCalcMath();

    el.modalOverlay.classList.add('active');
  }

  function closeCalculator() {
    el.modalOverlay.classList.remove('active');
    state.activeCalcItem = null;
  }

  function updateCalcMath() {
    if (!state.activeCalcItem) return;
    const bid = parseInt(el.calcInput.value, 10) || 0;
    const item = state.activeCalcItem;

    const deposit = Math.round(item.minimum_price * 0.1);
    const balance = Math.max(0, bid - deposit);
    const loan = Math.round(Math.min(bid, item.appraisal_price) * 0.70);

    let taxRate = 0.011;
    if (bid > 900000000) taxRate = 0.035;
    else if (bid > 600000000) taxRate = 0.022;
    const tax = Math.round(bid * taxRate);

    const extra = Math.round((item.area_pyeong || 25) * 80000 + 1000000); // 명도비 + 채권/법무
    const ownCash = deposit + Math.max(0, balance - loan) + tax + extra;

    el.resDeposit.textContent = formatMoney(deposit);
    el.resBalance.textContent = formatMoney(balance);
    el.resLoan.textContent = `약 ${formatMoney(loan)}`;
    el.resTax.textContent = `${formatMoney(tax)} (${(taxRate * 100).toFixed(1)}%)`;
    el.resExtra.textContent = formatMoney(extra);
    el.resTotal.textContent = formatMoney(ownCash);
  }

  // Event Listeners
  function initEvents() {
    // Region Pills
    el.regionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        el.regionButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filters.regionGroup = btn.getAttribute('data-region');
        renderCards();
      });
    });

    // Selects
    el.selectPrice.addEventListener('change', e => {
      state.filters.priceRange = e.target.value;
      renderCards();
    });

    el.selectDiscount.addEventListener('change', e => {
      state.filters.discount = e.target.value;
      renderCards();
    });

    el.selectSort.addEventListener('change', e => {
      state.filters.sort = e.target.value;
      renderCards();
    });

    // Checks
    el.chkSafe.addEventListener('change', e => {
      state.filters.safeOnly = e.target.checked;
      renderCards();
    });

    el.chkBookmark.addEventListener('change', e => {
      state.filters.bookmarkedOnly = e.target.checked;
      renderCards();
    });

    // Search
    let timer = null;
    el.inputSearch.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        state.filters.search = e.target.value.trim();
        renderCards();
      }, 150);
    });

    // Grid Click Delegation
    el.auctionGrid.addEventListener('click', e => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');

      if (action === 'fav') toggleFav(id);
      else if (action === 'calc') openCalculator(id);
    });

    // Modal
    el.modalClose.addEventListener('click', closeCalculator);
    el.modalOverlay.addEventListener('click', e => {
      if (e.target === el.modalOverlay) closeCalculator();
    });
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape' && el.modalOverlay.classList.contains('active')) closeCalculator();
    });

    el.calcInput.addEventListener('input', updateCalcMath);
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    loadData();
  });
})();
