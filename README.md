# Rehan Janjua — Portfolio

Static site (HTML, CSS, vanilla JS, self-hosted Three.js). No build step, no backend, no API keys.

## Structure
```
index.html          page shell
404.html            not-found page
css/style.css       all styling; colours/fonts are variables at the top
js/data.js          ALL content — edit this to change the site
js/main.js          rendering, filters, modal, theme, nav
js/hero3d.js        lazy-loaded 3D crystal (falls back to a static render)
vendor/             three.module.min.js (r160, local copy)
assets/img/         images (name.webp 1800px + name-sm.webp 800px)
assets/fonts/       self-hosted fonts
assets/docs/        your papers/book (PDF) and certificates (assets/docs/certs/)
assets/favicon.svg  RJ monogram
```

## Deploy on GitHub Pages
1. Put these files at the root of your `Portfolio` repository (replace the old ones; keep `.nojekyll`).
2. Commit and push to `main`.
3. Repo → **Settings → Pages** → Source: *Deploy from a branch* → Branch `main`, folder `/ (root)` → Save.
4. Wait ~1 minute, then open https://rehanjanjua.github.io/Portfolio/

All paths are relative, so it works under `/Portfolio/`.

## Edit content (all in `js/data.js`)
- **Text, contact, links:** change the values in `hero`, `about`, `contact`.
- **Add a visual project:** put `my-render.webp` (1800px wide) and `my-render-sm.webp` (800px) in `assets/img/`, then add an object to `projects` with `cover: "my-render"` and its `ratio` (width ÷ height). Order in the array = order on the page.
- **Add a code project:** add `{ title, desc }` to a group in `codeGroups`. Add `link: "https://…"` only when you want it shown.
- **Courses & certificates:** edit `certs` (add `verify: "https://…"` for a verification link).
- **Papers & book:** each `writing` entry links to a PDF in `assets/docs/`. To make one private again, delete its `link:` line **and** the PDF (the repo is public, so anything in it is downloadable).
- **Categories:** edit `categories`; each project's `category` must match an `id`.
- **Convert images:** `cwebp -q 80 -resize 1800 0 in.png -o name.webp` (or squoosh.app).
- Items tagged `// VERIFY` in `data.js` were inferred from folder names — confirm or correct them.

## Test checklist
- [ ] Opens with no console errors; images all load (also from `/Portfolio/`)
- [ ] Phone width (≈375px): no sideways scroll, menu opens/closes, cards readable
- [ ] Filters work; project opens, ←/→/Esc work; Back button closes it; `#work/<id>` link opens directly
- [ ] Tab through the page: focus ring always visible
- [ ] Light/dark toggle persists after refresh
- [ ] OS "reduce motion" on → no 3D, no reveal animation
- [ ] Block WebGL / throttle network → crystal render image still shows
- [ ] Email, phone and copy buttons work; form opens your mail app
