# DicomViewer — Product Case Study

> Source material for the `/project/dicomviewer` showcase page (`src/pages/projects/ProjectDicomViewer.jsx`).

## Overview

DicomViewer is a desktop application for opening, reading and sharing medical images on Windows. It loads CT, MR, PET, ultrasound, X-ray and fluoroscopy studies from folders, CDs and DVDs, a local archive or a PACS server. Radiologists, referring clinicians and researchers can scroll stacks, adjust windowing, measure, build 3D reconstructions and export images without installing a server or a runtime.

The application ships as a single native executable of about 9 MB, written in C++ with no Qt, VTK, DCMTK or Python dependency. DICOM parsing, image decoding, DICOM networking and 3D rendering are implemented in our own code. The layout, toolbar and keyboard shortcuts follow the conventions of widely used desktop viewers, so experienced readers can work without retraining.

## At a glance

| | |
|---|---|
| **Product** | DicomViewer |
| **Category** | Medical imaging viewer |
| **Users** | Radiologists, referring clinicians, researchers, clinic IT staff |
| **Platform** | Windows desktop, single executable |
| **Stack** | C++17 · Dear ImGui · GLFW · OpenGL · OpenJPEG · SQLite · Media Foundation |
| **Formats** | DICOM (raw, RLE, JPEG lossless and baseline, JPEG 2000), DICOMDIR, NIfTI, TIFF |
| **Status** | In development (version 0.1.0), not for diagnostic use |

## The problem

Clinics and patients regularly receive imaging studies on CDs, USB drives or from a remote PACS, and the people who need to look at them are often not at a radiology workstation. Full workstation software is expensive and heavy to deploy. Free viewers tend to be slow on large series, limited to 2D, or dependent on large frameworks that complicate installation on locked-down hospital PCs.

- **Heavy installs.** Many viewers pull in large runtimes and toolkits, which hospital IT has to approve and maintain.
- **Slow on large studies.** Thin-slice CT and long fluoroscopy runs contain hundreds or thousands of images that must stay responsive while scrolling.
- **2D only.** Reformatting, 3D rendering, PET-CT fusion and angiography subtraction are usually reserved for paid workstations.
- **Disconnected from PACS.** Retrieving a prior study often means a separate tool or a request to IT.

## What we built

We built a self-contained viewer around a fast 2D core. A background scanner reads DICOM headers from a folder, disc or DICOMDIR and groups them into studies and series while the first images are already on screen. Images are decoded on several CPU cores into a shared pixel cache, and the viewer reads ahead along the series so scrolling does not wait for the disk. The same cache feeds the 2D panels, the 3D volume builder and exports.

Around that core sit the reading tools: a split-screen layout of up to 5 × 5 panels with synchronised scrolling, zoom and windowing, a set of measurement and ROI tools, a 3D MPR window, a volume rendering window, PET-CT fusion and digital subtraction angiography. A local SQLite archive stores imported studies, and a built-in DICOM network stack talks to PACS servers for search, retrieve and receive. The interface enables only the commands that apply to what is on screen, so a user who has not loaded data yet sees only the ways to open it.

## Key features

### Reading and navigation

- **Fast series browsing.** Multi-core decoding with read-ahead keeps large CT and MR stacks responsive; the series bar shows load progress per series.
- **Split screen and sync.** Grid layouts from 1 × 1 to 5 × 5, with slice, zoom-and-pan and window synchronisation and cross-reference lines between panels.
- **Window and display.** Mouse windowing, CT presets, full-dynamic and custom windows, negative, sharpening filters, rotation and flipping.
- **Cine.** Playback of multi-frame and dynamic series with adjustable speed.

### Measurement and analysis

- **Measurement tools.** Length, ellipse, rectangle, polygon and freehand ROIs with area and pixel statistics, polyline, angle, Cobb angle, deviation, arrows and a 3D cursor.
- **Calculations.** Length ratio and ellipsoid or bullet volume from drawn lengths.
- **Time-intensity curves.** Mean ROI value plotted across the images of a dynamic series, with values copyable as CSV.
- **Measurement editing.** Copy, paste and duplicate measurements across panels or across a whole series.

