# VT Land Services website

A static site: plain HTML, CSS and JavaScript. No database and no build step.

## Pages
- `index.html`: Home (hero, services, photo carousel, before/after slider, service area, reviews, call to action)
- `services.html`: What We Do
- `work.html`: Our Work (filterable gallery and lightbox)
- `about.html`: Who We Are
- `contact.html`: Contact Us (tap-to-call, email, quote form)

The header, footer and mobile call bar are built once in `js/main.js` and shared by every page.

## Preview locally
Open the folder in VS Code, install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.
(You can also just double-click `index.html`.)

## Before going live: fill these in
1. **`js/site-config.js`**: email, Facebook URL, Formspree ID, hours.
2. **Formspree** (sends quote requests to his email):
   - Sign up at formspree.io, create a form, and set it to email his address.
   - Copy the form ID (the part after `/f/`) into `formspreeId`.
3. **Photos**: his real job photos are in. The page backgrounds use `images/hero-grading.webp` (track loader on red clay); Our Work uses the hydroseeding video instead. The old drone shot is kept as `images/hero.webp`.
4. **Reviews**: the section on `index.html` is hidden for now. Paste real reviews in, then delete `hidden` from its `<section>` tag to show it.
5. **About text**: `about.html` has Reuben's own story (added Oct 2026).
6. **Claims**: check that "Free estimates", the service list and the towns listed are all accurate. Add "Licensed & insured" only if it's true.
7. **More photos**: services are shown as icon cards, so no service needs its own photo. Any new job photo just goes in the gallery (see below).
8. **Before/after slider**: removed for now. Once he has a before and an after photo of the same job, ask Claude Code to add the before/after section back to the Home and Our Work pages.

## Adding job photos
```bash
npm install sharp
node scripts/optimize-images.mjs ~/Desktop/job-photos   # shrinks and converts to images/jobs/*.webp
```
Then add a line for each photo in `js/photos.js`:
```js
{ src: "images/jobs/smith-lot-clearing.webp", title: "Lot Clearing – Lenoir", category: "clearing", featured: true },
```
`featured: true` also puts the photo in the Home page carousel.

## Deploy (free)
1. Push this folder to a GitHub repo.
2. Go to **Netlify** (or **Cloudflare Pages**), choose New site from Git, and pick the repo. Leave the build command empty and set the publish directory to `/`.
3. Buy `vtlandservices.com` (or similar) and add it under Domain settings. HTTPS is set up automatically.
4. After that, every `git push` updates the live site.

## Colors (in `css/styles.css`, under `:root`)
| Token | Hex | Use |
|---|---|---|
| `--black` | `#0f0f0f` | background |
| `--orange` | `#e2672a` | buttons and accents |
| `--tan` | `#e6d3b3` | headings |
| `--brown` | `#7a5a3c` | details |
