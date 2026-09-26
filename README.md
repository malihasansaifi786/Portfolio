# Ali Hasan — Portfolio

Personal portfolio site for **Ali Hasan** — Civil Technologist, AutoCAD expert, graphic designer,
NAVTTC-certified frontend developer and educator.

Built with **Next.js 15 (App Router)** and **Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Editing content

Everything on the page comes from one file — **`src/data/portfolio.js`**.
Change the text there and the whole site updates; no component edits needed.

| Export           | Controls                                              |
| ---------------- | ----------------------------------------------------- |
| `profile`        | Name, tagline, phones, email, address, CV link, photo |
| `stats`          | The four counters in the hero                          |
| `about`          | About paragraphs (`**bold**` is supported) + quick facts |
| `filters`        | The category buttons above the experience timeline     |
| `experience`     | Every job card, newest first                           |
| `skills`         | The six skill groups                                   |
| `education`      | Degrees                                                |
| `courses`        | IT training programs                                   |
| `certifications` | DigiSkills certificates                                |
| `navLinks`       | Header / footer navigation                             |

### Adding a job

Append an object to the `experience` array. `categories` must contain one of the
`filters` ids (`education`, `admin`, `business`, `logistics`) so the filter buttons pick it up.
Setting `featured: true` gives the card a gold accent.

## Files to drop in

| Path                       | Status                                                        |
| -------------------------- | ------------------------------------------------------------- |
| `public/Ali_Hasan_CV.pdf`  | ✅ In place — served by every "Download CV" button.            |
| `public/Ali_Hasan_CV.docx` | ✅ Editable Word version of the same CV.                       |
| `public/profileImg.png`   | ✅ Original portrait (source, 1003×1254).                     |
| `public/profileImg.webp`  | ✅ Web-optimised copy used on the site (800×1000, ~46 KB).    |

To swap the photo, replace `profileImg.png` and regenerate the WebP:

```bash
node -e "require('sharp')('public/profileImg.png').resize({width:800}).webp({quality:82}).toFile('public/profileImg.webp')"
```

Without a photo the hero shows an **AH** monogram plate instead — nothing breaks.

## Regenerating the CV

The CV is generated from [scripts/build-cv.js](scripts/build-cv.js), so the PDF and the
Word file never drift apart. Edit the content in that script, then:

```bash
npm install --no-save docx
node scripts/build-cv.js public/Ali_Hasan_CV.docx
```

Then open the `.docx` in Word and **Save As → PDF** over `public/Ali_Hasan_CV.pdf`.

Editing the `.docx` directly in Word works too — just export a new PDF afterwards, and
copy your changes back into the script if you want them kept.

## Contact form

By default the form opens the visitor's mail client with the message pre-filled.
To receive submissions in an inbox instead, create a free [Formspree](https://formspree.io) form
and add its id to `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=xxxxxxxx
```

## Deploying

The site is fully static. Easiest route is [Vercel](https://vercel.com) — push the repo,
import it, and it deploys with no configuration.

For static hosting (GitHub Pages, Netlify, cPanel), add `output: "export"` to
`next.config.mjs` and run `npm run build`; the site is emitted to `out/`.

## Structure

```
src/
├─ app/
│  ├─ layout.js        fonts, metadata, favicon
│  ├─ page.js          section order
│  └─ globals.css      design tokens, .chip / .surface, reveal animation
├─ components/         one file per section + Reveal, Icons, Stats
└─ data/portfolio.js   ← all content lives here
```