### 3D reconstruction

- **3D MPR.** Three linked planes with oblique rotation and MIP, MinIP and average slabs of adjustable thickness.
- **Volume rendering.** GPU ray casting with nine presets, including angiography, bone and MIP views, plus lasso sculpting with undo and 3D snapshots.
- **Surface models.** Iso-surface rendering with STL export for 3D printing, and rotating movies exported to MP4.

### Fusion and subtraction

- **PET-CT fusion.** A second series is resampled through patient coordinates and overlaid in colour, with a selectable colour scale and adjustable opacity.
- **Digital subtraction angiography.** The mask frame is subtracted from every fluoroscopy image to leave contrast-filled vessels, with manual and automatic pixel-shift, a split mask for left and right halves, and a local "magic mask" correction computed in the background.

### Archive, network and export

- **Local archive.** Import from folders, CDs and DVDs into a searchable SQLite database with thumbnails.
- **PACS access.** C-ECHO, C-FIND, C-MOVE and C-GET to configured PACS nodes, a storage receiver for incoming studies, and DICOMweb nodes over HTTPS.
- **Export and print.** JPEG, PNG, BMP and DICOM images, WMV and MP4 movies, clipboard copy and printing of one or all panels.
- **Anonymisation.** Template-based removal or replacement of patient tags before files leave the site.

## How it works

1. **Open the data.** The user opens a folder, files, a CD or DVD, a study from the local archive, or a PACS search result. The scanner groups images into studies and series and shows thumbnails in the series bar.
2. **Read in 2D.** The user drags series into panels, scrolls with the wheel, adjusts the window with the mouse and arranges a split-screen layout. Synchronised panels follow each other.
3. **Measure and annotate.** Measurement tools draw on the image; ROI labels show area and pixel statistics and update as the user moves them.
4. **Reconstruct.** For a series of three or more slices, the user opens 3D MPR or volume rendering. The volume is built in the background, with a coarse preview first for large series.
5. **Apply advanced views.** Fusion overlays a PET series on CT in another panel. Subtraction turns a fluoroscopy run into a DSA sequence, and the mask can be shifted until bone edges disappear.
6. **Share the result.** The user exports images, movies or DICOM files, anonymises them if needed, prints, or copies to the clipboard.

## Technology

| Layer | Choice | Why |
|---|---|---|
| Interface | Dear ImGui (docking) on GLFW and OpenGL | Immediate-mode UI keeps the executable small and redraws quickly during interaction |
| Imaging | In-house DICOM parser and codecs, OpenJPEG 2.5, zlib | Full control over decoding speed and no large imaging toolkit to ship |
| 3D | Custom MPR reslicing, GPU volume ray casting, marching cubes | Reconstructions run on the user's graphics card with a CPU fallback |
| Data | SQLite 3.46 | A single-file local archive that needs no database server |
| Networking | In-house DIMSE over Winsock, DICOMweb over WinHTTP | Direct PACS connectivity using only components built into Windows |
| Video | Windows Media Foundation | MP4 and WMV export without bundling a video library |
| Build | CMake, MSVC, Release single-file executable | One file to copy or deploy on managed hospital PCs |

The main architectural decision is a single shared pixel cache. Decoded frames, already converted to modality values, serve the 2D panels, the read-ahead planner, the 3D volume builder, fusion, subtraction and exports, so each image is decoded once regardless of how many views use it. Window and level are applied as the last step, which lets subtracted and fused images reuse the same windowing, ROI statistics and export path as ordinary images.

## Our role

- Product design and user interface
- DICOM decoding, networking and 3D rendering engine
- Desktop application development and release builds

## What's next

- Sending studies to PACS from the viewer (planned)
- PDF report export (planned)
- Undo and redo for annotations (planned)
