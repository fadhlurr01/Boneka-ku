
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const header = document.getElementById("siteHeader");
  const waBtn = document.getElementById("waBtn");
  const waPanel = document.getElementById("waPanel");
  const toTop = document.getElementById("toTop");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox.querySelector("img");
  const scrollProgress = document.getElementById("scrollProgress");
  const dollBg = document.getElementById("dollBg");

  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open);
  });

  mainNav.addEventListener("click", e => {
    if (e.target.closest("a")) {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("bonekaku-theme", theme); } catch (e) {}
    const dark = theme === "dark";
    document.querySelectorAll(".theme-toggle").forEach((el) => {
      el.setAttribute("aria-checked", dark ? "true" : "false");
      el.setAttribute("title", dark ? "Ganti ke mode terang" : "Ganti ke mode gelap");
    });
  }
  function toggleTheme() {
    applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
  }
  document.querySelectorAll(".theme-toggle").forEach((el) => el.addEventListener("click", toggleTheme));
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");

  const heroMediaEl = document.querySelector(".hero-media");
  let scrollRaf = false;
  function onScrollFrame() {
    scrollRaf = false;
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    toTop.classList.toggle("show", y > 600);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    if (dollBg) dollBg.style.transform = "translateY(" + Math.min(y * 0.18, 300) + "px)";
    if (heroMediaEl) heroMediaEl.style.transform = "translateY(" + y * 0.06 + "px)";
  }
  window.addEventListener("scroll", () => {
    if (!scrollRaf) { scrollRaf = true; requestAnimationFrame(onScrollFrame); }
  }, { passive: true });

  const waWidget = document.getElementById("waWidget");
  function setWaPanel(open) {
    waPanel.classList.toggle("open", open);
    waBtn.classList.toggle("close", open);
    waBtn.setAttribute("aria-expanded", open);
    if (waWidget) waWidget.classList.toggle("panel-open", open);
  }
  waBtn.addEventListener("click", e => {
    e.stopPropagation();
    setWaPanel(!waPanel.classList.contains("open"));
  });
  document.addEventListener("click", e => {
    if (!waPanel.classList.contains("open")) return;
    if (waWidget && waWidget.contains(e.target)) return;
    setWaPanel(false);
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") setWaPanel(false);
  });

  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  document.addEventListener("click", e => {
    const target = e.target.closest("a.prod-media, a[data-lightbox]");
    if (!target) return;
    e.preventDefault();
    lightboxImg.src = target.href;
    lightbox.classList.add("open");
  });

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox || e.target === lightboxClose) lightbox.classList.remove("open");
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") lightbox.classList.remove("open");
  });

  document.addEventListener("click", e => {
    if (e.defaultPrevented) return;
    const a = e.target.closest ? e.target.closest("a") : null;
    if (!a) return;
    if (a.hasAttribute("data-lightbox")) return;
    if (a.getAttribute("target") === "_blank") return;
    const href = a.getAttribute("href") || "";
    if (!/^https?:\/\//i.test(href)) return;
    e.preventDefault();
    const win = window.open(a.href, "_blank");
    if (win) { try { win.opener = null; } catch (err) {} }
    else location.href = a.href;
  }, true);

  document.addEventListener("click", e => {
    const a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    const href = a.getAttribute("href") || "";
    if (href === "#" || href.indexOf("#/") === 0) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    const header = document.getElementById("siteHeader");
    const offset = header ? header.getBoundingClientRect().height + 10 : 0;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  }, true);

  function playInlineVideo(btn) {
    const id = btn.getAttribute("data-video");
    if (!id) return;
    const wrap = btn.closest(".special-video") || btn.parentElement;
    if (!wrap) return;
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    frame.title = btn.getAttribute("aria-label") || "Video Bonekaku";
    frame.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
    frame.setAttribute("allowfullscreen", "");
    wrap.innerHTML = "";
    wrap.appendChild(frame);
  }

  document.querySelectorAll(".video-btn[data-video]").forEach(btn => {
    btn.addEventListener("click", () => playInlineVideo(btn));
  });

  const adHero = document.getElementById("adHero");
  const adDate = document.getElementById("adDate");
  const adTitle = document.getElementById("adTitle");
  const adContent = document.getElementById("adContent");
  const adAuthorName = document.getElementById("adAuthorName");
  const adAuthorAvatar = document.getElementById("adAuthorAvatar");
  const adBacaJuga = document.getElementById("adBacaJuga");
  const adBacaJugaLink = document.getElementById("adBacaJugaLink");
  const adBacaJugaTitle = document.getElementById("adBacaJugaTitle");
  const adBacaJugaThumb = document.getElementById("adBacaJugaThumb");
  const adPostNav = document.getElementById("adPostNav");
  const adPrevLink = document.getElementById("adPrevLink");
  const adPrevTitle = document.getElementById("adPrevTitle");
  const adNextLink = document.getElementById("adNextLink");
  const adNextTitle = document.getElementById("adNextTitle");
  const DEFAULT_AUTHOR = "Bonekaku.co.id";
  const articleCache = {};
  let ARTICLES = [];
  let BUILTIN_ARTICLES = [];

  function articleSlug(url) {
    try {
      const parts = new URL(url, "https://bonekaku.co.id").pathname.split("/").filter(Boolean);
      return parts[parts.length - 1] || "";
    } catch (e) { return ""; }
  }

  function findArticle(slug) {
    if (!slug) return null;
    for (let i = 0; i < ARTICLES.length; i++) {
      if (ARTICLES[i].slug === slug) return ARTICLES[i];
    }
    return null;
  }

  function articleIndex(slug) {
    for (let i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].slug === slug) return i;
    return -1;
  }

  function slugFromHref(href) {
    const h = String(href || "");
    const m = h.match(/^#\/artikel\/(.+)$/);
    if (m) return m[1];
    return articleSlug(h);
  }

  const ARTI_PAGE_ALIASES = {
    "pemesanan pembuatan boneka": "#/kontak",
    "ketentuan pemesan boneka": "#/kontak"
  };

  function articleHrefFor(href, linkText) {
    try {
      const u = new URL(href, "https://bonekaku.co.id");
      if (!/(^|\.)bonekaku\.(co\.id|id)$/i.test(u.hostname)) return null;
      const slug = articleSlug(u.href);
      if (!slug) return "#/";
      for (let i = 0; i < ARTICLES.length; i++) if (ARTICLES[i].slug === slug) return "#/artikel/" + slug;
      const norm = s => String(s == null ? "" : s).replace(/\s+/g, " ").trim().toLowerCase().replace(/[.!?,;:]+$/, "");
      const t = norm(linkText);
      if (t.length >= 8) {
        for (let i = 0; i < ARTICLES.length; i++) {
          const at = norm(ARTICLES[i].title);
          if (at && (at === t || t.indexOf(at) === 0 || at.indexOf(t) === 0)) return "#/artikel/" + ARTICLES[i].slug;
        }
        if (ARTI_PAGE_ALIASES[t]) return ARTI_PAGE_ALIASES[t];
      }
      return null;
    } catch (e) { return null; }
  }

  function stripBacaJuga(root) {
    let slug = "";
    root.querySelectorAll("p").forEach(p => {
      const txt = (p.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      if (/^baca juga\s*:?\s*$/.test(txt)) {
        let next = p.nextElementSibling;
        while (next && next.tagName === "P" && isLinkOnlyP(next)) {
          const a = next.querySelector("a");
          if (a && !slug) slug = slugFromHref(a.getAttribute("href"));
          const nx = next.nextElementSibling;
          next.remove();
          next = nx;
        }
        p.remove();
      } else if (/^baca juga\s*:/.test(txt)) {
        const a = p.querySelector("a");
        if (a) slug = slugFromHref(a.getAttribute("href"));
        p.remove();
      }
    });
    return slug;
  }

  function avFixMediaUrl(u) {
    return String(u || "").replace(/&#215;|\u00d7|&#xD7;/gi, "x").replace(/^http:\/\//i, "https://");
  }

  function cleanShortcodesHtml(html) {
    let h = String(html == null ? "" : html);
    h = h.replace(/\[av_image\b[^\]]*\][\s\S]*?\[\/av_image\]/gi, function (all) {
      const m = all.match(/src\s*=\s*[\u2018\u2019'"\u201C\u201D]([^\u2018\u2019'"\u201C\u201D]+)/i);
      return m ? '<img decoding="async"  src="' + avFixMediaUrl(m[1]) + '" alt="Bonekaku" loading="lazy">' : "";
    });
    h = h.replace(/\[av_image\b[^\]]*\]/gi, "");
    h = h.replace(/\[\/?av_[^\]]*\]/gi, "");
    return h;
  }

  function isLinkOnlyP(p) {
    const t = (p.textContent || "").replace(/\s+/g, " ").trim();
    const lt = Array.prototype.map.call(p.querySelectorAll("a"), a => (a.textContent || "").replace(/\s+/g, " ").trim()).join(" ");
    return t.length > 0 && t === lt;
  }

  const AD_INLINE_REL_RE = /^(baca juga|baca artikel|artikel terkait|sebelum itu (?:kepoin|baca)(?: yang satu ini)?|kepoin(?: juga| yuk(?: yang ini)?)?|informasi pemesanan[^:]*|baca informasi ketentuannya)\s*:/i;

  function promoteHeadings(root) {
    root.querySelectorAll("p").forEach(p => {
      if (p.querySelector("a")) return;
      const kids = Array.prototype.filter.call(p.children, () => true);
      if (kids.length !== 1) return;
      const k = kids[0];
      if (!/^(strong|b|em|i|span)$/i.test(k.tagName)) return;
      const t = (p.textContent || "").replace(/\s+/g, " ").trim();
      if (!t || t.length > 95) return;
      if ((k.textContent || "").replace(/\s+/g, " ").trim().length < t.length - 2) return;
      const h = document.createElement("h3");
      h.innerHTML = k.innerHTML;
      p.replaceWith(h);
    });
  }

  function markInlineRelated(root) {
    root.querySelectorAll("figcaption,.wp-caption-text").forEach(el => el.classList.add("ad-credit"));
    root.querySelectorAll("h4,h5,h6").forEach(h => {
      if (/^penulis\s*:/i.test((h.textContent || "").replace(/\s+/g, " ").trim())) {
        h.remove();
      }
    });
    root.querySelectorAll("p").forEach(p => {
      const t = (p.textContent || "").replace(/\s+/g, " ").trim();
      if (/^credit image by/i.test(t)) { p.classList.add("ad-credit"); return; }
      if (/^penulis\s*:/i.test(t)) { p.remove(); return; }
      if (!AD_INLINE_REL_RE.test(t)) return;
      const links = Array.prototype.slice.call(p.querySelectorAll("a"));
      const extra = [];
      if (!links.length) {
        let next = p.nextElementSibling;
        while (next && next.tagName === "P" && isLinkOnlyP(next)) {
          extra.push(next);
          links.push.apply(links, Array.prototype.slice.call(next.querySelectorAll("a")));
          next = next.nextElementSibling;
        }
      }
      if (!links.length) return;
      links.forEach(a => { a.removeAttribute("target"); a.removeAttribute("rel"); });
      const box = document.createElement("div");
      box.className = "ad-inline-related";
      const label = document.createElement("span");
      label.className = "ad-inline-label";
      label.textContent = links.some(a => (a.getAttribute("href") || "") === "#/kontak") ? "Informasi Pemesanan" : "Baca Juga";
      box.appendChild(label);
      links.forEach(a => box.appendChild(a.cloneNode(true)));
      extra.forEach(el => el.remove());
      p.replaceWith(box);
    });
  }

  function sanitizeArticle(root) {
    root.innerHTML = cleanShortcodesHtml(root.innerHTML);
    const bacaJuga = stripBacaJuga(root);
    root.querySelectorAll("script,style,iframe,form,input,button,noscript,link,meta,.sharedaddy,.jp-relatedposts,.wpcnt,.adsbygoogle,.post-navigation,.navigation").forEach(el => el.remove());
    root.querySelectorAll("img").forEach(img => {
      const ds = img.getAttribute("data-src");
      const dss = img.getAttribute("data-srcset");
      if (ds) img.setAttribute("src", ds);
      if (dss) img.setAttribute("srcset", dss);
      img.removeAttribute("data-src");
      img.removeAttribute("data-srcset");
      img.removeAttribute("data-sizes");
      img.removeAttribute("loading");
      img.removeAttribute("class");
      const src = img.getAttribute("src") || "";
      if (!src || /^data:image\/gif/.test(src)) {
        const cand = dss ? dss.split(",")[0].trim().split(/\s+/)[0] : ds;
        if (cand) img.setAttribute("src", cand);
      }
    });
    root.querySelectorAll("a").forEach(a => {
      const h = a.getAttribute("href") || "";
      const txt = (a.textContent || "").replace(/\s+/g, " ").trim();
      if (h && !/^(#|mailto:|tel:)/i.test(h)) {
        const local = articleHrefFor(h, a.textContent);
        if (local) {
          a.setAttribute("href", local);
          a.removeAttribute("target");
          a.removeAttribute("rel");
          return;
        }
        if (/bonekaku\.(co\.id|id)/i.test(txt)) {
          a.setAttribute("href", "#/");
          a.removeAttribute("target");
          a.removeAttribute("rel");
          return;
        }
        if (/^[\d\s()+-]{7,}$/.test(txt)) {
          a.setAttribute("href", "tel:" + txt.replace(/[^\d+]/g, ""));
          a.removeAttribute("target");
          a.removeAttribute("rel");
          return;
        }
        if (/linktr\.ee|kontak/i.test(h) || /kontak/i.test(txt)) {
          a.setAttribute("href", "#/kontak");
          a.removeAttribute("target");
          a.removeAttribute("rel");
          return;
        }
        try { a.setAttribute("href", new URL(h, "https://bonekaku.co.id").href); } catch (err) {}
      }
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    markInlineRelated(root);
    promoteHeadings(root);
    root.querySelectorAll("table").forEach(t => { t.style.maxWidth = "100%"; t.style.width = "100%"; });
    root.querySelectorAll("p").forEach(p => {
      if (p.querySelector("img,iframe,video,table")) return;
      if (!p.textContent.replace(/\u00a0/g, " ").trim()) p.remove();
    });
    root.querySelectorAll("img").forEach(img => {
      const src = img.getAttribute("src") || "";
      if (!src || img.closest("a")) return;
      const a = document.createElement("a");
      a.className = "ad-img";
      a.setAttribute("href", src);
      a.setAttribute("data-lightbox", "");
      img.parentNode.insertBefore(a, img);
      a.appendChild(img);
    });
    root.__bacaJuga = bacaJuga;
    return root;
  }

  function extractArticle(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const el = doc.querySelector(".entry-content") || doc.querySelector("article") || doc.body;
    return sanitizeArticle(el.cloneNode(true));
  }

  async function renderArticlePage(slug) {
    if (!adContent) return;
    const art = findArticle(slug);
    const hero = adHero ? adHero.closest(".ad-hero") : null;
    if (art) {
      if (adHero) {
        if (art.img) adHero.src = art.img; else adHero.removeAttribute("src");
        adHero.alt = art.title;
      }
      if (hero) hero.classList.toggle("no-img", !art.img);
      if (adDate) adDate.textContent = art.date;
      if (adTitle) adTitle.textContent = art.title;
      if (adAuthorName) adAuthorName.textContent = art.author || DEFAULT_AUTHOR;
      if (adAuthorAvatar) adAuthorAvatar.textContent = /bonekaku/i.test(art.author || DEFAULT_AUTHOR) ? "BK" : adInitials(art.author || DEFAULT_AUTHOR);
      document.title = window.bkI18n ? window.bkI18n.setDocTitle(art.title + " \u2013 Bonekaku") : art.title + " \u2013 Bonekaku";
    } else {
      if (adHero) { adHero.removeAttribute("src"); adHero.alt = ""; }
      if (hero) hero.classList.add("no-img");
      if (adDate) adDate.textContent = "";
      if (adTitle) adTitle.textContent = "Artikel tidak ditemukan";
    }
    if (!art) {
      renderArticleExtras(null, "");
      adRenderComments(null);
      adContent.innerHTML = '<div class="ad-empty"><b>Artikel tidak ditemukan</b><p>Artikel yang Anda cari tidak tersedia. Silakan kembali ke daftar artikel.</p></div>';
      return;
    }
    adRenderComments(art);
    if (art.source === "admin") {
      const html = admSanitizeHtml(art.content || "");
      adContent.innerHTML = html || '<div class="ad-empty"><b>Artikel masih kosong</b><p>Isi artikel belum ditambahkan oleh admin.</p></div>';
      if (window.bkI18n) window.bkI18n.afterArticleBody(art.slug);
      renderArticleExtras(art, art.related || "");
      return;
    }
    renderArticleExtras(art, "");
    adContent.innerHTML = '<div class="am-loading"><div class="am-spinner"></div><span>Memuat artikel\u2026</span></div>';
    try {
      let node = articleCache[art.url];
      if (!node) {
        const sf = (window.root && window.root.superFetch) || window.superFetch;
        if (!sf) throw new Error("superFetch tidak tersedia");
        const html = await sf(art.url).then(r => r.text());
        node = extractArticle(html);
        articleCache[art.url] = node;
      }
      if (findArticle(slug) !== art) return;
      adContent.innerHTML = node.innerHTML;
      if (window.bkI18n) window.bkI18n.afterArticleBody(art.slug);
      renderArticleExtras(art, node.__bacaJuga || "");
    } catch (err) {
      adContent.innerHTML = '<div class="ad-empty"><b>Gagal memuat isi artikel.</b><p>Silakan buka artikel ini langsung di website Bonekaku melalui tombol di atas.</p></div>';
    }
  }

  function adInitials(name) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "?";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  function adSetNavCard(link, titleEl, art) {
    if (!link) return;
    if (!art) {
      link.setAttribute("aria-disabled", "true");
      link.removeAttribute("href");
      if (titleEl) titleEl.textContent = "Tidak ada artikel";
      return;
    }
    link.removeAttribute("aria-disabled");
    link.setAttribute("href", "#/artikel/" + art.slug);
    if (titleEl) titleEl.textContent = art.title;
  }

  function renderArticleExtras(art, relatedSlug) {
    if (adBacaJuga) adBacaJuga.hidden = true;
    if (adPostNav) adPostNav.hidden = true;
    if (!art) return;

    let rel = findArticle(relatedSlug);
    const idx = articleIndex(art.slug);
    if ((!rel || rel.slug === art.slug) && idx >= 0) {
      const cands = [ARTICLES[idx + 1], ARTICLES[idx - 1]];
      for (const cand of cands) {
        if (cand && cand.slug !== art.slug) { rel = cand; break; }
      }
    }
    if (adBacaJuga && rel && rel.slug !== art.slug) {
      adBacaJuga.hidden = false;
      if (adBacaJugaLink) adBacaJugaLink.setAttribute("href", "#/artikel/" + rel.slug);
      if (adBacaJugaTitle) adBacaJugaTitle.textContent = rel.title;
      if (adBacaJugaThumb) {
        adBacaJugaThumb.innerHTML = rel.img
          ? '<img decoding="async"  src="' + admEsc(rel.img) + '" alt="' + admEsc(rel.title) + '" loading="lazy">'
          : "";
      }
    }

    if (adPostNav) {
      const prev = idx >= 0 && idx < ARTICLES.length - 1 ? ARTICLES[idx + 1] : null;
      const next = idx > 0 ? ARTICLES[idx - 1] : null;
      adPostNav.hidden = !(prev || next);
      adSetNavCard(adPrevLink, adPrevTitle, prev);
      adSetNavCard(adNextLink, adNextTitle, next);
    }
  }

  /* ---------- artikel: kolom komentar ---------- */
  const AD_COMMENTS_FOLDER = "bonekakuComments";
  const AD_COMMENT_ADMIN = "Bonekaku.co.id";
  const AD_COMMENT_ADMIN_TEXT = "Terima kasih sudah membaca artikel ini. Semoga informasinya bermanfaat! Jika Anda ingin memesan boneka souvenir, bantal custom, maskot, atau bean bag dari Bonekaku, silakan hubungi kami lewat menu Kontak atau tanyakan langsung pada kolom komentar di bawah ini.";
  const ADC_MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  let adCommentSlug = "";
  let adCommentArtDate = "";
  let adcSocket = null;
  let adcConnecting = null;
  let adcLive = [];
  let adcLiveFor = "";
  let adcSource = "";

  function adCommentFolder() {
    const r = window.root;
    return r && r.kv && r.kv[AD_COMMENTS_FOLDER] ? r.kv[AD_COMMENTS_FOLDER] : null;
  }
  function adCommentNow() {
    const d = new Date();
    return d.getDate() + " " + ADC_MONTHS[d.getMonth()] + " " + d.getFullYear();
  }
  function adCommentDateOf(ts) {
    const d = new Date(ts);
    if (!ts || isNaN(d.getTime())) return "";
    return d.getDate() + " " + ADC_MONTHS[d.getMonth()] + " " + d.getFullYear();
  }
  function adCommentItemHTML(c, isAdmin) {
    const name = String(c.name || "Anonim").trim() || "Anonim";
    const nameHtml = c.url
      ? '<a href="' + admEsc(c.url) + '" target="_blank" rel="noopener noreferrer">' + admEsc(name) + "</a>"
      : "<b>" + admEsc(name) + "</b>";
    return '<article class="adc-item' + (isAdmin ? " is-admin" : "") + '">' +
      '<span class="adc-avatar">' + admEsc(isAdmin ? "BK" : adInitials(name)) + "</span>" +
      '<div class="adc-body"><div class="adc-head">' + nameHtml +
        (isAdmin ? '<span class="adc-badge">Admin</span>' : "") +
        '<span class="adc-date">' + admEsc(c.date || "") + "</span></div>" +
      '<div class="adc-text">' + admEsc(c.text || "").replace(/\n/g, "<br>") + "</div></div></article>";
  }

  function adcConnect() {
    if (adcConnecting) return adcConnecting;
    const r = window.root;
    if (!r || typeof r.createServerSocket !== "function") return Promise.resolve(null);
    let s;
    try { s = r.createServerSocket(); } catch (e) { return Promise.resolve(null); }
    adcSocket = s;
    adcConnecting = s.opened.then(function () { return s; }).catch(function () {
      if (adcSocket === s) adcSocket = null;
      return null;
    });
    s.addEventListener("message", adcOnMessage);
    s.addEventListener("close", function () {
      if (adcSocket === s) adcSocket = null;
      adcConnecting = null;
    });
    return adcConnecting;
  }

  function adcOnMessage(ev) {
    if (typeof ev.data !== "string") return;
    let d;
    try { d = JSON.parse(ev.data); } catch (e) { return; }
    if (!d || d.t !== "c" || !d.comment || d.slug !== adCommentSlug) return;
    if (adcLiveFor !== d.slug) { adcLive = []; adcLiveFor = d.slug; }
    const c = d.comment;
    if (!adcLive.some(function (x) { return x.ts === c.ts && x.n === c.n && x.t === c.t; })) adcLive.push(c);
    adcPaint();
  }

  function adcPaint() {
    const list = document.getElementById("adCommentList");
    if (!list) return;
    const items = [{ name: AD_COMMENT_ADMIN, text: AD_COMMENT_ADMIN_TEXT, date: adCommentArtDate, admin: true }];
    adcLive.forEach(function (c) {
      items.push({ name: c.n, url: c.u, text: c.t, date: adCommentDateOf(c.ts), ts: c.ts });
    });
    list.innerHTML = '<h3 class="adc-count">' + items.length + " Komentar</h3>" +
      '<div class="adc-list">' + items.map(function (c) { return adCommentItemHTML(c, !!c.admin); }).join("") + "</div>";
  }

  async function adcLoad(slug) {
    const s = await adcConnect();
    if (adCommentSlug !== slug) return;
    if (s) {
      try {
        const raw = await s.rpc.commentsList(slug);
        if (adCommentSlug !== slug) return;
        let arr = [];
        try { arr = JSON.parse(raw) || []; } catch (e) { arr = []; }
        if (!Array.isArray(arr)) arr = [];
        adcLive = arr;
        adcLiveFor = slug;
        adcSource = "server";
        adcPaint();
        if (s.readyState === 1) s.send(JSON.stringify({ t: "sub", slug: slug }));
        return;
      } catch (e) {}
    }
    if (adCommentSlug !== slug) return;
    const folder = adCommentFolder();
    if (!folder) { adcPaint(); return; }
    try {
      const v = await folder.get(slug);
      if (adCommentSlug !== slug || !Array.isArray(v)) return;
      adcLive = v.map(function (c) { return { n: c.name, u: c.url, t: c.text, ts: c.ts || 0 }; });
      adcLiveFor = slug;
      adcSource = "local";
      adcPaint();
    } catch (e) {}
  }

  async function adRenderComments(art) {
    const section = document.getElementById("adComments");
    const list = document.getElementById("adCommentList");
    if (!section || !list) return;
    if (!art || !art.slug) { section.hidden = true; adCommentSlug = ""; adcLive = []; adcLiveFor = ""; return; }
    section.hidden = false;
    const changed = adCommentSlug !== art.slug;
    adCommentSlug = art.slug;
    adCommentArtDate = art.date || "";
    if (changed) { adcLive = []; adcLiveFor = ""; adcSource = ""; }
    const msg = document.getElementById("adcMsg");
    if (msg) msg.hidden = true;
    adcPaint();
    await adcLoad(art.slug);
  }

  async function adSubmitComment(e) {
    e.preventDefault();
    const form = e.currentTarget || document.getElementById("adCommentForm");
    const nameEl = document.getElementById("adcName");
    const emailEl = document.getElementById("adcEmail");
    const urlEl = document.getElementById("adcUrl");
    const textEl = document.getElementById("adcComment");
    const msg = document.getElementById("adcMsg");
    const btn = document.getElementById("adcSubmit");
    if (!nameEl || !emailEl || !textEl || !btn) return;
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const url = urlEl ? urlEl.value.trim() : "";
    const text = textEl.value.trim();
    const show = function (t, ok) { if (!msg) return; msg.textContent = t; msg.hidden = false; msg.className = "adc-msg " + (ok ? "ok" : "err"); };
    if (!text) { show("Komentar tidak boleh kosong.", false); textEl.focus(); return; }
    if (!name) { show("Nama wajib diisi.", false); nameEl.focus(); return; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { show("Alamat email yang valid wajib diisi.", false); emailEl.focus(); return; }
    const slug = adCommentSlug;
    if (!slug) return;
    const oldLabel = btn.textContent;
    btn.disabled = true; btn.textContent = "Mengirim...";
    let done = false;
    try {
      if (adcSource === "local") {
        const folder = adCommentFolder();
        let stored = [];
        if (folder) { try { const v = await folder.get(slug); if (Array.isArray(v)) stored = v; } catch (err) {} }
        stored.push({ name: name, text: text, url: url, date: adCommentNow(), ts: Date.now() });
        if (folder) { try { await folder.set(slug, stored); } catch (err) {} }
        if (adCommentSlug === slug) {
          adcLive = stored.map(function (c) { return { n: c.name, u: c.url, t: c.text, ts: c.ts || 0 }; });
          adcLiveFor = slug;
          adcPaint();
        }
        done = true;
      } else {
        const s = await adcConnect();
        if (!s || s.readyState !== 1) {
          show("Koneksi komentar terputus. Muat ulang halaman lalu coba lagi.", false);
        } else {
          const raw = await s.rpc.commentsPost(JSON.stringify({ slug: slug, name: name, url: url, text: text }));
          let res = {};
          try { res = JSON.parse(raw) || {}; } catch (err) { res = {}; }
          if (!res.ok) {
            show(res.error || "Komentar gagal dikirim. Coba lagi.", false);
          } else {
            if (adCommentSlug === slug && res.comment && !adcLive.some(function (x) { return x.ts === res.comment.ts && x.n === res.comment.n; })) {
              adcLive.push(res.comment);
              adcLiveFor = slug;
              adcPaint();
            }
            done = true;
          }
        }
      }
    } catch (err) {
      show("Komentar gagal dikirim. Coba lagi.", false);
    }
    btn.disabled = false; btn.textContent = oldLabel;
    if (done) {
      if (form && form.reset) form.reset();
      show("Terima kasih! Komentar Anda sudah dikirim dan tayang di bawah ini.", true);
    }
  }
  (function () {
    const f = document.getElementById("adCommentForm");
    if (f) f.addEventListener("submit", adSubmitComment);
  })();

  function drawDolls() {
    if (!dollBg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const w = (dollBg.width = dollBg.offsetWidth || window.innerWidth);
    const h = (dollBg.height = dollBg.offsetHeight || 640);
    const ctx = dollBg.getContext("2d");
    const t = reduced ? 0 : performance.now() / 1000;

    const dolls = [];
    for (let i = 0; i < 16; i++) {
      dolls.push({
        x: (i * 137 + 61) % 100,
        y: (i * 83 + 29) % 100,
        s: 0.7 + ((i * 53) % 40) / 40 * 1.7,
        sp: 0.4 + ((i * 29) % 50) / 50,
        ph: (i * 97) % 360,
        rot: ((i * 41) % 80) - 40,
        hue: i % 3
      });
    }

    function teddy(cx, cy, r, fill, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.arc(cx - r * 0.55, cy - r * 0.9, r * 0.42, 0, 7);
      ctx.arc(cx + r * 0.55, cy - r * 0.9, r * 0.42, 0, 7);
      ctx.arc(cx, cy - r * 0.35, r * 0.72, 0, 7);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.95, 0, 7);
      ctx.arc(cx, cy + r * 1.05, r * 1.05, 0, 7);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - r * 1.15, cy - r * 0.05, r * 0.42, 0, 7);
      ctx.arc(cx + r * 1.15, cy - r * 0.05, r * 0.42, 0, 7);
      ctx.fill();
      ctx.restore();
    }

    ctx.clearRect(0, 0, w, h);
    const fills = ["rgba(255,159,26,.5)", "rgba(23,27,35,.1)", "rgba(15,59,62,.45)", "rgba(27,94,97,.35)"];
    const tints = ["#FFB84D", "#ECEEF1", "#1B5E61", "#FF9F1A"];

    dolls.forEach((d, i) => {
      const yy = (d.y / 100) * h;
      const xx = (d.x / 100) * w;
      const bob = Math.sin(t * d.sp + d.ph) * 26;
      const alpha = 0.07 + ((i * 37) % 100) / 100 * 0.16;
      const r = d.s * 17;
      ctx.save();
      ctx.translate(xx, yy + bob);
      ctx.rotate((d.rot + Math.sin(t * d.sp * 0.8 + d.ph) * 8) * Math.PI / 180);
      teddy(0, 0, r, tints[d.hue], alpha);
      ctx.restore();
    });

    for (let i = 0; i < 42; i++) {
      const x = ((i * 173 + 13) % 100) / 100 * w;
      const y = (((i * 61 + 47) % 100) + Math.sin(t * 0.5 + i) * 3) / 100 * h;
      const r = 1 + ((i * 31) % 40) / 20;
      ctx.globalAlpha = 0.12 + ((i * 17) % 60) / 100 * 0.3;
      ctx.fillStyle = i % 4 === 0 ? "#FFB84D" : i % 4 === 2 ? "#FF9F1A" : "#ECEEF1";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 7);
      ctx.fill();
    }

    if (!reduced) requestAnimationFrame(drawDolls);
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) drawDolls();
  else requestAnimationFrame(drawDolls);

  const chips = document.querySelectorAll(".filter-chip");
  const tiles = document.querySelectorAll(".kat-tile");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.f;
      tiles.forEach(tile => {
        tile.classList.toggle("hide", f !== "all" && tile.dataset.cat !== f);
      });
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("visible"));
  }

  /* Pause the continuously-scrolling marquees while they are off-screen so
     phones don't keep compositing hundreds of images in the background. */
  (function () {
    if (!("IntersectionObserver" in window)) return;
    const tracks = document.querySelectorAll(".marquee-track, .new-track, .client-track");
    if (!tracks.length) return;
    const mIO = new IntersectionObserver(entries => {
      entries.forEach(en => en.target.classList.toggle("is-paused", !en.isIntersecting));
    }, { rootMargin: "200px 0px" });
    tracks.forEach(t => mIO.observe(t));
  })();

  const pageNames = "home,katalog,layanan,tentang,kontak,artikel,admin".split(",");
  const allPages = pageNames.concat(["artikel-detail"]);

  function routeInfo() {
    const h = window.location.hash.replace(/^#\/?/, "");
    const seg = h.split("/").filter(Boolean);
    if (seg[0] === "artikel" && seg[1]) return { page: "artikel-detail", slug: seg.slice(1).join("/") };
    if (seg[0] === "katalog" && seg[1]) return { page: "katalog", slug: null, cat: seg[1] };
    if (pageNames.indexOf(seg[0]) > -1) return { page: seg[0], slug: null };
    return { page: "home", slug: null };
  }

  function curPage() { return routeInfo().page; }

  function curSlug() { return routeInfo().slug; }

  function pageTitle(n) {
    if (n === "katalog") return "Katalog \u2013 Bonekaku";
    if (n === "layanan") return "Layanan \u2013 Bonekaku";
    if (n === "tentang") return "Tentang Kami \u2013 Bonekaku";
    if (n === "kontak") return "Kontak Kami \u2013 Bonekaku";
    if (n === "artikel") return "Artikel \u2013 Bonekaku";
    if (n === "admin") return "Admin Panel \u2013 Bonekaku";
    if (n === "artikel-detail") {
      const a = findArticle(curSlug());
      return (a ? a.title : "Artikel") + " \u2013 Bonekaku";
    }
    return "Bonekaku \u2013 Pusat Souvenir dan Boneka Terlengkap";
  }

  function showPage(name) {
    allPages.forEach(n => {
      const el = document.getElementById("page-" + n);
      if (el) el.hidden = n !== name;
    });
    const preFoot = document.getElementById("preFoot");
    if (preFoot) preFoot.hidden = (name === "artikel" || name === "artikel-detail" || name === "admin");
    document.body.classList.toggle("adm-active", name === "admin");
    if (name !== "admin") document.body.classList.remove("adm-panel-on");
    const activeNav = name === "artikel-detail" ? "artikel" : name;
    document.querySelectorAll(".nav-link").forEach(a => {
      a.classList.toggle("active", a.getAttribute("data-page") === activeNav);
    });
    const pageEl = document.getElementById("page-" + name);
    if (pageEl) pageEl.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    if (name === "artikel-detail") renderArticlePage(curSlug());
    if (name !== "home" && name !== "artikel-detail" && pageEl) {
      pageEl.querySelectorAll("img, iframe").forEach(im => {
        if (im.loading !== "lazy") return;
        const isImg = im.tagName === "IMG";
        const ready = im.complete && (!isImg || im.naturalWidth > 0);
        if (ready) return;
        im.loading = "eager";
        const src = im.getAttribute("src");
        if (src) im.src = src;
      });
    }
    if (name === "katalog") {
      startFlips();
      if (setCatalogCategory) setCatalogCategory(routeInfo().cat);
    } else stopFlips();
    if (name === "admin" && window.AdmPanel) window.AdmPanel.enter();
    window.scrollTo(0, 0);
    document.title = window.bkI18n ? window.bkI18n.setDocTitle(pageTitle(name)) : pageTitle(name);
  }

  function scrollToAnchor(el) {
    if (!el) return;
    const header = document.getElementById("siteHeader");
    const offset = header ? header.getBoundingClientRect().height + 10 : 0;
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offset);
    const startY = window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
    setTimeout(() => {
      if (Math.abs(window.scrollY - startY) < 4 && Math.abs(window.scrollY - top) > 4) {
        window.scrollTo({ top, behavior: "instant" });
      }
    }, 500);
  }

  window.addEventListener("hashchange", () => {
    const seg = window.location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    const isRoute = seg.length === 0 || pageNames.indexOf(seg[0]) > -1 || seg[0] === "artikel";
    if (!isRoute) {
      const el = document.getElementById(seg.join("/"));
      if (el) {
        const home = document.getElementById("page-home");
        if (home && home.hidden) showPage("home");
        scrollToAnchor(el);
        try { history.replaceState(null, "", "#/"); } catch (err) {}
        return;
      }
    }
    showPage(curPage());
  });

  let setCatalogCategory = null;

  const catGrid = document.getElementById("catGrid");

    const CAT_INFO = {
      "most-favorite":["Most Favorite","Koleksi ready stock paling laris dengan desain terbaik dan model pilihan. Siap kirim untuk berbagai kebutuhan acara anda.","https://bonekaku.co.id/katalog-ready-stock/"],
      "animal":["Animal Series","Seri boneka binatang yang lucu dan menggemaskan — pilihan favorit untuk souvenir dan koleksi.","https://bonekaku.co.id/katalog-animal-series/"],
      "boneka-sovenir":["Boneka Souvenir","Boneka souvenir untuk event-event tertentu dengan desain yang terbaik dan model yang dapat anda pilih.","https://bonekaku.co.id/katalog-boneka-sovenir/"],
      "bantal":["Bantal Custom","Bantal juga dapat dijadikan media promosi yang menarik dan efektif. Kami menyediakan dan alternatif desain bantal yang dapat anda pilih.","https://bonekaku.co.id/katalog-bantal-custom/"],
      "boneka-custom":["Boneka Custom","Punya mascot andalan? Bingung menjadikannya menarik tidak hanya sebuah logo? Bawa pada kami, dan kami akan bantu untuk wujudkan dalam bentuk boneka.","https://bonekaku.co.id/katalog-boneka-custom/"],
      "graduation":["Graduation Series","Seri boneka wisuda — hadiah penuh makna untuk merayakan kelulusan dengan gaya khas Bonekaku.","https://bonekaku.co.id/katalog-graduation-series/"],
      "maskot":["Maskot / Badut","Kami juga menerima pemesanan maskot / badut untuk media promosi. Dengan bahan dan rangka yang kokoh.","https://bonekaku.co.id/katalog-maskot/"],
      "masker":["Masker","Kami juga menyediakan masker sebagai souvenir dan media promosi yang efektif.","https://bonekaku.co.id/katalog-masker/"]
    };
    const PRODUCTS_RAW = [["most-favorite","Most Favorite","Bear Jeslyn, 12cm","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Jeslyn-12-outfit-scaled.jpg"],["most-favorite","Most Favorite","Bear Vico, 15cm","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Vico-3outfit-scaled.jpg"],["most-favorite","Most Favorite","Bear Mayna, 15cm","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Mayna-3outfit-scaled.jpg"],["most-favorite","Most Favorite","Bear Bobby, 18cm","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Bobby-18-outfit2-scaled.jpg"],["most-favorite","Most Favorite","Bear Boy-Girl, 20cm standing","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Boy-Girl-outfit-scaled.jpg"],["most-favorite","Most Favorite","Bear Kempins, 22cm","https://bonekaku.co.id/wp-content/uploads/2021/05/Boneka-Bear-Kempinski-22-3outfit-scaled.jpg"],["animal","Animal Series","Clown Fish","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Clown-Fish.png"],["animal","Animal Series","Dolphin","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Lumba-Lumba__.png"],["animal","Animal Series","Goat","https://bonekaku.co.id/wp-content/uploads/2021/02/Goat.png"],["animal","Animal Series","Goat 2","https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Goat-2__.png"],["animal","Animal Series","Lion","https://bonekaku.co.id/wp-content/uploads/2021/02/Lion.png"],["animal","Animal Series","Lobster","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Lobster.png"],["animal","Animal Series","Mini Leopard","https://bonekaku.co.id/wp-content/uploads/2021/02/Mini-Leopard.png"],["animal","Animal Series","Monkey","https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Monkey_.png"],["animal","Animal Series","Orang Utan","https://bonekaku.co.id/wp-content/uploads/2021/02/Orang-Utan.png"],["animal","Animal Series","Owl 02","https://bonekaku.co.id/wp-content/uploads/2019/09/Image-Owl-02_.png"],["animal","Animal Series","Owl Graduation Series","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Owl-Graduation-Series.png"],["animal","Animal Series","Penguin","https://bonekaku.co.id/wp-content/uploads/2021/02/Pinguin.png"],["animal","Animal Series","Animal Bintang Laut","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Bintang-Laut-12cm-1-scaled.jpg"],["animal","Animal Series","Animal Rabbit Yelvo","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-15cm-Yelvo-scaled.jpg"],["animal","Animal Series","Animal Rabbit Pocket","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-Pocket-15cm-scaled.jpg"],["animal","Animal Series","Animal Tupai","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Tupai-1-scaled.jpg"],["animal","Animal Series","Animal Orang Utan","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Orang-Utan-17cm-scaled.jpg"],["animal","Animal Series","Animal Beruang Madu","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Beruang-Madu-18cm-scaled.jpg"],["animal","Animal Series","Animal Macan","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Macan-18cm-scaled.jpg"],["animal","Animal Series","Animal Panda 18cm velboa","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Panda-18cm-velboa-scaled.jpg"],["animal","Animal Series","Animal Pinguin outfit","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Pinguin-18cm-outfit-scaled.jpg"],["animal","Animal Series","Animal Gajah 20cm","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-20cm-scaled.jpg"],["animal","Animal Series","Animal Gajah Duduk + outfit","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-Duduk-outfit-scaled.jpg"],["animal","Animal Series","Animal Rabbit Yelvo +outfit","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-15cm-Yelvo-outfit-scaled.jpg"],["animal","Animal Series","Animal Panda 15cm","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Panda-15cm-Velboa-scaled.jpg"],["animal","Animal Series","Animal Kura","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Kura-15cm-side-scaled.jpg"],["animal","Animal Series","Animal Doggy","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Doggy-12-scaled.jpg"],["animal","Animal Series","Animal Gajah","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Gajah-12-scaled.jpg"],["animal","Animal Series","Animal Goat","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Goat-12-scaled.jpg"],["animal","Animal Series","Animal Hippo","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Hippo-12-scaled.jpg"],["animal","Animal Series","Animal Ikan wisuda bank Ina","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Ikan-wisuda-bank-Ina-12cm-scaled.jpg"],["animal","Animal Series","Boneka Animal Kodok","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Kodok-12-scaled.jpg"],["animal","Animal Series","Animal Monkey","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Monkey-12-scaled.jpg"],["animal","Animal Series","Animal Rabbit","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Rabbit-12-scaled.jpg"],["animal","Animal Series","Animal Sapi","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Sapi-12-scaled.jpg"],["animal","Animal Series","Animal Snoopy","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Series-12-Snoopy-scaled.jpg"],["animal","Animal Series","Boneka Animal Koala","https://bonekaku.co.id/wp-content/uploads/2021/03/Boneka-Animal-Koala-20cm-scaled.jpg"],["bantal","Bantal Custom","Bantal Leher U Animal","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-01.png"],["bantal","Bantal Custom","Bantal Donut 03","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut-03.png"],["bantal","Bantal Custom","Bantal Donut 02","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut-02.png"],["bantal","Bantal Custom","Bantal Leher U Custom","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-03.png"],["bantal","Bantal Custom","Bantal Leher","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-02.png"],["bantal","Bantal Custom","Bantal","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-06.png"],["bantal","Bantal Custom","Bantal Sofa","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Sofa-02.png"],["bantal","Bantal Custom","Bantal Donut","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Donut.png"],["bantal","Bantal Custom","Bantal Leher U","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-U-02.png"],["bantal","Bantal Custom","Bantal Leher U Printing","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-04.png"],["bantal","Bantal Custom","Bantal Love Velboa","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-03.png"],["bantal","Bantal Custom","Bantal Leher Dog Bones/Bantal Tulang","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Leher-Dog-Bones.png"],["bantal","Bantal Custom","Bantal Love Yelvo","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-02.png"],["bantal","Bantal Custom","Bantal 02","https://bonekaku.co.id/wp-content/uploads/2021/02/Bantal-Tidur.png"],["boneka-custom","Boneka Custom","Boneka Custom","https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom-3.jpeg"],["boneka-custom","Boneka Custom","Boneka Custom","https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom.jpeg"],["boneka-custom","Boneka Custom","Boneka Custom","https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.42-AM-1.jpeg"],["boneka-custom","Boneka Custom","Boneka Custom 13","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-13.png"],["boneka-custom","Boneka Custom","Boneka Custom 12","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-12.png"],["boneka-custom","Boneka Custom","Boneka Custom 11","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-11a.png"],["boneka-custom","Boneka Custom","Boneka Custom 10","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-10.png"],["boneka-custom","Boneka Custom","Boneka Custom 09","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-09.png"],["boneka-custom","Boneka Custom","Boneka Custom 08","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-08.png"],["boneka-custom","Boneka Custom","Boneka Custom 07","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-07.png"],["boneka-custom","Boneka Custom","Boneka Custom 06","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-06.png"],["boneka-custom","Boneka Custom","Boneka Custom 05","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Costum-06a.png"],["boneka-custom","Boneka Custom","Boneka Custom -Bear 01","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Custom-05.png"],["boneka-custom","Boneka Custom","Boneka Custom 01","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-04.png"],["boneka-custom","Boneka Custom","Boneka Custom 02","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-03.png"],["boneka-custom","Boneka Custom","Boneka Custom 03","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-boneka-Custom-02.png"],["boneka-custom","Boneka Custom","Boneka Custom 04","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Custom-01.png"],["boneka-custom","Boneka Custom","Graduation Series","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Bioneka-Custom-11.png"],["boneka-sovenir","Boneka Souvenir","Salman Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Salman-Bear.png"],["boneka-sovenir","Boneka Souvenir","Jason Bear","https://bonekaku.co.id/wp-content/uploads/2020/08/2-1.jpg"],["boneka-sovenir","Boneka Souvenir","Jesslyn Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Jeslyn-Bear.jpg"],["boneka-sovenir","Boneka Souvenir","Vico Bear","https://bonekaku.co.id/wp-content/uploads/2020/08/3.jpg"],["boneka-sovenir","Boneka Souvenir","Arnold Bear","https://bonekaku.co.id/wp-content/uploads/2020/08/4.jpg"],["boneka-sovenir","Boneka Souvenir","Boneka Souvenir - Classic Bear 01","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Boneka-Classic-Bear_.png"],["boneka-sovenir","Boneka Souvenir","FF Bear (Forever Friends ) Bear","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-FF-Bear-Forever-Friends-Bear.png"],["boneka-sovenir","Boneka Souvenir","Bobby Bear (02)","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Bobby-Bear-2.png"],["boneka-sovenir","Boneka Souvenir","Jeslyn Bear","https://bonekaku.co.id/wp-content/uploads/2018/06/Image-Jeslyn-Bear.png"],["boneka-sovenir","Boneka Souvenir","Mayna Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Mayna-Bear.png"],["boneka-sovenir","Boneka Souvenir","Vico Bear Sol Micro","https://bonekaku.co.id/wp-content/uploads/2021/02/Vico-Bear-Sol-Micro.png"],["boneka-sovenir","Boneka Souvenir","Vico Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Vico-Bear.png"],["boneka-sovenir","Boneka Souvenir","Boneka Souvenir - Classic Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Souvenir-Classic-Bear.png"],["boneka-sovenir","Boneka Souvenir","Bobby Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Bobby-Bear.png"],["boneka-sovenir","Boneka Souvenir","Archie Bear","https://bonekaku.co.id/wp-content/uploads/2021/02/Archie-Bear.png"],["boneka-sovenir","Boneka Souvenir","Kempinski Bear","https://bonekaku.co.id/wp-content/uploads/2020/08/3-1.jpg"],["graduation","Graduation Series","Owl Graduation Series","https://bonekaku.co.id/wp-content/uploads/2021/02/Owl-Graduation.png"],["graduation","Graduation Series","Graduation series - Jeslyn Bear","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series.png"],["graduation","Graduation Series","Graduation series - Bobby/Bonnie","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-02.png"],["graduation","Graduation Series","Graduation series - Vico Bear","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-04.png"],["graduation","Graduation Series","Graduation series -Mery/Kempin Bear","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Graduation-series-04_.png"],["graduation","Graduation Series","Graduation Series","https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom-2.jpeg"],["graduation","Graduation Series","Graduation Series","https://bonekaku.co.id/wp-content/uploads/2021/02/Boneka-Custom.jpeg"],["maskot","Maskot / Badut","Badut 01","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Badut-01a.png"],["masker","Masker","Masker","https://bonekaku.co.id/wp-content/uploads/2021/02/Masker-Custom.jpeg"]];
    const items = PRODUCTS_RAW.map(row => ({
      cat: row[0], tag: row[1], title: row[2], img: row[3],
      desc: CAT_INFO[row[0]][1],
      link: CAT_INFO[row[0]][2],
      label: "Lihat Katalog"
    }));

  function initCatalog() {
    if (!catGrid) return;
    let html = "";
    items.forEach(it => {
      const waIcon = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.13L2 22l5-1.35A10 10 0 1 0 12 2zm5.34 13.9c-.2.57-1.2 1.1-1.65 1.13-.43.04-.95.2-3.2-.67-2.7-1.03-4.4-3.7-4.54-3.87-.13-.17-1.08-1.44-1.08-2.75s.68-1.95.92-2.22c.24-.26.52-.33.7-.33l.5.01c.16 0 .37-.06.58.45.2.53.7 1.84.76 1.97.06.13.1.28.02.46-.08.17-.12.28-.24.43-.12.15-.26.34-.37.45-.12.13-.25.26-.11.51.14.26.62 1.02 1.33 1.66.92.82 1.7 1.08 1.93 1.2.23.12.37.1.5-.06.14-.16.57-.67.72-.9.16-.23.31-.19.52-.12.22.08 1.37.65 1.6.76.24.12.4.17.46.27.06.1.06.57-.14 1.14z"/></svg>';
      html += '<div class="flip-card catalog-card" data-cat="' + it.cat + '" data-search="' + it.title.toLowerCase() + '">' +
        '<div class="flip-inner">' +
          '<div class="flip-face flip-front">' +
            '<div class="face-img"><span class="face-tag">' + it.tag + '</span><img decoding="async"  src="' + it.img + '" alt="' + it.title + '" loading="lazy"></div>' +
            '<div class="face-name"><span>' + it.title + '</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg></div>' +
            '<div class="face-meta">' +
              '<p class="face-desc">' + it.desc + '</p>' +
              '<a class="face-wa" href="https://wa.me/6281385508611">' + waIcon + 'Order via WhatsApp</a>' +
            '</div>' +
          '</div>' +
          '<div class="flip-face flip-back">' +
            '<div><h4>' + it.title + '</h4><p>' + it.desc + '</p></div>' +
            '<div class="back-ctas"><a class="wa" href="https://wa.me/6281385508611">' + waIcon + 'Order via WhatsApp</a></div>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    catGrid.innerHTML = html;

    const filterPairsRaw = "all~Semua|most-favorite~Most Favorite|animal~Animal Series|boneka-sovenir~Boneka Souvenir|bantal~Bantal Custom|boneka-custom~Boneka Custom|graduation~Graduation Series|maskot~Maskot / Badut|masker~Masker";
    const filterPairs = filterPairsRaw.split("|").map(pair => {
      const p = pair.split("~");
      return { key: p.shift(), label: p.shift() };
    });

    let currentFilter = "all";
    let currentPage = 1;
    const PAGE_SIZE = 20;
    let matchedCards = [];

    function buildFilters() {
      const side = document.getElementById("catFilters");
      const chips = document.getElementById("catChips");
      let sideHtml = "";
      let chipHtml = "";
      filterPairs.forEach(fp => {
        const count = fp.key === "all" ? items.length : items.filter(it => it.cat === fp.key).length;
        const active = fp.key === currentFilter ? " active" : "";
        sideHtml += '<button class="cat-check' + active + '" data-f="' + fp.key + '" type="button"><span>' + fp.label + '</span><span class="n">' + count + '</span></button>';
        chipHtml += '<button class="cat-chip' + active + '" data-f="' + fp.key + '" type="button">' + fp.label + '</button>';
      });
      side.innerHTML = sideHtml;
      chips.innerHTML = chipHtml;
    }

    function applyFilter(resetPage) {
      const q = document.getElementById("catSearch").value.toLowerCase();
      const cards = Array.from(catGrid.querySelectorAll(".catalog-card"));
      matchedCards = [];
      cards.forEach(card => {
        const matchCat = currentFilter === "all" || card.getAttribute("data-cat") === currentFilter;
        const matchQ = q === "" || card.getAttribute("data-search").indexOf(q) > -1;
        const show = matchCat && matchQ;
        card.classList.remove("flip");
        const iEl = card.querySelector(".flip-inner");
        if (iEl && iEl.style.transform) {
          iEl.style.transition = "none";
          iEl.style.transform = "";
          iEl.style.transition = "";
        }
        card.style.transform = "";
        if (show) matchedCards.push(card);
      });
      if (resetPage !== false) currentPage = 1;
      renderPage(false);
      document.querySelectorAll(".cat-check, .cat-chip").forEach(b => {
        b.classList.toggle("active", b.getAttribute("data-f") === currentFilter);
      });
    }

    function renderPage(scroll) {
      const total = matchedCards.length;
      const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
      if (currentPage > pages) currentPage = pages;
      if (currentPage < 1) currentPage = 1;
      const start = (currentPage - 1) * PAGE_SIZE;
      const end = Math.min(start + PAGE_SIZE, total);
      const all = Array.from(catGrid.querySelectorAll(".catalog-card"));
      all.forEach(card => card.classList.add("hide"));
      matchedCards.slice(start, end).forEach(card => card.classList.remove("hide"));
      const el = document.getElementById("catCount");
      if (el) {
        el.innerHTML = total === 0
          ? "Tidak ada produk yang cocok"
          : "Menampilkan <b>" + (start + 1) + "&ndash;" + end + "</b> dari " + total + " produk";
      }
      buildPager(pages);
      if (scroll) {
        const target = document.querySelector(".catalog-main");
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function buildPager(pages) {
      const pager = document.getElementById("catPager");
      if (!pager) return;
      if (pages <= 1) { pager.innerHTML = ""; return; }
      const prev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="16" height="16" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
      const next = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" width="16" height="16" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
      let html = '<button class="pg-btn pg-arrow" data-p="' + (currentPage - 1) + '"' + (currentPage === 1 ? " disabled" : "") + ' aria-label="Halaman sebelumnya">' + prev + '</button>';
      let dots = false;
      for (let i = 1; i <= pages; i++) {
        const inRange = i === 1 || i === pages || Math.abs(i - currentPage) <= 1;
        if (!inRange) {
          if (!dots) { html += '<span class="pg-dots">&hellip;</span>'; dots = true; }
          continue;
        }
        dots = false;
        html += '<button class="pg-btn' + (i === currentPage ? " active" : "") + '" data-p="' + i + '"' + (i === currentPage ? ' aria-current="page"' : "") + '>' + i + '</button>';
      }
      html += '<button class="pg-btn pg-arrow" data-p="' + (currentPage + 1) + '"' + (currentPage === pages ? " disabled" : "") + ' aria-label="Halaman berikutnya">' + next + '</button>';
      pager.innerHTML = html;
    }

    function onFilterClick(e) {
      const btn = e.target.closest(".cat-check, .cat-chip");
      if (!btn) return;
      currentFilter = btn.getAttribute("data-f");
      applyFilter();
    }

    document.getElementById("catFilters").addEventListener("click", onFilterClick);
    document.getElementById("catChips").addEventListener("click", onFilterClick);
    document.getElementById("catSearch").addEventListener("input", applyFilter);
    document.getElementById("catClear").addEventListener("click", () => {
      currentFilter = "all";
      document.getElementById("catSearch").value = "";
      applyFilter();
    });

    const catPager = document.getElementById("catPager");
    if (catPager) {
      catPager.addEventListener("click", e => {
        const btn = e.target.closest(".pg-btn");
        if (!btn || btn.disabled) return;
        const p = parseInt(btn.getAttribute("data-p"), 10);
        if (!p || p === currentPage) return;
        currentPage = p;
        renderPage(true);
      });
    }

    catGrid.addEventListener("mouseover", e => {
      if (catGrid.classList.contains("view-list")) return;
      const card = e.target.closest(".flip-card");
      if (card && !card.classList.contains("flip")) {
        card.classList.add("flip");
        ensureFlip(card);
      }
    });

    catGrid.addEventListener("mouseout", e => {
      const card = e.target.closest(".flip-card");
      if (card) {
        card.classList.remove("flip");
        const inner = card.querySelector(".flip-inner");
        if (inner) {
          if (inner.style.transform) {
            inner.style.transition = "none";
            inner.style.transform = "";
            void inner.offsetWidth;
            inner.style.transition = "";
          }
        }
        card.style.transform = "";
      }
    });

    catGrid.addEventListener("mousemove", e => {
      if (catGrid.classList.contains("view-list")) return;
      const card = e.target.closest(".flip-card");
      if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = "perspective(900px) rotateY(" + (px * 10) + "deg) rotateX(" + (-py * 10) + "deg)";
    });

    function ensureFlip(card) {
      setTimeout(() => {
        const inner = card.querySelector(".flip-inner");
        if (!inner || !card.classList.contains("flip")) return;
        const t = getComputedStyle(inner).transform;
        if (t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)") {
          inner.style.transition = "none";
          inner.style.transform = "rotateY(180deg)";
        }
      }, 650);
    }

    catGrid.addEventListener("click", e => {
      if (e.target.closest("a")) return;
      const card = e.target.closest(".flip-card");
      if (card) {
        if (card.classList.contains("flip")) {
          card.classList.remove("flip");
          const inner = card.querySelector(".flip-inner");
          if (inner && inner.style.transform) {
            inner.style.transition = "none";
            inner.style.transform = "";
            void inner.offsetWidth;
            inner.style.transition = "";
          }
          card.style.transform = "";
        } else {
          card.classList.add("flip");
          ensureFlip(card);
        }
      }
    });

    const viewBtns = document.querySelectorAll(".view-btn");
    function setView(mode) {
      catGrid.classList.toggle("view-list", mode === "list");
      viewBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-view") === mode));
      try { localStorage.setItem("bonekaku-cat-view", mode); } catch (e) {}
    }
    viewBtns.forEach(b => b.addEventListener("click", () => setView(b.getAttribute("data-view"))));
    let savedView = "grid";
    try { savedView = localStorage.getItem("bonekaku-cat-view") || "grid"; } catch (e) {}
    setView(savedView);

    buildFilters();
    applyFilter();

    setCatalogCategory = function(cat) {
      currentFilter = (cat && CAT_INFO[cat]) ? cat : "all";
      const s = document.getElementById("catSearch");
      if (s) s.value = "";
      applyFilter();
    };
  }

  function startFlips() {}
  function stopFlips() {}

  const articleGrid = document.getElementById("articleGrid");

  function initArticles() {
    if (!articleGrid) return;
    const ARTICLES_RAW = [["Bantal Merchandise, Kenyamanan yang Membekas untuk Customer Anda","https://bonekaku.co.id/2021/06/15/bantal-merchandise-kenyamanan-yang-membekas-untuk-customer-anda/","https://bonekaku.co.id/wp-content/uploads/2021/06/b1.jpg","15 Juni 2021","Industri boneka kini sudah semakin luas mengembangkan sayapnya. Tidak hanya..."],["Peranan Maskot Boneka bagi Sebuah Perusahaan","https://bonekaku.co.id/2021/05/19/peranan-maskot-boneka-bagi-sebuah-perusahaan/","https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-2.jpg","19 Mei 2021","Anda pasti sudah tidak asing dengan maskot, bukan? Iya, betul....."],["Mencuci Boneka dengan Mesin Cuci, Ini Tips dan Trik nya!","https://bonekaku.co.id/2021/05/19/mencuci-boneka-dengan-mesin-cuci-ini-tips-dan-trik-nya/","https://bonekaku.co.id/wp-content/uploads/2021/05/Bonekaku-artikel-mei-1.jpg","19 Mei 2021","Bagi Anda yang hobi mengoleksi boneka, atau yang anaknya sangat..."],["Bonekaku Sebagai Produsen Beanbag di Jabodetabek","https://bonekaku.co.id/2021/01/04/bonekaku-sebagai-produsen-beanbag-di-jabodetabek/","https://bonekaku.co.id/wp-content/uploads/2020/08/WhatsApp-Image-2020-08-26-at-8.43.40-AM-2.jpeg","4 Januari 2021","Hallo sobat pencinta bonekaku, kini bonekaku telah produksi beanbag lhoo!!..."],["Cara Mudah Memilih Bean Bag Yang Berkualitas Agar Tidak salah Pilih","https://bonekaku.co.id/2020/12/23/3-cara-memilih-bean-bag-yang-berkualitas-agar-tidak-salah-pilih/","https://bonekaku.co.id/wp-content/uploads/2020/12/bean-bag-kantor.jpg","23 Desember 2020","Jauh sebelum Beanbag ada tempat duduk untuk santai waktu itu..."],["3 Cafe Yang Memiliki Maskot Boneka, Unik dan Bikin Betah","https://bonekaku.co.id/2020/12/08/3-cafe-yang-memiliki-maskot-boneka-unik-dan-bikin-betah/","https://bonekaku.co.id/wp-content/uploads/2020/12/Kafe-doraemon.jpg","8 Desember 2020","Boneka ternyata bukan hanya menemani anda dirumah atau dikamar-kamar saja..."],["5 Tempat Penyimpanan Boneka Agar Terlihat Rapih","https://bonekaku.co.id/2020/10/10/5-tempat-penyimpanan-boneka-agar-terlihat-rapih/","https://bonekaku.co.id/wp-content/uploads/2020/10/Boneka-di-kasur2.jpg","10 Oktober 2020","Tak dipungkiri bahwa terkadang boneka yang sudah kita beli atau..."],["Cara Merawat dan Mencuci Boneka","https://bonekaku.co.id/2020/09/25/cara-merawat-dan-mencuci-boneka/","https://bonekaku.co.id/wp-content/uploads/2020/09/a1.jpg","25 September 2020","Walau tidak terlihat kotor, boneka kesayangan juga perlu dibersihkan. Apalagi..."],["Product Baru Bonekaku Disaat Pandemi","https://bonekaku.co.id/2020/09/25/product-baru-bonekaku-disaat-pandemi/","https://bonekaku.co.id/wp-content/uploads/2020/09/20.jpg","25 September 2020","Halo sahabat bonekaku salam bahagia Semoga selalu dilimpahkan kesehatan dan..."],["Inspirasi Boneka Sebagai Objek Usaha","https://bonekaku.co.id/2020/08/27/inspirasi-boneka-sebagai-objek-usaha/","https://bonekaku.co.id/wp-content/uploads/2020/08/cafe-boneka.jpg","27 Agustus 2020","Beberapa negara yang ada di dunia sudah mulai memasuki fase..."],["Jangan Remehkan Manfaat Anak Bermain Boneka","https://bonekaku.co.id/2020/08/26/jangan-remehkan-manfaat-anak-bermain-boneka/","https://bonekaku.co.id/wp-content/uploads/2020/08/Bear.jpg","26 Agustus 2020","Bagi anak perempuan, boneka bisa jadi mainan kesayangannya. Boneka tersebut bahkan diberi..."],["Peran Maskot untuk Perusahaan.","https://bonekaku.co.id/2020/07/20/peran-maskot-untuk-perusahaan/","https://bonekaku.co.id/wp-content/uploads/2019/10/Image-Badut-01a.png","20 Juli 2020","Pembuatan maskot bagi perusahaan atau UMKM merupakan sebuah strategi branding..."],["Alasan kenapa harus memberikan Boneka sebagai merchandise.","https://bonekaku.co.id/2020/07/20/alasan-kenapa-harus-memberikan-boneka-sebagai-merchandise/","https://bonekaku.co.id/wp-content/uploads/2018/06/Boneka_Custome.png","20 Juli 2020","Dalam memberikan kenang-kenangan atau merchandise bagi pelanggan, lebih baik apabila..."],["Kain Boneka terbaik untuk di produksi masal","https://bonekaku.co.id/2020/07/20/kain-boneka-terbaik-untuk-di-produksi-masal/","https://bonekaku.co.id/wp-content/uploads/2020/07/Bahan-Rasfur-2-1030x560-1.png","20 Juli 2020","Dalam memproduksi boneka dengan jumlah yang banyak, bonekaku tidak serta..."],["Produksi Boneka Partai Besar dengan Kualitas Material Terjamin dari Bonekaku.","https://bonekaku.co.id/2020/07/20/produksi-boneka-partai-besar/","https://bonekaku.co.id/wp-content/uploads/2019/09/Bears-4-2.png","20 Juli 2020","Bonekaku Store membuat banyak boneka beruang favorit untuk diproduksi masal..."],["Apa itu Boneka Souvenir atau Promosi ??","https://bonekaku.co.id/2018/05/10/mengenal-jenis-jenis-bahan-boneka-2-2-2-2-2/","https://bonekaku.co.id/wp-content/uploads/2018/05/IMG_0190-scaled.jpg","10 Mei 2018","Boneka souvenir atau promosi adalah boneka yang dibuat khusus sebagai media branding perusahaan..."],["Mengenal Jenis – Jenis Bahan Boneka","https://bonekaku.co.id/2018/05/08/mengenal-jenis-jenis-bahan-boneka-2/","https://bonekaku.co.id/wp-content/uploads/2018/05/Bahan-Rasfur-1.png","8 Mei 2018","Kenali berbagai jenis bahan boneka yang biasa digunakan untuk produksi, mulai dari..."]];
    const raw = ARTICLES_RAW;
    BUILTIN_ARTICLES = raw.map(p => ({ source: "bonekaku", title: p[0], url: p[1], img: p[2], date: p[3], iso: admIdDateToIso(p[3]), slug: articleSlug(p[1]), excerpt: p[4] || "", author: p[5] || DEFAULT_AUTHOR }));
    ARTICLES = BUILTIN_ARTICLES.slice();
    renderArticleGrid();
  }

  function renderArticleGrid() {
    if (!articleGrid) return;
    if (!ARTICLES.length) {
      articleGrid.innerHTML = '<div class="ad-empty" style="grid-column:1/-1"><b>Belum ada artikel</b><p>Artikel baru akan tampil di sini setelah dipublikasikan dari Admin Panel.</p></div>';
      return;
    }
    let html = "";
    ARTICLES.forEach(a => {
      const media = a.img
        ? '<img decoding="async"  src="' + admEsc(a.img) + '" alt="' + admEsc(a.title) + '" loading="lazy">'
        : "";
      html += '<a class="article-card" href="#/artikel/' + admEsc(a.slug) + '" aria-label="Baca artikel: ' + admEsc(a.title) + '">' +
        '<div class="article-media' + (a.img ? "" : " no-img") + '">' + media + '<span class="article-date">' + admEsc(a.date) + '</span></div>' +
        '<div class="article-body"><h3>' + admEsc(a.title) + '</h3>' +
        '<p class="article-excerpt">' + admEsc(articleExcerpt(a)) + '</p>' +
        '<span class="more">Read more<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>' +
      '</a>';
    });
    articleGrid.innerHTML = html;
  }

  const AD_EXCERPT_MAX = 150;
  function articleExcerpt(a) {
    let ex = String(a && a.excerpt || "").replace(/\s+/g, " ").trim();
    if (!ex && a && a.content) {
      ex = String(a.content).replace(/<[^>]*>/g, " ").replace(/&[a-z#0-9]+;/gi, " ").replace(/\s+/g, " ").trim();
    }
    if (!ex) ex = "Baca selengkapnya informasi, tips dan inspirasi seputar produk Bonekaku pada artikel berikut ini.";
    if (ex.length > AD_EXCERPT_MAX) ex = ex.slice(0, AD_EXCERPT_MAX).replace(/\s+\S*$/, "") + "...";
    return ex;
  }

  /* ============================ ADMIN PANEL ============================ */
  const ADM_PW_HASH_DEFAULT = "240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9";
  const ADM_FILE = "bonekaku-articles-4tq9wz6m2k";
  const ADM_SESSION_MS = 12 * 60 * 60 * 1000;
  const ADM_PAGE_SIZE = 6;
  const ADM_MAX_IMAGE = 10 * 1024 * 1024;
  const ADM_MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const ADM_MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const AdmStore = { posts: [], media: [], feed: [], builtin: {}, editKey: null, localAt: 0, remotePosts: null, remoteAt: 0, remoteBuiltin: null, publishAt: 0, loaded: false, sync: "idle", syncMsg: "Menyiapkan\u2026" };
  const AdmUI = { view: "dashboard", filter: "all", q: "", page: 1, editingId: null, editingBuiltin: null };

  const AdmIC = {
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="m5 13 4 4L19 7"/></svg>',
    pencil: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6M10 14 21 3"/></svg>',
    img: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 16v-5M12 8h.01"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/></svg>'
  };

  function admEsc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function admRoot() { return window.root || {}; }
  function admKV() { const r = admRoot(); return (r.kv && r.kv.bonekakuAdmin) || null; }
  async function admKGet(k, d) { const f = admKV(); if (!f) return d; try { const v = await f.get(k); return v === undefined ? d : v; } catch (e) { return d; } }
  async function admKSet(k, v) { const f = admKV(); if (!f) return; try { await f.set(k, v); } catch (e) { } }
  async function admKDel(k) { const f = admKV(); if (!f) return; try { await f.delete(k); } catch (e) { } }
  function admUploader() { const r = admRoot(); return r.uploadPlugin || null; }
  function admGenName() { return window.generatorName || "boneka-ku"; }
  function admPublicUrl() { return "https://editable.uploads.dev/file/" + admGenName() + "/" + ADM_FILE; }

  function admSha256(ascii) {
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    var mp = Math.pow, mw = mp(2, 32), lp = "length", i, j, result = "";
    var words = [], abl = ascii[lp] * 8;
    var hash = admSha256.h = admSha256.h || [], k = admSha256.k = admSha256.k || [];
    var pc = k[lp], comp = {};
    for (var cand = 2; pc < 64; cand++) {
      if (!comp[cand]) {
        for (i = 0; i < 313; i += cand) comp[i] = cand;
        hash[pc] = (mp(cand, .5) * mw) | 0;
        k[pc++] = (mp(cand, 1 / 3) * mw) | 0;
      }
    }
    ascii += "\x80";
    while (ascii[lp] % 64 - 56) ascii += "\x00";
    for (i = 0; i < ascii[lp]; i++) { j = ascii.charCodeAt(i); if (j >> 8) return ""; words[i >> 2] |= j << ((3 - i) % 4) * 8; }
    words[words[lp]] = ((abl / mw) | 0);
    words[words[lp]] = (abl);
    for (j = 0; j < words[lp];) {
      var w = words.slice(j, j += 16), oldHash = hash;
      hash = hash.slice(0, 8);
      for (i = 0; i < 64; i++) {
        var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
        var t1 = hash[7] + (rr(e, 6) ^ rr(e, 11) ^ rr(e, 25)) + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
          + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rr(w15, 7) ^ rr(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rr(w2, 17) ^ rr(w2, 19) ^ (w2 >>> 10))) | 0);
        var t2 = (rr(a, 2) ^ rr(a, 13) ^ rr(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
        hash = [(t1 + t2) | 0].concat(hash);
        hash[4] = (hash[4] + t1) | 0;
      }
      for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
    }
    for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) { var b = (hash[i] >> (j * 8)) & 255; result += ((b < 16) ? 0 : "") + b.toString(16); }
    return result;
  }
  async function admHash(str) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
      return Array.prototype.map.call(new Uint8Array(buf), b => ("0" + b.toString(16)).slice(-2)).join("");
    } catch (e) {
      return admSha256(unescape(encodeURIComponent(str)));
    }
  }

  function admSanitizeHtml(html) {
    const box = document.createElement("div");
    box.innerHTML = html == null ? "" : String(html);
    box.querySelectorAll("script,style,iframe,object,embed,form,input,link,meta,noscript,textarea,select,button,svg").forEach(el => el.remove());
    box.querySelectorAll("*").forEach(el => {
      Array.prototype.slice.call(el.attributes).forEach(attr => {
        const n = attr.name.toLowerCase(), v = String(attr.value || "");
        if (n.indexOf("on") === 0) el.removeAttribute(attr.name);
        else if ((n === "href" || n === "src") && /^\s*(javascript|data:text\/html)/i.test(v)) el.removeAttribute(attr.name);
        else if (n === "style" && /expression|javascript:/i.test(v)) el.removeAttribute(attr.name);
        else if (n === "target") el.setAttribute("rel", "noopener noreferrer");
      });
      if (el.tagName === "A" && el.getAttribute("href")) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer"); }
    });
    return box.innerHTML;
  }

  function admSlugify(s) {
    return String(s || "").toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
  }
  function admTodayIso() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function admDateLabel(iso) {
    const m = String(iso || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!m) return String(iso || "");
    return Number(m[3]) + " " + ADM_MONTHS[Number(m[2]) - 1] + " " + m[1];
  }
  function admIdDateToIso(label) {
    const m = String(label || "").match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
    if (!m) return "";
    let mi = -1;
    for (let i = 0; i < ADM_MONTHS.length; i++) if (ADM_MONTHS[i].toLowerCase() === m[2].toLowerCase()) mi = i;
    if (mi < 0) return "";
    return m[3] + "-" + String(mi + 1).padStart(2, "0") + "-" + String(m[1]).padStart(2, "0");
  }
  function admTimeAgo(ts) {
    if (!ts) return "\u2014";
    const d = Date.now() - ts;
    if (d < 45000) return "baru saja";
    const m = Math.round(d / 60000);
    if (m < 60) return m + " menit lalu";
    const h = Math.round(m / 60);
    if (h < 24) return h + " jam lalu";
    const dd = Math.round(h / 24);
    if (dd < 30) return dd + " hari lalu";
    return new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }
  function admUniqueSlug(slug, exceptId) {
    const base = admSlugify(slug) || "artikel";
    let s = base, n = 2;
    const taken = () => AdmStore.posts.some(p => p.slug === s && p.id !== exceptId) || BUILTIN_ARTICLES.some(a => a.slug === s);
    while (taken()) { s = base + "-" + n; n++; }
    return s;
  }
  function admFindPost(id) { for (const p of AdmStore.posts) if (p.id === id) return p; return null; }
  function admNewId() { return "p" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* ---------- activity log ---------- */
  async function admLog(kind, text) {
    if (kind === "login") AdmStore.feed = AdmStore.feed.filter(f => f.kind !== "login");
    AdmStore.feed.unshift({ kind: kind, text: text, at: Date.now() });
    if (AdmStore.feed.length > 40) AdmStore.feed.length = 40;
    await admKSet("feed", AdmStore.feed);
    admRenderFeed();
  }

  /* ---------- toasts ---------- */
  function admToast(kind, title, msg, ms) {
    const ctn = document.getElementById("admToasts");
    if (!ctn) return null;
    const el = document.createElement("div");
    el.className = "adm-toast " + (kind || "info");
    el.innerHTML = (kind === "ok" ? AdmIC.check : kind === "err" ? AdmIC.warn : AdmIC.info) +
      "<div>" + (title ? "<b>" + admEsc(title) + "</b>" : "") + (msg ? admEsc(msg) : "") + "</div>";
    ctn.appendChild(el);
    if (ms !== 0) setTimeout(() => { el.classList.add("out"); setTimeout(() => el.remove(), 320); }, ms || 4200);
    return el;
  }
  function admToastDone(el, kind, title, msg) {
    if (el && el.parentNode) { el.classList.add("out"); setTimeout(() => el.remove(), 320); }
    admToast(kind, title, msg);
  }

  /* ---------- modal ---------- */
  function admModal(opts) {
    const modal = document.getElementById("admModal");
    const card = document.getElementById("admModalCard");
    document.getElementById("admModalTitle").textContent = opts.title || "";
    const p = document.getElementById("admModalText");
    p.textContent = opts.text || "";
    p.hidden = !opts.text;
    const body = document.getElementById("admModalBody");
    body.innerHTML = opts.bodyHtml || "";
    body.hidden = !opts.bodyHtml;
    card.classList.toggle("wide", !!opts.wide);
    const acts = document.getElementById("admModalActions");
    acts.innerHTML = "";
    (opts.actions || []).forEach(a => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "adm-btn " + (a.cls || "adm-btn-ghost");
      b.innerHTML = a.html || admEsc(a.label || "OK");
      b.addEventListener("click", () => { if (!a.keepOpen) admCloseModal(); if (a.onClick) a.onClick(); });
      acts.appendChild(b);
    });
    modal.classList.add("open");
    return { close: admCloseModal, body: body };
  }
  function admCloseModal() { document.getElementById("admModal").classList.remove("open"); }
  function admConfirm(title, text, okLabel, danger) {
    return new Promise(resolve => {
      admModal({
        title: title, text: text,
        actions: [
          { label: "Batal", cls: "adm-btn-ghost", onClick: () => resolve(false) },
          { label: okLabel || "Lanjutkan", cls: danger ? "adm-btn-danger" : "adm-btn-primary", onClick: () => resolve(true) }
        ]
      });
    });
  }

  /* ---------- session ---------- */
  async function admHasSession() {
    const s = await admKGet("session", null);
    if (!s || !s.exp || s.exp < Date.now()) return false;
    let tok = "";
    try { tok = localStorage.getItem("bonekaku-admin") || ""; } catch (e) { }
    if (!tok || tok !== s.token) return false;
    AdmStore.sessionExp = s.exp;
    return true;
  }
  async function admStartSession() {
    const t = Date.now();
    const token = Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
    const rec = { token: token, exp: t + ADM_SESSION_MS };
    await admKSet("session", rec);
    try { localStorage.setItem("bonekaku-admin", token); } catch (e) { }
    AdmStore.sessionExp = rec.exp;
  }
  async function admEndSession() {
    await admKDel("session");
    try { localStorage.removeItem("bonekaku-admin"); } catch (e) { }
    AdmStore.sessionExp = 0;
  }
  async function admTryLogin(pw) {
    const until = await admKGet("lockUntil", 0);
    if (until > Date.now()) return { ok: false, locked: true, until: until };
    const target = (await admKGet("pwHash", null)) || ADM_PW_HASH_DEFAULT;
    const h = await admHash(pw);
    if (h === target) {
      await admKSet("failCount", 0);
      await admKSet("lockUntil", 0);
      return { ok: true };
    }
    const fails = (await admKGet("failCount", 0)) + 1;
    await admKSet("failCount", fails);
    if (fails >= 5) {
      const u = Date.now() + 5 * 60 * 1000;
      await admKSet("lockUntil", u);
      await admKSet("failCount", 0);
      return { ok: false, locked: true, until: u };
    }
    return { ok: false, remaining: 5 - fails };
  }

  /* ---------- built-in article overrides ---------- */
  function admBuiltinMerged(base, src) {
    const ov = src && src[base.slug];
    if (!ov) return base;
    const merged = Object.assign({}, base, ov);
    if (ov.content) { merged.source = "admin"; merged.url = null; }
    merged.slug = base.slug;
    merged.author = merged.author || DEFAULT_AUTHOR;
    merged.tags = merged.tags || [];
    return merged;
  }
  function admEffectiveBuiltin() {
    if (AdmStore.remotePosts && AdmStore.remoteAt > (AdmStore.localAt || 0)) return AdmStore.remoteBuiltin || {};
    return AdmStore.builtin || {};
  }
  function admBuiltinList() {
    const src = admEffectiveBuiltin();
    const out = [];
    BUILTIN_ARTICLES.forEach(a => {
      const ov = src[a.slug];
      if (ov && ov.hidden) return;
      const merged = admBuiltinMerged(a, src);
      if (merged.status === "draft") return;
      out.push(merged);
    });
    return out;
  }
  function admFindBuiltin(slug) {
    for (const a of BUILTIN_ARTICLES) if (a.slug === slug) return a;
    return null;
  }

  /* ---------- store / publish ---------- */
  function admPublicPosts() {
    return AdmStore.posts.filter(p => p.status === "published").map(p => ({
      id: p.id, title: p.title, slug: p.slug, date: p.date, cover: p.cover || "",
      excerpt: p.excerpt || "", content: p.content || "", tags: p.tags || [], author: p.author || DEFAULT_AUTHOR,
      status: p.status, createdAt: p.createdAt, updatedAt: p.updatedAt
    }));
  }
  function admSetSync(state, msg) {
    AdmStore.sync = state;
    AdmStore.syncMsg = msg;
    admRenderSync();
  }
  function admErrLabel(code) {
    if (code === "over_daily_allowance") return "Kuota unggah harian habis";
    if (code === "file_too_big") return "Berkas terlalu besar";
    if (code === "editable_requires_saved_generator") return "Simpan generator dulu";
    return "Gagal: " + code;
  }
  let admPublishTimer = null;
  let admPublishing = false;
  function admQueuePublish() {
    if (admPublishTimer) clearTimeout(admPublishTimer);
    admSetSync("syncing", "Menunggu sinkronisasi\u2026");
    admPublishTimer = setTimeout(() => { admPublishTimer = null; admPublish(); }, 2200);
  }
  async function admPublish() {
    const up = admUploader();
    if (!up || !up.editable) { admSetSync("err", "Plugin unggah belum siap"); return; }
    if (admPublishing) { admQueuePublish(); return; }
    admPublishing = true;
    admSetSync("syncing", "Menyinkronkan\u2026");
    const payload = JSON.stringify({ v: 2, updatedAt: Date.now(), generator: admGenName(), articles: admPublicPosts(), builtin: AdmStore.builtin || {} });
    if (payload.length > 4.8 * 1024 * 1024) { admPublishing = false; admSetSync("err", "Data publik melebihi 4,8 MB \u00b7 kurangi ukuran artikel bawaan"); return; }
    let key = AdmStore.editKey || (await admKGet("editKey", null));
    try {
      const res = await up.editable.set(ADM_FILE, payload, key ? { editKey: key } : undefined);
      admPublishing = false;
      if (res && res.error) {
        if (res.error === "editable_requires_saved_generator") admSetSync("saved", "Simpan generator untuk publikasi");
        else admSetSync("err", admErrLabel(res.error));
        return;
      }
      if (res && res.editKey && res.editKey !== key) {
        AdmStore.editKey = res.editKey;
        await admKSet("editKey", res.editKey);
        admLog("security", "Kunci edit publik dibuat");
      }
      AdmStore.publishAt = Date.now();
      await admKSet("publishAt", AdmStore.publishAt);
      AdmStore.remotePosts = AdmStore.posts.slice();
      AdmStore.remoteAt = AdmStore.localAt;
      admSetSync("ok", "Tersinkron \u00b7 " + admPublicPosts().length + " artikel");
      admRenderPublishInfo();
      admRenderKeyBox();
    } catch (e) {
      admPublishing = false;
      admSetSync("err", "Gagal menyinkronkan");
    }
  }
  async function admLoadPublished() {
    const up = admUploader();
    if (!up || !up.editable) return null;
    try {
      const text = await up.editable.get(ADM_FILE);
      if (!text) return null;
      const data = JSON.parse(text);
      if (!data || !Array.isArray(data.articles)) return null;
      return data;
    } catch (e) { return null; }
  }
  async function admSaveStore() {
    await admKSet("posts", AdmStore.posts);
    await admKSet("media", AdmStore.media);
    await admKSet("feed", AdmStore.feed);
    await admKSet("builtin", AdmStore.builtin || {});
    AdmStore.localAt = Date.now();
    await admKSet("localAt", AdmStore.localAt);
  }
  function admEffectivePosts() {
    if (AdmStore.remotePosts && AdmStore.remoteAt > (AdmStore.localAt || 0)) return AdmStore.remotePosts;
    return AdmStore.posts;
  }
  function admApplyArticles() {
    const posts = admEffectivePosts().filter(p => p.status === "published");
    const mapped = posts.map(p => ({
      source: "admin", id: p.id, title: p.title, slug: p.slug,
      img: p.cover || "", date: admDateLabel(p.date), iso: p.date || "",
      excerpt: p.excerpt || "", content: p.content || "", tags: p.tags || [], url: null,
      author: p.author || DEFAULT_AUTHOR
    }));
    mapped.sort((a, b) => String(b.iso).localeCompare(String(a.iso)));
    ARTICLES = mapped.concat(admBuiltinList());
    renderArticleGrid();
  }
  async function admLoadStore() {
    if (AdmStore.loaded) return;
    AdmStore.posts = await admKGet("posts", []);
    AdmStore.media = await admKGet("media", []);
    AdmStore.feed = await admKGet("feed", []);
    AdmStore.builtin = await admKGet("builtin", {});
    let seenLogin = false;
    AdmStore.feed = AdmStore.feed.filter(f => {
      if (f.kind !== "login") return true;
      if (seenLogin) return false;
      seenLogin = true; return true;
    });
    AdmStore.editKey = await admKGet("editKey", null);
    AdmStore.localAt = await admKGet("localAt", 0);
    AdmStore.publishAt = await admKGet("publishAt", 0);
    AdmStore.loaded = true;
    admApplyArticles();
  }
  async function admBoot() {
    if (!admKV()) { admSetSync("err", "Penyimpanan tidak tersedia"); return; }
    await admLoadStore();
    const data = await admLoadPublished();
    if (data && data.updatedAt && data.updatedAt > (AdmStore.localAt || 0)) {
      AdmStore.remotePosts = data.articles;
      AdmStore.remoteBuiltin = data.builtin || {};
      AdmStore.remoteAt = data.updatedAt;
      admApplyArticles();
    }
    admSetSync("idle", AdmStore.posts.length ? "Siap \u00b7 " + AdmStore.posts.length + " artikel tersimpan" : "Siap \u00b7 belum ada artikel");
    admRenderDashboard();
    admRenderPosts();
    admRenderMedia();
  }

  /* ---------- nav / views ---------- */
  const ADM_VIEW_META = {
    dashboard: ["Dashboard", "Ringkasan konten website Bonekaku."],
    artikel: ["Kelola Artikel", "Buat, ubah, publikasikan, atau hapus artikel website."],
    media: ["Pustaka Media", "Semua gambar yang Anda unggah untuk artikel."],
    pengaturan: ["Pengaturan", "Keamanan, kunci publikasi, dan informasi sistem."]
  };
  function admSetView(v) {
    if (!ADM_VIEW_META[v]) v = "dashboard";
    AdmUI.view = v;
    document.querySelectorAll("#page-admin .adm-view").forEach(el => el.classList.toggle("adm-hide", el.getAttribute("data-view") !== v));
    document.querySelectorAll("#admNav button").forEach(b => b.classList.toggle("active", b.getAttribute("data-view") === v));
    const meta = ADM_VIEW_META[v];
    document.getElementById("admGreet").textContent = meta[0];
    document.getElementById("admGreetSub").textContent = meta[1];
    if (v === "artikel") admRenderPosts();
    if (v === "media") admRenderMedia();
    if (v === "pengaturan") { admRenderSettings(); admRenderKeyBox(); admRenderSysInfo(); }
    if (v === "dashboard") admRenderDashboard();
  }
  function admRenderSync() {
    const dot = document.getElementById("admSyncDot");
    const txt = document.getElementById("admSyncText");
    if (!dot || !txt) return;
    const map = { idle: "", syncing: "busy", ok: "ok", saved: "warn", err: "err" };
    dot.className = "adm-dot " + (map[AdmStore.sync] || "");
    txt.textContent = AdmStore.syncMsg || "Siap";
  }

  /* ---------- dashboard ---------- */
  function admRenderNavCounts() {
    document.getElementById("admNavCountPost").textContent = AdmStore.posts.length;
    document.getElementById("admNavCountMedia").textContent = AdmStore.media.length;
  }
  function admStatCard(cls, ic, val, lbl, spark) {
    return '<div class="adm-stat ' + cls + '"><div class="ic">' + ic + '</div><div class="val">' + val + '</div><div class="lbl">' + lbl + '</div><span class="spark">' + (spark || "") + '</span></div>';
  }
  function admRenderStats() {
    const el = document.getElementById("admStats");
    if (!el) return;
    const posts = AdmStore.posts;
    const pub = posts.filter(p => p.status === "published").length;
    const draft = posts.length - pub;
    const now = new Date();
    const thisMonth = posts.filter(p => {
      const d = new Date(p.createdAt || 0);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;
    el.innerHTML =
      admStatCard("v1", AdmIC.doc, posts.length, "Total Artikel", thisMonth ? "+" + thisMonth + " bulan ini" : "") +
      admStatCard("v2", AdmIC.check, pub, "Dipublikasikan", pub ? "tampil di situs" : "") +
      admStatCard("v3", AdmIC.pencil, draft, "Draft", draft ? "belum tampil" : "") +
      admStatCard("v4", AdmIC.img, AdmStore.media.length, "Gambar Media", "");
  }
  function admRenderRecent() {
    const el = document.getElementById("admRecent");
    if (!el) return;
    const posts = AdmStore.posts.slice().sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0)).slice(0, 5);
    if (!posts.length) {
      el.innerHTML = '<div class="adm-empty"><div class="ic">' + AdmIC.doc + '</div><b>Belum ada artikel</b><p>Mulai dengan menulis artikel pertama Anda. Artikel yang dipublikasikan akan langsung tampil di halaman Artikel website.</p><button type="button" class="adm-btn adm-btn-primary" data-newpost="1">' + AdmIC.plus + 'Tulis Artikel Pertama</button></div>';
      return;
    }
    let html = '<div class="adm-table-wrap"><table class="adm-table"><tbody>';
    posts.forEach(p => {
      html += '<tr><td><div class="adm-tcell">' + (p.cover ? '<img decoding="async"  class="adm-thumb" src="' + admEsc(p.cover) + '" alt="">' : '<div class="adm-thumb"></div>') +
        '<div><b>' + admEsc(p.title) + '</b><small>' + admEsc(p.date ? admDateLabel(p.date) : "") + ' \u00b7 ' + admTimeAgo(p.updatedAt) + '</small></div></div></td>' +
        '<td><span class="adm-pill ' + (p.status === "published" ? "is-pub" : "is-draft") + '">' + (p.status === "published" ? "Publikasi" : "Draft") + '</span></td>' +
        '<td><div class="adm-row-actions"><button type="button" class="adm-icon-btn" data-edit="' + p.id + '" title="Ubah">' + AdmIC.pencil + '</button></div></td></tr>';
    });
    html += '</tbody></table></div>';
    el.innerHTML = html;
  }
  function admRenderChart() {
    const el = document.getElementById("admChart");
    if (!el) return;
    const now = new Date(), cols = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");
      cols.push({ label: ADM_MONTHS_SHORT[d.getMonth()], n: AdmStore.posts.filter(p => String(p.date || "").slice(0, 7) === key).length });
    }
    const max = Math.max(1, ...cols.map(c => c.n));
    el.innerHTML = cols.map(c => '<div class="col"><div class="bar" style="height:' + Math.max(5, Math.round(c.n / max * 100)) + '%"><span>' + (c.n || "") + '</span></div><div class="lb">' + c.label + '</div></div>').join("");
    const t = document.getElementById("admChartTotal");
    if (t) t.textContent = AdmStore.posts.length + " artikel";
  }
  function admRenderQuick() {
    const el = document.getElementById("admQuick");
    if (!el) return;
    el.innerHTML =
      '<button type="button" data-newpost="1">' + AdmIC.plus + 'Tulis Artikel</button>' +
      '<button type="button" data-goto="media">' + AdmIC.img + 'Unggah Gambar</button>' +
      '<button type="button" data-goto="media">' + AdmIC.upload + 'Pustaka Media</button>' +
      '<button type="button" data-goto="artikel">' + AdmIC.doc + 'Kelola Artikel</button>';
  }
  function admRenderPublishInfo() {
    const el = document.getElementById("admPublishInfo");
    if (!el) return;
    const pub = admPublicPosts().length;
    const dotCls = AdmStore.sync === "ok" ? "ok" : AdmStore.sync === "err" ? "err" : AdmStore.sync === "saved" ? "warn" : "";
    el.innerHTML =
      '<div class="adm-sync" style="padding:0 0 12px"><span class="adm-dot ' + dotCls + '"></span><span>' + admEsc(AdmStore.syncMsg || "Belum disinkronkan") + '</span></div>' +
      '<div class="adm-feed" style="margin-bottom:14px"><li style="border:0;padding:0"><span class="fi">' + AdmIC.clock + '</span><span><b>' + (AdmStore.publishAt ? admTimeAgo(AdmStore.publishAt) : "Belum pernah") + '</b><time>Publikasi terakhir</time></span></li>' +
      '<li style="border:0;padding:8px 0 0"><span class="fi">' + AdmIC.doc + '</span><span><b>' + pub + ' artikel publik</b><time>Terlihat oleh pengunjung</time></span></li></div>' +
      '<div class="adm-input-wrap" style="display:flex;gap:8px"><input class="adm-input" id="admPubUrl" readonly value="' + admEsc(admPublicUrl()) + '" style="font-size:12.5px"><button type="button" class="adm-icon-btn" id="admPubCopy" title="Salin tautan">' + AdmIC.copy + '</button></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px"><button type="button" class="adm-btn adm-btn-ghost adm-btn-sm" id="admPublishNow">' + AdmIC.refresh + 'Sinkronkan Sekarang</button></div>' +
      (AdmStore.sync === "saved" ? '<div class="adm-alert warn" style="margin-top:14px">' + AdmIC.warn + '<span>Generator belum disimpan. Simpan generator terlebih dahulu agar artikel bisa tampil untuk pengunjung.</span></div>' : "");
  }
  const ADM_FEED_IC = { create: AdmIC.plus, edit: AdmIC.pencil, delete: AdmIC.trash, upload: AdmIC.img, login: AdmIC.lock, security: AdmIC.lock };
  function admRenderFeed() {
    const el = document.getElementById("admFeed");
    if (!el) return;
    if (!AdmStore.feed.length) { el.innerHTML = '<li><span class="fi">' + AdmIC.clock + '</span><span>Aktivitas akan tercatat di sini.</span></li>'; return; }
    el.innerHTML = AdmStore.feed.slice(0, 12).map(f =>
      '<li><span class="fi">' + (ADM_FEED_IC[f.kind] || AdmIC.clock) + '</span><span>' + admEsc(f.text) + '<time>' + admTimeAgo(f.at) + '</time></span></li>'
    ).join("");
  }
  function admRenderDashboard() {
    admRenderStats(); admRenderRecent(); admRenderChart(); admRenderQuick(); admRenderPublishInfo(); admRenderFeed(); admRenderNavCounts();
  }

  /* ---------- article list ---------- */
  function admVisibleRows() {
    const q = AdmUI.q.trim().toLowerCase();
    const rows = [];
    AdmStore.posts.forEach(p => {
      if (AdmUI.filter === "published" && p.status !== "published") return;
      if (AdmUI.filter === "draft" && p.status !== "draft") return;
      if (q && (p.title + " " + (p.slug || "") + " " + (p.tags || []).join(" ")).toLowerCase().indexOf(q) < 0) return;
      rows.push({ kind: "post", post: p });
    });
    BUILTIN_ARTICLES.forEach(a => {
      const eff = admBuiltinMerged(a, AdmStore.builtin);
      const ov = AdmStore.builtin[a.slug] || null;
      const hidden = !!(ov && ov.hidden);
      const draft = eff.status === "draft";
      if (AdmUI.filter === "published" && (hidden || draft)) return;
      if (AdmUI.filter === "draft" && !draft) return;
      if (q && (eff.title + " " + eff.slug).toLowerCase().indexOf(q) < 0) return;
      rows.push({ kind: "builtin", art: eff, hidden: hidden });
    });
    return rows;
  }
  function admRenderPosts() {
    const el = document.getElementById("admPostList");
    if (!el) return;
    if (!AdmStore.loaded) { el.innerHTML = '<div class="adm-table-wrap" style="padding:20px"><div class="adm-skel" style="height:60px;margin-bottom:10px"></div><div class="adm-skel" style="height:60px"></div></div>'; return; }
    const rows = admVisibleRows();
    const total = rows.length;
    const pages = Math.max(1, Math.ceil(total / ADM_PAGE_SIZE));
    if (AdmUI.page > pages) AdmUI.page = pages;
    const start = (AdmUI.page - 1) * ADM_PAGE_SIZE;
    const slice = rows.slice(start, start + ADM_PAGE_SIZE);
    document.getElementById("admPostCount").textContent = total + " artikel" + (AdmStore.posts.filter(p => p.status === "draft").length ? " \u00b7 " + AdmStore.posts.filter(p => p.status === "draft").length + " draft" : "");
    if (!slice.length) {
      el.innerHTML = '<div class="adm-empty"><div class="ic">' + AdmIC.doc + '</div><b>Tidak ada artikel ditemukan</b><p>Ubah kata kunci pencarian atau filter, atau buat artikel baru.</p><button type="button" class="adm-btn adm-btn-primary" data-newpost="1">' + AdmIC.plus + 'Artikel Baru</button></div>';
      document.getElementById("admPostPager").classList.add("adm-hide");
      return;
    }
    let html = '<div class="adm-table-wrap"><table class="adm-table"><thead><tr><th>Artikel</th><th>Tanggal</th><th>Status</th><th style="text-align:right">Aksi</th></tr></thead><tbody>';
    slice.forEach(r => {
      if (r.kind === "post") {
        const p = r.post;
        html += '<tr><td><div class="adm-tcell">' + (p.cover ? '<img decoding="async"  class="adm-thumb" src="' + admEsc(p.cover) + '" alt="">' : '<div class="adm-thumb"></div>') +
          '<div><b>' + admEsc(p.title) + '</b><small>#/artikel/' + admEsc(p.slug) + '</small></div></div></td>' +
          '<td>' + admEsc(p.date ? admDateLabel(p.date) : "\u2014") + '</td>' +
          '<td><span class="adm-pill ' + (p.status === "published" ? "is-pub" : "is-draft") + '">' + (p.status === "published" ? "Publikasi" : "Draft") + '</span></td>' +
          '<td><div class="adm-row-actions">' +
            '<button type="button" class="adm-icon-btn" data-viewpost="' + p.id + '" title="Lihat di situs">' + AdmIC.eye + '</button>' +
            '<button type="button" class="adm-icon-btn" data-dup="' + p.id + '" title="Duplikat">' + AdmIC.copy + '</button>' +
            '<button type="button" class="adm-icon-btn" data-edit="' + p.id + '" title="Ubah">' + AdmIC.pencil + '</button>' +
            '<button type="button" class="adm-icon-btn danger" data-del="' + p.id + '" title="Hapus">' + AdmIC.trash + '</button>' +
          '</div></td></tr>';
      } else {
        const a = r.art;
        const hidden = r.hidden;
        const isDraft = !hidden && a.status === "draft";
        const pill = hidden ? '<span class="adm-pill is-draft">Dihapus</span>' : isDraft ? '<span class="adm-pill is-draft">Draft</span>' : '<span class="adm-pill is-pub">Publikasi</span>';
        const sub = hidden ? "Dihapus \u00b7 bonekaku.co.id" : (a.edited ? "Disunting \u00b7 bonekaku.co.id" : "bonekaku.co.id");
        const actions = hidden
          ? '<button type="button" class="adm-icon-btn" data-restorebuiltin="' + admEsc(a.slug) + '" title="Pulihkan artikel">' + AdmIC.refresh + '</button>'
          : '<a class="adm-icon-btn" href="#/artikel/' + admEsc(a.slug) + '" title="Lihat di situs">' + AdmIC.eye + '</a>' +
            '<button type="button" class="adm-icon-btn" data-fork="' + admEsc(a.slug) + '" title="Salin jadi artikel saya">' + AdmIC.copy + '</button>' +
            '<button type="button" class="adm-icon-btn" data-editbuiltin="' + admEsc(a.slug) + '" title="Ubah">' + AdmIC.pencil + '</button>' +
            '<button type="button" class="adm-icon-btn danger" data-delbuiltin="' + admEsc(a.slug) + '" title="Hapus">' + AdmIC.trash + '</button>';
        html += '<tr><td><div class="adm-tcell">' + (a.img ? '<img decoding="async"  class="adm-thumb" src="' + admEsc(a.img) + '" alt="">' : '<div class="adm-thumb"></div>') +
          '<div><b>' + admEsc(a.title) + '</b><small>' + admEsc(sub) + '</small></div></div></td>' +
          '<td>' + admEsc(a.date) + '</td>' +
          '<td>' + pill + '</td>' +
          '<td><div class="adm-row-actions">' + actions + '</div></td></tr>';
      }
    });
    html += '</tbody></table></div>';
    el.innerHTML = html;
    const pager = document.getElementById("admPostPager");
    if (pages > 1) {
      pager.classList.remove("adm-hide");
      document.getElementById("admPostPageInfo").textContent = "Halaman " + AdmUI.page + " dari " + pages + " \u00b7 " + total + " item";
      let btns = '<button type="button" class="adm-btn adm-btn-ghost adm-btn-sm" data-page="' + (AdmUI.page - 1) + '"' + (AdmUI.page <= 1 ? " disabled" : "") + '>Sebelumnya</button>';
      for (let i = 1; i <= pages; i++) btns += '<button type="button" class="adm-btn ' + (i === AdmUI.page ? "adm-btn-primary" : "adm-btn-ghost") + ' adm-btn-sm" data-page="' + i + '">' + i + '</button>';
      btns += '<button type="button" class="adm-btn adm-btn-ghost adm-btn-sm" data-page="' + (AdmUI.page + 1) + '"' + (AdmUI.page >= pages ? " disabled" : "") + '>Berikutnya</button>';
      document.getElementById("admPostPageBtns").innerHTML = btns;
    } else pager.classList.add("adm-hide");
  }

  /* ---------- media ---------- */
  function admAddMedia(item, skipSave) {
    AdmStore.media.unshift(item);
    if (AdmStore.media.length > 300) AdmStore.media.length = 300;
    if (!skipSave) admSaveStore();
    admRenderMedia();
    admRenderNavCounts();
  }
  function admRenderMedia() {
    const grid = document.getElementById("admMediaGrid");
    if (!grid) return;
    const pill = document.getElementById("admMediaCountPill");
    if (pill) pill.textContent = AdmStore.media.length + " gambar";
    admRenderNavCounts();
    if (!AdmStore.media.length) {
      grid.innerHTML = '<div class="adm-empty"><div class="ic">' + AdmIC.img + '</div><b>Belum ada gambar</b><p>Unggah gambar pertama Anda. Gambar dapat dipakai sebagai sampul atau disisipkan ke isi artikel.</p></div>';
      return;
    }
    grid.className = "adm-media-grid";
    grid.innerHTML = AdmStore.media.map((m, i) =>
      '<div class="adm-media-item"><img decoding="async"  src="' + admEsc(m.url) + '" alt="' + admEsc(m.name || "") + '" loading="lazy">' +
      '<div class="ma"><button type="button" data-mcopy="' + i + '" title="Salin URL">' + AdmIC.copy + '</button><button type="button" data-mdel="' + i + '" title="Hapus dari pustaka" class="del">' + AdmIC.trash + '</button></div>' +
      '<div class="mt"><b>' + admEsc(m.name || "gambar") + '</b><small>' + admTimeAgo(m.at) + (m.size ? " \u00b7 " + Math.round(m.size / 1024) + " KB" : "") + '</small></div></div>'
    ).join("");
  }
  async function admUploadFiles(fileList, opts) {
    opts = opts || {};
    const files = Array.prototype.slice.call(fileList || []).filter(f => f && /^image\//.test(f.type || ""));
    if (!files.length) { admToast("err", "Format tidak didukung", "Pilih berkas gambar: JPG, PNG, WEBP, atau GIF."); return []; }
    const up = admUploader();
    if (!up) { admToast("err", "Plugin unggah belum siap", "Tunggu beberapa detik lalu coba lagi."); return []; }
    const out = [];
    for (const f of files) {
      if (f.size > ADM_MAX_IMAGE) { admToast("err", "Berkas terlalu besar", f.name + " melebihi 10 MB."); continue; }
      const t = admToast("info", "Mengunggah\u2026", f.name, 0);
      let res = null;
      try { res = await up(f); } catch (e) { res = { error: "gagal_unggah" }; }
      if (!res || res.error) { admToastDone(t, "err", "Gagal mengunggah", f.name + (res && res.error ? " (" + res.error + ")" : "")); continue; }
      const item = { url: res.url, name: f.name, size: res.size || f.size || 0, at: Date.now() };
      out.push(item);
      admAddMedia(item, true);
      admLog("upload", "Gambar diunggah: " + f.name);
      admToastDone(t, "ok", "Gambar terunggah", f.name);
      if (opts.onEach) opts.onEach(item);
    }
    await admSaveStore();
    admRenderStats();
    return out;
  }
  function admPickFiles(mode) {
    admFileMode = mode || "media";
    const inp = document.getElementById("admFileInput");
    if (!inp) return;
    inp.value = "";
    inp.click();
  }
  let admFileMode = "media";
  function admPickMedia(cb) {
    const items = AdmStore.media;
    const body = items.length
      ? '<div class="adm-media-grid">' + items.map((m, i) => '<button type="button" class="adm-media-item" data-pick="' + i + '" style="text-align:left;padding:0">' +
        '<img decoding="async"  src="' + admEsc(m.url) + '" alt="" loading="lazy"><div class="mt"><b>' + admEsc(m.name || "") + '</b><small>' + admTimeAgo(m.at) + '</small></div></button>').join("") + '</div>'
      : '<div class="adm-empty"><div class="ic">' + AdmIC.img + '</div><b>Pustaka masih kosong</b><p>Unggah gambar terlebih dahulu melalui menu Media.</p></div>';
    const m = admModal({
      title: "Pilih dari Pustaka Media", wide: true, bodyHtml: body,
      actions: [{ label: "Tutup", cls: "adm-btn-ghost" }]
    });
    m.body.querySelectorAll("[data-pick]").forEach(btn => btn.addEventListener("click", () => {
      const it = items[Number(btn.getAttribute("data-pick"))];
      admCloseModal();
      if (it && cb) cb(it.url);
    }));
  }

  /* ---------- cover ---------- */
  function admSetCover(url) {
    const inp = document.getElementById("admEdCoverUrl");
    if (inp) inp.value = url || "";
    admRenderCoverPrev();
  }
  function admRenderCoverPrev() {
    const prev = document.getElementById("admEdCoverPrev");
    const inp = document.getElementById("admEdCoverUrl");
    if (!prev || !inp) return;
    const url = inp.value.trim();
    prev.innerHTML = url
      ? '<img decoding="async"  src="' + admEsc(url) + '" alt="Pratinjau sampul" onerror="this.style.display=\'none\'">'
      : '<div class="ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/></svg>Belum ada gambar</div>';
  }

  /* ---------- editor ---------- */
  let admLastSel = null;
  let admBuiltinOrigContent = "";
  function admSetSlugLock(locked, hint) {
    const slug = document.getElementById("admEdSlug");
    if (!slug) return;
    slug.readOnly = !!locked;
    slug.classList.toggle("is-locked", !!locked);
    const h = document.getElementById("admEdSlugHint");
    if (h) h.textContent = hint || "Otomatis dari judul. Dipakai di alamat #/artikel/….";
  }
  function admOpenDrawerUI() {
    admRenderCoverPrev();
    admUpdateWordCount();
    document.getElementById("admDrawer").classList.add("open");
    setTimeout(() => { const t = document.getElementById("admEdPostTitle"); if (t) t.focus(); }, 260);
  }
  function admOpenEditor(id) {
    const post = id ? admFindPost(id) : null;
    AdmUI.editingId = post ? post.id : null;
    AdmUI.editingBuiltin = null;
    admBuiltinOrigContent = "";
    const slug = document.getElementById("admEdSlug");
    slug.dataset.touched = "";
    admSetSlugLock(false, "");
    document.getElementById("admEdTitle").textContent = post ? "Ubah Artikel" : "Artikel Baru";
    document.getElementById("admEdSub").textContent = post ? "Perbarui detail artikel lalu simpan." : "Lengkapi detail artikel lalu simpan.";
    document.getElementById("admEdPostTitle").value = post ? post.title : "";
    slug.value = post ? post.slug : "";
    document.getElementById("admEdAuthor").value = post ? (post.author || DEFAULT_AUTHOR) : DEFAULT_AUTHOR;
    document.getElementById("admEdDate").value = post && post.date ? post.date : admTodayIso();
    document.getElementById("admEdCoverUrl").value = post ? (post.cover || "") : "";
    document.getElementById("admEdExcerpt").value = post ? (post.excerpt || "") : "";
    document.getElementById("admEdTags").value = post ? (post.tags || []).join(", ") : "";
    document.getElementById("admEdStatus").value = post ? post.status : "published";
    document.getElementById("admEdArea").innerHTML = post ? (post.content || "") : "";
    document.getElementById("admEdMeta").textContent = post ? "Diperbarui " + admTimeAgo(post.updatedAt) : "Belum disimpan";
    document.getElementById("admEdErr").classList.add("adm-hide");
    admOpenDrawerUI();
  }
  async function admOpenBuiltinEditor(slug) {
    const base = admFindBuiltin(slug);
    if (!base) return;
    const art = admBuiltinMerged(base, AdmStore.builtin);
    AdmUI.editingId = null;
    AdmUI.editingBuiltin = slug;
    admBuiltinOrigContent = "";
    const slugEl = document.getElementById("admEdSlug");
    slugEl.dataset.touched = "1";
    admSetSlugLock(true, "Slug artikel bawaan tidak dapat diubah.");
    document.getElementById("admEdTitle").textContent = "Ubah Artikel Bawaan";
    document.getElementById("admEdSub").textContent = "Artikel asli bonekaku.co.id \u00b7 perubahan disimpan di panel ini.";
    document.getElementById("admEdPostTitle").value = art.title || "";
    slugEl.value = base.slug;
    document.getElementById("admEdAuthor").value = art.author || DEFAULT_AUTHOR;
    document.getElementById("admEdDate").value = art.iso || admTodayIso();
    document.getElementById("admEdCoverUrl").value = art.img || "";
    document.getElementById("admEdExcerpt").value = art.excerpt || "";
    document.getElementById("admEdTags").value = (art.tags || []).join(", ");
    document.getElementById("admEdStatus").value = art.status === "draft" ? "draft" : "published";
    document.getElementById("admEdErr").classList.add("adm-hide");
    document.getElementById("admEdMeta").textContent = art.edited ? "Diperbarui " + admTimeAgo(art.updatedAt) : "Artikel bawaan";
    const area = document.getElementById("admEdArea");
    const saveBtn = document.getElementById("admEdSave");
    if (art.content) {
      area.innerHTML = art.content;
      admBuiltinOrigContent = area.innerHTML.trim();
      admOpenDrawerUI();
      return;
    }
    area.innerHTML = '<div class="am-loading"><div class="am-spinner"></div><span>Memuat isi artikel\u2026</span></div>';
    saveBtn.disabled = true;
    admOpenDrawerUI();
    const t = admToast("info", "Mengambil isi artikel\u2026", art.title, 0);
    let content = "";
    try {
      const sf = admRoot().superFetch;
      if (!sf) throw new Error("no superFetch");
      const html = await sf(art.url).then(r => r.text());
      content = extractArticle(html).innerHTML;
    } catch (e) { content = ""; }
    if (AdmUI.editingBuiltin !== slug) return;
    saveBtn.disabled = false;
    if (!content) {
      area.innerHTML = "";
      admToastDone(t, "err", "Gagal mengambil isi", "Tulis isi artikel secara manual, lalu simpan.");
      admUpdateWordCount();
      return;
    }
    area.innerHTML = admSanitizeHtml(content);
    admBuiltinOrigContent = area.innerHTML.trim();
    admToastDone(t, "ok", "Isi artikel siap", "Sunting lalu simpan perubahan.");
    admUpdateWordCount();
  }
  function admCloseEditor() {
    document.getElementById("admDrawer").classList.remove("open");
    AdmUI.editingBuiltin = null;
    AdmUI.editingId = null;
  }
  function admUpdateWordCount() {
    const txt = (document.getElementById("admEdArea").innerText || "").trim();
    const n = txt ? txt.split(/\s+/).length : 0;
    document.getElementById("admEdWordCount").textContent = n + " kata \u00b7 " + txt.length + " karakter";
  }
  async function admSaveEditor() {
    const err = document.getElementById("admEdErr");
    const fail = (msg) => { err.querySelector("span").textContent = msg; err.classList.remove("adm-hide"); err.scrollIntoView({ block: "center", behavior: "smooth" }); };
    const title = document.getElementById("admEdPostTitle").value.trim();
    const content = document.getElementById("admEdArea").innerHTML.trim();
    const author = document.getElementById("admEdAuthor").value.trim() || DEFAULT_AUTHOR;
    const date = document.getElementById("admEdDate").value || admTodayIso();
    const cover = document.getElementById("admEdCoverUrl").value.trim();
    const excerpt = document.getElementById("admEdExcerpt").value.trim();
    const tags = document.getElementById("admEdTags").value.split(",").map(s => s.trim()).filter(Boolean);
    const status = document.getElementById("admEdStatus").value === "draft" ? "draft" : "published";
    const slugField = document.getElementById("admEdSlug");
    if (!title) return fail("Judul artikel wajib diisi.");
    if (!content || !content.replace(/<[^>]*>/g, "").trim()) return fail("Isi artikel masih kosong.");
    err.classList.add("adm-hide");
    const btn = document.getElementById("admEdSave");
    if (AdmUI.editingBuiltin) {
      const builtinSlug = AdmUI.editingBuiltin;
      btn.disabled = true;
      btn.querySelector("svg").outerHTML = '<span class="adm-spin"></span>';
      const sanitized = admSanitizeHtml(content);
      const prev = AdmStore.builtin[builtinSlug] || {};
      const rec = {
        title: title, date: date, cover: cover, excerpt: excerpt, author: author,
        content: (sanitized && content !== admBuiltinOrigContent) ? sanitized : null,
        tags: tags, status: status, edited: true, updatedAt: Date.now()
      };
      if (prev.hidden) rec.hidden = false;
      AdmStore.builtin[builtinSlug] = rec;
      await admSaveStore();
      await admLog("edit", "Artikel bawaan diperbarui: " + title);
      admApplyArticles(); admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
      admCloseEditor();
      admToast("ok", "Artikel bawaan diperbarui", status === "published" ? "Perubahan tampil di halaman Artikel website." : "Disimpan sebagai draft.");
      admQueuePublish();
      btn.disabled = false;
      btn.innerHTML = AdmIC.check + "Simpan Artikel";
      return;
    }
    if (!slugField.value.trim()) slugField.value = admSlugify(title);
    const slug = admUniqueSlug(slugField.value, AdmUI.editingId);
    slugField.value = slug;
    btn.disabled = true;
    btn.querySelector("svg").outerHTML = '<span class="adm-spin"></span>';
    const existing = AdmUI.editingId ? admFindPost(AdmUI.editingId) : null;
    const rec = {
      id: existing ? existing.id : admNewId(),
      title: title, slug: slug, date: date, cover: cover, excerpt: excerpt, author: author,
      content: admSanitizeHtml(content), tags: tags, status: status,
      createdAt: existing ? existing.createdAt : Date.now(), updatedAt: Date.now()
    };
    if (existing) {
      const i = AdmStore.posts.indexOf(existing);
      AdmStore.posts[i] = rec;
    } else {
      AdmStore.posts.unshift(rec);
    }
    await admSaveStore();
    await admLog(existing ? "edit" : "create", (existing ? "Artikel diperbarui: " : "Artikel dibuat: ") + title);
    admApplyArticles();
    admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
    admCloseEditor();
    admToast("ok", existing ? "Artikel diperbarui" : "Artikel disimpan", status === "published" ? "Tampil di halaman Artikel website." : "Disimpan sebagai draft.");
    AdmUI.editingId = null;
    admQueuePublish();
    btn.disabled = false;
    btn.innerHTML = AdmIC.check + "Simpan Artikel";
  }

  /* ---------- settings / misc renders ---------- */
  function admRenderSettings() {
    const el = document.getElementById("admPwMsg");
    if (el) el.classList.add("adm-hide");
  }
  function admRenderSysInfo() {
    const el = document.getElementById("admSysInfo");
    if (!el) return;
    const size = JSON.stringify(AdmStore.posts).length + JSON.stringify(AdmStore.media).length;
    el.innerHTML =
      '<div class="adm-feed"><li style="border:0;padding:0 0 10px"><span class="fi">' + AdmIC.doc + '</span><span><b>' + AdmStore.posts.length + ' artikel</b><time>' + AdmStore.posts.filter(p => p.status === "published").length + ' dipublikasikan \u00b7 ' + AdmStore.posts.filter(p => p.status === "draft").length + ' draft</time></span></li>' +
      '<li style="border:0;padding:0 0 10px"><span class="fi">' + AdmIC.img + '</span><span><b>' + AdmStore.media.length + ' gambar</b><time>Ukuran data panel \u2248 ' + Math.max(1, Math.round(size / 1024)) + ' KB</time></span></li>' +
      '<li style="border:0;padding:0 0 10px"><span class="fi">' + AdmIC.clock + '</span><span><b>Sesi berakhir ' + (AdmStore.sessionExp ? new Date(AdmStore.sessionExp).toLocaleString("id-ID") : "\u2014") + '</b><time>Sesi otomatis berakhir setelah 12 jam</time></span></li>' +
      '<li style="border:0;padding:0"><span class="fi">' + AdmIC.info + '</span><span><b>' + admEsc(admGenName()) + '</b><time>Nama generator \u00b7 berkas publik: ' + admEsc(ADM_FILE) + '</time></span></li></div>';
  }
  function admRenderKeyBox() {
    const box = document.getElementById("admKeyBox");
    if (!box) return;
    const key = AdmStore.editKey;
    box.innerHTML =
      '<div class="adm-alert ' + (key ? "ok" : "warn") + '">' + (key ? AdmIC.check : AdmIC.warn) + '<span>' +
      (key
        ? "Kunci edit tersimpan di perangkat ini. Simpan salinannya \u2014 kunci ini diperlukan jika Anda ingin menyunting artikel dari perangkat lain, dan tidak bisa dipulihkan."
        : "Kunci edit belum tersedia. Kunci dibuat otomatis saat artikel pertama dipublikasikan; Anda juga bisa menempelkan kunci dari perangkat lain di bawah.") +
      '</span></div>' +
      '<div class="adm-field"><label for="admKeyInput">Kunci Edit</label><input class="adm-input" id="admKeyInput" spellcheck="false" placeholder="tempel kunci edit di sini" value="' + admEsc(key || "") + '"></div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" class="adm-btn adm-btn-primary adm-btn-sm" id="admKeySave">' + AdmIC.check + 'Simpan Kunci</button>' +
      '<button type="button" class="adm-btn adm-btn-ghost adm-btn-sm" id="admKeyCopy">' + AdmIC.copy + 'Salin</button>' +
      '<button type="button" class="adm-btn adm-btn-danger adm-btn-sm" id="admKeyClear">Lupakan</button></div>';
    const save = document.getElementById("admKeySave");
    if (save) save.addEventListener("click", async () => {
      const v = document.getElementById("admKeyInput").value.trim();
      AdmStore.editKey = v || null;
      await admKSet("editKey", AdmStore.editKey);
      admToast("ok", "Kunci edit disimpan", "Coba sinkronkan artikel untuk memastikan kunci valid.");
      admRenderKeyBox();
    });
    const cp = document.getElementById("admKeyCopy");
    if (cp) cp.addEventListener("click", () => admCopy(AdmStore.editKey || "", "Kunci edit"));
    const cl = document.getElementById("admKeyClear");
    if (cl) cl.addEventListener("click", async () => {
      const ok = await admConfirm("Lupakan kunci edit?", "Anda tidak akan bisa menyunting artikel publik dari perangkat ini sampai kunci ditempelkan kembali.", "Lupakan", true);
      if (!ok) return;
      AdmStore.editKey = null;
      await admKDel("editKey");
      admRenderKeyBox();
    });
  }
  function admCopy(text, label) {
    if (!text) { admToast("err", "Tidak ada yang bisa disalin", ""); return; }
    const done = () => admToast("ok", (label || "Teks") + " disalin", "");
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done).catch(() => admFallbackCopy(text, done));
    else admFallbackCopy(text, done);
  }
  function admFallbackCopy(text, done) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { admToast("err", "Gagal menyalin", "Salin manual dari kolom teks."); }
    ta.remove();
  }
  function admRenderLoginHelp(msg) {
    const el = document.getElementById("admLockHelp");
    if (!el) return;
    el.innerHTML = msg || "";
  }

  /* ---------- login / enter ---------- */
  async function admFillLoginHelp(extra) {
    const until = await admKGet("lockUntil", 0);
    const fails = await admKGet("failCount", 0);
    if (until > Date.now()) {
      admRenderLoginHelp('<span style="color:#C33434;font-weight:700">Terlalu banyak percobaan. Coba lagi dalam ' + Math.ceil((until - Date.now()) / 60000) + ' menit.</span>');
      document.getElementById("admLoginBtn").disabled = true;
      return;
    }
    document.getElementById("admLoginBtn").disabled = false;
    let html = "Masukkan password admin untuk melanjutkan.";
    if (fails > 0) html = '<span style="color:#9A5B00;font-weight:700">' + fails + " percobaan gagal. Setelah 5 percobaan, login dikunci 5 menit.</span>";
    if (extra) html += " " + extra;
    admRenderLoginHelp(html);
  }
  async function admEnter() {
    await admLoadStore();
    const has = await admHasSession();
    document.getElementById("admLogin").classList.toggle("adm-hide", has);
    document.getElementById("admPanel").classList.toggle("adm-hide", !has);
    document.body.classList.toggle("adm-panel-on", has);
    admRenderSync();
    if (has) {
      document.getElementById("admSessionInfo").textContent = "Masuk \u00b7 " + new Date(AdmStore.sessionExp).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      admSetView(AdmUI.view);
      admRenderDashboard();
      if (!admKV()) admToast("err", "Penyimpanan tidak tersedia", "Plugin kv gagal dimuat, data tidak bisa disimpan.");
    } else {
      admFillLoginHelp();
    }
  }
  async function admDoLogin(e) {
    if (e) e.preventDefault();
    const btn = document.getElementById("admLoginBtn");
    const err = document.getElementById("admLoginErr");
    const inp = document.getElementById("admPw");
    const pw = inp.value;
    if (!pw) { err.querySelector("span").textContent = "Masukkan password terlebih dahulu."; err.classList.remove("adm-hide"); return; }
    btn.disabled = true;
    const label = btn.querySelector("span");
    const old = label.textContent;
    label.textContent = "Memeriksa\u2026";
    err.classList.add("adm-hide");
    const res = await admTryLogin(pw);
    btn.disabled = false;
    label.textContent = old;
    if (res.ok) {
      await admStartSession();
      inp.value = "";
      await admLog("login", "Login admin berhasil");
      await admEnter();
      admToast("ok", "Selamat datang, Admin", "Anda berhasil masuk ke panel.");
      return;
    }
    if (res.locked) {
      err.querySelector("span").textContent = "Terlalu banyak percobaan gagal. Coba lagi dalam " + Math.ceil((res.until - Date.now()) / 60000) + " menit.";
    } else {
      err.querySelector("span").textContent = "Password salah." + (res.remaining ? " Sisa " + res.remaining + " percobaan." : "");
    }
    err.classList.remove("adm-hide");
    admFillLoginHelp();
    inp.select();
  }
  async function admLogout() {
    const ok = await admConfirm("Keluar dari panel?", "Anda perlu memasukkan password lagi untuk masuk kembali.", "Keluar", true);
    if (!ok) return;
    await admEndSession();
    AdmStore.sync = "idle";
    await admEnter();
    admToast("info", "Anda telah keluar", "Sesi admin diakhiri.");
  }

  /* ---------- delete / duplicate / fork ---------- */
  async function admDeletePost(id) {
    const p = admFindPost(id);
    if (!p) return;
    const ok = await admConfirm("Hapus artikel?", "\u201c" + p.title + "\u201d akan dihapus permanen dari website.", "Hapus", true);
    if (!ok) return;
    AdmStore.posts = AdmStore.posts.filter(x => x.id !== id);
    await admSaveStore();
    await admLog("delete", "Artikel dihapus: " + p.title);
    admApplyArticles(); admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
    admToast("ok", "Artikel dihapus", p.title);
    admQueuePublish();
  }
  function admDuplicatePost(id) {
    const p = admFindPost(id);
    if (!p) return;
    const copy = JSON.parse(JSON.stringify(p));
    copy.id = admNewId();
    copy.title = p.title + " (Salinan)";
    copy.slug = admUniqueSlug(p.slug + "-salinan", null);
    copy.status = "draft";
    copy.createdAt = copy.updatedAt = Date.now();
    delete copy.dateLabel;
    AdmStore.posts.unshift(copy);
    admSaveStore();
    admLog("create", "Artikel diduplikat: " + p.title);
    admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderNavCounts();
    admToast("ok", "Artikel diduplikat", "Salinan disimpan sebagai draft.");
  }
  async function admForkBuiltin(slug) {
    const art = findArticle(slug);
    if (!art) return;
    const ok = await admConfirm("Salin artikel bawaan?", "Isi artikel \u201c" + art.title + "\u201d akan diambil dari bonekaku.co.id dan disimpan sebagai draft baru yang bisa Anda sunting.", "Salin sebagai Draft");
    if (!ok) return;
    const t = admToast("info", "Mengambil isi artikel\u2026", art.title, 0);
    let content = "";
    try {
      const sf = admRoot().superFetch;
      if (!sf) throw new Error("no superFetch");
      const html = await sf(art.url).then(r => r.text());
      const node = extractArticle(html);
      content = node.innerHTML;
    } catch (e) { content = ""; }
    if (!content) { admToastDone(t, "err", "Gagal mengambil isi", "Buka artikel di website Bonekaku lalu salin manual."); return; }
    const rec = {
      id: admNewId(), title: art.title, slug: admUniqueSlug(art.slug + "-salinan", null),
      date: art.iso || admTodayIso(), cover: art.img || "", excerpt: "", author: art.author || DEFAULT_AUTHOR,
      content: admSanitizeHtml(content),
      tags: ["bonekaku"], status: "draft", createdAt: Date.now(), updatedAt: Date.now()
    };
    AdmStore.posts.unshift(rec);
    await admSaveStore();
    await admLog("create", "Artikel bawaan disalin: " + art.title);
    admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderNavCounts();
    admToastDone(t, "ok", "Artikel disalin sebagai draft", "Buka editor untuk menyuntingnya.");
  }
  async function admDeleteBuiltin(slug) {
    const base = admFindBuiltin(slug);
    if (!base) return;
    const art = admBuiltinMerged(base, AdmStore.builtin);
    const ok = await admConfirm("Hapus artikel bawaan?", "\u201c" + art.title + "\u201d akan disembunyikan dari website. Anda bisa memulihkannya kembali dari daftar artikel.", "Hapus", true);
    if (!ok) return;
    const ov = AdmStore.builtin[slug] || {};
    ov.hidden = true;
    AdmStore.builtin[slug] = ov;
    await admSaveStore();
    await admLog("delete", "Artikel bawaan dihapus: " + art.title);
    admApplyArticles(); admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
    admToast("ok", "Artikel bawaan dihapus", "Tersembunyi dari website \u00b7 bisa dipulihkan dari daftar.");
    admQueuePublish();
  }
  async function admRestoreBuiltin(slug) {
    const base = admFindBuiltin(slug);
    if (!base) return;
    const ov = AdmStore.builtin[slug];
    if (!ov) return;
    const title = ov.title || base.title;
    const ok = await admConfirm("Pulihkan artikel bawaan?", "\u201c" + title + "\u201d akan ditampilkan kembali di website.", "Pulihkan");
    if (!ok) return;
    delete ov.hidden;
    if (!Object.keys(ov).length) delete AdmStore.builtin[slug];
    await admSaveStore();
    await admLog("edit", "Artikel bawaan dipulihkan: " + title);
    admApplyArticles(); admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
    admToast("ok", "Artikel bawaan dipulihkan", "Tampil kembali di halaman Artikel.");
    admQueuePublish();
  }

  /* ---------- editor toolbar ---------- */
  function admExec(cmd, val) {
    const area = document.getElementById("admEdArea");
    if (area) area.focus();
    try { document.execCommand(cmd, false, val || null); } catch (e) { }
    admUpdateWordCount();
    admSyncToolbar();
  }
  function admSyncToolbar() {
    const bar = document.getElementById("admEdBar");
    if (!bar) return;
    ["bold", "italic", "underline"].forEach(cmd => {
      const btn = bar.querySelector('[data-cmd="' + cmd + '"]');
      if (!btn) return;
      let on = false;
      try { on = document.queryCommandState(cmd); } catch (e) { }
      btn.classList.toggle("is-on", !!on);
    });
  }
  function admInsertImage(url) {
    const area = document.getElementById("admEdArea");
    if (!area || !url) return;
    area.focus();
    try { document.execCommand("insertHTML", false, '<img decoding="async"  src="' + admEsc(url) + '" alt="">'); }
    catch (e) { area.innerHTML += '<img decoding="async"  src="' + admEsc(url) + '" alt="">'; }
    admUpdateWordCount();
  }

  /* ---------- init ---------- */
  function admInit() {
    const loginForm = document.getElementById("admLoginForm");
    if (loginForm) loginForm.addEventListener("submit", admDoLogin);
    const eye = document.getElementById("admPwEye");
    if (eye) eye.addEventListener("click", () => {
      const inp = document.getElementById("admPw");
      inp.type = inp.type === "password" ? "text" : "password";
      eye.innerHTML = inp.type === "password"
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3l18 18M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2M6.7 6.7C4 8.3 2 12 2 12s3.6 7 10 7c2 0 3.7-.6 5.1-1.5M9.9 5.2A9.6 9.6 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-2.6 3.4"/></svg>';
    });
    document.querySelectorAll("#admNav button").forEach(b => b.addEventListener("click", () => admSetView(b.getAttribute("data-view"))));
    document.getElementById("admLogout").addEventListener("click", admLogout);
    document.getElementById("admNewPost").addEventListener("click", () => admOpenEditor(null));
    document.getElementById("admNewPostTop").addEventListener("click", () => admOpenEditor(null));
    document.getElementById("admPostSearch").addEventListener("input", (e) => { AdmUI.q = e.target.value; AdmUI.page = 1; admRenderPosts(); });
    document.querySelectorAll("#admPostFilter button").forEach(b => b.addEventListener("click", () => {
      AdmUI.filter = b.getAttribute("data-f");
      AdmUI.page = 1;
      document.querySelectorAll("#admPostFilter button").forEach(x => x.classList.toggle("active", x === b));
      admRenderPosts();
    }));
    document.getElementById("admPostList").addEventListener("click", (e) => {
      const t = e.target.closest("button,a");
      if (!t) return;
      if (t.hasAttribute("data-edit")) admOpenEditor(t.getAttribute("data-edit"));
      else if (t.hasAttribute("data-del")) admDeletePost(t.getAttribute("data-del"));
      else if (t.hasAttribute("data-dup")) admDuplicatePost(t.getAttribute("data-dup"));
      else if (t.hasAttribute("data-fork")) admForkBuiltin(t.getAttribute("data-fork"));
      else if (t.hasAttribute("data-editbuiltin")) admOpenBuiltinEditor(t.getAttribute("data-editbuiltin"));
      else if (t.hasAttribute("data-delbuiltin")) admDeleteBuiltin(t.getAttribute("data-delbuiltin"));
      else if (t.hasAttribute("data-restorebuiltin")) admRestoreBuiltin(t.getAttribute("data-restorebuiltin"));
      else if (t.hasAttribute("data-viewpost")) { const p = admFindPost(t.getAttribute("data-viewpost")); if (p) window.location.hash = "#/artikel/" + p.slug; }
      else if (t.hasAttribute("data-newpost")) admOpenEditor(null);
    });
    document.getElementById("admPostPageBtns").addEventListener("click", (e) => {
      const b = e.target.closest("[data-page]");
      if (!b || b.disabled) return;
      AdmUI.page = Math.max(1, Number(b.getAttribute("data-page")));
      admRenderPosts();
    });
    document.getElementById("admRecent").addEventListener("click", (e) => {
      const b = e.target.closest("[data-edit],[data-newpost]");
      if (!b) return;
      if (b.hasAttribute("data-edit")) admOpenEditor(b.getAttribute("data-edit"));
      else admOpenEditor(null);
    });
    document.getElementById("admQuick").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.hasAttribute("data-newpost")) admOpenEditor(null);
      else if (b.hasAttribute("data-goto")) admSetView(b.getAttribute("data-goto"));
    });
    document.getElementById("admPublishInfo").addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.id === "admPublishNow") { admPublish(); admToast("info", "Menyinkronkan\u2026", "Artikel publik sedang dikirim."); }
      else if (b.id === "admPubCopy") admCopy(admPublicUrl(), "Tautan publik");
    });
    document.getElementById("admMediaGrid").addEventListener("click", async (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      if (b.hasAttribute("data-mcopy")) admCopy(AdmStore.media[Number(b.getAttribute("data-mcopy"))].url, "URL gambar");
      else if (b.hasAttribute("data-mdel")) {
        const i = Number(b.getAttribute("data-mdel"));
        const it = AdmStore.media[i];
        const ok = await admConfirm("Hapus dari pustaka?", "Gambar akan dihapus dari daftar pustaka panel (berkas asli di server tetap ada).", "Hapus", true);
        if (!ok) return;
        AdmStore.media.splice(i, 1);
        await admSaveStore();
        admRenderMedia();
        admToast("ok", "Gambar dihapus dari pustaka", it ? it.name : "");
      }
    });
    const drop = document.getElementById("admDrop");
    drop.addEventListener("click", () => admPickFiles("media"));
    ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); drop.classList.add("is-over"); }));
    ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, (e) => { e.preventDefault(); e.stopPropagation(); drop.classList.remove("is-over"); }));
    drop.addEventListener("drop", (e) => admUploadFiles(e.dataTransfer && e.dataTransfer.files));
    document.getElementById("admFileInput").addEventListener("change", async (e) => {
      const files = e.target.files;
      if (admFileMode === "cover") {
        const out = await admUploadFiles(files);
        if (out[0]) admSetCover(out[0].url);
      } else if (admFileMode === "editor") {
        const out = await admUploadFiles(files);
        out.forEach(it => admInsertImage(it.url));
        if (out[0]) admCopy(out[0].url, "URL gambar");
      } else {
        await admUploadFiles(files);
      }
      e.target.value = "";
    });
    document.getElementById("admEdArea").addEventListener("input", admUpdateWordCount);
    document.getElementById("admEdArea").addEventListener("keyup", admSyncToolbar);
    document.getElementById("admEdArea").addEventListener("mouseup", admSyncToolbar);
    document.getElementById("admEdBar").addEventListener("mousedown", (e) => { if (e.target.closest(".adm-tool")) e.preventDefault(); });
    document.getElementById("admEdBar").addEventListener("click", (e) => {
      const b = e.target.closest(".adm-tool");
      if (!b) return;
      const cmd = b.getAttribute("data-cmd");
      if (cmd === "bold" || cmd === "italic" || cmd === "underline") admExec(cmd);
      else if (cmd === "h2") admExec("formatBlock", "h2");
      else if (cmd === "h3") admExec("formatBlock", "h3");
      else if (cmd === "p") admExec("formatBlock", "p");
      else if (cmd === "ul") admExec("insertUnorderedList");
      else if (cmd === "ol") admExec("insertOrderedList");
      else if (cmd === "quote") admExec("formatBlock", "blockquote");
      else if (cmd === "undo") admExec("undo");
      else if (cmd === "redo") admExec("redo");
      else if (cmd === "clear") admExec("removeFormat");
      else if (cmd === "link") {
        const url = window.prompt(window.bkI18n ? window.bkI18n.tr("Masukkan URL tautan:") : "Masukkan URL tautan:", "https://");
        if (url && url !== "https://") admExec("createLink", url);
      } else if (cmd === "image") {
        admModal({
          title: "Sisipkan Gambar", text: "Unggah gambar baru atau pilih dari pustaka media.",
          actions: [
            { label: "Unggah Baru", cls: "adm-btn-ghost", onClick: () => admPickFiles("editor") },
            { label: "Pilih dari Pustaka", cls: "adm-btn-primary", onClick: () => admPickMedia(url => admInsertImage(url)) },
            { label: "Pakai URL", cls: "adm-btn-ghost", onClick: () => { const u = window.prompt("Tempel URL gambar:", "https://"); if (u) admInsertImage(u); } }
          ]
        });
      }
    });
    document.getElementById("admEdClose").addEventListener("click", admCloseEditor);
    document.getElementById("admEdCancel").addEventListener("click", admCloseEditor);
    document.getElementById("admEdSave").addEventListener("click", admSaveEditor);
    document.getElementById("admEdPreview").addEventListener("click", () => {
      const title = document.getElementById("admEdPostTitle").value.trim() || "Pratinjau Artikel";
      const content = document.getElementById("admEdArea").innerHTML;
      admModal({ title: title, wide: true, bodyHtml: '<div class="ad-content">' + admSanitizeHtml(content) + '</div>', actions: [{ label: "Tutup", cls: "adm-btn-primary" }] });
    });
    document.getElementById("admEdCoverUrl").addEventListener("input", admRenderCoverPrev);
    document.getElementById("admEdCoverUpload").addEventListener("click", () => admPickFiles("cover"));
    document.getElementById("admEdCoverLib").addEventListener("click", () => admPickMedia(url => admSetCover(url)));
    document.getElementById("admEdCoverClear").addEventListener("click", () => admSetCover(""));
    document.getElementById("admEdPostTitle").addEventListener("input", () => {
      const slug = document.getElementById("admEdSlug");
      if (!AdmUI.editingId && !AdmUI.editingBuiltin && !slug.dataset.touched) slug.value = admSlugify(document.getElementById("admEdPostTitle").value);
    });
    document.getElementById("admEdSlug").addEventListener("input", (e) => { e.target.dataset.touched = "1"; });
    document.getElementById("admPwSave").addEventListener("click", async () => {
      const msg = document.getElementById("admPwMsg");
      const show = (kind, text) => { msg.className = "adm-alert " + kind; msg.querySelector("span").textContent = text; };
      const cur = document.getElementById("admPwCur").value;
      const a = document.getElementById("admPwNew").value;
      const b = document.getElementById("admPwNew2").value;
      if (!cur || !a || !b) return show("err", "Semua kolom password wajib diisi.");
      if (a.length < 8) return show("err", "Password baru minimal 8 karakter.");
      if (a !== b) return show("err", "Ulangi password tidak sama.");
      const target = (await admKGet("pwHash", null)) || ADM_PW_HASH_DEFAULT;
      if (await admHash(cur) !== target) return show("err", "Password saat ini salah.");
      await admKSet("pwHash", await admHash(a));
      document.getElementById("admPwCur").value = "";
      document.getElementById("admPwNew").value = "";
      document.getElementById("admPwNew2").value = "";
      await admLog("security", "Password admin diubah");
      show("ok", "Password berhasil diubah. Gunakan password baru saat login berikutnya.");
      admToast("ok", "Password diperbarui", "Password baru aktif untuk perangkat ini.");
    });
    document.getElementById("admPwDefault").addEventListener("click", async () => {
      const msg = document.getElementById("admPwMsg");
      const ok = await admConfirm("Kembalikan password awal?", "Password akan kembali ke password bawaan generator.", "Kembalikan", true);
      if (!ok) return;
      await admKDel("pwHash");
      await admLog("security", "Password admin dikembalikan ke bawaan");
      msg.className = "adm-alert ok";
      msg.querySelector("span").textContent = "Password dikembalikan ke password awal.";
      admToast("ok", "Password dikembalikan", "Gunakan password awal untuk login.");
    });
    document.getElementById("admWipePosts").addEventListener("click", async () => {
      const ok = await admConfirm("Hapus semua artikel admin?", AdmStore.posts.length + " artikel akan dihapus permanen dari panel dan website.", "Hapus Semua", true);
      if (!ok) return;
      AdmStore.posts = [];
      await admSaveStore();
      await admLog("delete", "Semua artikel admin dihapus");
      admApplyArticles(); admRenderPosts(); admRenderStats(); admRenderRecent(); admRenderChart(); admRenderPublishInfo(); admRenderNavCounts();
      admToast("ok", "Semua artikel admin dihapus", "");
      admQueuePublish();
    });
    document.getElementById("admWipeAll").addEventListener("click", async () => {
      const ok = await admConfirm("Reset seluruh data panel?", "Artikel, pustaka media, aktivitas, dan pengaturan panel akan dihapus.", "Reset Panel", true);
      if (!ok) return;
      AdmStore.posts = []; AdmStore.media = []; AdmStore.feed = []; AdmStore.builtin = {};
      await admSaveStore();
      await admApplyArticles(); admRenderDashboard(); admRenderPosts(); admRenderMedia(); admRenderSettings(); admRenderKeyBox(); admRenderSysInfo();
      admToast("ok", "Panel direset", "Semua data panel telah dibersihkan.");
      admQueuePublish();
    });
    document.getElementById("admModal").addEventListener("click", (e) => { if (e.target.id === "admModal") admCloseModal(); });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (document.getElementById("admModal").classList.contains("open")) admCloseModal();
      else if (document.getElementById("admDrawer").classList.contains("open")) admCloseEditor();
    });
  }

  window.AdmPanel = { enter: admEnter, boot: admBoot, init: admInit };

  AdmPanel.init();
  initCatalog();
  initArticles();
  showPage(curPage());
  AdmPanel.boot();
