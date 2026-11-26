# MIT 805 — Amazon Reviews 2023 Big Data Analytics

**Source repository:** [MIT805-Amazon-Reviews-Analytics](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics)  
**Module:** MIT 805 · Big Data Semester Project (2026)  
**Dataset:** McAuley Lab Amazon Reviews 2023 — Clothing, Shoes and Jewelry

## Research and implementation

**Part 1 — Data collection, quality and exploratory analysis.** Analysed rating distributions, dataset dimensions, duplicates, missing review text and the data's 7Vs using PySpark.

**Part 2 — Distributed product-risk analytics.** Ranked eligible parent products by a composite customer-experience risk score combining negative-review prevalence, review volume, helpful votes on negative reviews and recent rating decline. Compared DataFrame aggregation with explicit RDD `map` / `reduceByKey` implementation.

## Source-checked measurements

| Metric | Recorded result |
| --- | ---: |
| Processed review records | 7,231,543 |
| Source file size | 27.81 GB (decimal) |
| Line-safe processing file | 3.221 GB (decimal) |
| Feature columns in Part 1 | 14 |
| Review period | 1999-12-01 to 2023-03-25 |
| Potential duplicate records | 23,544 (0.3256%) |
| Empty review text records | 495 |
| Parent-product groups (Part 2) | 1,836,721 |
| Eligible parent products (at least 50 reviews) | 17,765 |
| DataFrame/RDD aggregation mismatches | 0 |

Previously recorded Part 1 descriptive statistics: **mean rating 4.253 / 5** and **64.27% five-star reviews**. These descriptive figures remain based on earlier coursework records; the JSON evidence inspected here directly supports the volume, quality and Part 2 processing figures above.

## Risk scoring

The Part 2 implementation documents:

```text
negative_share × log1p(review_count)
  × (1 + log1p(negative_helpful_votes))
  × (1 + max(-rating_change, 0))
```

The historical window includes reviews through 2020, compared with 2021–2023 (partial 2023).

## Source code, notebooks and deliverables

- [Original GitHub repository](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics)
- [Part 1 notebook](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/notebooks/Data_Collection_and_Analysis_.ipynb)
- [Part 2 PySpark MapReduce notebook](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/notebooks/Part_2_PySpark_MapReduce_Analysis.ipynb)
- [Part 1 executed evidence](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/results/part1_evidence.json)
- [Part 2 executed evidence](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/results/part2_evidence.json)
- [Ranked high-risk products](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/results/part2_top_risk_products.csv)
- [Part 2 compiled report](https://github.com/Makungumixo/MIT805-Amazon-Reviews-Analytics/blob/main/output/pdf/MIT805_PART2_GROUP_6_REPORT.pdf)

The notebooks, report material, processing code and versioned evidence are in the original repository. This page is the portfolio summary; original code is not duplicated here.

## Interpretation and limitations

The project processed a **3.221 GB sequential prefix/subset** from the **27.81 GB source file**, not the entire raw file. Its composition may not represent the full category. Voluntary reviews, product-identifier merging, review manipulation and partial 2023 coverage limit interpretation. The risk score is an observational prioritisation heuristic, not a validated predictor of future complaints or a causal measure. No live retail deployment is claimed.

The figures above are **source-checked against committed README and JSON evidence**, not freshly recomputed from raw data in this portfolio.
