// Ankara Mahalle Puanlama Uygulaması - Ana Uygulama Mantığı
(function () {
  "use strict";

  // ─── STATE ──────────────────────────────────────────────
  const state = {
    page: "home",          // home | ilce | detail | search
    selectedIlce: null,
    selectedLocation: null,
    searchQuery: "",
    filterTip: "all",
    starValues: {},        // kategori -> puan (geçici form değerleri)
  };

  // ─── DOM REFS ────────────────────────────────────────────
  const $ = id => document.getElementById(id);
  const pages = {
    home: $("page-home"),
    ilce: $("page-ilce"),
    detail: $("page-detail"),
    search: $("page-search"),
  };

  // ─── NAVIGATION ─────────────────────────────────────────
  function showPage(name) {
    Object.values(pages).forEach(p => p && p.classList.remove("active"));
    if (pages[name]) pages[name].classList.add("active");
    state.page = name;
    window.scrollTo({ top: 0, behavior: "smooth" });
    updateBreadcrumb();
  }

  function updateBreadcrumb() {
    const bc = $("breadcrumb");
    let html = '<span class="breadcrumb-item" onclick="goHome()">🏠 Ana Sayfa</span>';
    if (state.page === "ilce" && state.selectedIlce) {
      html += '<span class="breadcrumb-sep">›</span>';
      html += `<span class="breadcrumb-current">${state.selectedIlce.ad}</span>`;
    } else if (state.page === "detail" && state.selectedLocation) {
      if (state.selectedIlce) {
        html += '<span class="breadcrumb-sep">›</span>';
        html += `<span class="breadcrumb-item" onclick="goIlce('${state.selectedIlce.id}')">${state.selectedIlce.ad}</span>`;
      }
      html += '<span class="breadcrumb-sep">›</span>';
      html += `<span class="breadcrumb-current">${state.selectedLocation.ad}</span>`;
    } else if (state.page === "search") {
      html += '<span class="breadcrumb-sep">›</span>';
      html += `<span class="breadcrumb-current">Arama: "${state.searchQuery}"</span>`;
    }
    bc.innerHTML = html;
  }

  window.goHome = function () {
    state.selectedIlce = null;
    state.selectedLocation = null;
    state.searchQuery = "";
    renderHome();
    showPage("home");
  };

  window.goIlce = function (ilceId) {
    const ilce = ANKARA_DATA.ilceler.find(i => i.id === ilceId);
    if (!ilce) return;
    state.selectedIlce = ilce;
    state.selectedLocation = null;
    renderIlcePage(ilce);
    showPage("ilce");
  };

  window.goDetail = function (locationId) {
    const loc = getLocationById(locationId);
    if (!loc) return;
    state.selectedLocation = loc;
    if (loc.ilce) {
      state.selectedIlce = ANKARA_DATA.ilceler.find(i => i.id === loc.ilce) || null;
    }
    renderDetailPage(loc);
    showPage("detail");
  };

  // ─── HOME PAGE ───────────────────────────────────────────
  function renderHome() {
    // Stats
    const allLocs = getAllLocations();
    $("stat-total").textContent = allLocs.length;

    let ratedCount = 0;
    allLocs.forEach(l => { if (getGenel(l.id)) ratedCount++; });
    $("stat-rated").textContent = ratedCount;
    $("stat-ilce").textContent = ANKARA_DATA.ilceler.length;

    // Ilce cards
    const grid = $("ilce-grid");
    grid.innerHTML = ANKARA_DATA.ilceler.map(ilce => {
      const count = getLocationsByIlce(ilce.id).length + ilce.mahalleler.length;
      return `
        <div class="ilce-card" onclick="goIlce('${ilce.id}')">
          <div class="ilce-icon">${ilce.img}</div>
          <div class="ilce-name">${ilce.ad}</div>
          <div class="ilce-desc">${ilce.aciklama}</div>
          <div class="ilce-count">📍 ${ilce.mahalleler.length} mahalle</div>
        </div>
      `;
    }).join("");

    // Recent rated locations
    renderRecentRated();
  }

  function renderRecentRated() {
    const container = $("recent-rated");
    const all = getAllLocations();
    const rated = all.filter(l => getGenel(l.id) !== null)
      .sort((a, b) => parseFloat(getGenel(b.id)) - parseFloat(getGenel(a.id)))
      .slice(0, 6);

    if (rated.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⭐</div>
          <h3>Henüz puanlanan yer yok</h3>
          <p>Bir mahalle, sokak, apartman veya siteyi puanlamak için tıklayın.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = `<div class="location-grid">${rated.map(l => locationCard(l)).join("")}</div>`;
  }

  // ─── ILCE PAGE ───────────────────────────────────────────
  function renderIlcePage(ilce) {
    $("ilce-title").textContent = ilce.ad;
    $("ilce-desc").textContent = ilce.aciklama;
    $("ilce-icon-big").textContent = ilce.img;

    state.filterTip = "all";
    renderIlceLocations(ilce);
    renderFilterBar(ilce);
  }

  function renderFilterBar(ilce) {
    const locs = getLocationsByIlce(ilce.id);
    const types = [...new Set(locs.map(l => l.tip))];
    const filterBar = $("filter-bar");
    const btns = [
      `<button class="filter-btn ${state.filterTip === "all" ? "active" : ""}" onclick="setFilter('all', '${ilce.id}')">🗺️ Tümü</button>`
    ];
    // mahalleler always
    btns.push(`<button class="filter-btn ${state.filterTip === "mahalle" ? "active" : ""}" onclick="setFilter('mahalle', '${ilce.id}')">🏘️ Mahalleler</button>`);
    types.forEach(t => {
      if (t === "mahalle") return;
      const meta = TIP_LABELS[t];
      btns.push(`<button class="filter-btn ${state.filterTip === t ? "active" : ""}" onclick="setFilter('${t}', '${ilce.id}')">${meta.icon} ${meta.label}</button>`);
    });
    filterBar.innerHTML = btns.join("");
  }

  window.setFilter = function (tip, ilceId) {
    state.filterTip = tip;
    const ilce = ANKARA_DATA.ilceler.find(i => i.id === ilceId);
    if (ilce) {
      renderFilterBar(ilce);
      renderIlceLocations(ilce);
    }
  };

  function renderIlceLocations(ilce) {
    const container = $("ilce-locations");
    let locs = [];

    if (state.filterTip === "all" || state.filterTip === "mahalle") {
      locs.push(...ilce.mahalleler.map(m => ({ ...m, ilceAd: ilce.ad })));
    }

    if (state.filterTip === "all" || state.filterTip !== "mahalle") {
      const extra = getLocationsByIlce(ilce.id).filter(l => l.tip !== "mahalle");
      if (state.filterTip === "all") locs.push(...extra);
      else locs.push(...extra.filter(l => l.tip === state.filterTip));
    }

    if (locs.length === 0) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Bu kategoride yer bulunamadı</h3></div>`;
      return;
    }

    container.innerHTML = `<div class="location-grid">${locs.map(l => locationCard(l)).join("")}</div>`;
  }

  // ─── DETAIL PAGE ─────────────────────────────────────────
  function renderDetailPage(loc) {
    const meta = TIP_LABELS[loc.tip] || { label: loc.tip, icon: "📍", color: "#888" };

    // Header
    $("detail-type-badge").textContent = `${meta.icon} ${meta.label}`;
    $("detail-type-badge").style.background = meta.color + "20";
    $("detail-type-badge").style.color = meta.color;
    $("detail-title").textContent = loc.ad;

    // Meta info
    const metaHtml = [];
    if (loc.ilceAd) metaHtml.push(`<span class="detail-meta-item">🏛️ <strong>${loc.ilceAd}</strong></span>`);
    if (loc.mahalleAd) metaHtml.push(`<span class="detail-meta-item">📍 ${loc.mahalleAd}</span>`);
    if (loc.adres) metaHtml.push(`<span class="detail-meta-item">🗺️ ${loc.adres}</span>`);
    $("detail-meta").innerHTML = metaHtml.join("");

    renderScoreSection(loc.id);
    renderComments(loc.id);
    initRatingForm(loc.id);
  }

  function renderScoreSection(locationId) {
    const avg = getOrtalamaPuan(locationId);
    const genel = getGenel(locationId);
    const container = $("score-section");

    if (!genel) {
      container.innerHTML = `
        <div class="score-no-rating">
          <div style="font-size:1.5rem;margin-bottom:4px">⭐</div>
          <strong>Henüz puanlama yok</strong><br>
          Aşağıdan ilk puanı sen ver!
        </div>
        <div class="category-ratings" id="category-ratings"></div>
      `;
      return;
    }

    const genelNum = parseFloat(genel);
    container.innerHTML = `
      <div class="overall-score-card">
        <div class="score-big">${genel}</div>
        <div class="score-details">
          <div class="score-label">Genel Ortalama Puan</div>
          <div class="score-stars">${renderStars(genelNum, "1.3rem")}</div>
          <div class="score-count">${avg._count} değerlendirme</div>
        </div>
      </div>
      <div class="category-ratings" id="category-ratings"></div>
    `;

    const catContainer = $("category-ratings");
    catContainer.innerHTML = RATING_KATEGORILER.map(kat => {
      const val = avg[kat.id] ? parseFloat(avg[kat.id]) : null;
      return `
        <div class="category-card">
          <div class="category-icon">${kat.icon}</div>
          <div class="category-label">${kat.label}</div>
          ${val !== null ? `
            <div class="category-score">${val.toFixed(1)}</div>
            <div class="progress-bar"><div class="progress-fill" style="width:${(val / 5) * 100}%"></div></div>
          ` : `<div class="category-no">—</div>`}
        </div>
      `;
    }).join("");
  }

  function renderStars(value, size = "0.9rem") {
    const full = Math.floor(value);
    const half = value % 1 >= 0.5;
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= full) html += `<span style="color:#f59e0b;font-size:${size}">★</span>`;
      else if (i === full + 1 && half) html += `<span style="color:#fcd34d;font-size:${size}">★</span>`;
      else html += `<span style="color:#d1d5db;font-size:${size}">★</span>`;
    }
    return html;
  }

  // ─── RATING FORM ─────────────────────────────────────────
  function initRatingForm(locationId) {
    state.starValues = {};
    RATING_KATEGORILER.forEach(k => state.starValues[k.id] = 0);

    const container = $("rating-form-container");
    container.innerHTML = `
      <div class="rating-form">
        <div class="rating-row">
          ${RATING_KATEGORILER.map(kat => `
            <div class="rating-category-input">
              <div class="rating-category-label">${kat.icon} ${kat.label}</div>
              <div class="star-input" data-kat="${kat.id}">
                ${[1,2,3,4,5].map(n => `<span class="star" data-val="${n}" onclick="setStar('${kat.id}', ${n})">★</span>`).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <div class="comment-form">
          <div class="form-row">
            <div class="form-group">
              <label>Adınız (isteğe bağlı)</label>
              <input type="text" id="comment-author" placeholder="Anonim" maxlength="50">
            </div>
            <div class="form-group">
              <label>Oturma Durumu</label>
              <select id="comment-status">
                <option value="">Belirtmek istemiyorum</option>
                <option value="Oturuyor">Burada oturuyorum</option>
                <option value="Eski Sakin">Eskiden oturdum</option>
                <option value="Ziyaretçi">Ziyaretçi/Misafir</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Yorumunuz</label>
            <textarea id="comment-text" placeholder="Bu yer hakkında düşüncelerinizi paylaşın... (güvenlik, temizlik, ulaşım, komşuluk, vb.)" maxlength="500"></textarea>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn btn-secondary" onclick="resetRatingForm()">↺ Sıfırla</button>
          <button class="btn btn-primary" onclick="submitRating('${locationId}')">✓ Puanla & Yorum Yap</button>
        </div>
      </div>
    `;

    attachStarEvents();
  }

  function attachStarEvents() {
    document.querySelectorAll(".star-input").forEach(row => {
      const katId = row.dataset.kat;
      const stars = row.querySelectorAll(".star");
      stars.forEach(star => {
        const val = parseInt(star.dataset.val);
        star.addEventListener("mouseenter", () => highlightStars(row, val));
        star.addEventListener("mouseleave", () => renderStarInput(row, state.starValues[katId] || 0));
      });
    });
  }

  window.setStar = function (katId, val) {
    state.starValues[katId] = val;
    const row = document.querySelector(`.star-input[data-kat="${katId}"]`);
    if (row) renderStarInput(row, val);
  };

  function highlightStars(row, upTo) {
    row.querySelectorAll(".star").forEach(star => {
      const v = parseInt(star.dataset.val);
      star.classList.toggle("hovered", v <= upTo);
      star.classList.remove("selected");
    });
  }

  function renderStarInput(row, selected) {
    row.querySelectorAll(".star").forEach(star => {
      const v = parseInt(star.dataset.val);
      star.classList.remove("hovered");
      star.classList.toggle("selected", v <= selected);
    });
  }

  window.resetRatingForm = function () {
    const locId = state.selectedLocation?.id;
    if (locId) initRatingForm(locId);
  };

  window.submitRating = function (locationId) {
    const text = $("comment-text")?.value?.trim();
    const author = $("comment-author")?.value?.trim() || "Anonim";
    const status = $("comment-status")?.value || "";

    const hasAnyRating = Object.values(state.starValues).some(v => v > 0);
    if (!hasAnyRating && !text) {
      showToast("Lütfen en az bir puan verin veya yorum yazın.", "error");
      return;
    }

    if (hasAnyRating) {
      const puanObj = {};
      Object.entries(state.starValues).forEach(([k, v]) => { if (v > 0) puanObj[k] = v; });
      addPuan(locationId, puanObj);
    }

    if (text) {
      const genelPuan = state.starValues["genel"] || null;
      addYorum(locationId, {
        author,
        status,
        text,
        rating: genelPuan
      });
    }

    showToast("Puanınız ve yorumunuz kaydedildi!", "success");
    renderScoreSection(locationId);
    renderComments(locationId);
    initRatingForm(locationId);
  };

  // ─── COMMENTS ────────────────────────────────────────────
  function renderComments(locationId) {
    const container = $("comments-list");
    const yorumlar = getYorumlar(locationId);

    if (yorumlar.length === 0) {
      container.innerHTML = `
        <div class="no-comments">
          <div class="empty-icon">💬</div>
          <p>Henüz yorum yapılmamış. İlk yorumu sen yap!</p>
        </div>
      `;
      $("comments-count").textContent = "Yorumlar (0)";
      return;
    }

    $("comments-count").textContent = `Yorumlar (${yorumlar.length})`;
    container.innerHTML = yorumlar.map(y => `
      <div class="comment-card" id="comment-${y.id}">
        <div class="comment-header">
          <div class="comment-author">
            <div class="comment-avatar">${(y.author || "A")[0].toUpperCase()}</div>
            <div>
              <div class="comment-name">${escapeHtml(y.author || "Anonim")}${y.status ? ` <span style="font-size:0.72rem;color:var(--gray-400);font-weight:400">· ${escapeHtml(y.status)}</span>` : ""}</div>
              <div class="comment-date">${y.tarih}</div>
            </div>
          </div>
          ${y.rating ? `<div class="comment-rating">${renderStars(y.rating)}</div>` : ""}
        </div>
        <div class="comment-text">${escapeHtml(y.text)}</div>
        <button class="comment-delete" onclick="deleteComment('${locationId}', ${y.id})" title="Yorumu sil">✕</button>
      </div>
    `).join("");
  }

  window.deleteComment = function (locationId, yorumId) {
    if (!confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    deleteYorum(locationId, yorumId);
    renderComments(locationId);
    showToast("Yorum silindi.", "info");
  };

  // ─── SEARCH ──────────────────────────────────────────────
  function doSearch(query) {
    if (!query.trim()) { goHome(); return; }
    state.searchQuery = query;
    const results = searchLocations(query);

    $("search-query-text").innerHTML = `"<span>${escapeHtml(query)}</span>" için sonuçlar`;
    $("search-result-count").textContent = `${results.length} sonuç bulundu`;

    const container = $("search-results-grid");
    if (results.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>Sonuç bulunamadı</h3>
          <p>Farklı anahtar kelimeler deneyin.</p>
        </div>
      `;
    } else {
      container.innerHTML = `<div class="location-grid">${results.map(l => locationCard(l)).join("")}</div>`;
    }

    showPage("search");
  }

  // ─── LOCATION CARD ────────────────────────────────────────
  function locationCard(loc) {
    const meta = TIP_LABELS[loc.tip] || { label: loc.tip, icon: "📍", color: "#888" };
    const genel = getGenel(loc.id);
    const avg = getOrtalamaPuan(loc.id);

    const ratingHtml = genel
      ? `<div class="location-rating-preview">
           <div class="star-display">${renderStars(parseFloat(genel))}</div>
           <span class="rating-num">${genel}</span>
           <span class="rating-count">(${avg._count})</span>
         </div>`
      : `<span class="no-rating">Henüz puanlanmadı</span>`;

    const subInfo = loc.ilceAd
      ? `${loc.ilceAd}${loc.mahalleAd ? " › " + loc.mahalleAd : ""}`
      : (loc.mahalleAd || "");

    return `
      <div class="location-card" onclick="goDetail('${loc.id}')">
        <div class="location-card-header">
          <span class="location-type-badge" style="background:${meta.color}20;color:${meta.color}">${meta.icon} ${meta.label}</span>
        </div>
        <div class="location-name">${escapeHtml(loc.ad)}</div>
        ${subInfo ? `<div class="location-meta">📍 ${escapeHtml(subInfo)}</div>` : ""}
        ${loc.adres ? `<div class="location-meta">🗺️ ${escapeHtml(loc.adres)}</div>` : ""}
        ${ratingHtml}
      </div>
    `;
  }

  // ─── TOAST ───────────────────────────────────────────────
  function showToast(msg, type = "info") {
    const container = $("toast-container");
    const icons = { success: "✓", error: "✕", info: "ℹ" };
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${icons[type]}</span> ${escapeHtml(msg)}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  // ─── UTILITIES ───────────────────────────────────────────
  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // ─── SEARCH INPUT ────────────────────────────────────────
  function setupSearch() {
    const input = $("search-input");
    if (!input) return;
    let debounce;
    input.addEventListener("input", () => {
      clearTimeout(debounce);
      const q = input.value.trim();
      debounce = setTimeout(() => {
        if (q.length >= 2) doSearch(q);
        else if (q.length === 0 && state.page === "search") goHome();
      }, 300);
    });
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        clearTimeout(debounce);
        if (input.value.trim().length >= 1) doSearch(input.value.trim());
      }
    });
  }

  // ─── INIT ─────────────────────────────────────────────────
  function init() {
    setupSearch();
    renderHome();
    showPage("home");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
