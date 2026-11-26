# COS 801 — RQ7.1: Lightweight Plant Disease Recognition Through Model Compression

**Project type:** Computer vision / deep learning research contribution  
**Research question:** RQ7.1 — Model Compression  
**Original group repository:** [COS801_Project — rq7.1-model-compression](https://github.com/vbhaga89/COS801_Project/tree/main/rq7.1-model-compression)  
**Reproducible three-seed results:** [Results README](https://github.com/vbhaga89/COS801_Project/blob/main/rq7.1-model-compression/results/three_seed_summary/README.md)

## Objective

Assess the accuracy, model-size and inference-latency trade-offs of **structured pruning**, **INT8 quantisation** and **knowledge distillation** for resource-constrained crop-disease image classification.

## Data and experimental design

- **Dataset:** PlantVillage, 54,299 RGB images spanning 38 classes.
- **Backbones:** EfficientNet-B0 and MobileNetV3-Small.
- **Seeds:** 14, 27 and 42 on one fixed hybrid-v2 train/validation/test split.
- **Selection:** Checkpoints and compression candidates selected on validation data.
- **Metrics:** Test accuracy, macro-F1, model size (MiB), and hosted-CPU inference latency (ms).

## Verified three-seed findings

Values are mean ± sample standard deviation across three training seeds.

| Model variant | Test accuracy (%) | Macro-F1 | Size (MiB) | Hosted CPU median latency (ms) |
| --- | ---: | ---: | ---: | ---: |
| EfficientNet-B0 FP32 | 99.418 ± 0.095 | 0.9919 ± 0.0013 | 15.464 | 14.184 ± 0.715 |
| EfficientNet-B0 selected INT8 | 98.350 ± 0.505 | 0.9800 ± 0.0054 | 4.707 | 18.103 ± 0.429 |
| EfficientNet-B0 selected pruning | 97.792 ± 0.066 | 0.9703 ± 0.0011 | 10.034 | 25.642 ± 1.056 |
| EfficientNet-B0 KD student | 96.123 ± 0.472 | 0.9473 ± 0.0047 | 1.637 | 1.315 ± 0.044 |
| MobileNetV3-Small FP32 | 99.215 ± 0.037 | 0.9896 ± 0.0009 | 5.948 | 2.348 ± 0.140 |
| MobileNetV3-Small selected pruning | 97.042 ± 1.132 | 0.9605 ± 0.0150 | 4.190 ± 0.563 | 4.511 ± 1.524 |
| MobileNetV3-Small KD student | 96.132 ± 0.353 | 0.9491 ± 0.0052 | 1.637 | 1.285 ± 0.055 |

EfficientNet-B0 INT8 reduced stored model size by approximately **69.6%**, with a mean accuracy loss of **1.068 percentage points** relative to FP32. It did **not** improve measured CPU latency. Knowledge-distilled small students provided a different accuracy-versus-size/latency trade-off.

**Negative outcome:** MobileNetV3-Small INT8 failed the validation accuracy gate in all three seeds. No eligible test result is reported.

## Scope and scientific limitations

The three seeds quantify training variation on one fixed split, **not** uncertainty across independent datasets. The hosted CPU benchmark is **not** a real edge-device deployment test. Class and acquisition-context limitations remain; this study does not establish reliable performance on field images or autonomous diagnosis. A model's reduced size does not necessarily imply reduced inference latency.

## Code, notebooks, and provenance

The full training code, notebooks, split audits, evaluation scripts, individual seed results, artefacts and provenance remain in the **original collaborative repository**, which is the authoritative source of this work:

- [Source directory](https://github.com/vbhaga89/COS801_Project/tree/main/rq7.1-model-compression)
- [Original research README](https://github.com/vbhaga89/COS801_Project/blob/main/rq7.1-model-compression/README.md)
- [Three-seed result report](https://github.com/vbhaga89/COS801_Project/blob/main/rq7.1-model-compression/results/three_seed_summary/README.md)

This folder is a **personal project showcase and results summary**, not an independent copy of the group's complete source code. Credit for the broader COS 801 project remains with its original contributors.
