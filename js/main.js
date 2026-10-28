/* =========================================================
   VT Land Services — shared header/footer + interactions
   ========================================================= */
(function () {
  const S = window.SITE;
  const page = document.body.dataset.page || "home";

  const ICON = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-6 8-12a8 8 0 0 0-16 0c0 6 8 12 8 12z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-6h6v6"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
    quote: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>'
  };
  window.ICON = ICON;

  // Old links/bookmarks like /about.html or /index.html: show the clean address instead
  if (/\.html$/.test(location.pathname)) {
    const clean = location.pathname.replace(/(index)?\.html$/, "");
    history.replaceState(null, "", clean + location.search + location.hash);
  }

  const links = [
    ["home", "/", "Home"],
    ["services", "/services", "What We Do"],
    ["work", "/work", "Our Work"],
    ["about", "/about", "Who We Are"],
    ["contact", "/contact", "Contact"]
  ];

  /* ---------- Header ---------- */
  const header = document.createElement("header");
  header.className = "site-header" + (page === "home" ? "" : " solid");
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="/" aria-label="${S.name} home">
        <img src="images/logo.png" alt="${S.name} logo" width="58" height="58">
        <span>VT <b>Land</b> Services</span>
      </a>
      <button class="menu-toggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <ul class="nav-links">
        ${links.map(([k, href, label]) => `<li><a href="${href}" class="${k === page ? "active" : ""}">${label}</a></li>`).join("")}
        <li><a class="btn btn-primary nav-cta" href="tel:${S.phoneLink}">${ICON.phone} ${S.phone}</a></li>
      </ul>
    </div>`;
  document.body.prepend(header);

  const toggle = header.querySelector(".menu-toggle");
  toggle.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", open);
  });
  header.querySelectorAll(".nav-links a").forEach(a =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Footer + mobile call bar ---------- */
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/logo-wide.png" alt="${S.name} logo">
          <p>Land clearing, grading, tree work and landscaping across the North Carolina foothills.</p>
          <p class="footer-trust">${ICON.shield} Fully insured · Free estimates</p>
          <div class="social">
            <a href="${S.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
            <a href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>${links.map(([, href, label]) => `<li><a href="${href}">${label}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/services#clearing">Land Clearing</a></li>
            <li><a href="/services#grading">Grading &amp; Site Prep</a></li>
            <li><a href="/services#driveway">Driveways</a></li>
            <li><a href="/services#tree">Tree Work</a></li>
            <li><a href="/services#landscape">Landscaping</a></li>
            <li><a href="/services#hydroseeding">Hydroseeding</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${S.phoneLink}">${S.phone}</a></li>
            <li><a href="mailto:${S.email}">${S.email}</a></li>
            <li>${S.serviceArea}</li>
            <li>${S.hours}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} ${S.name}. All rights reserved.</span>
        <span>Serving Catawba · Lincoln · Gaston · Iredell · Caldwell · Burke</span>
      </div>
    </div>`;
  document.body.append(footer);

  const bar = document.createElement("div");
  bar.className = "call-bar";
  bar.innerHTML = `<a href="tel:${S.phoneLink}">${ICON.phone} Call Now</a><a href="/contact#quote">${ICON.quote} Free Quote</a>`;
  document.body.append(bar);

  /* ---------- Fill in [data-phone] / [data-email] placeholders ---------- */
  document.querySelectorAll("[data-phone]").forEach(el => { el.href = "tel:" + S.phoneLink; if (!el.dataset.keep) el.textContent = S.phone; });
  document.querySelectorAll("[data-email]").forEach(el => { el.href = "mailto:" + S.email; if (!el.dataset.keep) el.textContent = S.email; });
  document.querySelectorAll("[data-area]").forEach(el => el.textContent = S.serviceArea);
  document.querySelectorAll("[data-hours]").forEach(el => el.textContent = S.hours);
  document.querySelectorAll("[data-icon]").forEach(el => el.innerHTML = ICON[el.dataset.icon] || "");

  /* ---------- Trust badges (Fully Insured / Free Estimates / Locally Owned) in every [data-trust] ---------- */
  const TRUST = `<span>${ICON.shield} Fully Insured</span><span>${ICON.check} Free Estimates</span><span>${ICON.home} Locally Owned</span>`;
  document.querySelectorAll("[data-trust]").forEach(el => el.innerHTML = TRUST);

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  const observeReveals = root => root.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
  observeReveals(document);

  /* ---------- Lightbox ---------- */
  let lbList = [], lbIndex = 0;
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `<button class="lb-btn lb-close" aria-label="Close">✕</button>
    <button class="lb-btn lb-prev" aria-label="Previous">‹</button>
    <img alt=""><p></p>
    <button class="lb-btn lb-next" aria-label="Next">›</button>`;
  document.body.append(lb);
  const lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p");
  const showLb = () => { const p = lbList[lbIndex]; lbImg.src = p.src; lbImg.alt = p.title; lbCap.textContent = p.title; };
  const openLb = (list, i) => { lbList = list; lbIndex = i; showLb(); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeLb = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  const step = d => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLb(); };
  lb.querySelector(".lb-close").onclick = closeLb;
  lb.querySelector(".lb-prev").onclick = () => step(-1);
  lb.querySelector(".lb-next").onclick = () => step(1);
  lb.addEventListener("click", e => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
  let tx = 0;
  lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", e => { const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });

  const figure = (p, i) =>
    `<figure data-i="${i}" class="reveal"><img src="${p.src}" alt="${p.title}" loading="lazy"><figcaption>${p.title}</figcaption></figure>`;

  /* ---------- Home carousel ---------- */
  const track = document.querySelector(".carousel-track");
  if (track && window.PHOTOS) {
    const list = PHOTOS.filter(p => p.featured);
    track.innerHTML = list.map(figure).join("");
    track.querySelectorAll("figure").forEach(f => f.addEventListener("click", () => openLb(list, +f.dataset.i)));
    const amount = () => track.querySelector("figure").offsetWidth + 16;
    document.querySelector(".carousel-prev")?.addEventListener("click", () => track.scrollBy({ left: -amount() }));
    document.querySelector(".carousel-next")?.addEventListener("click", () => track.scrollBy({ left: amount() }));
    observeReveals(track);
  }

  /* ---------- Gallery with filters ---------- */
  const gallery = document.querySelector(".gallery");
  if (gallery && window.PHOTOS) {
    let current = PHOTOS;
    const render = cat => {
      current = cat === "all" ? PHOTOS : PHOTOS.filter(p => p.category === cat);
      gallery.innerHTML = current.map(figure).join("");
      gallery.querySelectorAll("figure").forEach(f => f.addEventListener("click", () => openLb(current, +f.dataset.i)));
      observeReveals(gallery);
    };
    document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
    }));
    document.querySelectorAll(".filter").forEach(btn => {
      const f = btn.dataset.filter;
      if (f !== "all" && !PHOTOS.some(p => p.category === f)) btn.hidden = true;
    });
    render("all");
  }

  /* ---------- Before / after slider ---------- */
  document.querySelectorAll(".ba").forEach(ba => {
    const range = ba.querySelector("input"), after = ba.querySelector(".ba-after"), handle = ba.querySelector(".ba-handle");
    const set = v => { after.style.clipPath = `inset(0 0 0 ${v}%)`; handle.style.left = v + "%"; };
    range.addEventListener("input", () => set(range.value));
    set(range.value);
  });

  /* ---------- Quote form → Formspree (emails him, nothing stored on the site) ---------- */
  const form = document.querySelector("#quote-form");
  if (form) {
    form.action = "https://formspree.io/f/" + S.formspreeId;
    // "#quote" links: land with the top of the form just below the fixed header
    // (no element has id="quote", so the browser never jumps on its own and fights this)
    const toForm = (behavior = "instant") => {
      const headerH = document.querySelector("header")?.offsetHeight || 0;
      let top = 0;
      for (let el = form; el; el = el.offsetParent) top += el.offsetTop; // ignores the reveal transform
      window.scrollTo({ top: top - headerH - 20, behavior });
    };
    if (location.hash === "#quote") {
      history.scrollRestoration = "manual";
      toForm();
      window.addEventListener("load", () => { toForm(); setTimeout(toForm, 300); });
    }
    // already on this page (e.g. the mobile "Free Quote" bar): scroll here instead of reloading
    document.addEventListener("click", e => {
      const a = e.target.closest('a[href$="#quote"]');
      if (!a) return;
      e.preventDefault();
      history.replaceState(null, "", "#quote");
      toForm("smooth");
    });
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", async e => {
      e.preventDefault();
      if (form.querySelector(".hp input").value) return; // spam trap
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "Sending…";
      status.className = "form-status"; status.textContent = "";
      try {
        const res = await fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error();
        form.reset();
        status.className = "form-status ok";
        status.textContent = "Thanks! We got your request and will get back to you shortly.";
      } catch {
        status.className = "form-status err";
        status.innerHTML = `Something went wrong. Please call or text <a href="tel:${S.phoneLink}">${S.phone}</a>.`;
      } finally {
        btn.disabled = false; btn.textContent = "Send Request";
      }
    });
  }

  /* ---------- Background videos: respect "reduce motion" (show the still poster instead) ---------- */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[autoplay]").forEach(v => { v.removeAttribute("autoplay"); v.pause(); });
  }
})();
