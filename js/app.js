/**
 * Seoul & Gyeonggi Auction Radar - Apple & Toss Design System Engine
 */

(function () {
  'use strict';

  // Minimal empty fallback when data fetch fails
  const FALLBACK_DATA = { updated_at: '', stats: {}, items: [] };

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

  // 단지별 세대수 매핑
  const COMPLEX_HOUSEHOLDS_MAP = {
    "위례센트럴푸르지오":  "687세대",
    "성원초원아파트":  "281세대",
    "한라타운아파트":  "73세대",
    "스카이써밋아파트":  "10세대",
    "건영아파트":  "783세대",
    "관악푸르지오":  "2,104세대",
    "메르디안하우스":  "16세대",
    "래미안포레":  "1,070세대",
    "관악산휴먼시아":  "2,810세대",
    "도곡삼성아파트":  "237세대",
    "프라이어팰리스":  "1,622세대",
    "강동리버스트4단지":  "1,239세대",
    "현대아파트":  "280세대",
    "성수현대그린아파트":  "242세대",
    "장미아파트":  "387세대",
    "염창동아아파트":  "212세대",
    "힐탑이루미아파트":  "84세대",
    "우리유앤미아파트":  "216세대",
    "그랜드아이파크":  "120세대",
    "목동트라팰리스 이스턴에비뉴":  "258세대",
    "버들치마을 성복자이2차":  "719세대",
    "서수원레이크푸르지오2단지":  "797세대",
    "공세성원상떼레이크뷰":  "345세대",
    "버들치마을성복자이1차":  "719세대",
    "버들치마을성복힐스테이트3차":  "823세대",
    "서수원엠코타운르본느":  "204세대",
    "동수원2차쌍용스윗닷홈":  "274세대",
    "인계한양수자인":  "279세대",
    "금오베스트샵아파트":  "27세대",
    "주공뜨란채":  "1,093세대",
    "제나시티":  "20세대",
    "호계e편한세상":  "1,752세대",
    "두산위브더아티움":  "558세대",
    "관악아파트":  "1,800세대",
    "초원아파트":  "1,743세대",
    "동신벨로스":  "77세대",
    "래미안안양메가트리아":  "4,250세대",
    "월계로즈빌":  "28세대",
    "두산위브트레지움아파트":  "1,370세대",
    "철산래미안자이":  "2,072세대"
};
  // 서울 5대 생활권 자치구 매핑
  const SEOUL_ZONES = {
    SE: ['강남구', '서초구', '송파구', '강동구'],
    CENTER: ['마포구', '용산구', '성동구', '광진구', '종로구', '중구'],
    SW: ['양천구', '영등포구', '동작구', '강서구', '관악구', '구로구', '금천구'],
    NE: ['노원구', '도봉구', '강북구', '성북구', '동대문구', '중랑구'],
    NW: ['은평구', '서대문구']
  };

  function isSeoulItem(item) {
    return item.region_group === '서울' || (item.court && item.court.includes('서울')) || (item.address && item.address.includes('서울'));
  }

  function matchSeoulZone(item, zoneKey) {
    if (!zoneKey || zoneKey === 'ALL') return true;
    const guList = SEOUL_ZONES[zoneKey] || [];
    const targetText = `${item.district || ''} ${item.address || ''}`;
    return guList.some(gu => targetText.includes(gu));
  }

  const PRICE_SLIDER_MAX = 3000000000;
  const PRICE_SLIDER_STEP = 50000000;

  function loadSavedBookmarks() {
    try {
      const raw = localStorage.getItem('sar_bookmarks');
      if (!raw) return new Set();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.filter(v => typeof v === 'string' && v.length > 0));
      }
    } catch (_) {}
    return new Set();
  }

  function loadSavedSnapshots() {
    try {
      const raw = localStorage.getItem('sar_bookmark_snapshots');
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch (_) {}
    return {};
  }

  // State
  let state = {
    activeTab: 'active',
    items: [],
    historyItems: [],
    historyLoaded: false,
    historyLoading: false,
    historyLoadError: false,
    loadError: false,
    stats: {},
    updatedAt: '',
    bookmarks: loadSavedBookmarks(),
    snapshots: loadSavedSnapshots(),
    filters: {
      regionGroup: 'ALL',
      seoulZone: 'ALL',
      minHouseholds: 'ALL',
      minPrice: 0,
      maxPrice: PRICE_SLIDER_MAX,
      discount: 'ALL',
      imminentOnly: false,
      safeOnly: false,
      bookmarkedOnly: false,
      resultStatus: 'ALL',
      resultsSort: 'result_date_desc',
      sort: 'dday_asc',
      search: ''
    },
    activeCalcItem: null,
    calcLtv: 70,
    calcHouseCount: 1
  };

  let historyLoadPromise = null;

  // DOM Elements
  const el = {
    headerMeta: document.getElementById('header-meta'),
    mainTabs: document.querySelectorAll('.main-tab'),
    tabCountActive: document.getElementById('tab-count-active'),
    tabCountResults: document.getElementById('tab-count-results'),
    summaryBar: document.querySelector('.summary-bar:not(.results-summary-bar)'),
    summaryItems: document.querySelectorAll('.summary-bar:not(.results-summary-bar) .summary-item'),
    resultsSummaryBar: document.getElementById('results-summary-bar'),
    resultsSummaryItems: document.querySelectorAll('#results-summary-bar .summary-item'),
    statTotal: document.getElementById('stat-total'),
    statDiscount: document.getElementById('stat-discount'),
    statNew: document.getElementById('stat-new'),
    statImminent: document.getElementById('stat-imminent'),
    statResAll: document.getElementById('stat-res-all'),
    statResSold: document.getElementById('stat-res-sold'),
    statResFail: document.getElementById('stat-res-fail'),
    statResChange: document.getElementById('stat-res-change'),
    statResOther: document.getElementById('stat-res-other'),
    regionButtons: document.querySelectorAll('.pill-btn[data-region]'),
    seoulSubWrapper: document.getElementById('seoul-sub-wrapper'),
    seoulZoneButtons: document.querySelectorAll('.sub-pill-btn[data-seoul-zone]'),
    selectHouseholds: document.getElementById('select-households'),
    btnPricePopover: document.getElementById('btn-price-popover'),
    pricePopoverWrapper: document.getElementById('price-popover-wrapper'),
    pricePopoverMenu: document.getElementById('price-popover-menu'),
    priceBtnLabel: document.getElementById('price-btn-label'),
    btnPriceApply: document.getElementById('btn-price-apply'),
    popoverBackdrop: document.getElementById('popover-backdrop'),
    priceSliderWrap: document.getElementById('price-slider-wrap'),
    thumbPriceMin: document.getElementById('thumb-price-min'),
    thumbPriceMax: document.getElementById('thumb-price-max'),
    presetChips: document.querySelectorAll('.preset-chip'),
    priceSliderFill: document.getElementById('price-slider-fill'),
    priceRangeLabel: document.getElementById('price-range-label'),
    btnPriceReset: document.getElementById('btn-price-reset'),
    selectDiscount: document.getElementById('select-discount'),
    selectSort: document.getElementById('select-sort'),
    chkSafe: document.getElementById('chk-safe'),
    chkSafeWrap: document.getElementById('chk-safe-wrap'),
    chkBookmark: document.getElementById('chk-bookmark'),
    chkBookmarkWrap: document.getElementById('chk-bookmark') ? document.getElementById('chk-bookmark').closest('.check-label') : null,
    inputSearch: document.getElementById('input-search'),
    btnSearchClear: document.getElementById('btn-search-clear'),
    resultCount: document.getElementById('result-count'),
    auctionGrid: document.getElementById('auction-grid'),
    modalOverlay: document.getElementById('modal-overlay'),
    modalTitle: document.getElementById('modal-complex-title'),
    modalCaseNo: document.getElementById('modal-case-no'),
    modalClose: document.getElementById('modal-close'),
    calcInput: document.getElementById('calc-input-price'),
    calcMarketInput: document.getElementById('calc-input-market'),
    calcAssumedInput: document.getElementById('calc-input-assumed'),
    calcBidKorean: document.getElementById('calc-bid-korean'),
    calcMarketKorean: document.getElementById('calc-market-korean'),
    calcAssumedKorean: document.getElementById('calc-assumed-korean'),
    calcStepChips: document.querySelectorAll('[data-bid-step]'),
    calcLtvButtons: document.querySelectorAll('#calc-ltv-group [data-ltv]'),
    calcHouseButtons: document.querySelectorAll('#calc-house-group [data-houses]'),
    resDeposit: document.getElementById('res-deposit'),
    resBalance: document.getElementById('res-balance'),
    resLoanLabel: document.getElementById('res-loan-label'),
    resLoan: document.getElementById('res-loan'),
    resTaxLabel: document.getElementById('res-tax-label'),
    resTax: document.getElementById('res-tax'),
    resExtra: document.getElementById('res-extra'),
    resAssumedRow: document.getElementById('res-assumed-row'),
    resAssumed: document.getElementById('res-assumed'),
    resMargin: document.getElementById('res-margin'),
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
    if (!item || typeof item !== 'object') return '--.--.--';
    if (item.auction_date && typeof item.auction_date === 'string') {
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
    const dDay = Number(item.d_day);
    base.setDate(base.getDate() + (Number.isFinite(dDay) ? dDay : 0));
    const yy = String(base.getFullYear()).slice(-2);
    const mm = String(base.getMonth() + 1).padStart(2, '0');
    const dd = String(base.getDate()).padStart(2, '0');
    return `${yy}.${mm}.${dd}`;
  }

  // Toast
  let toastTimer = null;
  function toast(msg) {
    if (!el.toast) return;
    clearTimeout(toastTimer);
    el.toast.textContent = msg;
    el.toast.classList.add('show');
    toastTimer = setTimeout(() => {
      if (el.toast) el.toast.classList.remove('show');
    }, 1800);
  }

  // Bookmark Helpers (Legacy ID migration + snapshot persistence)
  function saveBookmarks() {
    try {
      localStorage.setItem('sar_bookmarks', JSON.stringify(Array.from(state.bookmarks)));
      localStorage.setItem('sar_bookmark_snapshots', JSON.stringify(state.snapshots));
    } catch (_) {}
  }

  function isItemBookmarked(item) {
    if (!item) return false;
    return (
      state.bookmarks.has(item.id) ||
      (item.case_no && state.bookmarks.has(item.case_no)) ||
      (item.legacy_id && state.bookmarks.has(item.legacy_id))
    );
  }

  function migrateAndSyncBookmarks() {
    const allKnown = [...state.items, ...state.historyItems];
    let changed = false;
    for (const savedId of Array.from(state.bookmarks)) {
      const exact = allKnown.find(i => i && i.id === savedId);
      if (exact) {
        state.snapshots[exact.id] = { ...exact };
        changed = true;
        continue;
      }
      // Migrate legacy ID (e.g. "2023타경113343" -> "B0002102023타경1133431")
      const matches = allKnown.filter(i => i && (i.case_no === savedId || i.legacy_id === savedId || (i.id && i.id.includes(savedId))));
      if (matches.length > 0) {
        state.bookmarks.delete(savedId);
        matches.forEach(m => {
          state.bookmarks.add(m.id);
          state.snapshots[m.id] = { ...m };
        });
        changed = true;
      }
    }
    if (changed) saveBookmarks();
  }

  function getResultsDataset() {
    const merged = [...state.historyItems];
    const knownKeys = new Set([
      ...state.items.map(i => `${i.court}|${i.case_no}`),
      ...state.historyItems.map(i => `${i.court}|${i.case_no}`)
    ]);
    // Include any bookmarked snapshots that vanished before history tracking
    for (const id of state.bookmarks) {
      const snap = state.snapshots[id];
      if (snap && !knownKeys.has(`${snap.court}|${snap.case_no}`)) {
        merged.push({ ...snap, status_label: snap.status_label || '목록 종료' });
      }
    }
    return merged;
  }

  async function fetchJsonWithTimeout(url, timeoutMs = 10000) {
    const controller = new AbortController();
    const timerId = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { cache: 'no-cache', signal: controller.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } finally {
      clearTimeout(timerId);
    }
  }

  function getResultCategory(item) {
    const st = (item && item.status_label) || '';
    if (st.includes('매각')) return 'sold';
    if (st.includes('유찰')) return 'fail';
    if (st.includes('기일변경') || st.includes('변경')) return 'change';
    return 'other';
  }

  function isSoldResultItem(item) {
    if (!item) return false;
    const winPrice = Number(item.winning_price) || 0;
    return (item.status_label || '').includes('매각') && winPrice > 0;
  }

  function formatShortDate(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[0].slice(-2)}.${parts[1].padStart(2, '0')}.${parts[2].padStart(2, '0')}`;
    }
    return dateStr;
  }

  function updateResultsSummaryCounts() {
    const list = getResultsDataset();
    const counts = { ALL: list.length, sold: 0, fail: 0, change: 0, other: 0 };
    for (const it of list) {
      const cat = getResultCategory(it);
      if (counts[cat] !== undefined) counts[cat] += 1;
    }
    if (el.statResAll) el.statResAll.textContent = state.historyLoaded || list.length > 0 ? counts.ALL : '-';
    if (el.statResSold) el.statResSold.textContent = state.historyLoaded || list.length > 0 ? counts.sold : '-';
    if (el.statResFail) el.statResFail.textContent = state.historyLoaded || list.length > 0 ? counts.fail : '-';
    if (el.statResChange) el.statResChange.textContent = state.historyLoaded || list.length > 0 ? counts.change : '-';
    if (el.statResOther) el.statResOther.textContent = state.historyLoaded || list.length > 0 ? counts.other : '-';
  }

  async function ensureHistoryLoaded() {
    if (state.historyLoaded) return;
    if (historyLoadPromise) return historyLoadPromise;

    state.historyLoading = true;
    state.historyLoadError = false;
    if (state.activeTab === 'results') renderCards();

    historyLoadPromise = (async () => {
      try {
        const hData = await fetchJsonWithTimeout('data/auction_history.json', 10000);
        state.historyItems = Array.isArray(hData && hData.items) ? hData.items : [];
        state.historyLoaded = true;
        state.historyLoadError = false;
        migrateAndSyncBookmarks();
        if (el.tabCountResults) el.tabCountResults.textContent = getResultsDataset().length;
        updateResultsSummaryCounts();
        updateSeoulZoneCounts();
      } catch (_) {
        state.historyLoadError = true;
      } finally {
        state.historyLoading = false;
        historyLoadPromise = null;
        if (state.activeTab === 'results') renderCards();
      }
    })();

    return historyLoadPromise;
  }

  // Load Data
  async function loadData() {
    state.loadError = false;
    const historyPromise = state.bookmarks.size > 0 ? ensureHistoryLoaded() : Promise.resolve();

    try {
      const data = await fetchJsonWithTimeout('data/auction_data.json', 10000);
      state.items = Array.isArray(data && data.items) ? data.items : [];
      state.stats = (data && data.stats && typeof data.stats === 'object') ? data.stats : {};
      state.updatedAt = (data && typeof data.updated_at === 'string') ? data.updated_at : '';
    } catch (e) {
      state.items = FALLBACK_DATA.items;
      state.stats = FALLBACK_DATA.stats;
      state.updatedAt = FALLBACK_DATA.updated_at;
      state.loadError = true;
    }

    await historyPromise;
    migrateAndSyncBookmarks();
    renderHeader();
    renderCards();
  }

  // Update live counts on Seoul 5-zone sub-buttons (preserves .zone-sub label)
  function updateSeoulZoneCounts() {
    if (!el.seoulZoneButtons) return;
    const sourceItems = state.activeTab === 'results' ? getResultsDataset() : state.items;
    const seoulItems = sourceItems.filter(isSeoulItem);
    const zoneCounts = { ALL: seoulItems.length, SE: 0, CENTER: 0, SW: 0, NE: 0, NW: 0 };
    const zoneKeys = ['SE', 'CENTER', 'SW', 'NE', 'NW'];
    for (const it of seoulItems) {
      for (const zk of zoneKeys) {
        if (matchSeoulZone(it, zk)) zoneCounts[zk] += 1;
      }
    }
    el.seoulZoneButtons.forEach(btn => {
      const zk = btn.getAttribute('data-seoul-zone');
      const cnt = zoneCounts[zk] || 0;
      let countSpan = btn.querySelector('.zone-count');
      if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'zone-count';
        btn.appendChild(document.createTextNode(' '));
        btn.appendChild(countSpan);
      }
      countSpan.textContent = cnt;
    });
  }

  // Render Header & Stats
  function renderHeader() {
    let dateLabel = '-';
    if (state.updatedAt && state.updatedAt.includes('-')) {
      const p = state.updatedAt.split('-');
      if (p.length === 3) {
        dateLabel = `${p[0].slice(-2)}.${p[1].padStart(2, '0')}.${p[2].padStart(2, '0')}`;
      }
    }
    if (el.headerMeta) {
      el.headerMeta.textContent = state.loadError
        ? '데이터를 불러오지 못했습니다'
        : `서울 · 경기 핵심지 자동 업데이트 (${dateLabel} 기준)`;
    }
    const disc20Count = state.items.length > 0
      ? state.items.filter(i => (Number(i.discount_rate) || 0) >= 20).length
      : (state.stats.discounted_count || 0);
    if (el.statTotal) el.statTotal.textContent = `${state.stats.total || state.items.length}`;
    if (el.statDiscount) el.statDiscount.textContent = `${disc20Count}`;
    if (el.statNew) el.statNew.textContent = `${state.stats.new_count || 0}`;
    if (el.statImminent) el.statImminent.textContent = `${state.stats.imminent_count || 0}`;
    if (el.tabCountActive) el.tabCountActive.textContent = state.items.length;
    if (el.tabCountResults) el.tabCountResults.textContent = state.historyLoaded ? getResultsDataset().length : '-';
    updateResultsSummaryCounts();
    updateSeoulZoneCounts();
  }

  // Parse numeric household count (e.g. "1,608세대" -> 1608)
  function getHouseholdCountNum(item) {
    const hhStr = getHouseholds(item);
    if (!hhStr) return 0;
    const digits = hhStr.replace(/[^\d]/g, '');
    return parseInt(digits, 10) || 0;
  }

  function escapeHtml(val) {
    if (val === null || val === undefined) return '';
    return String(val)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeHttpUrl(url, fallback = '#') {
    if (!url || typeof url !== 'string') return fallback;
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) return fallback;
    try {
      const parsed = new URL(trimmed);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
    } catch (_) {}
    return fallback;
  }

  // Filter Items
  function getFilteredItems() {
    const isResultsTab = state.activeTab === 'results';
    const sourceItems = isResultsTab ? getResultsDataset() : state.items;
    return sourceItems.filter(item => {
      if (!item || typeof item !== 'object') return false;
      // Region Filter
      if (state.filters.regionGroup !== 'ALL') {
        if (state.filters.regionGroup === '서울') {
          if (!isSeoulItem(item)) return false;
          if (!matchSeoulZone(item, state.filters.seoulZone)) return false;
        } else if (item.region_group !== state.filters.regionGroup) {
          return false;
        }
      }

      // Households Filter (300 / 500 / 1000세대 이상)
      if (state.filters.minHouseholds !== 'ALL') {
        const minHh = parseInt(state.filters.minHouseholds, 10) || 0;
        if (getHouseholdCountNum(item) < minHh) return false;
      }

      // Price Range Slider Filter (5천만원 단위, max = 30억+ 무제한)
      const p = Number(item.minimum_price) || 0;
      if (state.filters.minPrice > 0 && p < state.filters.minPrice) return false;
      if (state.filters.maxPrice < PRICE_SLIDER_MAX && p > state.filters.maxPrice) return false;

      // Discount & Imminent Filters (active tab only)
      if (state.activeTab === 'active') {
        const disc = Number(item.discount_rate) || 0;
        const dDay = Number(item.d_day);
        if (state.filters.discount === 'new' && disc !== 0) return false;
        if (state.filters.discount === 'disc20' && disc < 20) return false;
        if (state.filters.discount === 'disc36' && disc < 36) return false;
        if (state.filters.imminentOnly && (!Number.isFinite(dDay) || dDay < 0 || dDay > 7)) return false;
      }

      // Results status filter (results tab only)
      if (isResultsTab && state.filters.resultStatus !== 'ALL') {
        if (getResultCategory(item) !== state.filters.resultStatus) return false;
      }

      // Safe rights only (active tab only)
      if (!isResultsTab && state.filters.safeOnly && !item.is_safe) return false;

      // Bookmarked only
      if (state.filters.bookmarkedOnly && !isItemBookmarked(item)) return false;

      // Keyword Search
      if (state.filters.search) {
        const query = state.filters.search.toLowerCase();
        const text = `${item.complex_name || ''} ${item.district || ''} ${item.case_no || ''} ${item.court || ''}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    }).sort((a, b) => {
      if (state.activeTab === 'results') {
        const rSort = state.filters.resultsSort || 'result_date_desc';
        const winA = isSoldResultItem(a) ? (Number(a.winning_price) || 0) : 0;
        const winB = isSoldResultItem(b) ? (Number(b.winning_price) || 0) : 0;
        if (rSort === 'winning_price_desc') {
          if (winB !== winA) return winB - winA;
        } else if (rSort === 'win_ratio_desc') {
          const appA = Number(a.appraisal_price) || 0;
          const appB = Number(b.appraisal_price) || 0;
          const ratioA = winA > 0 && appA > 0 ? winA / appA : 0;
          const ratioB = winB > 0 && appB > 0 ? winB / appB : 0;
          if (ratioB !== ratioA) return ratioB - ratioA;
        }
        const dCmp = (b.auction_date || '').localeCompare(a.auction_date || '');
        if (dCmp !== 0) return dCmp;
        return winB - winA;
      }
      if (state.filters.sort === 'created_desc') {
        // 오늘 신규 유입(is_today_new) 1순위 -> 최신 등록일 -> 사건번호 순
        const newA = Boolean(a.is_today_new || (state.updatedAt && a.first_seen === state.updatedAt));
        const newB = Boolean(b.is_today_new || (state.updatedAt && b.first_seen === state.updatedAt));
        if (newA !== newB) return (newB ? 1 : 0) - (newA ? 1 : 0);
        const dateA = a.first_seen || '';
        const dateB = b.first_seen || '';
        if (dateA !== dateB) return dateB.localeCompare(dateA);
        return (b.case_no || '').localeCompare(a.case_no || '');
      }
      if (state.filters.sort === 'dday_asc') return (Number(a.d_day) || 999) - (Number(b.d_day) || 999);
      if (state.filters.sort === 'discount_desc') return (Number(b.discount_rate) || 0) - (Number(a.discount_rate) || 0);
      if (state.filters.sort === 'min_price_asc') return (Number(a.minimum_price) || 0) - (Number(b.minimum_price) || 0);
      if (state.filters.sort === 'appraisal_desc') return (Number(b.appraisal_price) || 0) - (Number(a.appraisal_price) || 0);
      return 0;
    });
  }

  // Resolve exact Naver Real Estate complex URL for 호가 button
  function getNaverComplexUrl(item) {
    const raw = (item && (item.naver_url || item.naver_search_url)) || '';
    const safeRaw = safeHttpUrl(raw, '');
    if (safeRaw && /\/complexes\/\d+/.test(safeRaw)) {
      return safeRaw;
    }
    if (item && item.complex_name && NAVER_COMPLEX_ID_MAP[item.complex_name]) {
      return `https://new.land.naver.com/complexes/${NAVER_COMPLEX_ID_MAP[item.complex_name]}`;
    }
    const q = `${(item && item.district) || ''} ${(item && item.complex_name) || ''}`.trim();
    return `https://new.land.naver.com/search?sk=${encodeURIComponent(q)}`;
  }

  // Extract building & unit (동·호수) from item or address
  function getDongHo(item) {
    if (item && item.dong_ho) return item.dong_ho;
    const addr = ((item && item.address) || '').replace(/\([^)]*\)/g, '').trim();
    if (!addr) return '';
    const dongM = addr.match(/(?:^|\s)제?(\d+동|[가-힣A-Za-z]동)(?=\s+제?\d+층|\s*$)/);
    const hoM = addr.match(/제?(?:\d+층)?\s*제?([\d\-]+호|[가-힣A-Za-z]+-[\d]+호)/);
    const dong = dongM ? dongM[1] : '';
    const ho = hoM ? hoM[1] : '';
    if (dong && ho) return `${dong} ${ho}`;
    return dong || ho || '';
  }

  // Get total households (세대수) for complex
  function getHouseholds(item) {
    if (item && item.households) return item.households;
    if (item && item.complex_name && COMPLEX_HOUSEHOLDS_MAP[item.complex_name]) {
      return COMPLEX_HOUSEHOLDS_MAP[item.complex_name];
    }
    return '';
  }

  // Render Card HTML (Clean & Informative)
  function renderCard(item) {
    if (!item || typeof item !== 'object') return '';
    const isResult = state.activeTab === 'results' || Boolean(item.status_label);
    const st = item.status_label || '목록 종료';
    const winPrice = Number(item.winning_price) || 0;
    const minPrice = Number(item.minimum_price) || 0;
    const appPrice = Number(item.appraisal_price) || 0;
    const isSold = isResult && st.includes('매각') && winPrice > 0;
    const isClosed = isResult && (st.includes('종국') || st.includes('목록 종료'));

    const isTodayNew = !isResult && Boolean(item.is_today_new || (state.updatedAt && item.first_seen === state.updatedAt));
    const newBadge = isTodayNew ? '<span class="chip chip-badge-new">NEW</span>' : '';
    const isBookmarked = isItemBookmarked(item);
    const dDayVal = Number(item.d_day);
    const dDayClass = isResult
      ? (isClosed ? 'chip chip-result-closed' : 'chip chip-result-date')
      : (Number.isFinite(dDayVal) && dDayVal <= 5 ? 'chip chip-dday imminent' : 'chip chip-dday');
    // 100% Guaranteed YY.MM.DD Format + D-Day on active cards
    let dateLabel = formatDate(item);
    if (!isResult && Number.isFinite(dDayVal)) {
      const dDaySuffix = dDayVal === 0 ? 'D-day' : (dDayVal > 0 ? `D-${dDayVal}` : `D+${Math.abs(dDayVal)}`);
      dateLabel = `${dateLabel} · ${dDaySuffix}`;
    }

    let statusBadgeHtml = '';
    if (isResult) {
      let stClass = 'chip-result-change';
      if (isSold || st.includes('매각')) stClass = 'chip-result-sold';
      else if (st.includes('유찰')) stClass = 'chip-result-fail';
      else if (isClosed) stClass = 'chip-result-closed';
      statusBadgeHtml = `<span class="chip ${stClass}">${escapeHtml(st)}</span>`;
    } else {
      const disc = Number(item.discount_rate) || 0;
      statusBadgeHtml = disc > 0
        ? `<span class="chip chip-discount">-${escapeHtml(disc)}%</span>`
        : `<span class="chip chip-new">신건</span>`;
    }

    const caseNo = item.case_no || '';
    const complexName = item.complex_name || '';
    const court = item.court || '';
    const district = item.district || '';
    const areaM2 = item.area_m2 ?? '-';
    const areaPyeong = item.area_pyeong ?? '-';
    const floorInfo = item.floor_info || '-';
    const auctionRound = item.auction_round || '-';
    const itemId = item.id || '';

    // 단지명 클릭 시 사건번호+단지명 경매 상세 검색결과 연결
    const auctionDetailUrl = safeHttpUrl(
      `https://search.naver.com/search.naver?where=nexearch&query=${encodeURIComponent(caseNo + ' ' + complexName + ' 경매')}`
    );
    const naverLink = safeHttpUrl(getNaverComplexUrl(item));
    const hogangLink = safeHttpUrl(item.hogang_url || item.hogang_search_url || '#');

    const winRatio = isSold && appPrice > 0 ? Math.round((winPrice / appPrice) * 100) : 0;

    let rightsText = item.rights_badge || (item.is_safe ? '인수권리 없음 (안전)' : '권리확인 필요');
    if (isResult) {
      const ndLabel = formatShortDate(item.next_date);
      if (isSold) {
        rightsText = '매각 완료';
      } else if (st.includes('유찰')) {
        rightsText = ndLabel ? `유찰 · 차기 기일 ${ndLabel}` : '유찰 · 차기 기일 미정';
      } else if (st.includes('기일변경') || st.includes('변경')) {
        rightsText = ndLabel ? `기일변경 · 변경 기일 ${ndLabel}` : '기일변경 · 일정 확인 필요';
      } else if (isClosed) {
        rightsText = '종국 · 취하 또는 완결';
      } else if (item.result_detail) {
        rightsText = `진행 결과 · ${item.result_detail}`;
      } else {
        rightsText = st;
      }
    }

    const dongHo = getDongHo(item);
    const households = getHouseholds(item);

    const priceSectionClass = isResult ? (isSold ? 'price-section is-sold' : 'price-section is-unsold') : 'price-section';
    const priceLabel = isResult ? (isSold ? '낙찰가' : '당시 최저가') : '최저가';
    const priceValue = isSold ? formatMoney(winPrice) : formatMoney(minPrice);
    const winRatioPill = isSold && winRatio > 0 ? `<span class="win-ratio-pill">${escapeHtml(winRatio)}%</span>` : '';
    const rightSubText = isSold
      ? `최저가 ${formatMoney(minPrice)} · 감정가 대비 ${winRatio}%`
      : `보증금 ${formatMoney(item.bid_deposit)}`;

    const cardClass = `auction-card${isResult ? ' is-result' : ''}${isClosed ? ' is-closed' : ''}`;
    const primaryActionHtml = isResult
      ? `<a href="${escapeHtml(auctionDetailUrl)}" target="_blank" rel="noopener noreferrer" class="btn-primary">상세공고</a>`
      : `<button type="button" class="btn-primary" data-action="calc" data-id="${escapeHtml(itemId)}">계산기</button>`;
    const rightsNoteClass = !isResult && item.is_safe === false ? 'rights-note is-caution' : 'rights-note';
    const rightsNoteHtml = `<strong>${escapeHtml(rightsText)}</strong>`;

    return `
      <article class="${cardClass}" data-id="${escapeHtml(itemId)}">
        <div>
          <div class="card-top">
            <span class="meta-case"><span class="meta-case-no" data-action="copy-case" data-case="${escapeHtml(caseNo)}" title="클릭하여 사건번호 복사">${escapeHtml(caseNo)}</span> · ${escapeHtml(court)}</span>
            <div class="badge-row">
              ${newBadge}${statusBadgeHtml}
              <span class="${dDayClass}" title="매각기일">${escapeHtml(dateLabel)}</span>
            </div>
          </div>

          <div class="complex-header">
            <h3 class="complex-name">
              <a href="${escapeHtml(auctionDetailUrl)}" target="_blank" rel="noopener noreferrer" class="complex-name-link" title="법원 매물 상세공고 확인 (새 탭)">
                ${escapeHtml(complexName)}${dongHo ? ` <span class="complex-dong-ho">${escapeHtml(dongHo)}</span>` : ''}
              </a>
            </h3>
            <div class="complex-spec">
              <div class="complex-spec-line">${escapeHtml(district)}${auctionRound ? ` · ${escapeHtml(auctionRound)}` : ''}</div>
              <div class="complex-spec-line">${[households ? escapeHtml(households) : '', `전용 ${escapeHtml(areaM2)}㎡ (${escapeHtml(areaPyeong)}평)`, floorInfo ? escapeHtml(floorInfo) : ''].filter(Boolean).join(' · ')}</div>
            </div>
          </div>

          <div class="${priceSectionClass}">
            <div class="price-main-row">
              <span class="price-target-label">${escapeHtml(priceLabel)}</span>
              <span class="price-target-val">${escapeHtml(priceValue)}${winRatioPill}</span>
            </div>
            <div class="price-sub-row">
              <span>감정가 <span class="appraisal-val">${escapeHtml(formatMoney(appPrice))}</span></span>
              <span>${escapeHtml(rightSubText)}</span>
            </div>
          </div>

          <div class="${rightsNoteClass}">
            ${rightsNoteHtml}
          </div>
        </div>

        <div class="card-actions">
          <a href="${escapeHtml(naverLink)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">호가</a>
          <a href="${escapeHtml(hogangLink)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">실거래</a>
          ${primaryActionHtml}
          <button type="button" class="btn-fav ${isBookmarked ? 'active' : ''}" data-action="fav" data-id="${escapeHtml(itemId)}" aria-label="관심 매물 저장" aria-pressed="${isBookmarked ? 'true' : 'false'}">
            ★
          </button>
        </div>
      </article>
    `;
  }

  // Render All Cards
  function renderCards() {
    const list = getFilteredItems();
    if (el.resultCount) el.resultCount.textContent = list.length;
    if (!el.auctionGrid) return;

    if (state.loadError && state.activeTab === 'active' && state.items.length === 0) {
      el.auctionGrid.innerHTML = `<div class="empty-box">경매 데이터를 불러오지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도해 주세요.<div class="empty-actions"><button type="button" class="btn-secondary" data-action="retry-load">다시 시도</button></div></div>`;
      return;
    }

    if (state.activeTab === 'results' && state.historyLoading && !state.historyLoaded) {
      el.auctionGrid.innerHTML = `<div class="empty-box loading-box"><div class="loading-spinner" aria-hidden="true"></div><div>매물 결과를 불러오는 중입니다...</div></div>`;
      return;
    }

    if (state.activeTab === 'results' && state.historyLoadError && !state.historyLoaded && list.length === 0) {
      el.auctionGrid.innerHTML = `<div class="empty-box">매물 결과를 불러오지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도해 주세요.<div class="empty-actions"><button type="button" class="btn-secondary" data-action="retry-history">다시 시도</button></div></div>`;
      return;
    }

    if (list.length === 0) {
      el.auctionGrid.innerHTML = `<div class="empty-box">해당하는 경매 물건이 없습니다.<div class="empty-actions"><button type="button" class="btn-secondary" data-action="reset-filters">필터 초기화</button></div></div>`;
      return;
    }
    el.auctionGrid.innerHTML = list.map(renderCard).join('');
  }

  // Find item across active, history, and snapshots
  function findItemById(id) {
    return (
      state.items.find(i => i.id === id) ||
      state.historyItems.find(i => i.id === id) ||
      state.snapshots[id] ||
      null
    );
  }

  // Toggle Favorite
  function toggleFav(id) {
    const item = findItemById(id);
    if (state.bookmarks.has(id) || (item && isItemBookmarked(item))) {
      state.bookmarks.delete(id);
      delete state.snapshots[id];
      if (item) {
        if (item.case_no) state.bookmarks.delete(item.case_no);
        if (item.legacy_id) state.bookmarks.delete(item.legacy_id);
      }
      toast('관심 목록에서 해제되었습니다.');
    } else {
      state.bookmarks.add(id);
      if (item) state.snapshots[id] = { ...item };
      toast('★ 관심 목록에 저장되었습니다.');
    }
    saveBookmarks();
    if (el.tabCountResults) el.tabCountResults.textContent = getResultsDataset().length;
    updateResultsSummaryCounts();
    renderCards();
  }

  // Calculator
  function openCalculator(id) {
    const item = findItemById(id);
    if (!item || !el.modalOverlay) return;

    state.activeCalcItem = item;
    state.calcLtv = 70;
    state.calcHouseCount = 1;
    if (el.modalTitle) el.modalTitle.textContent = item.complex_name || '-';
    if (el.modalCaseNo) el.modalCaseNo.textContent = `${item.case_no || '-'} · 감정가 ${formatMoney(item.appraisal_price)}`;
    if (el.calcInput) el.calcInput.value = Number(item.minimum_price) || 0;
    if (el.calcMarketInput) el.calcMarketInput.value = Number(item.appraisal_price) || 0;
    if (el.calcAssumedInput) el.calcAssumedInput.value = 0;

    if (el.calcLtvButtons) {
      el.calcLtvButtons.forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.ltv) === state.calcLtv);
      });
    }
    if (el.calcHouseButtons) {
      el.calcHouseButtons.forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.houses) === state.calcHouseCount);
      });
    }
    updateCalcMath();

    el.modalOverlay.classList.add('active');
  }

  function closeCalculator() {
    if (el.modalOverlay) el.modalOverlay.classList.remove('active');
    state.activeCalcItem = null;
  }

  function formatKoreanUnitLabel(val) {
    if (!Number.isFinite(val) || val <= 0) return '0원';
    return `= ${formatMoney(val)}`;
  }

  function getAcquisitionTaxRate(bid, houseCount) {
    if (houseCount >= 3) return 0.12;
    if (houseCount === 2) return 0.08;
    // 1주택: 6억 이하 1.1%, 6~9억 비례세율 (1.1%~3.3%), 9억 이상 3.3%
    if (bid <= 600000000) return 0.011;
    if (bid >= 900000000) return 0.033;
    const basePct = (bid / 100000000) * (2 / 3) - 3;
    return (basePct * 1.1) / 100;
  }

  function updateCalcMath() {
    if (!state.activeCalcItem) return;
    const bid = Math.max(0, el.calcInput ? (parseInt(el.calcInput.value, 10) || 0) : 0);
    const market = Math.max(0, el.calcMarketInput ? (parseInt(el.calcMarketInput.value, 10) || 0) : 0);
    const assumed = Math.max(0, el.calcAssumedInput ? (parseInt(el.calcAssumedInput.value, 10) || 0) : 0);

    const item = state.activeCalcItem;
    const minPrice = Number(item.minimum_price) || 0;
    const appPrice = Number(item.appraisal_price) || 0;
    const ltv = Number(state.calcLtv) || 0;
    const houses = Number(state.calcHouseCount) || 1;

    if (el.calcBidKorean) el.calcBidKorean.textContent = formatKoreanUnitLabel(bid);
    if (el.calcMarketKorean) el.calcMarketKorean.textContent = formatKoreanUnitLabel(market);
    if (el.calcAssumedKorean) el.calcAssumedKorean.textContent = formatKoreanUnitLabel(assumed);

    const deposit = Math.round(minPrice * 0.1);
    const balance = Math.max(0, bid - deposit);
    const loan = Math.round(Math.min(bid, appPrice) * (ltv / 100));

    const taxRate = getAcquisitionTaxRate(bid, houses);
    const tax = Math.round(bid * taxRate);

    const extra = Math.round((Number(item.area_pyeong) || 25) * 80000 + 1000000); // 명도비 + 채권/법무
    const ownCash = deposit + Math.max(0, balance - loan) + tax + extra + assumed;
    const margin = market - bid;

    if (el.resDeposit) el.resDeposit.textContent = formatMoney(deposit);
    if (el.resBalance) el.resBalance.textContent = formatMoney(balance);
    if (el.resLoanLabel) el.resLoanLabel.textContent = `예상 대출 (LTV ${ltv}%)`;
    if (el.resLoan) el.resLoan.textContent = ltv > 0 ? `약 ${formatMoney(loan)}` : '0원';
    if (el.resTaxLabel) {
      el.resTaxLabel.textContent = houses >= 3
        ? '취득세 (3주택+ 12%)'
        : (houses === 2 ? '취득세 (2주택 8%)' : '취득세 (1주택 기준)');
    }
    if (el.resTax) el.resTax.textContent = `${formatMoney(tax)} (${(taxRate * 100).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1')}%)`;
    if (el.resExtra) el.resExtra.textContent = formatMoney(extra);
    if (el.resAssumedRow) el.resAssumedRow.style.display = assumed > 0 ? 'flex' : 'none';
    if (el.resAssumed) el.resAssumed.textContent = formatMoney(assumed);
    if (el.resMargin) {
      if (market <= 0) {
        el.resMargin.textContent = '-';
        el.resMargin.style.color = '';
      } else {
        const marginPct = Math.round((margin / market) * 100);
        const absStr = formatMoney(Math.abs(margin));
        el.resMargin.textContent = margin >= 0
          ? `+${absStr} (${marginPct}%)`
          : `-${absStr} (${marginPct}%)`;
        el.resMargin.style.color = margin >= 0 ? 'var(--toss-blue)' : 'var(--toss-red)';
      }
    }
    if (el.resTotal) el.resTotal.textContent = formatMoney(ownCash);
  }

  // Event Listeners
  function initEvents() {
    const ACTIVE_SORT_OPTIONS = [
      { value: 'dday_asc', label: '마감 빠른순' },
      { value: 'created_desc', label: '신규 등록순' },
      { value: 'discount_desc', label: '할인율 높은순' },
      { value: 'min_price_asc', label: '가격 낮은순' },
      { value: 'appraisal_desc', label: '감정가 높은순' }
    ];
    const RESULTS_SORT_OPTIONS = [
      { value: 'result_date_desc', label: '최근 결과순' },
      { value: 'winning_price_desc', label: '낙찰가 높은순' },
      { value: 'win_ratio_desc', label: '낙찰가율 높은순' }
    ];

    function syncSortSelectOptions(tab) {
      if (!el.selectSort) return;
      const opts = tab === 'results' ? RESULTS_SORT_OPTIONS : ACTIVE_SORT_OPTIONS;
      el.selectSort.innerHTML = opts
        .map(o => `<option value="${escapeHtml(o.value)}">${escapeHtml(o.label)}</option>`)
        .join('');
      el.selectSort.value = tab === 'results' ? state.filters.resultsSort : state.filters.sort;
    }

    // Main Tabs (진행 매물 | 매물 결과)
    if (el.mainTabs) {
      el.mainTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          const targetTab = tab.getAttribute('data-tab') || 'active';
          if (state.activeTab === targetTab) return;
          state.activeTab = targetTab;
          el.mainTabs.forEach(t => {
            const active = t === tab;
            t.classList.toggle('active', active);
            t.setAttribute('aria-selected', active ? 'true' : 'false');
          });
          const isResults = targetTab === 'results';
          if (el.summaryBar) el.summaryBar.style.display = isResults ? 'none' : 'grid';
          if (el.resultsSummaryBar) el.resultsSummaryBar.style.display = isResults ? 'grid' : 'none';
          if (el.selectDiscount) el.selectDiscount.style.display = isResults ? 'none' : '';
          if (el.chkSafeWrap) el.chkSafeWrap.style.display = isResults ? 'none' : '';
          syncSortSelectOptions(targetTab);
          if (isResults && !state.historyLoaded) {
            ensureHistoryLoaded();
          } else if (isResults) {
            updateResultsSummaryCounts();
          }
          updateSeoulZoneCounts();
          renderCards();
        });
      });
    }

    // Region Pills
    if (el.regionButtons) {
      el.regionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          el.regionButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const region = btn.getAttribute('data-region');
          state.filters.regionGroup = region;

          if (el.seoulSubWrapper) {
            if (region === '서울') {
              el.seoulSubWrapper.style.display = 'block';
            } else {
              el.seoulSubWrapper.style.display = 'none';
              state.filters.seoulZone = 'ALL';
              if (el.seoulZoneButtons) {
                el.seoulZoneButtons.forEach(sb => {
                  sb.classList.toggle('active', sb.getAttribute('data-seoul-zone') === 'ALL');
                });
              }
            }
          }
          renderCards();
        });
      });
    }

    // Seoul 5-Zone Sub-Pills
    if (el.seoulZoneButtons) {
      el.seoulZoneButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          el.seoulZoneButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.filters.seoulZone = btn.getAttribute('data-seoul-zone');
          renderCards();
        });
      });
    }

    // Selects
    if (el.selectHouseholds) {
      el.selectHouseholds.addEventListener('change', e => {
        state.filters.minHouseholds = e.target.value;
        renderCards();
      });
    }

    // 5천만원 단위 양방향 가격 슬라이더 (완전 커스텀 포인터 캡처 방식 - 오동작/튕김/삐그덕거림 제로)
    let renderDebounceTimer = null;
    let activeDragThumb = null;
    let cachedSliderRect = null;

    // 팝오버 내부 상세 텍스트 (예: 14억 5,000만원 이상)
    function formatSliderPriceText(minVal, maxVal) {
      const isFull = minVal <= 0 && maxVal >= PRICE_SLIDER_MAX;
      if (isFull) return '가격 전체';
      if (minVal > 0 && maxVal >= PRICE_SLIDER_MAX) {
        return `${formatMoney(minVal)} 이상`;
      }
      if (minVal <= 0 && maxVal < PRICE_SLIDER_MAX) {
        return `${formatMoney(maxVal)} 이하`;
      }
      if (minVal === maxVal) {
        return formatMoney(minVal);
      }
      return `${formatMoney(minVal)} ~ ${formatMoney(maxVal)}`;
    }

    // 툴바 버튼용 컴팩트 텍스트 (예: 14.5억 이상, 5억~9억, 5억 이하) - 툴바 밀림/삐그덕 방지
    function formatShortMoney(val) {
      if (val <= 0) return '0원';
      const eok = Math.floor(val / 100000000);
      const man = Math.round((val % 100000000) / 10000);
      if (eok > 0 && man > 0) {
        const dec = (man / 10000).toFixed(1).replace(/\.0$/, '');
        return `${(eok + Number(dec))}억`;
      }
      if (eok > 0) return `${eok}억`;
      if (man >= 1000) return `${(man / 1000).toFixed(0)}천만`;
      return `${man}만`;
    }

    function formatButtonPriceText(minVal, maxVal) {
      const isFull = minVal <= 0 && maxVal >= PRICE_SLIDER_MAX;
      if (isFull) return '가격 전체';
      if (minVal > 0 && maxVal >= PRICE_SLIDER_MAX) {
        return `${formatShortMoney(minVal)} 이상`;
      }
      if (minVal <= 0 && maxVal < PRICE_SLIDER_MAX) {
        return `${formatShortMoney(maxVal)} 이하`;
      }
      if (minVal === maxVal) {
        return formatShortMoney(minVal);
      }
      return `${formatShortMoney(minVal)}~${formatShortMoney(maxVal)}`;
    }

    function updateSliderVisuals(minVal, maxVal, updateButtonLabel = true) {
      const minPct = Math.max(0, Math.min(100, (minVal / PRICE_SLIDER_MAX) * 100));
      const maxPct = Math.max(0, Math.min(100, (maxVal / PRICE_SLIDER_MAX) * 100));

      if (el.thumbPriceMin) {
        el.thumbPriceMin.style.left = `${minPct}%`;
        el.thumbPriceMin.setAttribute('aria-valuenow', minVal);
      }
      if (el.thumbPriceMax) {
        el.thumbPriceMax.style.left = `${maxPct}%`;
        el.thumbPriceMax.setAttribute('aria-valuenow', maxVal);
      }
      if (el.priceSliderFill) {
        el.priceSliderFill.style.left = `${minPct}%`;
        el.priceSliderFill.style.width = `${Math.max(0, maxPct - minPct)}%`;
      }

      // 팝오버 내부 라벨은 실시간 60fps 업데이트
      const text = formatSliderPriceText(minVal, maxVal);
      if (el.priceRangeLabel) el.priceRangeLabel.textContent = text;

      // 외부 버튼은 드래그 중 삐그덕거림/밀림 방지를 위해 확정 시에만 업데이트
      if (updateButtonLabel && el.priceBtnLabel) {
        el.priceBtnLabel.textContent = formatButtonPriceText(minVal, maxVal);
      }

      const isFull = minVal <= 0 && maxVal >= PRICE_SLIDER_MAX;
      if (el.btnPricePopover) {
        el.btnPricePopover.classList.toggle('active', !isFull);
      }

      if (el.presetChips) {
        el.presetChips.forEach(chip => {
          const cMin = parseInt(chip.dataset.min, 10);
          const cMax = parseInt(chip.dataset.max, 10);
          chip.classList.toggle('active', cMin === minVal && cMax === maxVal);
        });
      }
    }

    function setPriceRange(newMin, newMax, triggerRender = true, updateButtonLabel = true) {
      let min = Math.max(0, Math.min(PRICE_SLIDER_MAX, Math.round(newMin / PRICE_SLIDER_STEP) * PRICE_SLIDER_STEP));
      let max = Math.max(0, Math.min(PRICE_SLIDER_MAX, Math.round(newMax / PRICE_SLIDER_STEP) * PRICE_SLIDER_STEP));
      if (min > max) min = max;

      state.filters.minPrice = min;
      state.filters.maxPrice = max;
      updateSliderVisuals(min, max, updateButtonLabel);

      if (triggerRender) {
        clearTimeout(renderDebounceTimer);
        renderCards();
      }
    }

    function getValueFromClientX(clientX) {
      if (!el.priceSliderWrap) return 0;
      const rect = cachedSliderRect || el.priceSliderWrap.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawVal = ratio * PRICE_SLIDER_MAX;
      return Math.round(rawVal / PRICE_SLIDER_STEP) * PRICE_SLIDER_STEP;
    }

    function startSliderDrag(thumbType, e) {
      e.preventDefault();
      e.stopPropagation();
      activeDragThumb = thumbType;
      cachedSliderRect = el.priceSliderWrap.getBoundingClientRect();
      const targetThumb = thumbType === 'min' ? el.thumbPriceMin : el.thumbPriceMax;
      if (targetThumb) {
        targetThumb.classList.add('dragging');
        try {
          targetThumb.setPointerCapture(e.pointerId);
        } catch (_) {}
      }
    }

    function onPointerMove(e) {
      if (!activeDragThumb) return;
      const val = getValueFromClientX(e.clientX);
      if (activeDragThumb === 'min') {
        const clampedMin = Math.min(val, state.filters.maxPrice);
        // 드래그 중에는 updateButtonLabel = false로 외부 버튼 레이아웃 흔들림 방지
        setPriceRange(clampedMin, state.filters.maxPrice, false, false);
      } else if (activeDragThumb === 'max') {
        const clampedMax = Math.max(val, state.filters.minPrice);
        setPriceRange(state.filters.minPrice, clampedMax, false, false);
      }

      // 카드 필터링 렌더링 디바운스
      clearTimeout(renderDebounceTimer);
      renderDebounceTimer = setTimeout(() => {
        renderCards();
      }, 40);
    }

    function onPointerEnd(e) {
      if (!activeDragThumb) return;
      const targetThumb = activeDragThumb === 'min' ? el.thumbPriceMin : el.thumbPriceMax;
      if (targetThumb) {
        targetThumb.classList.remove('dragging');
        try {
          if (targetThumb.hasPointerCapture(e.pointerId)) {
            targetThumb.releasePointerCapture(e.pointerId);
          }
        } catch (_) {}
      }
      activeDragThumb = null;
      cachedSliderRect = null;
      // 드래그 종료 시 버튼 라벨을 최종 반영
      updateSliderVisuals(state.filters.minPrice, state.filters.maxPrice, true);
      clearTimeout(renderDebounceTimer);
      renderCards();
    }

    if (el.thumbPriceMin && el.thumbPriceMax && el.priceSliderWrap) {
      el.thumbPriceMin.addEventListener('pointerdown', e => startSliderDrag('min', e));
      el.thumbPriceMax.addEventListener('pointerdown', e => startSliderDrag('max', e));
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerEnd);
      window.addEventListener('pointercancel', onPointerEnd);

      // 트랙 영역 클릭 시 더 스마트한 핸들 이동 및 드래그 연결
      el.priceSliderWrap.addEventListener('pointerdown', e => {
        if (e.target === el.thumbPriceMin || e.target === el.thumbPriceMax) return;
        e.preventDefault();
        cachedSliderRect = el.priceSliderWrap.getBoundingClientRect();
        const val = getValueFromClientX(e.clientX);
        let chosenType = 'min';
        if (val < state.filters.minPrice) {
          chosenType = 'min';
        } else if (val > state.filters.maxPrice) {
          chosenType = 'max';
        } else {
          const distToMin = Math.abs(val - state.filters.minPrice);
          const distToMax = Math.abs(val - state.filters.maxPrice);
          chosenType = (distToMin <= distToMax) ? 'min' : 'max';
        }

        if (chosenType === 'min') {
          setPriceRange(val, state.filters.maxPrice, true, true);
          startSliderDrag('min', e);
        } else {
          setPriceRange(state.filters.minPrice, val, true, true);
          startSliderDrag('max', e);
        }
      });

      // 키보드 방향키 조작 지원
      function handleThumbKey(thumbType, e) {
        let delta = 0;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') delta = PRICE_SLIDER_STEP;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') delta = -PRICE_SLIDER_STEP;
        else if (e.key === 'Home') delta = -PRICE_SLIDER_MAX;
        else if (e.key === 'End') delta = PRICE_SLIDER_MAX;
        else return;

        e.preventDefault();
        if (thumbType === 'min') {
          const newMin = Math.max(0, Math.min(state.filters.maxPrice, state.filters.minPrice + delta));
          setPriceRange(newMin, state.filters.maxPrice, true, true);
        } else {
          const newMax = Math.max(state.filters.minPrice, Math.min(PRICE_SLIDER_MAX, state.filters.maxPrice + delta));
          setPriceRange(state.filters.minPrice, newMax, true, true);
        }
      }

      el.thumbPriceMin.addEventListener('keydown', e => handleThumbKey('min', e));
      el.thumbPriceMax.addEventListener('keydown', e => handleThumbKey('max', e));
    }

    // 프리셋 버튼 클릭 이벤트
    if (el.presetChips) {
      el.presetChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          const pMin = parseInt(chip.dataset.min, 10);
          const pMax = parseInt(chip.dataset.max, 10);
          setPriceRange(pMin, pMax, true, true);
        });
      });
    }

    // 가격 초기화 버튼 클릭 이벤트
    if (el.btnPriceReset) {
      el.btnPriceReset.addEventListener('click', (e) => {
        e.stopPropagation();
        setPriceRange(0, PRICE_SLIDER_MAX, true, true);
      });
    }

    // 초기 시각적 상태 반영
    updateSliderVisuals(state.filters.minPrice, state.filters.maxPrice, true);

    // Popover Open / Close
    function togglePricePopover(forceOpen) {
      if (!el.pricePopoverMenu) return;
      const isCurrentlyOpen = el.pricePopoverMenu.style.display !== 'none' && el.pricePopoverMenu.classList.contains('show');
      const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !isCurrentlyOpen;

      el.pricePopoverMenu.style.display = shouldOpen ? 'flex' : 'none';
      el.pricePopoverMenu.classList.toggle('show', shouldOpen);

      if (el.popoverBackdrop) {
        el.popoverBackdrop.style.display = shouldOpen ? 'block' : 'none';
      }
      if (el.btnPricePopover) {
        el.btnPricePopover.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
      }
    }

    if (el.popoverBackdrop) {
      el.popoverBackdrop.addEventListener('click', () => togglePricePopover(false));
    }

    if (el.btnPricePopover) {
      el.btnPricePopover.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePricePopover();
      });
    }

    if (el.btnPriceApply) {
      el.btnPriceApply.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePricePopover(false);
      });
    }

    if (el.pricePopoverMenu) {
      el.pricePopoverMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    document.addEventListener('click', (e) => {
      if (el.pricePopoverWrapper && !el.pricePopoverWrapper.contains(e.target)) {
        togglePricePopover(false);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        togglePricePopover(false);
      }
    });

    if (el.selectDiscount) {
      el.selectDiscount.addEventListener('change', e => {
        state.filters.discount = e.target.value;
        renderCards();
      });
    }

    if (el.selectSort) {
      el.selectSort.addEventListener('change', e => {
        if (state.activeTab === 'results') {
          state.filters.resultsSort = e.target.value;
        } else {
          state.filters.sort = e.target.value;
        }
        renderCards();
      });
    }

    // Checks
    if (el.chkSafe) {
      el.chkSafe.addEventListener('change', e => {
        state.filters.safeOnly = e.target.checked;
        if (el.chkSafeWrap) el.chkSafeWrap.classList.toggle('is-checked', e.target.checked);
        updateSummaryActiveState();
        renderCards();
      });
    }

    if (el.chkBookmark) {
      el.chkBookmark.addEventListener('change', e => {
        state.filters.bookmarkedOnly = e.target.checked;
        if (el.chkBookmarkWrap) el.chkBookmarkWrap.classList.toggle('is-checked', e.target.checked);
        updateSummaryActiveState();
        renderCards();
      });
    }

    // Search
    function syncSearchClearBtn() {
      if (el.btnSearchClear && el.inputSearch) {
        el.btnSearchClear.hidden = el.inputSearch.value.length === 0;
      }
    }

    if (el.inputSearch) {
      let timer = null;
      el.inputSearch.addEventListener('input', e => {
        syncSearchClearBtn();
        clearTimeout(timer);
        timer = setTimeout(() => {
          state.filters.search = e.target.value.trim();
          updateSummaryActiveState();
          renderCards();
        }, 150);
      });
    }

    if (el.btnSearchClear) {
      el.btnSearchClear.addEventListener('click', () => {
        if (!el.inputSearch) return;
        el.inputSearch.value = '';
        state.filters.search = '';
        syncSearchClearBtn();
        updateSummaryActiveState();
        renderCards();
        el.inputSearch.focus();
      });
    }

    function resetAllFilters() {
      state.filters.regionGroup = 'ALL';
      state.filters.seoulZone = 'ALL';
      state.filters.minHouseholds = 'ALL';
      state.filters.discount = 'ALL';
      state.filters.imminentOnly = false;
      state.filters.safeOnly = false;
      state.filters.bookmarkedOnly = false;
      state.filters.resultStatus = 'ALL';
      state.filters.search = '';

      if (el.regionButtons) {
        el.regionButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-region') === 'ALL'));
      }
      if (el.seoulSubWrapper) el.seoulSubWrapper.style.display = 'none';
      if (el.seoulZoneButtons) {
        el.seoulZoneButtons.forEach(sb => sb.classList.toggle('active', sb.getAttribute('data-seoul-zone') === 'ALL'));
      }
      if (el.selectHouseholds) el.selectHouseholds.value = 'ALL';
      if (el.selectDiscount) el.selectDiscount.value = 'ALL';
      if (el.chkSafe) el.chkSafe.checked = false;
      if (el.chkSafeWrap) el.chkSafeWrap.classList.remove('is-checked');
      if (el.chkBookmark) el.chkBookmark.checked = false;
      if (el.chkBookmarkWrap) el.chkBookmarkWrap.classList.remove('is-checked');
      if (el.inputSearch) el.inputSearch.value = '';
      syncSearchClearBtn();

      setPriceRange(0, PRICE_SLIDER_MAX, false, true);
      updateSummaryActiveState();
      updateResultsSummaryActiveState();
      renderCards();
    }

    // Grid Click Delegation
    if (el.auctionGrid) {
      el.auctionGrid.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const id = btn.getAttribute('data-id');

        if (action === 'fav') toggleFav(id);
        else if (action === 'calc') openCalculator(id);
        else if (action === 'retry-load') loadData();
        else if (action === 'retry-history') ensureHistoryLoaded();
        else if (action === 'reset-filters') resetAllFilters();
        else if (action === 'copy-case') {
          const caseNo = btn.getAttribute('data-case');
          if (caseNo) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(caseNo).then(() => {
                toast(`사건번호 [${caseNo}] 복사되었습니다.`);
              }).catch(() => fallbackCopy(caseNo));
            } else {
              fallbackCopy(caseNo);
            }
          }
        }
      });
    }

    // Modal
    if (el.modalClose) el.modalClose.addEventListener('click', closeCalculator);
    if (el.modalOverlay) {
      el.modalOverlay.addEventListener('click', e => {
        if (e.target === el.modalOverlay) closeCalculator();
      });
      window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && el.modalOverlay.classList.contains('active')) closeCalculator();
      });
    }

    if (el.calcInput) el.calcInput.addEventListener('input', updateCalcMath);
    if (el.calcMarketInput) el.calcMarketInput.addEventListener('input', updateCalcMath);
    if (el.calcAssumedInput) el.calcAssumedInput.addEventListener('input', updateCalcMath);

    if (el.calcStepChips) {
      el.calcStepChips.forEach(chip => {
        chip.addEventListener('click', () => {
          if (!state.activeCalcItem || !el.calcInput) return;
          const step = chip.getAttribute('data-bid-step');
          const minPrice = Number(state.activeCalcItem.minimum_price) || 0;
          if (step === 'min') {
            el.calcInput.value = minPrice;
          } else {
            const delta = parseInt(step, 10) || 0;
            const current = Math.max(0, parseInt(el.calcInput.value, 10) || 0);
            el.calcInput.value = current + delta;
          }
          updateCalcMath();
        });
      });
    }

    if (el.calcLtvButtons) {
      el.calcLtvButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          state.calcLtv = Number(btn.getAttribute('data-ltv')) || 0;
          el.calcLtvButtons.forEach(b => b.classList.toggle('active', b === btn));
          updateCalcMath();
        });
      });
    }

    if (el.calcHouseButtons) {
      el.calcHouseButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          state.calcHouseCount = Number(btn.getAttribute('data-houses')) || 1;
          el.calcHouseButtons.forEach(b => b.classList.toggle('active', b === btn));
          updateCalcMath();
        });
      });
    }

    // 사건번호 텍스트 클립보드 복사 폴백
    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        toast(`사건번호 [${text}] 복사되었습니다.`);
      } catch (_) {}
      document.body.removeChild(ta);
    }

    // 상단 4대 핵심 지표 카드 클릭 필터링
    function isDefaultActiveFilters() {
      return (
        state.filters.discount === 'ALL' &&
        !state.filters.imminentOnly &&
        state.filters.regionGroup === 'ALL' &&
        state.filters.seoulZone === 'ALL' &&
        state.filters.minHouseholds === 'ALL' &&
        state.filters.minPrice === 0 &&
        state.filters.maxPrice === PRICE_SLIDER_MAX &&
        !state.filters.safeOnly &&
        !state.filters.bookmarkedOnly &&
        !state.filters.search
      );
    }

    function updateSummaryActiveState() {
      if (!el.summaryItems) return;
      el.summaryItems.forEach(item => {
        const ft = item.getAttribute('data-filter');
        let isActive = false;
        if (ft === 'all') {
          isActive = isDefaultActiveFilters();
        } else if (ft === 'discount') {
          isActive = state.filters.discount === 'disc20' || state.filters.discount === 'disc36';
        } else if (ft === 'new') {
          isActive = state.filters.discount === 'new';
        } else if (ft === 'imminent') {
          isActive = state.filters.imminentOnly;
        }
        item.classList.toggle('active', isActive);
      });
    }

    if (el.summaryItems) {
      el.summaryItems.forEach(item => {
        item.addEventListener('click', () => {
          const filterType = item.getAttribute('data-filter');
          if (filterType === 'all') {
            resetAllFilters();
            return;
          } else if (filterType === 'discount') {
            const isAlready = state.filters.discount === 'disc20' || state.filters.discount === 'disc36';
            state.filters.discount = isAlready ? 'ALL' : 'disc20';
            state.filters.imminentOnly = false;
            if (el.selectDiscount) el.selectDiscount.value = state.filters.discount;
          } else if (filterType === 'new') {
            const isAlready = state.filters.discount === 'new';
            state.filters.discount = isAlready ? 'ALL' : 'new';
            state.filters.imminentOnly = false;
            if (el.selectDiscount) el.selectDiscount.value = state.filters.discount;
          } else if (filterType === 'imminent') {
            state.filters.imminentOnly = !state.filters.imminentOnly;
            if (state.filters.imminentOnly) {
              state.filters.discount = 'ALL';
              if (el.selectDiscount) el.selectDiscount.value = 'ALL';
            }
          }
          updateSummaryActiveState();
          renderCards();
        });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
          }
        });
      });
    }

    if (el.selectDiscount) {
      el.selectDiscount.addEventListener('change', () => {
        state.filters.imminentOnly = false;
        updateSummaryActiveState();
      });
    }

    // 매물 결과 5개 요약 지표 클릭 필터링
    function updateResultsSummaryActiveState() {
      if (!el.resultsSummaryItems) return;
      el.resultsSummaryItems.forEach(item => {
        const ft = item.getAttribute('data-result-filter');
        item.classList.toggle('active', ft === state.filters.resultStatus);
      });
    }

    if (el.resultsSummaryItems) {
      el.resultsSummaryItems.forEach(item => {
        item.addEventListener('click', () => {
          const ft = item.getAttribute('data-result-filter') || 'ALL';
          if (ft === 'ALL' || state.filters.resultStatus === ft) {
            state.filters.resultStatus = 'ALL';
          } else {
            state.filters.resultStatus = ft;
          }
          updateResultsSummaryActiveState();
          renderCards();
        });
        item.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            item.click();
          }
        });
      });
    }
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    loadData();
  });
})();
