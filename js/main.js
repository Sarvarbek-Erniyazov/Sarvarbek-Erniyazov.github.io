/* ==========================================================================
   main.js — rendering and interaction. You should NOT need to edit this
   file to update content: edit js/data.js instead.

   What lives here:
   1. Theme toggle (light / dark, remembered between visits)
   2. Rendering of news, publications, grants, projects, timeline, skills
   3. Publication topic filters + BibTeX copy-to-clipboard
   4. Scroll-reveal animation + active-section highlighting in the nav
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- helpers ---------- */

  /** Escape a string for safe insertion into HTML. */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /** Bold the site owner's name inside an author string. */
  function formatAuthors(authors) {
    return esc(authors).replace(/S\. Erniyazov/g, "<strong>S. Erniyazov</strong>");
  }

  function $(sel) { return document.querySelector(sel); }

  /* ---------- 1. Theme toggle ---------- */

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = $("#theme-toggle");
    if (btn) {
      btn.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    try { localStorage.setItem("theme", theme); } catch (e) { /* private mode — ignore */ }
  }

  function initTheme() {
    applyTheme(currentTheme()); // theme attribute is pre-set by the inline script in <head>
    var btn = $("#theme-toggle");
    if (btn) btn.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  /* ---------- 2. Hero extras (photo + CV button) ---------- */

  function initHero() {
    var p = SITE.profile;

    // Portrait: show the real photo when profile.photo is set in data.js.
    if (p.photo) {
      var portrait = $("#portrait");
      if (portrait) portrait.innerHTML =
        '<img src="' + esc(p.photo) + '" alt="Portrait of ' + esc(p.name) + '">';
    }

    // CV button: only shown when profile.cvReady is true in data.js.
    var cvBtn = $("#cv-btn");
    if (cvBtn && p.cvReady) {
      cvBtn.setAttribute("href", p.cv);
      cvBtn.removeAttribute("hidden");
    }

    var stats = $("#hero-stats");
    if (stats && p.stats) stats.textContent = p.stats;

    var updated = $("#last-updated");
    if (updated && p.lastUpdated) updated.textContent = "Last updated " + p.lastUpdated;
  }

  /* ---------- 3. News ---------- */

  function renderNews() {
    var list = $("#news-list");
    if (!list) return;
    var items = SITE.news.slice().sort(function (a, b) {
      return (b.sort || "").localeCompare(a.sort || "");
    });
    list.innerHTML = items.map(function (n) {
      return '<li class="news-item"><span class="news-date">' + esc(n.date) +
        '</span><span class="news-text">' + n.html + "</span></li>";
    }).join("");
  }

  /* ---------- 4. Publications ---------- */

  var activeFilter = "all";

  function pubMatches(p) {
    return activeFilter === "all" || (p.areas || []).indexOf(activeFilter) !== -1;
  }

  /** Build a BibTeX entry string from a publication's fields. */
  function bibtexFor(p) {
    var authorsBib = String(p.authors).split(",").map(function (a) {
      var parts = a.trim().split(/\s+/);
      if (parts.length < 2) return a.trim();
      var surname = parts.pop();
      return surname + ", " + parts.join(" ");
    }).join(" and ");

    var firstWord = (String(p.title).toLowerCase().match(/[a-z]{4,}/) || ["paper"])[0];
    var key = "erniyazov" + p.year + firstWord;

    var lines = [
      "@" + (p.bibType || "article") + "{" + key + ",",
      "  author  = {" + authorsBib + "},",
      "  title   = {" + p.title + "},",
      "  " + (p.bibType === "inproceedings" ? "booktitle" : "journal") + " = {" + p.venue + "},"
    ];
    if (p.detail) {
      var m = String(p.detail).match(/^([\d()]+)(?:,\s*(.+))?$/);
      if (m) {
        lines.push("  volume  = {" + m[1].replace(/[()]/g, function (c) { return c === "(" ? "}, number = {" : ""; }) + "},");
        if (m[2]) lines.push("  pages   = {" + m[2] + "},");
      }
    }
    lines.push("  year    = {" + p.year + "}" + (p.doi ? "," : ""));
    if (p.doi) lines.push("  doi     = {" + p.doi.replace("https://doi.org/", "") + "}");
    lines.push("}");
    return lines.join("\n");
  }

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
    done();
  }

  var toastTimer = null;
  function showToast(msg) {
    var t = $("#toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2000);
  }

  function renderFilterBar() {
    var bar = $("#filter-bar");
    if (!bar) return;
    bar.innerHTML = SITE.pubFilters.map(function (f) {
      var active = f.id === activeFilter;
      return '<button type="button" class="filter-chip' + (active ? " active" : "") +
        '" data-filter="' + esc(f.id) + '" aria-pressed="' + active + '">' + esc(f.label) + "</button>";
    }).join("");
    bar.querySelectorAll(".filter-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        activeFilter = chip.getAttribute("data-filter");
        renderFilterBar();
        renderPublications();
      });
    });
  }

  function renderPublications() {
    var wrap = $("#pub-groups");
    if (!wrap) return;

    var pubs = SITE.publications.filter(pubMatches).slice().sort(function (a, b) {
      return (b.year - a.year) || ((a.order || 99) - (b.order || 99));
    });

    if (!pubs.length) {
      wrap.innerHTML = '<p class="pub-footnote">No publications in this category.</p>';
      return;
    }

    // Group by year, preserving the sorted order.
    var groups = [];
    pubs.forEach(function (p) {
      var g = groups[groups.length - 1];
      if (!g || g.year !== p.year) { g = { year: p.year, items: [] }; groups.push(g); }
      g.items.push(p);
    });

    wrap.innerHTML = groups.map(function (g) {
      var items = g.items.map(function (p, i) {
        var badges = "";
        if (p.status) badges += '<span class="pub-badge badge-review">' + esc(p.status) + "</span>";
        if (p.mostCited) badges += '<span class="pub-badge badge-cited">Most cited · ' + esc(p.citations) + " citations</span>";

        var venueLine = "<em>" + esc(p.venue) + "</em>" +
          (p.detail ? ", " + esc(p.detail) : "") + ", " + esc(p.year);
        if (!p.mostCited && p.citations) venueLine += " · " + esc(p.citations) + " citations";

        var links = [];
        if (p.doi) links.push('<a href="' + esc(p.doi) + '" target="_blank" rel="noopener">[DOI]</a>');
        if (p.pdf) links.push('<a href="' + esc(p.pdf) + '" target="_blank" rel="noopener">[PDF]</a>');
        if (p.code) links.push('<a href="' + esc(p.code) + '" target="_blank" rel="noopener">[Code]</a>');
        if (!p.noBibtex && !p.status) {
          links.push('<button type="button" class="bibtex-btn" data-pub="' + esc(p.title) + '">[BibTeX]</button>');
        }

        return '<li class="pub">' +
          '<h4 class="pub-title">' + esc(p.title) + badges + "</h4>" +
          '<p class="pub-authors">' + formatAuthors(p.authors) + "</p>" +
          '<p class="pub-venue">' + venueLine + "</p>" +
          (p.note ? '<p class="pub-note">' + esc(p.note) + "</p>" : "") +
          (links.length ? '<p class="pub-links">' + links.join(" ") + "</p>" : "") +
          "</li>";
      }).join("");
      return '<div class="pub-group"><h3 class="pub-year-label">' + g.year +
        '</h3><ol class="pub-list">' + items + "</ol></div>";
    }).join("");

    // Wire BibTeX buttons.
    wrap.querySelectorAll(".bibtex-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pub = SITE.publications.find(function (p) { return p.title === btn.getAttribute("data-pub"); });
        if (pub) copyText(bibtexFor(pub), function () { showToast("BibTeX copied to clipboard"); });
      });
    });
  }

  /* ---------- 5. Grants ---------- */

  function renderGrants() {
    var grid = $("#grants-grid");
    if (!grid) return;
    grid.innerHTML = SITE.grants.map(function (g) {
      return '<article class="grant reveal">' +
        '<span class="grant-status ' + esc(g.status) + '">' + esc(g.statusLabel) + "</span>" +
        '<h3 class="grant-title">' + esc(g.title) + "</h3>" +
        '<p class="grant-program">' + esc(g.id) + " · " + esc(g.program) + "</p>" +
        '<p class="grant-funder">' + esc(g.funder) + "</p>" +
        '<p class="grant-desc">' + esc(g.desc) + "</p>" +
        "</article>";
    }).join("");
  }

  /* ---------- 6. Research areas (theme sections with projects) ---------- */

  function renderResearchAreas() {
    var wrap = $("#research-areas");
    if (!wrap) return;
    wrap.innerHTML = SITE.researchAreas.map(function (area) {
      var cards = area.projects.map(function (p) {
        var inProgress = p.status === "in-progress";

        // Badge logic: in-progress → outlined badge; completed with a live
        // demo → green "Live demo" badge; completed otherwise → no badge.
        var badge = "";
        if (inProgress) badge = '<span class="progress-badge">In progress</span>';
        else if (p.demo) badge = '<span class="project-badge">Live demo</span>';

        var links = [];
        if (p.demo) links.push('<a href="' + esc(p.demo) + '" target="_blank" rel="noopener"><i class="fas fa-play-circle"></i> Live demo</a>');
        if (p.github) links.push('<a href="' + esc(p.github) + '" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>');
        if (p.data) links.push('<a href="' + esc(p.data) + '" target="_blank" rel="noopener"><i class="fas fa-database"></i> Benchmark</a>');

        return '<article class="project reveal' + (inProgress ? " project-progress" : "") + '">' +
          '<div class="project-head"><h4 class="project-name">' + esc(p.name) + "</h4>" + badge + "</div>" +
          '<p class="project-impact">' + esc(p.summary) + "</p>" +
          (p.desc ? '<p class="project-desc">' + esc(p.desc) + "</p>" : "") +
          (p.metrics ? '<p class="project-metrics">' + esc(p.metrics) + "</p>" : "") +
          '<div class="project-stack">' + (p.methods || []).map(function (s) {
            return '<span class="stack-pill">' + esc(s) + "</span>";
          }).join("") + "</div>" +
          (links.length ? '<div class="project-links">' + links.join("") + "</div>" : "") +
          "</article>";
      }).join("");

      return '<div class="area reveal">' +
        '<h3 class="area-title">' + esc(area.theme) + "</h3>" +
        '<p class="area-blurb">' + esc(area.blurb) + "</p>" +
        '<div class="projects-grid">' + cards + "</div>" +
        "</div>";
    }).join("");
  }

  /* ---------- 7. Background timeline & skills ---------- */

  function renderTimeline(sel, items) {
    var list = $(sel);
    if (!list) return;
    list.innerHTML = items.map(function (e) {
      return '<li class="timeline-item">' +
        (e.period ? '<div class="tl-period">' + esc(e.period) + "</div>" : "") +
        '<div class="tl-title">' + esc(e.title) + "</div>" +
        '<div class="tl-org">' + esc(e.org) + (e.location ? " · " + esc(e.location) : "") + "</div>" +
        (e.note ? '<div class="tl-note">' + esc(e.note) + "</div>" : "") +
        "</li>";
    }).join("");
  }

  function renderSkills() {
    var grid = $("#skills-grid");
    if (!grid) return;
    grid.innerHTML = SITE.skills.map(function (g) {
      return '<div class="skill-group reveal"><h3>' + esc(g.group) + '</h3><div class="skill-items">' +
        g.items.map(function (s) { return '<span class="skill-pill">' + esc(s) + "</span>"; }).join("") +
        "</div></div>";
    }).join("");
  }

  /* ---------- 8. Scroll-reveal + active nav highlighting ---------- */

  function initObservers() {
    // Reveal-on-scroll for elements carrying .reveal
    if ("IntersectionObserver" in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("visible"); revealObs.unobserve(en.target); }
        });
      }, { threshold: 0.08 });
      document.querySelectorAll(".reveal").forEach(function (el) { revealObs.observe(el); });

      // Active-section highlighting in the nav
      var links = {};
      document.querySelectorAll(".nav-link[href^='#']").forEach(function (a) {
        links[a.getAttribute("href").slice(1)] = a;
      });
      var spyObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
            var link = links[en.target.id];
            if (link) link.classList.add("active");
          }
        });
      }, { rootMargin: "-35% 0px -60% 0px" });
      document.querySelectorAll("main section[id]").forEach(function (s) { spyObs.observe(s); });
    } else {
      document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("visible"); });
    }
  }

  /* ---------- boot ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    try {
      initTheme();
      initHero();
      renderNews();
      renderFilterBar();
      renderPublications();
      renderGrants();
      renderResearchAreas();
      renderTimeline("#education-list", SITE.education);
      renderTimeline("#experience-list", SITE.experience);
      renderSkills();
      initObservers();
    } catch (err) {
      // If data.js has a syntax problem, keep the page usable and say so.
      console.error("Site data error:", err);
      var note = document.createElement("p");
      note.style.cssText = "max-width:900px;margin:20px auto;padding:0 24px;color:#b00;font-size:14px;";
      note.textContent = "Some content failed to load — please check js/data.js for a missing comma or quote.";
      document.body.insertBefore(note, document.body.firstChild);
    }
  });
})();
