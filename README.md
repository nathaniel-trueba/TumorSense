# Tumor Sense

Tumor Sense is an end-to-end SVM classification pipeline built on the Wisconsin Breast Cancer Diagnostic dataset. It reduces 30 raw cell nucleus measurements down to the 10 most predictive features and achieves high discriminatory performance providing a reliable, data-driven second opinion for ambiguous fine needle aspiration (FNA) cases.

### 🔗 Live Demo

[**View Tumorsense Website →**](https://tumorsense-ntrueba-5031s-projects.vercel.app)

---
### Why not just use tumor size?

![Misclassification Risk Zone](visuals/misclass.png)


Tumor size alone leaves a large overlap zone where benign and malignant cases are indistinguishable. Tumor Sense uses 10 cell nucleus measurements together to resolve exactly these ambiguous cases.

---

## Results at a Glance

| Metric | Score |
|---|---|
| Malignant Recall | **98%** |
| Malignant Precision | **98%** |
| ROC-AUC | **0.995** |

A false negative (calling a malignant tumor benign) is a life-threatening error. The model was evaluated with this asymmetry in mind.

---

## Methodology

### 1. Data Preprocessing
- Dataset: [UCI Wisconsin Breast Cancer Diagnostic Dataset](https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)) (569 samples, 30 features)
- Stratified train-test split to preserve class balance across both sets

### 2. Feature Selection
- Applied **Recursive Feature Elimination (RFE)** with a `LinearSVC` estimator
- Reduced 30 raw features → **top 10 most predictive features**

![Top 10 Selected Features](visuals/rfe_feature_rankings.png)

### 3. Model Training
- **Algorithm:** Support Vector Machine with 4 kernels: **RBF, Linear, Polynomial (degree 3), and Sigmoid**
- **Hyperparameter tuning:** `GridSearchCV` over `C` and `gamma`
- Best parameters selected via cross-validated grid search
- All 4 models serialized and served live via a Flask API (`/api/predict`)

### 4. Evaluation
- Precision, Recall, F1 per class
- ROC-AUC score
- SHAP summary plot for model explainability

![SHAP Plot](visuals/shap.png)
`texture3` and `concave_points1` carry the most weight in pushing predictions toward malignant. High feature values (pink) generally shift the model toward malignant; low values (blue) toward benign.

---

## Tech Stack

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3-F7931E?style=flat&logo=scikit-learn&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-2.0-150458?style=flat&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-1.26-013243?style=flat&logo=numpy&logoColor=white)
![Matplotlib](https://img.shields.io/badge/Matplotlib-3.8-11557C?style=flat)
![SHAP](https://img.shields.io/badge/SHAP-explainability-FF6B6B?style=flat)
![Flask](https://img.shields.io/badge/Flask-3.0-000000?style=flat&logo=flask&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat&logo=vercel&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-deployed-0B0D0E?style=flat&logo=railway&logoColor=white)
---

## Repository Structure

```
TumorSense/
├── backend/
│   ├── models/
│   │   ├── model_rbf.joblib
│   │   ├── model_linear.joblib
│   │   ├── model_poly.joblib
│   │   ├── model_sigmoid.joblib
│   │   ├── scaler.joblib
│   │   └── metrics.json
│   ├── server.py
│   ├── train_models.py
│   ├── requirements.txt
│   └── Procfile
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── public/
│   ├── styles/
│   ├── next.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── notebooks/
│   └── tumor_sense.ipynb
├── visuals/
│   ├── misclass.png
│   ├── rfe_feature_rankings.png
│   └── shap.png
├── LICENSE
└── README.md
```

---

## Getting Started

### Try it live
Visit the deployed app: [tumorsense-ntrueba-5031s-projects.vercel.app](https://tumorsense-ntrueba-5031s-projects.vercel.app)

### Run locally

#### Backend
```bash
git clone https://github.com/nathaniel-trueba/TumorSense.git
cd TumorSense/backend

pip install -r requirements.txt
python server.py
```

#### Frontend
```bash
cd TumorSense/frontend

npm install
npm run dev
```

#### Notebook
```bash
cd TumorSense

pip install -r backend/requirements.txt
jupyter notebook notebooks/tumor_sense.ipynb
```

---

## Authors

- **Vedant Vardhaan** - Mentor
- **Nathaniel Trueba** - Group Member
- **Kavya Shah** - Group Member
- **Evan Park** - Group Member
- **Steven Ngo** - Group Member

---

## ⚠️ Disclaimer ⚠️

Tumor Sense is an academic project and is **not intended for clinical use**. All results are derived from a publicly available research dataset and should not be used to inform medical decisions.
