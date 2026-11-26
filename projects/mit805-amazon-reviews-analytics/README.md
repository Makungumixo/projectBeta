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
| Reported review period | December 1999 to March 2023 |

These are reported coursework statistics. **The source notebook and final report are not yet linked, so the figures have not been independently reproduced.** The duplicate count describes identified records, not a verified cleaned sample size.

## Method

- Process review records using Apache Spark / PySpark.
- Explore rating distribution and data quality.
- Identify duplicates and examine potentially misleading aggregates.
- Consider scalability, partitioning and caching for a larger dataset.
- Interpret possible retail implications while discussing uncertainty and selection bias.

## Interpretation and limitations

A high proportion of five-star reviews is a descriptive observation, not proof of unbiased customer satisfaction. Voluntary reviews, category selection, duplicate handling and changes over time can affect conclusions. Counts should not be presented as cleaned sample sizes unless the final report explicitly establishes that.

## Source and reproducibility

The source repository, final notebook and report are **not yet linked**. This page documents the reported project scope and observations. It does not contain the experiment code or establish reproducibility. Verification requires the source files, dataset version, duplicate definition and run configuration.

- [Portfolio case study](https://makungumixo.co.za/case-studies.html#amazon)
- [Portfolio project catalogue](https://makungumixo.co.za/projects.html)
