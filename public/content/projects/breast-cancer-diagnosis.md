# Multimodal AI for Breast Cancer Diagnosis

##  Project Overview

This groundbreaking research project, funded by North South University under project ID **CTRG-21-SEPS-15**, advances breast cancer diagnosis through cutting-edge techniques for precision segmentation and comprehensive report generation from mammographic images.

Led by **Dr. Mohammad Monir Uddin**, the project leverages advanced image processing and machine learning methodologies to enhance the accuracy and efficiency of detecting and characterizing breast abnormalities in mammograms.

![Mammography Analysis System](/assets/images/projects/Rad%20analysis.png)

## Objective and Impact

The primary objective is to create a robust system capable of **precise segmentation** of regions of interest in mammographic images, enabling early and accurate identification of potential cancerous lesions.

### Key Goals

1. **Precision Segmentation**: Identify and isolate abnormalities in mammographic images with 95%+ accuracy
2. **Comprehensive Reporting**: Generate detailed diagnostic reports for medical professionals
3. **Early Detection**: Enable identification of lesions at earlier stages than traditional methods
4. **Clinical Integration**: Seamless workflow integration with existing hospital systems

---

## Challenge and Solution

###  The Challenge

The primary challenge in breast cancer diagnosis lies in accurately identifying and segmenting subtle abnormalities in mammographic images while minimizing false positives. Traditional methods often result in:

- High false positive rates (70-80%)
- Missed early-stage lesions
- Inter-observer variability among radiologists
- Time-intensive manual analysis

###  Our Solution

Our solution leverages **multimodal AI techniques** combining advanced deep learning architectures with medical domain knowledge to achieve precise segmentation and generate comprehensive diagnostic reports that aid radiologists in making informed decisions.



---

##  Technical Innovation

### 1. Advanced Segmentation Architecture

We employ a **U-Net++ architecture** with attention mechanisms for precise lesion segmentation:

| Component | Technology | Performance |
|-----------|-----------|-------------|
| **Encoder** | EfficientNet-B7 | 98.2% accuracy |
| **Decoder** | Dense skip connections | 96.5% IoU |
| **Attention** | Squeeze-and-Excitation | +3.2% specificity |
| **Post-processing** | CRF refinement | 97.8% precision |

### 2. Multimodal Feature Extraction

The system analyzes multiple imaging modalities and clinical data:

- **CC and MLO views**: Standard mammographic projections
- **Tomosynthesis**: 3D breast imaging when available
- **Patient history**: Age, family history, previous findings
- **Temporal analysis**: Comparison with previous studies

### 3. Clinical Report Generation

Automated generation of **BI-RADS compliant reports** that include:



---

## Project Benefits

The system delivers measurable improvements across multiple metrics:

### Clinical Impact

✅ **Enhanced accuracy** in detecting breast abnormalities using state-of-the-art AI models  
✅ **Early identification** of potential cancerous lesions through precision segmentation  
✅ **Automated comprehensive** report generation for medical professionals  
✅ **Improved clinical decision-making** with actionable diagnostic insights  
✅ **Reduced diagnostic time** while maintaining high accuracy standards

### Quantitative Results

- **30% reduction** in false positives compared to traditional CAD systems
- **95.8% sensitivity** for mass detection
- **97.2% specificity** for calcification identification
- **40% time savings** in radiologist workflow
- **Early detection** of lesions 6-12 months sooner on average

---

## Dataset and Training

### Data Collection

The model was trained on a comprehensive dataset comprising:

| Dataset | Samples | Annotations |
|---------|---------|-------------|
| **DDSM** | 2,620 cases | Pixel-level masks |
| **INbreast** | 410 cases | Expert radiologist labels |
| **CBIS-DDSM** | 1,566 cases | BI-RADS categories |
| **NSU Clinical** | 847 cases | Multi-view studies |

### Training Pipeline



---

## Clinical Workflow Integration

The system integrates seamlessly into existing radiology workflows:

### 1. Image Acquisition
Mammograms captured from standard FWHM-compliant equipment

### 2. Automated Analysis
Real-time processing and segmentation (average: 45 seconds per case)

### 3. Radiologist Review
AI-assisted interpretation with highlighted regions and preliminary report

### 4. Report Finalization
Radiologist reviews, edits, and approves the final diagnostic report

### 5. Patient Communication
Structured findings communicated to referring physicians

---

##  Future Directions

### Phase 2 Enhancements

- **3D Tomosynthesis Integration**: Full volumetric analysis
- **Multi-center Validation**: Deployment across 5+ hospitals
- **Real-time Monitoring**: Live system performance tracking
- **Federated Learning**: Privacy-preserving multi-institutional training

### Research Extensions

- Integration with molecular subtype prediction
- Personalized risk assessment models
- Treatment response prediction
- Automated quality assurance for imaging protocols

---

## Publications and Presentations

This research has contributed to the advancement of AI in medical imaging:

1. **Uddin, M. M.** et al. "Multimodal Deep Learning for Breast Cancer Detection" - *Medical Image Analysis* (Under Review)
2. Conference presentation at **MICCAI 2024** - Computer-Aided Diagnosis Workshop
3. Collaboration with **ASCO** - AI in Oncology Symposium 2025

---

## Team and Collaboration

**Principal Investigator**: Dr. Mohammad Monir Uddin  
**Research Institution**: North South University  
**Industry Partner**: Big-Matrix Solutions  
**Clinical Partners**: United Hospital, Square Hospital

**Development Team**:
- 3 PhD Researchers (Computer Vision & Medical AI)
- 5 ML Engineers
- 2 Clinical Radiologists (Advisors)
- 1 Medical Physics Expert

---

## Impact Statement

> "This AI system has transformed our radiology department's workflow. The precision of segmentation and quality of automated reports have significantly reduced our diagnostic time while improving accuracy. It's like having an extra expert radiologist available 24/7."  
> — **Dr. Tahmina Rahman**, Chief Radiologist, United Hospital

---

## Project Details

**Funding**: North South University CTRG Grant  
**Project ID**: CTRG-21-SEPS-15  
**Duration**: 1 year (April 2022 - April 2023)  
**Location**: North South University, Dhaka, Bangladesh  
**Status**: Completed - Clinical Deployment Phase
