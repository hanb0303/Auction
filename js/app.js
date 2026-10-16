/**
 * Seoul & Gyeonggi Auction Radar - Apple & Toss Design System Engine
 */

(function () {
  'use strict';

  // Fallback Data for offline or direct file:// opening
  const FALLBACK_DATA = {
    updated_at: "2026-10-15",
    stats: { total: 13, new_count: 4, discounted_count: 9, imminent_count: 5 },
    items: [
      {
        id: "2025ta104921",
        case_no: "2025타경104921",
        court: "서울동부지법",
        complex_name: "송파 헬리오시티",
        region_group: "서울",
        district: "송파구",
        area_m2: 84.98,
        area_pyeong: 25.7,
        floor_info: "15층 / 25층",
        appraisal_price: 2150000000,
        minimum_price: 1720000000,
        discount_rate: 20,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-22",
        d_day: 7,
        bid_deposit: 172000000,
        is_safe: true,
        rights_badge: "인수권리 없음 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=헬리오시티",
        hogang_url: "https://hogangnono.com/search?q=송파헬리오시티"
      },
      {
        id: "2025ta102144",
        case_no: "2025타경102144",
        court: "서울서부지법",
        complex_name: "마포래미안푸르지오",
        region_group: "서울",
        district: "마포구",
        area_m2: 59.96,
        area_pyeong: 18.1,
        floor_info: "8층 / 20층",
        appraisal_price: 1480000000,
        minimum_price: 1184000000,
        discount_rate: 20,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-20",
        d_day: 5,
        bid_deposit: 118400000,
        is_safe: true,
        rights_badge: "전액 배당 예상 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=마포래미안푸르지오",
        hogang_url: "https://hogangnono.com/search?q=마포래미안푸르지오"
      },
      {
        id: "2025ta54318",
        case_no: "2025타경54318",
        court: "수원지법 성남지원",
        complex_name: "분당 시범한양",
        region_group: "성남",
        district: "성남시 분당구",
        area_m2: 84.89,
        area_pyeong: 25.7,
        floor_info: "8층 / 15층",
        appraisal_price: 1450000000,
        minimum_price: 1015000000,
        discount_rate: 30,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-26",
        d_day: 11,
        bid_deposit: 101500000,
        is_safe: true,
        rights_badge: "인수권리 없음 • 선도지구 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=시범한양",
        hogang_url: "https://hogangnono.com/search?q=서현동시범한양"
      },
      {
        id: "2025ta52109",
        case_no: "2025타경52109",
        court: "수원지법 안산지원",
        complex_name: "철산래미안자이",
        region_group: "광명",
        district: "광명시",
        area_m2: 84.97,
        area_pyeong: 25.7,
        floor_info: "11층 / 28층",
        appraisal_price: 1080000000,
        minimum_price: 756000000,
        discount_rate: 30,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-23",
        d_day: 8,
        bid_deposit: 75600000,
        is_safe: true,
        rights_badge: "1순위 근저당 소멸 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=철산래미안자이",
        hogang_url: "https://hogangnono.com/search?q=철산래미안자이"
      },
      {
        id: "2025ta57291",
        case_no: "2025타경57291",
        court: "수원지법 본원",
        complex_name: "광교자연앤힐스테이트",
        region_group: "수원",
        district: "수원시 영통구",
        area_m2: 84.94,
        area_pyeong: 25.7,
        floor_info: "18층 / 30층",
        appraisal_price: 1380000000,
        minimum_price: 966000000,
        discount_rate: 30,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-20",
        d_day: 5,
        bid_deposit: 96600000,
        is_safe: true,
        rights_badge: "광교중앙역 역세권 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=광교자연앤힐스테이트",
        hogang_url: "https://hogangnono.com/search?q=광교자연앤힐스테이트"
      },
      {
        id: "2025ta51829",
        case_no: "2025타경51829",
        court: "수원지법 안양지원",
        complex_name: "평촌 목련마을 두산",
        region_group: "안양",
        district: "안양시 동안구",
        area_m2: 58.71,
        area_pyeong: 17.8,
        floor_info: "12층 / 15층",
        appraisal_price: 890000000,
        minimum_price: 890000000,
        discount_rate: 0,
        auction_round: "1회차 (신건)",
        auction_date: "2026-10-31",
        d_day: 16,
        bid_deposit: 89000000,
        is_safe: true,
        rights_badge: "범계역 초역세권 신건",
        naver_url: "https://new.land.naver.com/complexes?searchWord=목련두산",
        hogang_url: "https://hogangnono.com/search?q=평촌목련두산"
      },
      {
        id: "2025ta53904",
        case_no: "2025타경53904",
        court: "수원지법 본원",
        complex_name: "e편한세상수지",
        region_group: "용인",
        district: "용인시 수지구",
        area_m2: 84.99,
        area_pyeong: 25.7,
        floor_info: "22층 / 39층",
        appraisal_price: 1150000000,
        minimum_price: 805000000,
        discount_rate: 30,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-24",
        d_day: 9,
        bid_deposit: 80500000,
        is_safe: true,
        rights_badge: "성복역 연결 역세권 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=e편한세상수지",
        hogang_url: "https://hogangnono.com/search?q=e편한세상수지"
      },
      {
        id: "2025ta109201",
        case_no: "2025타경109201",
        court: "서울중앙지법",
        complex_name: "래미안대치팰리스",
        region_group: "서울",
        district: "강남구",
        area_m2: 84.97,
        area_pyeong: 25.7,
        floor_info: "18층 / 35층",
        appraisal_price: 3400000000,
        minimum_price: 2720000000,
        discount_rate: 20,
        auction_round: "2회차 (1회 유찰)",
        auction_date: "2026-10-19",
        d_day: 4,
        bid_deposit: 272000000,
        is_safe: true,
        rights_badge: "1순위 근저당 소멸 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=래미안대치팰리스",
        hogang_url: "https://hogangnono.com/search?q=래미안대치팰리스"
      },
      {
        id: "2025ta108390",
        case_no: "2025타경108390",
        court: "서울북부지법",
        complex_name: "상계주공7단지",
        region_group: "서울",
        district: "노원구",
        area_m2: 45.9,
        area_pyeong: 13.9,
        floor_info: "4층 / 15층",
        appraisal_price: 580000000,
        minimum_price: 371200000,
        discount_rate: 36,
        auction_round: "3회차 (2회 유찰)",
        auction_date: "2026-10-28",
        d_day: 13,
        bid_deposit: 37120000,
        is_safe: true,
        rights_badge: "소유자 점유 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=상계주공7단지",
        hogang_url: "https://hogangnono.com/search?q=상계주공7단지"
      },
      {
        id: "2025ta105812",
        case_no: "2025타경105812",
        court: "서울남부지법",
        complex_name: "목동신시가지7단지",
        region_group: "서울",
        district: "양천구",
        area_m2: 66.6,
        area_pyeong: 20.1,
        floor_info: "7층 / 15층",
        appraisal_price: 1820000000,
        minimum_price: 1820000000,
        discount_rate: 0,
        auction_round: "1회차 (신건)",
        auction_date: "2026-10-29",
        d_day: 14,
        bid_deposit: 182000000,
        is_safe: true,
        rights_badge: "대지권 유효 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=목동신시가지7단지",
        hogang_url: "https://hogangnono.com/search?q=목동신시가지7단지"
      },
      {
        id: "2025ta107718",
        case_no: "2025타경107718",
        court: "서울서부지법",
        complex_name: "DMC파크뷰자이",
        region_group: "서울",
        district: "서대문구",
        area_m2: 84.95,
        area_pyeong: 25.7,
        floor_info: "9층 / 28층",
        appraisal_price: 1250000000,
        minimum_price: 800000000,
        discount_rate: 36,
        auction_round: "3회차 (2회 유찰)",
        auction_date: "2026-10-21",
        d_day: 6,
        bid_deposit: 80000000,
        is_safe: true,
        rights_badge: "후순위 압류 전액소멸 (안전)",
        naver_url: "https://new.land.naver.com/complexes?searchWord=DMC파크뷰자이",
        hogang_url: "https://hogangnono.com/search?q=DMC파크뷰자이"
      },
      {
        id: "2025ta103322",
        case_no: "2025타경103322",
        court: "서울동부지법",
        complex_name: "강동헤리티지자이",
        region_group: "서울",
        district: "강동구",
        area_m2: 59.98,
        area_pyeong: 18.1,
        floor_info: "11층 / 25층",
        appraisal_price: 1050000000,
        minimum_price: 1050000000,
        discount_rate: 0,
        auction_round: "1회차 (신건)",
        auction_date: "2026-11-03",
        d_day: 19,
        bid_deposit: 105000000,
        is_safe: true,
        rights_badge: "신축 첫 경매",
        naver_url: "https://new.land.naver.com/complexes?searchWord=강동헤리티지자이",
        hogang_url: "https://hogangnono.com/search?q=강동헤리티지자이"
      },
      {
        id: "2025ta101150",
        case_no: "2025타경101150",
        court: "서울남부지법",
        complex_name: "당산삼성래미안",
        region_group: "서울",
        district: "영등포구",
        area_m2: 84.92,
        area_pyeong: 25.7,
        floor_info: "14층 / 25층",
        appraisal_price: 1390000000,
        minimum_price: 1390000000,
        discount_rate: 0,
        auction_round: "1회차 (신건)",
        auction_date: "2026-10-27",
        d_day: 12,
        bid_deposit: 139000000,
        is_safe: true,
        rights_badge: "초역세권 신건",
        naver_url: "https://new.land.naver.com/complexes?searchWord=당산삼성래미안",
        hogang_url: "https://hogangnono.com/search?q=당산삼성래미안"
      }
    ]
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
      const res = await fetch('data/auction_data.json');
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
    el.headerMeta.textContent = `서울 · 경기 핵심지 자동 업데이트 (26.10.15 기준)`;
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

  // Render Card HTML (Clean & Informative)
  function renderCard(item) {
    const isBookmarked = state.bookmarks.has(item.id);
    const dDayClass = item.d_day <= 5 ? 'chip chip-dday imminent' : 'chip chip-dday';
    // 100% Guaranteed YY.MM.DD Format
    const dateLabel = formatDate(item);
    
    const discountChip = item.discount_rate > 0
      ? `<span class="chip chip-discount">-${item.discount_rate}%</span>`
      : `<span class="chip chip-new">신건</span>`;

    // B방식: 네이버 법원경매 사건번호 직링크 (세션 오류 없는 상세뷰)
    const auctionDetailUrl = `https://new.land.naver.com/auction?query=${encodeURIComponent(item.case_no)}`;
    const naverLink = item.naver_url || item.naver_search_url || '#';
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
