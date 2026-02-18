# SmartRisk-AI: Robust Credit Risk Assessment

## 🚀 Project Overview
This project implements a high-stakes credit scoring engine. Unlike basic tutorials, this framework is engineered to survive production environments by solving **Temporal Data Leakage** and **Class Imbalance**.

## 🧠 Technical Highlights (Focus: Data Integrity & Validation)

### 1. Advanced Leakage Prevention (Ref: Q1-Q10)
To prevent model overfitting and unrealistic performance, we implemented:
* **Pipeline Encapsulation:** All preprocessing (scaling/encoding) is fitted *only* on the training split within a `Scikit-learn Pipeline` to avoid **Target Leakage**.
* **Time-Series Validation:** Standard K-Fold is inappropriate for financial data; we used `TimeSeriesSplit` to prevent **Look-ahead Bias**.

### 2. Metric Optimization for FinTech (Ref: Q11-Q20)
* **Precision-Recall AUC:** Accuracy is misleading in imbalanced fraud/default datasets. We prioritize **AUPRC** and **F1-Score** to catch high-risk applicants effectively.

### 3. Stakeholder Trust (Ref: Q41-Q50)
* **Explainable AI (XAI):** Integrated **SHAP** values to provide local explanations for every prediction, ensuring the model's logic is auditable and transparent.

## 🛠 Tech Stack
* **Modeling:** XGBoost, Scikit-learn
* **Explainability:** SHAP
* **Infrastructure:** Docker, AWS ECS Fargate (Planned Deployment)
