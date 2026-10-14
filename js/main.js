/* Rehan Janjua — Portfolio logic. Content lives in js/data.js. */
(function () {
  "use strict";
  var D = window.PORTFOLIO;
  var root = document.documentElement;
  root.classList.add("js");
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;
  var canVT = !!document.startViewTransition && !reduceMotion;

  /* tiny safe element builder (uses textContent, never innerHTML) */
  function h(tag, attrs) {
    var el = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "text") el.textContent = attrs[k];
      else if (k === "class") el.className = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c != null) el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }
  var img = function (name, small) { return "assets/img/" + name + (small ? "-sm" : "") + ".webp"; };

  /* split text into masked words (or characters) for rise-in animations */
  function split(el, chars) {
    var text = el.textContent; el.setAttribute("aria-label", text); el.textContent = "";
    var n = 0;
    text.split(" ").forEach(function (word, wi, arr) {
      var w = h("span", { class: "w", "aria-hidden": "true" });
      if (chars) word.split("").forEach(function (ch) { var s = h("span", { class: "wi" }, ch); s.style.setProperty("--i", n++); w.appendChild(s); });
      else { var s = h("span", { class: "wi" }, word); s.style.setProperty("--i", n++); w.appendChild(s); }
      el.appendChild(w);
      if (wi < arr.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }

  /* ---------- Hero / About text ---------- */
  $("#heroEyebrow").textContent = D.hero.eyebrow;
  $("#heroHeadline").textContent = D.hero.headline;
  $("#heroIntro").textContent = D.hero.intro;
  $("#aboutTitle").textContent = D.about.lead;
  D.about.paragraphs.forEach(function (p) { $("#aboutText").appendChild(h("p", { text: p })); });
  D.about.facts.forEach(function (f) { $("#facts").appendChild(h("div", null, h("dt", { text: f[0] }), h("dd", { text: f[1] }))); });
  $("#yr").textContent = D.site.year;
  split($(".h-name"), true); $(".h-name").classList.add("chars");

  /* ---------- Work grid + filters ---------- */
  var grid = $("#grid"), filters = $("#filters"), active = "all";
  D.categories.forEach(function (c) {
    filters.appendChild(h("button", { class: "chip", type: "button", "aria-pressed": c.id === "all" ? "true" : "false", "data-cat": c.id, text: c.label }));
  });
  var allCards = [];
  D.projects.forEach(function (p) {
    var im = h("img", { src: img(p.cover, true), srcset: img(p.cover, true) + " 800w, " + img(p.cover) + " 1800w", sizes: "(min-width:1040px) 33vw, (min-width:640px) 50vw, 100vw",
      alt: p.alt || p.title, loading: "lazy", decoding: "async", width: 800, height: Math.round(800 / p.ratio) });
    var card = h("button", { class: "card reveal", type: "button", "data-id": p.id, "data-cat": p.category, "aria-label": p.title + " — open details" },
      h("div", { class: "frame" }, im),
      h("div", { class: "card-cap" }, h("strong", { text: p.title }), h("span", { text: p.type })));
    card.style.setProperty("--r-img", p.ratio);
    card._ratio = p.ratio; allCards.push(card);
  });
  /* Deterministic masonry: card heights are known from their aspect ratios, so nothing reflows when images load */
  var colCount = 0;
  function layoutGrid(force) {
    var n = innerWidth >= 1040 ? 3 : innerWidth >= 640 ? 2 : 1;
    if (!force && n === colCount) return; colCount = n;
    var cols = [], hs = [], i;
    grid.textContent = "";
    for (i = 0; i < n; i++) { cols.push(h("div", { class: "col" })); hs.push(0); grid.appendChild(cols[i]); }
    allCards.forEach(function (c) {
      if (c.hidden) { cols[0].appendChild(c); return; }
      var k = hs.indexOf(Math.min.apply(null, hs));
      cols[k].appendChild(c); hs[k] += 1 / c._ratio + 0.2;
    });
  }
  layoutGrid(true);
  var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(layoutGrid, 120); });
  var filtering = false;
  function applyFilter(cat) {
    if (filtering) return; filtering = true;
    active = cat;
    $$(".chip", filters).forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.cat === cat)); });
    var swap = function () {
      var i = 0;
      allCards.forEach(function (c) { c.hidden = !(cat === "all" || c.dataset.cat === cat); });
      layoutGrid(true);
      allCards.forEach(function (c) {
        if (!c.hidden) { c.style.transitionDelay = (i++ * 60) + "ms"; setTimeout(function () { c.style.transitionDelay = ""; }, 1300); }
      });
      grid.classList.remove("filtering"); filtering = false;
    };
    if (reduceMotion) return swap();
    grid.classList.add("filtering"); setTimeout(swap, 230);
  }
  filters.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (b && b.dataset.cat !== active) applyFilter(b.dataset.cat);
  });
  grid.addEventListener("click", function (e) {
    var c = e.target.closest(".card"); if (c) openProject(c.dataset.id, true, c);
  });

  /* 3D tilt + glare on cards (mouse only; rect cached per hover to avoid layout thrash) */
  if (finePointer && !reduceMotion) {
    var hov = null;
    grid.addEventListener("pointermove", function (e) {
      var c = e.target.closest(".card"); if (!c || !c.classList.contains("in")) return;
      if (hov !== c) { hov = c; c._r = null; }
      if (!c._r) c._r = c.getBoundingClientRect();
      clearTimeout(c._t2); c.classList.add("tilting");
      var r = c._r, x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.transform = "perspective(900px) rotateX(" + ((0.5 - y) * 6).toFixed(2) + "deg) rotateY(" + ((x - 0.5) * 8).toFixed(2) + "deg) translateY(-4px)";
      c.style.setProperty("--gx", (x * 100).toFixed(1) + "%"); c.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    });
    grid.addEventListener("pointerout", function (e) {
      var c = e.target.closest(".card");
      if (c && !c.contains(e.relatedTarget)) { c.style.transform = ""; c._r = null; if (hov === c) hov = null; c._t2 = setTimeout(function () { c.classList.remove("tilting"); }, 450); }
    });
    addEventListener("scroll", function () { if (hov) hov._r = null; }, { passive: true });
  }

  /* ---------- Project modal with deep links (#work/<id>) ---------- */
  var modal = $("#modal"), current = null;
  $$("#modal .m-info > *").forEach(function (el, i) { el.style.setProperty("--n", i); });
  function visibleIds() {
    return D.projects.filter(function (p) { return active === "all" || p.category === active; }).map(function (p) { return p.id; });
  }
  function retrigger(el) { el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap"); }
  function fill(id) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0]; if (!p) return false;
    current = id;
    var mi = $("#mImg"); mi.classList.add("loading"); mi.onload = mi.onerror = function () { mi.classList.remove("loading"); retrigger(mi); };
    mi.src = img(p.cover); mi.alt = p.alt || p.title;
    $("#mType").textContent = p.type; $("#mTitle").textContent = p.title; $("#mDesc").textContent = p.description;
    var meta = $("#mMeta"); meta.textContent = "";
    function row(k, v) { if (v) meta.appendChild(h("div", null, h("dt", { text: k }), h("dd", { text: v }))); }
    row("Tools", (p.tools || []).join(", ")); row("My role", p.role);
    if (p.link) meta.appendChild(h("div", null, h("dt", { text: "Live" }), h("dd", null, h("a", { href: p.link, target: "_blank", rel: "noopener", text: "View project ↗" }))));
    document.title = p.title + " — Rehan Janjua";
    return true;
  }
  function openProject(id, push, from) {
    if (!fill(id)) return;
    if (push) history.pushState({ p: id }, "", "#work/" + id);
    if (!modal.open) {
      modal.showModal(); document.body.style.overflow = "hidden";
      var m = modal.getBoundingClientRect(), r = (from || $('.card[data-id="' + id + '"]'));
      if (r) { r = r.getBoundingClientRect(); modal.style.setProperty("--ox", (r.left + r.width / 2 - m.left) + "px"); modal.style.setProperty("--oy", (r.top + r.height / 2 - m.top) + "px"); }
    }
  }
  function step(dir) {
    var ids = visibleIds(), i = ids.indexOf(current);
    var id = ids[(i + dir + ids.length) % ids.length];
    fill(id); history.replaceState({ p: id }, "", "#work/" + id);
    retrigger($(".m-info", modal));
  }
  $("#mPrev").addEventListener("click", function () { step(-1); });
  $("#mNext").addEventListener("click", function () { step(1); });
  $("#mClose").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
  modal.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") step(1); else if (e.key === "ArrowLeft") step(-1);
  });
  modal.addEventListener("close", function () {
    document.body.style.overflow = ""; document.title = "Rehan Janjua — 3D Artist, Designer & Developer";
    if (/^#work\//.test(location.hash)) history.back();
  });
  function route() {
    var m = location.hash.match(/^#work\/(.+)$/);
    if (m) openProject(decodeURIComponent(m[1]), false);
    else if (modal.open) modal.close();
  }
  window.addEventListener("popstate", route);

  /* ---------- Code index ---------- */
  var cg = $("#codeGroups");
  D.codeGroups.forEach(function (g) {
    var title = h("h3", null, g.label, g.note ? h("small", { text: g.note }) : null);
    var ul = h("ul");
    g.items.forEach(function (it, i) {
      var name = it.link ? h("a", { href: it.link, target: "_blank", rel: "noopener", text: it.title + " ↗" }) : h("strong", { text: it.title });
      var li = h("li", null, name, h("span", { text: it.desc })); li.style.setProperty("--i", i); ul.appendChild(li);
    });
    cg.appendChild(h("div", { class: "cg reveal" }, title, ul));
  });

  /* ---------- Writing ---------- */
  D.writing.forEach(function (w) {
    var meta = h("div", { class: "w-meta" }, w.kind, w.date ? h("span", { text: w.date }) : null);
    var title = w.link ? h("a", { href: w.link, target: "_blank", rel: "noopener", text: w.title + " ↗" }) : document.createTextNode(w.title);
    $("#writingList").appendChild(h("li", { class: "reveal" }, meta,
      h("div", null, h("h3", null, title), h("p", { class: "w-sub", text: w.sub }), h("p", { class: "w-desc", text: w.desc }))));
  });

  /* ---------- Skills, courses, services, timeline ---------- */
  D.skills.forEach(function (s) {
    var ul = h("ul", { class: "chips" });
    s.items.forEach(function (t, i) { var li = h("li", { text: t }); li.style.setProperty("--i", i); ul.appendChild(li); });
    $("#skillList").appendChild(h("div", { class: "skill reveal" }, h("h3", { text: s.group }), ul));
  });
  D.certs.forEach(function (g) {
    var ul = h("ul");
    g.items.forEach(function (c, i) {
      var meta = h("span", { text: c.date || "Completed" });
      if (c.file) meta.appendChild(h("a", { href: c.file, target: "_blank", rel: "noopener", text: "View ↗" }));
      if (c.verify) meta.appendChild(h("a", { href: c.verify, target: "_blank", rel: "noopener", text: "Verify ↗" }));
      var li = h("li", null, h("strong", { text: c.title }), meta); li.style.setProperty("--i", i); ul.appendChild(li);
    });
    $("#certList").appendChild(h("div", { class: "issuer cg reveal" }, h("h3", null, g.issuer, h("small", { text: g.items.length + " completed" }), g.file ? h("a", { class: "h3-link", href: g.file, target: "_blank", rel: "noopener", text: (g.fileLabel || "View") + " ↗" }) : null), ul));
  });
  D.services.forEach(function (s) {
    $("#serviceList").appendChild(h("div", { class: "service reveal" }, h("h4", { text: s.title }), h("p", { text: s.text })));
  });
  D.journey.forEach(function (j) {
    $("#timeline").appendChild(h("li", { class: "reveal" }, h("div", { class: "t-when", text: j.when }), h("h3", { text: j.title }), h("p", { text: j.text })));
  });

  /* ---------- Contact ---------- */
  var C = D.contact, cl = $("#contactList");
  function copyBtn(text) {
    var b = h("button", { class: "copy", type: "button", text: "Copy", "aria-label": "Copy " + text });
    b.addEventListener("click", function () {
      var done = function () { b.textContent = "Copied ✓"; setTimeout(function () { b.textContent = "Copy"; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
    return b;
  }
  function crow(k, node, copy) { cl.appendChild(h("li", { class: "reveal" }, h("div", null, h("span", { class: "k", text: k }), node), copy ? copyBtn(copy) : null)); }
  crow("Email", h("a", { href: "mailto:" + C.email, text: C.email }), C.email);
  crow("Phone", h("a", { href: "tel:" + C.phone.replace(/\s/g, ""), text: C.phone }), C.phone);
  crow("Discord", h("span", { text: C.discord }), C.discord);
  C.social.forEach(function (s) { crow(s.label, h("a", { href: s.url, target: "_blank", rel: "noopener", text: s.handle })); });
  $("#mailForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, body = f.msg.value + "\n\n— " + f.name.value + " (" + f.email.value + ")";
    location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Portfolio enquiry from " + f.name.value) + "&body=" + encodeURIComponent(body);
  });

  /* ---------- Nav & theme ---------- */
  var nav = $("#nav"), menu = $("#menu"), mb = $("#menuBtn");
  mb.addEventListener("click", function () {
    var o = menu.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); mb.setAttribute("aria-label", o ? "Close menu" : "Open menu");
    if (o) nav.classList.remove("hide");
  });
  menu.addEventListener("click", function (e) { if (e.target.tagName === "A") { menu.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); } });
  var tb = $("#themeBtn");
  function syncTheme() { tb.setAttribute("aria-label", root.dataset.theme === "light" ? "Switch to dark theme" : "Switch to light theme"); }
  syncTheme();
  tb.addEventListener("click", function () {
    var next = root.dataset.theme === "light" ? "dark" : "light";
    var apply = function () { root.dataset.theme = next; try { localStorage.setItem("theme", next); } catch (e) {} syncTheme(); };
    if (!canVT) return apply();
    var r = tb.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
    var rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var t = document.startViewTransition(apply);
    t.ready.then(function () {
      root.animate({ clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + rad + "px at " + x + "px " + y + "px)"] },
        { duration: 750, easing: "cubic-bezier(.2,.7,.2,1)", pseudoElement: "::view-transition-new(root)" });
    }, function () {});
  });

  /* ---------- Reveal on scroll (staggered) + split headings ---------- */
  $$(".section-head h2, .about h2, .contact h2").forEach(function (el) { split(el, false); el.classList.add("reveal-h"); });
  $$(".section .eyebrow, .sub, .subhead, .filters, .facts, .prose, .form, .contact .lead, .footer").forEach(function (el) { el.classList.add("reveal"); });
  var revealEls = $$(".reveal, .reveal-h"), io = null;
  /* Bidirectional reveal: below the fold = hidden, in view = "in", scrolled past the top = "out" (slides away; returns when you scroll back up) */
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }
  if ("IntersectionObserver" in window) {
    if (!reduceMotion) {
      io = new IntersectionObserver(function (es) {
        var n = 0;
        es.forEach(function (e) {
          var el = e.target, rb = e.rootBounds, state = e.isIntersecting ? "in" : (rb && e.boundingClientRect.bottom <= rb.top + 1 ? "out" : "");
          if (el._state === state) return; el._state = state;
          clearTimeout(el._t);
          el.style.transitionDelay = state === "in" ? (n++ * 80) + "ms" : "0ms";
          el.classList.toggle("in", state === "in"); el.classList.toggle("out", state === "out");
          el._t = setTimeout(function () { el.style.transitionDelay = ""; }, 1400);
        });
      }, { rootMargin: "-6% 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    var links = {}; $$("a", menu).forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === e.target.id); }); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(links).forEach(function (k) { var s = document.getElementById(k); if (s) so.observe(s); });
  }

  /* ---------- Scroll-driven effects (one rAF-throttled handler; DOM reads first, then writes) ---------- */
  var bar = $(".progress"), tl = $("#timeline"), heroBox = $("#heroVisual"), heroSec = $(".hero"), heroCopy = $(".hero-copy"), toTop = $("#toTop");
  var lastY = 0, acc = 0, lastHp = -1, ticking = false, maxScroll = 1, navLock = 0;
  function measure() { maxScroll = Math.max(root.scrollHeight - innerHeight, 1); }
  measure(); addEventListener("resize", measure); addEventListener("load", measure);
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(document.body);
  function onScroll() {
    ticking = false;
    var y = scrollY, tr = reduceMotion ? null : tl.getBoundingClientRect();
    bar.style.transform = "scaleX(" + Math.min(y / maxScroll, 1).toFixed(4) + ")";
    nav.classList.toggle("scrolled", y > 10);
    var dy = y - lastY; lastY = y; acc = (dy * acc < 0) ? dy : acc + dy;
    if (!menu.classList.contains("open")) {
      if (y < 240 || performance.now() < navLock || acc < -24) nav.classList.remove("hide");
      else if (acc > 40) nav.classList.add("hide");
    }
    toTop.classList.toggle("show", y > 600);
    toTop.style.setProperty("--tp", Math.min((y / maxScroll) * 100, 100).toFixed(1));
    if (!reduceMotion) {
      var hp = Math.min(y / (innerHeight * 0.85), 1);
      if (hp !== lastHp) {
        lastHp = hp;
        heroSec.style.opacity = Math.max(1 - hp * 1.15, 0).toFixed(3);
        heroCopy.style.translate = "0 " + (-hp * 80).toFixed(1) + "px";
        heroBox.style.translate = "0 " + (hp * 50).toFixed(1) + "px";
        heroBox.style.scale = (1 - hp * 0.12).toFixed(3);
      }
      tl.style.setProperty("--p", Math.max(0, Math.min(1, (innerHeight * 0.65 - tr.top) / tr.height)).toFixed(3));
    }
  }
  addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  nav.addEventListener("focusin", function () { nav.classList.remove("hide"); });
  onScroll();

  /* Long jumps (nav links, back-to-top): switch animations off while travelling, then replay the entrance for what you land on */
  var jumping = false, jt = 0, jumpFrom = 0;
  function resync() {
    if (!io) return;
    root.classList.add("resyncing");
    revealEls.forEach(function (el) { io.unobserve(el); el._state = undefined; el.classList.remove("in", "out"); el.style.transitionDelay = ""; });
    void root.offsetWidth;
    requestAnimationFrame(function () { root.classList.remove("resyncing"); revealEls.forEach(function (el) { io.observe(el); }); });
  }
  function endJump() {
    if (!jumping) return; jumping = false; clearTimeout(jt); root.classList.remove("jumping");
    if (Math.abs(scrollY - jumpFrom) > innerHeight * 1.2) resync();
  }
  function startJump() {
    jumping = true; jumpFrom = scrollY; navLock = performance.now() + 2000; root.classList.add("jumping");
    clearTimeout(jt); jt = setTimeout(endJump, 1900);
  }
  if ("onscrollend" in window) addEventListener("scrollend", endJump);
  $$('a[href^="#"]').forEach(function (a) { a.addEventListener("click", startJump); });
  toTop.addEventListener("click", function () { startJump(); scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });

  /* ---------- Pointer effects: smooth cursor glow, magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    var spot = $(".spot"), gx = innerWidth * 0.78, gy = innerHeight * 0.12, sx = gx, sy = gy, gliding = false;
    var glide = function () {
      sx += (gx - sx) * 0.12; sy += (gy - sy) * 0.12;
      spot.style.transform = "translate3d(" + sx.toFixed(1) + "px," + sy.toFixed(1) + "px,0)";
      if (Math.abs(gx - sx) + Math.abs(gy - sy) > 0.5) requestAnimationFrame(glide); else gliding = false;
    };
    addEventListener("pointermove", function (e) { gx = e.clientX; gy = e.clientY; if (!gliding) { gliding = true; requestAnimationFrame(glide); } }, { passive: true });
    $$(".cta .btn, .form .btn, .brand").forEach(function (b) {
      var r = null;
      b.addEventListener("pointerenter", function () { r = b.getBoundingClientRect(); });
      b.addEventListener("pointermove", function (e) {
        if (!r) r = b.getBoundingClientRect();
        b.style.setProperty("--tx", ((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1) + "px");
        b.style.setProperty("--ty", ((e.clientY - r.top - r.height / 2) * 0.3).toFixed(1) + "px");
      });
      b.addEventListener("pointerleave", function () { r = null; b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); });
    });
  }

  /* ---------- Lazy 3D hero (never blocks content; falls back to the render image) ---------- */
  (function hero3D() {
    var nc = navigator.connection || {};
    var weak = reduceMotion || nc.saveData || /(^|-)2g$/.test(nc.effectiveType || "") ||
      (navigator.hardwareConcurrency || 4) <= 2 || (navigator.deviceMemory || 4) <= 2;
    if (weak || !("IntersectionObserver" in window)) { root.classList.remove("w3d"); return; }
    setTimeout(function () { if (!heroBox.classList.contains("is-3d")) root.classList.remove("w3d"); }, 8000);
    var canvas = $("#heroCanvas"), started = false;
    var lite = innerWidth < 720 || (navigator.hardwareConcurrency || 4) <= 4;
    var go = function () {
      if (started) return; started = true;
      (window.requestIdleCallback || setTimeout)(function () {
        import("./hero3d.js").then(function (m) { return m.start(canvas, heroBox, { lite: lite }); })
          .catch(function () { heroBox.classList.remove("is-3d"); root.classList.remove("w3d"); });
      });
    };
    var o = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { o.disconnect(); go(); } });
    if (document.readyState === "complete") o.observe(heroBox); else addEventListener("load", function () { o.observe(heroBox); });
  })();

  route(); // open a project if the page was loaded with #work/<id>
})();
