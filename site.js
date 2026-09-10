/* =============================================================================
   Sarvarbek Erniyazov — research portfolio
   Site script (intentionally small)
   -----------------------------------------------------------------------------
   The page renders completely without JavaScript. This file only adds:
     1. the mobile navigation toggle,
     2. "Copy BibTeX" buttons for the journal articles.
   There are no animated counters or asynchronously loaded numbers.
   ============================================================================= */

(function () {
  "use strict";

  /* 1. Mobile navigation ---------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after a section link is chosen.
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* 2. BibTeX copy buttons -------------------------------------------------- */
  // Each button carries data-bib="<key>"; the record lives in the BIB map.
  // Edit the records here when a paper's metadata changes.
  var BIB = {
    ksii2026:
"@article{erniyazov2026multimodal,\n" +
"  title   = {A Multimodal Fusion Framework for Solar Forecasting using Dynamic GNNs and Mixture of Experts},\n" +
"  author  = {Erniyazov, Sarvarbek and Jaleel, M. A. and Lim, Chang Gyoon and Ha, S. B.},\n" +
"  journal = {KSII Transactions on Internet and Information Systems},\n" +
"  volume  = {20}, number = {3}, pages = {1337--1360}, year = {2026},\n" +
"  doi     = {10.3837/tiis.2026.03.012}\n" +
"}",
    egyr2025:
"@article{erniyazov2025gnn,\n" +
"  title   = {GNN-enhanced temporal patch segmentation and frequency fusion model for robust solar energy production forecasting},\n" +
"  author  = {Erniyazov, Sarvarbek and Lim, Chang Gyoon},\n" +
"  journal = {Energy Reports},\n" +
"  volume  = {13}, pages = {4962--4984}, year = {2025},\n" +
"  doi     = {10.1016/j.egyr.2025.03.063}\n" +
"}",
    ijaseit2024:
"@article{erniyazov2024anomaly,\n" +
"  title   = {Comprehensive Analysis and Improved Techniques for Anomaly Detection in Time Series Data with Autoencoder Models},\n" +
"  author  = {Erniyazov, Sarvarbek and Kim, Young-Min and Jaleel, M. A. and Lim, Chang Gyoon},\n" +
"  journal = {International Journal on Advanced Science, Engineering and Information Technology},\n" +
"  volume  = {14}, number = {6}, year = {2024},\n" +
"  doi     = {10.18517/ijaseit.14.6.20716}\n" +
"}",
    mee2019:
"@article{erniyazov2019carry,\n" +
"  title   = {Carry save adder and carry look ahead adder using inverter chain based coplanar QCA full adder for low energy dissipation},\n" +
"  author  = {Erniyazov, Sarvarbek and Jeon, Jun-Cheol},\n" +
"  journal = {Microelectronic Engineering},\n" +
"  volume  = {211}, pages = {37--43}, year = {2019},\n" +
"  doi     = {10.1016/j.mee.2019.03.015}\n" +
"}"
  };

  function copyText(text, done) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (err) { /* ignore */ }
      ta.remove(); done();
    }
  }

  document.querySelectorAll("button[data-bib]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var rec = BIB[btn.getAttribute("data-bib")];
      if (!rec) { return; }
      var label = btn.textContent;
      copyText(rec, function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = label; }, 1500);
      });
    });
  });
})();
