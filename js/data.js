/* ==========================================================================
   data.js — ALL site content lives in this file.
   To update the website, edit this file only. Layout and styling never
   need to change. After editing, commit + push to GitHub (see README.md).

   Editing rules:
   - Keep the structure exactly as shown (curly braces, quotes, commas).
   - Every item in a list ends with a comma except optionally the last one.
   - Text must be wrapped in double quotes. If your text contains a double
     quote, escape it like \" .
   ========================================================================== */

const SITE = {

  /* ------------------------------------------------------------------
     PROFILE — identity, links, and file toggles
     ------------------------------------------------------------------ */
  profile: {
    name: "Sarvarbek Erniyazov",
    role: "Ph.D. Candidate in Artificial Intelligence",
    affiliation: "AI Lab, Chonnam National University",
    location: "Gwangju, South Korea",
    email: "erniyazov_sarvarbek@jnu.ac.kr",

    /* One-line research identity shown in the hero (kept in sync with index.html). */
    tagline:
      "I develop deep learning methods — spatio-temporal graph learning, mixture-of-experts, federated learning, and multimodal fusion — and apply them across scientific and industrial domains, carrying research from publication to production-grade deployment.",

    /* Quiet credibility line under the tagline. Update the numbers as they grow. */
    stats: "13+ peer-reviewed publications · 113+ citations · 4 national R&D grants",

    links: {
      scholar: "https://scholar.google.com/citations?user=B3qpvQcAAAAJ&hl=en",
      orcid: "https://orcid.org/0000-0001-8828-2978",
      github: "https://github.com/Sarvarbek-Erniyazov",
      linkedin: "https://www.linkedin.com/in/sarvarbek-erniyazov-ba952b13a/"
    },

    /* CV download button.
       TODO: put your CV file at assets/cv.pdf, then set cvReady to true. */
    cv: "assets/cv.pdf",
    cvReady: false,

    /* Portrait photo.
       TODO: put a professional photo at assets/photo.jpg (square, ≥ 600px),
       then set photo to "assets/photo.jpg". Empty string shows a placeholder. */
    photo: "",

    /* Shown in the footer. Update when you make significant changes. */
    lastUpdated: "July 2026"
  },

  /* ------------------------------------------------------------------
     NEWS — reverse-chronological updates (papers, grants, awards, talks).
     "date"  : short display label
     "sort"  : YYYY-MM used for ordering (newest first)
     Add new items at the TOP of the list.
     ------------------------------------------------------------------ */
  news: [
    {
      date: "Mar 2026",
      sort: "2026-03",
      html: "Our multimodal solar-forecasting framework — dynamic GNNs with a horizon-aware mixture-of-experts — is published in <em>KSII Transactions on Internet and Information Systems</em> 20(3)."
    },
    {
      /* TODO: confirm the start month of this project. */
      date: "2026",
      sort: "2026-01",
      html: "New TIPA industry–academia commercialization R&D project (2026–2028) on cooperative sLM·LMM virtual power plant platforms for on-device and cloud-integrated energy management."
    },
    {
      /* TODO: confirm the submission month. */
      date: "2025",
      sort: "2025-06",
      html: "<em>Fed-ST-MoE</em>, a federated spatio-temporal GNN with mixture-of-experts for heterogeneous building energy forecasting, is under review at IEEE."
    },
    {
      /* TODO: confirm the publication month. */
      date: "2025",
      sort: "2025-04",
      html: "Our GNN-enhanced temporal patch segmentation and frequency fusion model for solar energy forecasting is published in <em>Energy Reports</em> 13."
    },
    {
      /* TODO: confirm the publication month. */
      date: "2024",
      sort: "2024-12",
      html: "Autoencoder-based anomaly detection study for industrial control systems is published in <em>IJASEIT</em> 14(6)."
    }
  ],

  /* ------------------------------------------------------------------
     PUBLICATION FILTERS — topic chips above the publication list.
     Each publication below lists the filter ids it belongs to in "areas".
     ------------------------------------------------------------------ */
  pubFilters: [
    { id: "all",     label: "All" },
    { id: "energy",  label: "Energy & Forecasting" },
    { id: "fedmoe",  label: "Federated & MoE" },
    { id: "anomaly", label: "Anomaly Detection" },
    { id: "qca",     label: "QCA & Hardware" }
  ],

  /* ------------------------------------------------------------------
     PUBLICATIONS — grouped by "year" (newest first automatically).
     Fields:
       title     : paper title
       authors   : comma-separated, exactly as it should display
                   ("S. Erniyazov" is bolded automatically)
       venue     : journal / conference name
       detail    : volume, pages (optional)
       year      : number used for grouping
       order     : position inside its year (1 = first)
       status    : "Under review" (optional — shows an amber badge,
                   hides DOI/PDF/BibTeX)
       doi       : DOI link (optional)
       pdf       : path to a PDF inside assets/papers/ (optional)
       code      : link to code (optional)
       citations : number (optional, shown quietly)
       mostCited : true to show a "Most cited" badge (use once)
       areas     : which filter chips include this paper
       bibType   : "article" | "inproceedings" (for BibTeX generation)
       noBibtex  : true to hide the BibTeX button (e.g. grouped entries)
     ------------------------------------------------------------------ */
  publications: [
    {
      title: "A Multimodal Fusion Framework for Solar Forecasting using Dynamic GNNs and Mixture of Experts",
      authors: "S. Erniyazov, M. A. Jaleel, C. G. Lim, S. B. Ha",
      venue: "KSII Transactions on Internet and Information Systems",
      detail: "20(3), 1337–1360",
      year: 2026,
      order: 1,
      doi: "https://doi.org/10.3837/tiis.2026.03.012",
      pdf: "assets/papers/2026-ksii-multimodal-gnn-moe.pdf",
      note: "Four-modality fusion (sky imagery, satellite, ground sensors, NWP fields) with a meteorology-driven dynamic GNN and horizon-aware MoE — 49% forecast skill over the NAM physical model and 15% RMSE reduction on day-ahead solar forecasting.",
      areas: ["energy", "fedmoe"],
      bibType: "article"
    },
    {
      title: "GNN-enhanced temporal patch segmentation and frequency fusion model for robust solar energy production forecasting",
      authors: "S. Erniyazov, C. G. Lim",
      venue: "Energy Reports",
      detail: "13, 4962–4984",
      year: 2025,
      order: 1,
      doi: "https://doi.org/10.1016/j.egyr.2025.03.063",
      pdf: "assets/papers/2025-energy-reports-gnn-tps-ff.pdf",
      note: "Graph learning with temporal patch segmentation and frequency fusion for multi-station PV forecasting — 46% MSE reduction at the 12-hour horizon versus PatchTST, Crossformer, PatchMixer, and Fredformer baselines.",
      citations: 3,
      areas: ["energy"],
      bibType: "article"
    },
    {
      title: "Fed-ST-MoE: A Federated Spatio-Temporal GNN with Mixture-of-Experts for Heterogeneous Building Energy and Demand Forecasting",
      authors: "S. Erniyazov, et al.",
      venue: "IEEE",
      year: 2025,
      order: 2,
      status: "Under review",
      note: "Federated spatio-temporal graph learning with MoE routing for heterogeneous building energy forecasting under data privacy constraints.",
      areas: ["energy", "fedmoe"],
      noBibtex: true
    },
    {
      title: "Comprehensive Analysis and Improved Techniques for Anomaly Detection in Time Series Data with Autoencoder Models",
      authors: "S. Erniyazov, Y.-M. Kim, M. A. Jaleel, C. G. Lim",
      venue: "International Journal on Advanced Science, Engineering and Information Technology",
      detail: "14(6)",
      year: 2024,
      order: 1,
      doi: "https://doi.org/10.18517/ijaseit.14.6.20716",
      pdf: "assets/papers/2024-ijaseit-anomaly-detection.pdf",
      note: "LSTM-autoencoder anomaly detection for industrial control systems on the HAI security dataset — 99% accuracy and F1 = 0.987 in real-time scenarios.",
      citations: 5,
      areas: ["anomaly"],
      bibType: "article"
    },
    {
      title: "Carry save adder and carry look ahead adder using inverter chain based coplanar QCA full adder for low energy dissipation",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Microelectronic Engineering",
      detail: "211, 37–43",
      year: 2019,
      order: 1,
      doi: "https://doi.org/10.1016/j.mee.2019.03.015",
      pdf: "assets/papers/2019-microelectronic-qca-fa-csa-cla.pdf",
      note: "Coplanar QCA full adder, CSA, and CLA designs cutting cell count, area, and energy dissipation — over 50% area reduction for the CLA at THz-scale operation.",
      citations: 88,
      mostCited: true,
      areas: ["qca"],
      bibType: "article"
    },
    {
      title: "Area efficient magnitude comparator based on QCA",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Advanced Science and Technology Letters",
      detail: "150, 75–79",
      year: 2018,
      order: 1,
      citations: 16,
      areas: ["qca"],
      bibType: "article"
    },
    {
      title: "Implementation of area efficient Fredkin gate for compact reversible QCA circuit",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Advanced Science Letters",
      detail: "23(10)",
      year: 2017,
      order: 1,
      citations: 2,
      areas: ["qca"],
      bibType: "article"
    },
    {
      title: "Coplanar Subtractor Design in QCA for Arithmetic Circuit Design",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Advanced Science Letters",
      detail: "23(10)",
      year: 2017,
      order: 2,
      citations: 2,
      areas: ["qca"],
      bibType: "article"
    },
    {
      title: "Reversible Circuit Design in QCA Based on Double Feynman Gate",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Advanced Science Letters",
      detail: "23(10)",
      year: 2017,
      order: 3,
      areas: ["qca"],
      bibType: "article"
    },
    {
      /* Grouped entry — five short conference papers listed together.
         TODO: replace with individual entries (exact titles) from the CV. */
      title: "Five conference papers on reversible QCA circuit design — half subtractor, Fredkin gate, area-efficient FG, double Feynman gate, and reversible Toffoli gate",
      authors: "S. Erniyazov, J.-C. Jeon",
      venue: "Proc. IKIIT Conference & International Workshop on Future Technology",
      year: 2017,
      order: 4,
      areas: ["qca"],
      noBibtex: true
    }
  ],

  /* ------------------------------------------------------------------
     GRANTS — national R&D projects.
     status: "active" | "review" | "done"  (controls the colored badge)
     ------------------------------------------------------------------ */
  grants: [
    {
      status: "active",
      statusLabel: "Active · 2026–2028",
      id: "RS-2026-25529976",
      program: "TIPA · Industry–Academia Commercialization R&D",
      title: "sLM·LMM Cooperative VPP Platform for On-device AI and Cloud-integrated Energy Management",
      funder: "Korea Technology and Information Promotion Agency (TIPA)",
      desc: "Virtual power plant platform combining small language models and large multimodal models in a cooperative edge–cloud architecture for data-centric energy management."
    },
    {
      status: "review",
      statusLabel: "Under review · 2025",
      id: "RS-2025-00564485",
      program: "NRF · Excellent Research, Mid-career Type 1",
      title: "sML-based Satellite–Ground Data Integration for Solar Energy Variability Management and VPP Platform",
      funder: "National Research Foundation of Korea (NRF) · Ministry of Education",
      desc: "Satellite and ground sensor data integration with mixture-of-experts architectures for solar variability prediction and virtual power plant operation."
    },
    {
      status: "review",
      statusLabel: "Under review · 2026",
      id: "RS-2026-25550513",
      program: "INNOPOLIS · Technology Transfer & Commercialization",
      title: "Global Validation and Commercialization of AI-based Power Equipment Anomaly Detection and Preventive Control",
      funder: "INNOPOLIS Foundation · Special R&D Zone",
      desc: "AI-driven anomaly detection and preventive control for power infrastructure, targeting international validation and commercial deployment."
    },
    {
      status: "done",
      statusLabel: "Completed · 2025",
      id: "RS-2025-02312851",
      program: "TIPA · Industry–Academia Preliminary Research",
      title: "On-device AI and Cloud-integrated Data-centric Energy Management (Preliminary Study)",
      funder: "Korea Technology and Information Promotion Agency (TIPA)",
      desc: "Feasibility study of cooperative sLM·LMM architectures for virtual power plants — the basis of the ongoing 2026–2028 commercialization project."
    }
  ],

  /* ==================================================================
     RESEARCH AREAS — theme sections, each containing projects.

     Every project has a "status" field that controls its badge:
       status: "completed"    → no badge (or "Live demo" if a demo link
                                exists); shown as finished, linkable work
       status: "in-progress"  → subtle outlined "In progress" badge;
                                written as an active research direction

     HOW TO ADD A PROJECT: copy any project object below into the
     "projects" list of the right theme and edit its fields.

     HOW TO PROMOTE a project from in-progress to completed:
       1. change  status: "in-progress"  →  status: "completed"
       2. rewrite "summary" from "Developing …" to what the system does
       3. add the real links:  github: "https://github.com/...",
          and optionally  demo: "..."  and real  metrics: "..."
     Never list results or metrics before they are real.

     Project fields:
       name     : short project title
       status   : "completed" | "in-progress"
       summary  : one-line contribution statement
       desc     : 1–2 sentences of detail (optional)
       methods  : list of methods/tools shown as small pills
       github   : repository link (only when real)
       demo     : live demo link (only when real)
       data     : dataset/benchmark link (only when real)
       metrics  : short real-results line (completed projects only)
     ================================================================== */
  researchAreas: [

    {
      theme: "Large Language Models & Generative AI",
      blurb: "Language model reasoning, efficient domain adaptation, retrieval grounding, and multimodal generation.",
      projects: [
        {
          name: "Small Language Models for Sensor & Telemetry Reasoning",
          status: "in-progress",
          summary: "Developing a retrieval-grounded small-language-model assistant that answers operational questions over multimodal time-series and telemetry data, pairing efficient on-device inference with cloud-scale multimodal models.",
          methods: ["Small LMs", "Retrieval grounding", "Tool use", "On-device inference"]
        },
        {
          name: "Mixture-of-Experts Routing for Multi-Domain LLM Adaptation",
          status: "in-progress",
          summary: "Investigating MoE routing as a mechanism for parameter-efficient adaptation of language models across heterogeneous domains — extending my published MoE forecasting work to language.",
          methods: ["Mixture-of-Experts", "Parameter-efficient fine-tuning", "Routing analysis"]
        }
      ]
    },

    {
      theme: "Physical AI, Robotics & Embodied Intelligence",
      blurb: "Perception, world modeling, and decision-making for agents operating in the physical world.",
      projects: [
        {
          name: "Vision–Language Scene Understanding for Traffic Safety",
          status: "in-progress",
          summary: "Developing a vision–language-model pipeline for traffic-incident detection and description over multi-camera urban video streams, evaluated on a public traffic-accident benchmark.",
          methods: ["Vision–language models", "Spatio-temporal reasoning", "Multi-camera video"],
          data: "https://ieee-dataport.org/documents/traffic-accident-detection-video-dataset-ai-driven-computer-vision-systems-smart-city"
        },
        {
          name: "Aerial Crowd Analysis & Counting",
          status: "in-progress",
          summary: "Developing multi-scale crowd density estimation that works across drone and fixed-camera viewpoints under occlusion and perspective distortion, for public-safety applications.",
          methods: ["Computer vision", "Multi-scale detection", "Aerial imagery"]
        }
      ]
    },

    {
      theme: "AI for Science & Autonomous Discovery",
      blurb: "Machine learning that accelerates scientific work — surrogates, optimization loops, and reproducible experimentation.",
      projects: [
        {
          name: "ReproLab — Reproducible ML Experimentation",
          status: "completed",
          summary: "An experiment-tracking platform that captures parameters, metrics, data versions, and environment snapshots with one-click replay — infrastructure for trustworthy computational science.",
          methods: ["MLflow", "DVC", "Hydra", "Streamlit"],
          github: "https://github.com/Sarvarbek-Erniyazov/ReproLab"
        },
        {
          name: "ML-Guided Experiment Design Loops",
          status: "in-progress",
          summary: "Developing Bayesian-optimization loops that close the design–run–analyze cycle for simulation-based parameter search, toward autonomous experimentation workflows.",
          methods: ["Bayesian optimization", "Optuna", "Surrogate models"]
        }
      ]
    },

    {
      theme: "Digital Twins, Smart Manufacturing & Industrial AI",
      blurb: "Data-driven modeling, monitoring, and optimization of industrial assets and processes across their lifecycle.",
      projects: [
        {
          name: "AutoPulse — Self-Healing Production ML",
          status: "completed",
          summary: "An autonomous model-lifecycle system for industrial deployment: batch and real-time inference, drift-triggered automatic retraining, and CI/CD delivery on AWS ECS Fargate.",
          methods: ["Airflow", "FastAPI", "AWS ECS", "MLflow"],
          github: "https://github.com/Sarvarbek-Erniyazov/AutoPulse"
        },
        {
          name: "Streaming Digital-Twin Testbed for Building Energy Systems",
          status: "in-progress",
          summary: "Developing a streaming digital-twin testbed that couples live sensor ingestion with forecasting models for building-scale energy systems, as a foundation for operational what-if analysis.",
          methods: ["Digital twins", "Streaming pipelines", "Spatio-temporal forecasting"]
        }
      ]
    },

    {
      theme: "Trustworthy, Safe & Embedded AI",
      blurb: "Reliability, robustness, explainability, and security for AI deployed in high-stakes and resource-constrained settings.",
      projects: [
        {
          name: "FinRiskGuard — Explainable Financial Risk Assessment",
          status: "completed",
          summary: "A dual-task fraud-detection and credit-scoring system with SHAP explanations and counterfactuals, deployed end-to-end with a public live demo.",
          desc: "Fraud detection on 590K+ IEEE-CIS transactions and credit scoring on 307K+ applicants across 57M+ rows, served on FastAPI + Docker + AWS EC2.",
          metrics: "AUC-ROC 0.926 (fraud) · 0.785 (credit) · recall 70.5% / 71.0%",
          methods: ["XGBoost", "LightGBM", "CatBoost", "Optuna", "SHAP", "FastAPI", "Docker", "AWS EC2"],
          github: "https://github.com/Sarvarbek-Erniyazov/FinRiskGuard",
          demo: "https://huggingface.co/spaces/Sarvarbek13/FinRiskGuard"
        },
        {
          name: "DriftSentinel — ML Reliability Toolkit",
          status: "completed",
          summary: "Drift detection, adversarial stress-testing, and conformal-prediction uncertainty quantification for auditable production models.",
          methods: ["Evidently", "MAPIE", "Alibi Detect", "Docker"],
          github: "https://github.com/Sarvarbek-Erniyazov/DriftSentinel"
        },
        {
          name: "Robust Audio Deepfake Detection under Media Transformations",
          status: "in-progress",
          summary: "Investigating detection models that remain reliable under real-world media transformations — compression, re-encoding, and noise — targeting a public robustness benchmark.",
          methods: ["Audio deep learning", "Robustness evaluation", "Signal processing"],
          data: "https://radar-challenge.github.io/"
        }
      ]
    },

    {
      theme: "AI for Energy & Sustainable Systems",
      blurb: "Forecasting, coordination, and control for renewable energy, storage, and sustainable infrastructure.",
      projects: [
        {
          name: "Open Multimodal Solar Forecasting Harness",
          status: "in-progress",
          summary: "Developing an open benchmark harness for multimodal solar forecasting — aligned satellite, sky-imagery, ground-sensor, and NWP inputs with standardized skill metrics — extending my published GNN + MoE forecasting line.",
          methods: ["Multimodal fusion", "Dynamic GNNs", "Benchmark design"]
        },
        {
          name: "Federated Learning Testbed for Distributed Energy Resources",
          status: "in-progress",
          summary: "Developing a federated-learning testbed for coordinating heterogeneous distributed energy resources in virtual power plant operation, building on the Fed-ST-MoE line of work.",
          methods: ["Federated learning", "Mixture-of-Experts", "Simulation"]
        }
      ]
    },

    {
      theme: "AI for Bio & Healthcare",
      blurb: "Privacy-preserving sensing and reliable machine learning for health monitoring and the life sciences.",
      projects: [
        {
          name: "Privacy-Preserving Fall Detection via Thermal Imaging",
          status: "in-progress",
          summary: "Developing thermal-imaging fall detection for elderly care that is private by design — body-heat signatures and pose cues instead of identifiable video — for reliable edge deployment.",
          methods: ["Thermal imaging", "Pose estimation", "Edge deployment"]
        },
        {
          name: "Federated Modeling of Physiological Time Series",
          status: "in-progress",
          summary: "Investigating federated anomaly-detection methods for physiological time-series data across institutions, transferring my federated forecasting and anomaly-detection experience to health signals.",
          methods: ["Federated learning", "Time-series modeling", "Anomaly detection"]
        }
      ]
    }
  ],

  /* ------------------------------------------------------------------
     EDUCATION — newest first.
     TODO: add M.S. and B.S. entries (institution, field, years) and the
     Ph.D. period + expected completion date, e.g. "2023 – present (expected 2026)".
     ------------------------------------------------------------------ */
  education: [
    {
      period: "",
      title: "Ph.D. Candidate, Artificial Intelligence",
      org: "Chonnam National University — AI Lab",
      location: "Gwangju, South Korea",
      note: "Advisor: Prof. Chang Gyoon Lim"
    }
    /* Example:
    {
      period: "2016 – 2018",
      title: "M.S., Computer Engineering",
      org: "University name",
      location: "City, Country",
      note: "Advisor: ..."
    }
    */
  ],

  /* ------------------------------------------------------------------
     EXPERIENCE — newest first.
     TODO: add periods and any prior positions (industry, internships, RA/TA).
     ------------------------------------------------------------------ */
  experience: [
    {
      period: "",
      title: "Graduate Researcher",
      org: "AI Lab, Chonnam National University",
      location: "Gwangju, South Korea",
      note: "Researcher on four national R&D projects (NRF, TIPA, INNOPOLIS): solar forecasting, virtual power plants, satellite–ground data integration, and anomaly detection for critical infrastructure."
    }
  ],

  /* ------------------------------------------------------------------
     SKILLS — grouped lists, no proficiency bars.
     TODO: confirm deep-learning framework(s) (PyTorch? PyTorch Geometric / DGL?)
     and programming languages beyond Python — then add them here.
     ------------------------------------------------------------------ */
  skills: [
    {
      group: "Machine Learning & Modeling",
      items: [
        "Graph Neural Networks", "Mixture-of-Experts", "Federated Learning",
        "Time-Series Forecasting", "Multimodal Fusion", "Anomaly Detection",
        "XGBoost / LightGBM / CatBoost", "Optuna", "SHAP", "Conformal Prediction"
      ]
    },
    {
      group: "MLOps & Engineering",
      items: [
        "Python", "FastAPI", "Docker", "AWS (EC2, ECS Fargate)", "MLflow",
        "DVC", "Airflow", "Hydra", "Evidently", "Alibi Detect",
        "Streamlit", "Gradio", "Git / GitHub"
      ]
    },
    {
      group: "Data Domains",
      items: [
        "Satellite & NWP meteorological fields", "Sky imagery",
        "Ground sensor networks", "Industrial control time series",
        "Building energy data", "Financial transactions"
      ]
    }
  ]
};
