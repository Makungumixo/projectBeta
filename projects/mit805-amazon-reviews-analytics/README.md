# MIT 805 — Amazon Reviews 2023 Big Data Analytics

**Domain:** Large-scale retail review analytics / Big Data  
**Module:** MIT 805  
**Dataset:** Amazon Reviews 2023 — Clothing, Shoes and Jewelry

## Overview

This project uses PySpark to explore large-scale retail feedback and assess how data quality, rating distributions and review patterns can influence business interpretation.

## Dataset profile and reported observations

| Measure | Recorded value |
| --- | ---: |
| Reviews | 7,231,543 |
| Mean rating | 4.253 / 5 |
| Five-star ratings | 64.27% |
| Identified duplicates | 23,544 |
| Review dates | 1999-12-01 to 2023-03-25 |

These values are taken from the project details previously recorded for the course work. **The original final notebook and results artefacts are not yet linked or independently rechecked here.**

## Method

- Process review records using Apache Spark / PySpark.
- Explore rating distribution and data quality.
- Identify duplicates and examine potentially misleading aggregates.
- Consider scalability, partitioning and caching for a larger dataset.
- Interpret possible retail implications while discussing uncertainty and selection bias.

## Interpretation and limitations

A high proportion of five-star reviews is a descriptive observation, not proof of unbiased customer satisfaction. Voluntary reviews, category selection, duplicate handling and changes over time can affect conclusions. Counts should not be presented as cleaned sample sizes unless the final report explicitly establishes that.

## Source and reproducibility

An independently accessible GitHub repository for the MIT 805 Amazon assignment has **not yet been identified**. The original final notebook, report, code and configuration should be linked here once available. This page is a verified-attribution-conscious portfolio summary, **not** a claim that experiment code has been replicated into this repository.

- [Portfolio case study](../../case-studies.html#amazon)
- [Portfolio project catalogue](../../projects.html)
