# Contrast

A single-file colour accessibility studio. Build a palette of up to 10 colours, see it scored against **WCAG AA, AAA, Non-text (1.4.11), and APCA**, preview it on live UI mockups, simulate colour blindness, and export a PDF or HTML report.

No build step. No dependencies to install. One `index.html`.

## Features

- **Build a palette** — paste hex/rgb, edit live, eyedropper (Chrome/Edge), paste-a-colour, or random.
- **Sanzo Wada dictionary** — load any of 348 historical pairings from *A Dictionary of Colour Combinations* (data: mattdesl/dictionary-of-colour-combinations).
- **Arrange** — drag colour tokens around a large canvas; left-to-right order drives everything. Double-tap a token to switch its shape (circle / cube / arrow / type), and add colours straight from the canvas.
- **Live mockups** — Realtime-Colors-style. Roles (background / surface / text / primary / accent) auto-assign and apply to a marketing site, mobile player, dashboard, and pricing card. Click any role to reassign.
- **Colour-blindness simulation** — view every mockup under Deuteranopia, Protanopia, or Tritanopia; each pair's detail shows whether the colours stay distinct.
- **Full contrast matrix** — every pair scored X/4 across all four standards.
- **Reports** — one-click PDF and standalone HTML, with the palette, a mockup preview, the matrix, and full font comparisons per pair.

## Use it

Open `index.html` in any browser, or host it free on GitHub Pages.

## Host on GitHub Pages (one shot)

1. Create a new repo and add `index.html` (and this README).
2. Push.
3. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `(root)` → **Save**.
4. Live in ~1 min at `https://<you>.github.io/<repo>/`.

Or via terminal:

```bash
git init
git add index.html README.md
git commit -m "Contrast checker"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
# then enable Pages in Settings
```

## What it scores

Each colour pair is rated `X/4`:

| Check | Standard | Threshold |
|---|---|---|
| AA | WCAG 2.1 · 1.4.3 | 4.5:1 normal text |
| AAA | WCAG 2.1 · 1.4.6 | 7:1 normal text |
| Non-text | WCAG 2.1 · 1.4.11 | 3:1 UI / icons / borders |
| APCA | WCAG 3 draft | Lc ≥ 60 (body) |

Reports also break each pair down by context (normal text, large text, UI) across AA / AAA / APCA, with live font samples both directions.

## Notes

- Maths verified: WCAG white/black = 21:1, APCA black-on-white = Lc 106.
- APCA is a WCAG 3 *draft* algorithm — more perceptually accurate, not yet an official requirement. Treat it as guidance.
- Font: [Outfit](https://fonts.google.com/specimen/Outfit). Loaded from Google Fonts.
