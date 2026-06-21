# Contrast — Figma plugin

The full Contrast web app, running inside Figma, plus a bridge to your document:

- **⊞ pull from selection** — reads every solid fill/stroke colour from your selected layers (or the whole page if nothing is selected) and loads them as the palette.
- **⊞ send palette to figma** — drops the current palette onto the canvas as a labelled swatch frame and registers each colour as a reusable paint style (`Contrast/#HEX`).
- Everything else from the web app: contrast matrix (AA / AAA / non-text / APCA), live mockups, colour-blindness simulation, the 348 Sanzo Wada pairings, role locking, full-screen website preview, and PDF/HTML reports.

## Install (local / development)

Local plugins run in the **Figma desktop app** (not the browser).

1. Open the **Figma desktop app** and open any file.
2. Top-left menu → **Plugins → Development → Import plugin from manifest…**
   (or right-click the canvas → **Plugins → Development → Import plugin from manifest…**)
3. Select this folder's **`manifest.json`**.
4. Run it: **Plugins → Development → Contrast — Colour Accessibility**.

That's it — no build step. The three files (`manifest.json`, `code.js`, `ui.html`) are the whole plugin.

## Use it

1. Select some layers → click **pull from selection** to test their colours.
2. Tweak / add / load a Sanzo pairing → click **send palette to figma** to push swatches + styles back to the canvas.

## Files

| File | Role |
|---|---|
| `manifest.json` | Plugin definition (`documentAccess: dynamic-page`, network access for the Outfit font + export libs). |
| `code.js` | Runs in Figma. Reads selection colours; creates the swatch frame + paint styles. |
| `ui.html` | The web app UI (iframe), with the Figma message bridge. |

## Notes

- The `id` is a local placeholder; Figma assigns a real one if you ever publish to the Community.
- PDF/HTML export triggers a normal browser download from the plugin window; if your setup blocks it, use the hosted web version at `symkinmark.github.io/contrast/`.
