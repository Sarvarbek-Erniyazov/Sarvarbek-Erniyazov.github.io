# sarvarbek-erniyazov.github.io

Personal academic website of **Sarvarbek Erniyazov**, deployed with GitHub Pages
at <https://sarvarbek-erniyazov.github.io/>.

Pure HTML + CSS + vanilla JavaScript — no build step. Push to `main` and the
live site updates in about a minute.

## File map

| File | What it is | Edit it when… |
|---|---|---|
| `js/data.js` | **All content**: news, publications, grants, projects, education, experience, skills, links, CV/photo toggles | you publish a paper, win a grant, add news — 95% of updates happen here |
| `index.html` | Page structure + the About / Contact prose | you want to change the About text, interest tags, or contact wording |
| `css/style.css` | Layout, colors, typography | you want to restyle (e.g. change the accent color — edit `--accent`) |
| `js/main.js` | Rendering & interactions (filters, BibTeX copy, dark mode, scrollspy) | rarely — content changes never require touching this |
| `assets/papers/` | Paper PDFs linked from the publication list | you add a new paper PDF |
| `assets/cv.pdf` | Your CV (see below) | you update your CV |
| `assets/photo.jpg` | Your portrait (see below) | you update your photo |

## Common updates (all in `js/data.js`)

### Add a news item
Add to the **top** of the `news` list:

```js
{ date: "Sep 2026", sort: "2026-09", html: "Paper accepted at <em>NeurIPS 2026</em>." },
```

### Add a publication
Add an object to `publications` (see the comment block above the list for all
fields). Minimal example:

```js
{
  title: "Paper title",
  authors: "S. Erniyazov, A. Coauthor",
  venue: "Journal Name",
  detail: "12(3), 100–120",       // volume/pages — optional
  year: 2026,
  order: 1,                        // position within its year
  doi: "https://doi.org/10.xxxx/yyyy",
  pdf: "assets/papers/2026-short-name.pdf",   // optional — put the file there first
  citations: 0,                    // optional
  areas: ["energy"],               // which filter chips show it
  bibType: "article"               // or "inproceedings"
},
```

`"S. Erniyazov"` in the author string is bolded automatically. BibTeX is
generated from these fields — no separate BibTeX writing needed.

### Enable the CV button
1. Copy your CV to `assets/cv.pdf`
2. In `js/data.js` set `cvReady: true`

### Show your photo
1. Copy a square photo (≥ 600 × 600 px) to `assets/photo.jpg`
2. In `js/data.js` set `photo: "assets/photo.jpg"`
3. (Optional, for link previews) In `index.html`, uncomment the `og:image` meta tag

### Research Areas (theme sections with projects)
`researchAreas` in `js/data.js` is a list of themes, each with its own
`projects` list. Every project has a `status` field:

- `"in-progress"` → outlined *In progress* badge, written as an active
  direction ("Developing …")
- `"completed"` → finished work; add the real `github:` link (and `demo:` /
  `metrics:` when they exist)

**To promote a project** from in-progress to completed: change the status,
rewrite `summary` to describe what the system does, and add the real links.
Full field reference is in the comment block above `researchAreas`.

### Grants / Education / Experience / Skills
Each is a list in `js/data.js` with self-explanatory fields and TODO comments
where information still needs to be filled in.

## Preview locally

From the project folder:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. (Opening `index.html` directly also works
in most browsers.)

## Deploy to GitHub Pages

```bash
git add -A
git commit -m "Update content"
git push origin main
```

The site rebuilds automatically. Hard-refresh (Ctrl/Cmd+Shift+R) if you don't
see changes after a minute.

**No terminal?** On github.com open the repository → navigate to the file →
pencil icon → edit → *Commit changes*. For new files use *Add file → Upload
files*.

## Troubleshooting

- **Whole sections empty + red note at the top of the page** → `js/data.js`
  has a syntax error (usually a missing comma or quote). Compare your last
  edit against the examples above.
- **A PDF link 404s** → the `pdf:` path in `data.js` must exactly match the
  filename inside `assets/papers/`.
- **Dark/light toggle "sticks"** → the choice is saved in the browser
  (localStorage); use the moon/sun button to switch back.
