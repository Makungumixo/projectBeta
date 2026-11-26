# projectBeta

Personal portfolio website for Makungu Ndlovu.

## Featured research projects

- **[MIT 805 — Amazon Reviews 2023 Analytics](projects/mit805-amazon-reviews-analytics/README.md):** PySpark retail-review profiling of 7,231,543 records, including rating distributions and duplicate checks. Original code/results link pending.
- **[COS 802 — Ames Housing Price Prediction](projects/cos802-housing-price-prediction/README.md):** Regression-modelling project overview. Source notebook and final evaluation metrics pending verification.
- **[COS 801 — RQ7.1 Plant Disease Model Compression](projects/rq7.1-model-compression/README.md):** Verified three-seed study of INT8 quantisation, structured pruning, and knowledge distillation on PlantVillage. [Original collaborative code](https://github.com/vbhaga89/COS801_Project/tree/main/rq7.1-model-compression).

## Local preview

Serve the repository root with any static web server. For example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validation

Run the repository's dependency-free link and placeholder checker:

```bash
python scripts/check_site.py
```

The same check runs automatically for pull requests and pushes to `main`.

## Deployment

The site is intended for GitHub Pages with the custom domain declared in `CNAME`: `makungumixo.co.za`.

After merging, configure GitHub Pages to deploy from the `main` branch root. Confirm the domain's DNS records point to GitHub Pages before enabling **Enforce HTTPS**.
