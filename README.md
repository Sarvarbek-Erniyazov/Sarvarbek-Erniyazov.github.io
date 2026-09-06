# sarvarbek-erniyazov.github.io

Academic research website of **Sarvarbek Erniyazov** — Ph.D. Candidate in Computer
Engineering, AI Laboratory, Chonnam National University. Live at
<https://sarvarbek-erniyazov.github.io/>.

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework, no dependencies.
Commit to `main` and the live site updates in about a minute.

## File map

| File | What it is | Edit it when… |
|---|---|---|
| `index.html` | The whole page: all sections, all content, all numbers | almost every update happens here |
| `style.css` | Colors, typography, layout | you want to restyle — start at the `:root` block |
| `site.js` | Mobile menu toggle and the "Copy BibTeX" buttons | rarely; the page works fully without it |
| `Sarvarbek_Erniyazov_Academic_CV.pdf` | The four-page academic CV | you update the CV (recompile the `.tex`, then replace this file) |
| `assets/papers/` | PDFs of the published articles, linked from the publication list | you add a new paper PDF |

The page is a single HTML file on purpose: every fact lives in one place, so the site and
the CV cannot drift apart.

## Content rules this site follows

These are deliberate and should be preserved in future edits.

- **Metrics are static and dated.** No animated counters, no numbers loaded by JavaScript.
  A reviewer or a crawler always sees the same value.
- **Evidence classes are separated.** Peer-reviewed articles, manuscripts under review, and
  public artifacts are labeled distinctly and never mixed in one count. A manuscript under
  review is never called a publication.
- **Funded and submitted are separated.** Submitted proposals are never called grants,
  awards, or funded projects.
- **Role wording.** "Lead AI Architect / Lead Researcher for the assigned technical work
  package; not the formal grant Principal Investigator."
- **No overclaiming vocabulary.** Not "production", "deployed system", or "proven in
  production" — use "hosted research interface", "research prototype", "interactive demo".
  Not "privacy-preserving" without a defined threat model — use "identity-minimizing" or
  "local-data retention".
- **Results carry their limits.** Every reported number states its protocol ("up to 46% …
  under the reported evaluation protocol") and its boundary.

Status colors in `style.css` carry meaning — keep the mapping:
teal = published · amber = under review or submitted · grey = public artifact.

## Common updates

### Change a number (citations, artifact counts, dates)

Open `index.html` and find the comment block marked **`SOURCE OF TRUTH`** near the top. It
lists every number used on the page. Update it there, then update the matching
`<span class="metric-value">` in the Research Evidence section, and the verification month
in the paragraph below the metric boxes.

The same numbers appear in the CV. Lines marked `%% SYNC` in the `.tex` source must stay
identical to the website.

### Add a publication

Copy an existing `<li>` block inside the Publications section and edit it. Put it under the
correct heading — journal, conference, or manuscripts under review. Keep the `[J1]`, `[C1]`,
`[M1]` labels sequential. Then add the same entry to the CV.

To make the "Copy BibTeX" button work for a new paper, add a record to the `BIB` map in
`site.js` and give the button `data-bib="yourkey"`.

### Add a paper PDF

Put the file in `assets/papers/` and link it with the exact filename. Current files:

```
assets/papers/2026-ksii-multimodal-gnn-moe.pdf
assets/papers/2025-energy-reports-gnn-tps-ff.pdf
assets/papers/2024-ijaseit-anomaly-detection.pdf
assets/papers/2019-microelectronic-qca-fa-csa-cla.pdf
```

### Update the CV

Edit `Sarvarbek_Erniyazov_Academic_CV.tex` (Overleaf works; select pdfLaTeX). Compile
**twice** so the "Page N of 4" footer is correct. Confirm the PDF is still exactly four
pages — the KGFP limit is a maximum of four. Then upload the PDF to the repository root
under the same filename.

## Editing without a terminal

On github.com: open the repository → click the file → pencil icon → edit → **Commit
changes**. For new or replacement files use **Add file → Upload files**.

Pressing `.` on the repository page opens github.dev, a full editor in the browser, which
is easier for multi-file edits and for deleting folders.

## Preview locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works.

## Troubleshooting

- **Page shows unstyled text** → `style.css` is not where `index.html` expects it. Both must
  be in the repository root, next to each other.
- **A PDF link 404s** → the `href` must exactly match the filename in `assets/papers/`,
  including hyphens and the year prefix.
- **Changes not visible after a minute** → hard-refresh with Ctrl/Cmd+Shift+R; GitHub Pages
  caches aggressively. Check the **Actions** tab for a failed deployment.
