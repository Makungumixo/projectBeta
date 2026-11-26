# COS 802 — Ames Housing Price Prediction

**Project:** Regression and feature importance analysis  
**Source repository:** [COS802-Housing-Price-Prediction](https://github.com/Makungumixo/COS802-Housing-Price-Prediction)  
**Evidence:** [Saved final evaluation notebook](https://github.com/Makungumixo/COS802-Housing-Price-Prediction/blob/63eb18959c3a2f5dee508667b33e5ca065a04fe9/notebooks/05_interpretability_error_analysis.ipynb)

## Objective

Investigate how domain-informed feature engineering and regression model choice affect housing-price prediction and interpretability using the Ames Housing dataset.

## Data and experimental design

- Ames Housing: 2,930 observations and 82 columns including the sale-price target.
- One fixed split with seed `16153970`: 2,344 development properties and 586 locked test properties.
- Five fixed development folds for model comparison and tuning, with RMSE as the primary selection metric.
- Training-fold preprocessing, with identifiers `Order` and `PID` excluded from predictors.
- Ridge, Random Forest and XGBoost comparisons. The frozen final model uses XGBoost with engineered features.

## Source-checked held-out test results

The saved Notebook 05 outputs report the following final results. These are test results, not development cross-validation scores.

| Metric | Final estimate | Approximate bootstrap 95% interval |
| --- | ---: | ---: |
| MAE | $13,885.15 | $12,372–$15,772 |
| RMSE | $25,354.31 | $18,165–$34,407 |
| R² | 0.8999 | 0.840–0.941 |

The saved comparison table also reports test RMSE of $30,911.52 for the original-feature Ridge reference and $80,166.89 for the naive-mean reference. These comparisons describe this fixed test set and do not establish performance in another property market.

**Verification scope:** The final estimates, intervals and baseline comparison were checked against the notebook's saved outputs at source commit `63eb18959c3a2f5dee508667b33e5ca065a04fe9`. Model training was not rerun during portfolio publication.

## Interpretation and limitations

Notebook 05 fits the frozen development-selected configuration on all development properties before evaluating the locked test set. The analysis includes residual/subgroup checks and SHAP explanations. SHAP describes the fitted model's use of predictors, not causal effects on sale prices.

The original-versus-engineered comparison also changes structural-absence handling, so it compares complete pipelines rather than isolating feature creation alone. Notebook 06's feature-removal and sale-context checks are exploratory follow-ups motivated by test-set SHAP. They do not provide independent confirmation or revise the frozen final model.

Results come from one historical location and one fixed split. Bootstrap intervals describe uncertainty within that evaluation sample, not guaranteed generalisation to future periods or different markets. Small subgroup estimates require caution.

## Code and reproduction

The [source README](https://github.com/Makungumixo/COS802-Housing-Price-Prediction#readme) documents six notebooks, reusable `src/` modules and the reference Colab/Drive layout. Run notebooks 01 through 06 in order and preserve the saved split/fold membership. Local execution requires adapting the retained Drive paths and mount cells. Dependency ranges describe the reference environment rather than an exact lockfile.

This portfolio folder summarises the work and links its evidence. The source repository contains the notebooks, reusable code, report and presentation.

## Related links

- [Source repository](https://github.com/Makungumixo/COS802-Housing-Price-Prediction)
- [Pinned final evaluation](https://github.com/Makungumixo/COS802-Housing-Price-Prediction/blob/63eb18959c3a2f5dee508667b33e5ca065a04fe9/notebooks/05_interpretability_error_analysis.ipynb)
- [Portfolio case study](https://makungumixo.co.za/case-studies.html#housing)
- [Portfolio project catalogue](https://makungumixo.co.za/projects.html)
