# MINTSTRIDE Website

Static marketing website for MINTSTRIDE ("Fresh Habits. Forward Strides."), a philanthropy-first dental initiative. Deployed via GitHub Pages to `mintstride.org` (see `CNAME`).

- Pages: `index.html` (landing), `about.html` (team)
- Styling: `styles.css`
- Behavior: `script.js` (vanilla JS — mobile menu, smooth scroll, scroll animations; no network/API calls)
- Assets: `All Files/` (images; PDFs are git-ignored)

## Cursor Cloud specific instructions

This is a plain HTML/CSS/JS static site. There is **no package manager, no build step, no tests, and no linter configured** — there are no dependencies to install.

- Run locally by serving the repo root with any static file server, e.g. `python3 -m http.server 8000` (Python 3 is preinstalled), then open `http://localhost:8000/`.
- Prefer serving over a local HTTP server rather than opening `file://` paths, because the `All Files/` asset directory contains a space in its name and relative asset paths resolve most reliably over HTTP.
- There is nothing to build. Changes to HTML/CSS/JS are reflected on page reload (no hot-reload; do a manual browser refresh).
- No lint/test tooling exists. If you introduce any, document the commands here.
