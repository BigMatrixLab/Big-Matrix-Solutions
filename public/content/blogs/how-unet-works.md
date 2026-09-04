---
id: "18"
slug: "how-unet-works-image-segmentation-explained"
title: "How U-Net Works: The Architecture That Refuses to Retire"
comments: "0"
image: "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&q=80&w=800"
category: "Tutorial"
desc: "Eleven years old, still the default for medical segmentation, and quietly running inside every diffusion model. A walkthrough of why the skip connections matter."
date: "Jun 26, 2026"
tags: ["U-Net", "Computer Vision", "Tutorial", "Medical Imaging"]
---

# How U-Net Works: The Architecture That Refuses to Retire

U-Net was published in 2015 for cell segmentation in microscopy images. Vision architectures have turned over several times since then — ResNets, vision transformers, ConvNeXt, Segment Anything — and U-Net is still the default choice for biomedical segmentation, still winning challenges, and still, in modified form, the backbone inside most image diffusion models.

Architectures that survive eleven years in this field are rare enough to be worth understanding properly. U-Net survived because it solved a specific tension cleanly, and that tension has not gone away.

## The problem: two things you cannot have at once

Segmentation means labelling every pixel. Not "this image contains a tumour" but "*these* pixels are tumour."

That requirement creates a conflict.

To know *what* a region is, you need context. A dark blob could be a tumour, a blood vessel, or an imaging artefact, and telling them apart requires looking at the surrounding anatomy. Context means a large receptive field, which in a convolutional network means downsampling — pooling and striding until each unit sees a wide area.

To know *where* the boundary is, you need resolution. A tumour margin is a few pixels wide. Downsampling destroys exactly that information.

So: semantics wants small feature maps, localisation wants large ones. Pick one.

Earlier approaches picked one and suffered. Fully convolutional networks downsampled for semantics and then upsampled the coarse prediction, producing correct-but-blurry masks with mushy boundaries. Patch-based classifiers preserved resolution by running a small window over every pixel, which was accurate and unusably slow, and still had no wide context.

U-Net's answer was to refuse the trade-off.

## The shape

The architecture is a U, and the two arms do different jobs.

**The contracting path (encoder)** is a normal convolutional stack. Repeated blocks of two 3×3 convolutions with a nonlinearity, then a 2×2 max pool that halves spatial dimensions while doubling channel count. Down the U: 572×572×64, then 284×284×128, then 140×140×256, and so on. Each level sees more context and less detail.

**The bottleneck** sits at the bottom, at the smallest spatial size and largest channel count. Every unit here has an enormous receptive field. This is where the network understands what it is looking at.

**The expanding path (decoder)** reverses the process. Each level upsamples — originally a transposed convolution, commonly bilinear upsampling plus a convolution now — halving channels while doubling spatial size, back up toward the input resolution.

So far this is an encoder-decoder, which existed already and produced blurry masks. The part that makes it U-Net is what connects the arms.

## The skip connections are the whole idea

At every level of the decoder, the feature map from the *corresponding encoder level* is concatenated onto the upsampled features before the convolutions run.

```python
# Encoder, saving features at each level
e1 = self.enc1(x)              # 64 channels,  full res
e2 = self.enc2(pool(e1))       # 128 channels, 1/2 res
e3 = self.enc3(pool(e2))       # 256 channels, 1/4 res
b  = self.bottleneck(pool(e3)) # 512 channels, 1/8 res

# Decoder, concatenating the saved features back in
d3 = self.dec3(cat([up(b),  e3], dim=1))   # 512+256 -> 256
d2 = self.dec2(cat([up(d3), e2], dim=1))   # 256+128 -> 128
d1 = self.dec1(cat([up(d2), e1], dim=1))   # 128+64  -> 64

out = self.final_conv(d1)      # -> n_classes per pixel
```

Note `cat`, not `+`. This is concatenation along the channel axis, not addition. The distinction matters: a residual connection adds a correction to a signal, while U-Net's skip *hands the decoder two separate sources of information* and lets the following convolutions learn how to combine them.

What each source carries is the key:

- **From below (upsampled)** — semantically rich, spatially coarse. "There is a tumour somewhere in this general region."
- **From the side (encoder skip)** — spatially precise, semantically shallow. "There are strong edges exactly here, here, and here."

The convolution after the concatenation learns to use the first to decide *which* edges matter and the second to place the boundary precisely. Semantics from the depth, localisation from the skip. The conflict dissolves because the network no longer has to carry both through the same bottleneck.

Remove the skips and you get a blurry autoencoder. That single design choice is the difference between an architecture that works and one that does not.

## Details that turn out to matter

Several apparently minor choices in the original paper carry real weight.

### 1. Symmetry

Encoder and decoder mirror each other exactly. This is not aesthetics — it guarantees that every decoder level has an encoder level at exactly matching spatial resolution to concatenate. Asymmetric variants exist, and they need explicit resizing logic at each junction, which adds interpolation error at precisely the place you were trying to preserve precision.

### 2. Channel doubling and halving

Going down, spatial resolution quarters (halved in each dimension) while channels double. Going up, the reverse. This keeps the total activation volume roughly manageable while shifting capacity from spatial extent to feature richness as you descend. It is the standard convolutional bargain, applied consistently.

### 3. Overlap-tile inference

The original paper handled arbitrarily large images by predicting in tiles, feeding each tile a larger input region than the output it produces, so every output pixel has full valid context. Medical volumes are frequently far too large for a single forward pass, and this remains the standard approach.

### 4. Weighted loss for boundaries

The original work needed to separate touching cells, so it used a per-pixel weight map that heavily upweighted the thin boundaries between adjacent objects. This is a broadly applicable trick: if the thing you care about occupies few pixels, an unweighted loss will happily ignore it while reporting excellent accuracy.

That leads to the most important practical topic in segmentation.

## Loss functions, because accuracy lies

Segmentation is usually severely class-imbalanced. A tumour might be 0.5 percent of the voxels in a scan. A model predicting "background" everywhere scores 99.5 percent pixel accuracy and is completely useless.

Standard options, and when each earns its place:

**Cross-entropy.** Per-pixel classification loss. Well behaved gradients, but dominated by the majority class under imbalance. Reasonable as a component, rarely good alone.

**Dice loss.** Directly optimises overlap between prediction and ground truth. Since the numerator and denominator both scale with region size, it is largely insensitive to how much background there is. This is why Dice became standard in medical imaging.

```python
def dice_loss(pred, target, eps=1e-6):
    pred = pred.sigmoid()
    num = 2 * (pred * target).sum() + eps
    den = pred.sum() + target.sum() + eps
    return 1 - num / den
```

**Combined Dice + cross-entropy.** The most common choice in practice. Dice supplies the imbalance robustness; cross-entropy supplies stable per-pixel gradients, particularly early in training when Dice gradients can be erratic on near-empty predictions.

**Focal loss.** Downweights easy examples so training concentrates on hard pixels. Useful when the easy majority is drowning out the signal.

**Boundary-aware losses.** Explicitly penalise errors near object edges — which is where clinical relevance usually concentrates, since a margin measurement depends entirely on boundary precision.

Report Dice or IoU. Not accuracy. Accuracy on a segmentation task is close to meaningless and it is still reported far too often.

## The variants worth knowing

Eleven years of extensions, most of which are minor. The ones that changed practice:

- **3D U-Net** — 3D convolutions throughout, for volumetric data like CT and MRI. Anatomy is three-dimensional, and slice-by-slice 2D segmentation throws away the through-plane context. The cost is memory, which is why 3D models use patch-based training almost universally.
- **nnU-Net** — arguably the most useful contribution since the original. Not a new architecture but a system that automatically configures preprocessing, patch size, batch size, and topology from a dataset's properties. It has won a remarkable number of challenges by demonstrating that a well-configured plain U-Net beats a poorly configured clever one. If you are starting a medical segmentation project, start here.
- **Attention U-Net** — attention gates on the skip connections, so the decoder can suppress irrelevant regions arriving from the encoder rather than taking everything.
- **TransUNet and hybrids** — transformer blocks in the encoder or bottleneck for long-range context, convolutional decoder for localisation. Strong results on large datasets; on small ones the pure convolutional version often still wins, because transformers are hungrier for data.
- **Residual and dense U-Nets** — modern block designs substituted into the U shape. Consistent, modest improvements.

## The second life: diffusion models

Here is the part people find surprising. The U-Net inside image diffusion models is essentially the same architecture, doing what looks like a completely different job.

It makes sense once you look at the task. A diffusion model's network takes a noisy image and predicts the noise that was added to it. That output has the same spatial dimensions as the input, and it needs both global structure — what is this image *of*, so the denoising is coherent — and fine local detail, since noise is a per-pixel quantity.

Global semantics plus pixel-precise output. Exactly the tension U-Net was built for.

The diffusion variant adds timestep conditioning so the network knows the noise level, self-attention at lower-resolution levels for global coherence, and cross-attention for text conditioning. The skeleton — encode down, decode up, concatenate skips across — is unchanged.

Latent diffusion models operate on a compressed latent representation instead of pixels, but the denoiser is still a U-Net. (Some recent systems have moved to pure transformer denoisers, which work well at large scale; the U-Net remains the workhorse at most scales.)

## Practical guidance

If you are building a segmentation model:

**Start with nnU-Net if it is medical data.** The automated configuration will likely beat your hand-tuned architecture, and it gives you a strong baseline to measure against. Custom work should have to prove it is better than this.

**Fix your loss before your architecture.** Dice plus cross-entropy, with class weighting if the imbalance is severe. This affects results more than swapping in a fancier encoder, and it costs an afternoon.

**Augment aggressively.** Medical datasets are small — dozens to hundreds of cases is normal. Rotation, flipping, elastic deformation, intensity shifts, and scanner-appropriate noise. The original U-Net leaned heavily on elastic deformation for exactly this reason, and it remains one of the highest-value augmentations for anatomical data.

**Normalise per-modality.** CT has physically meaningful Hounsfield units and should be windowed to the anatomy of interest. MRI intensities are not comparable across scanners or sequences and need per-volume normalisation. Getting this wrong quietly costs several points of Dice.

**Watch the boundary specifically.** Overall Dice can look fine while margins are systematically off by two millimetres — which for a surgical plan is the whole question. Evaluate boundary metrics like Hausdorff distance alongside overlap.

## Why it endured

U-Net lasted because it identified a real structural conflict and resolved it with a mechanism that is close to minimal. Two paths, one for semantics and one for localisation, joined at every scale so the decoder never has to choose.

Every subsequent architecture that does dense prediction well has ended up with some version of the same idea. Feature pyramid networks, DeepLab's decoder, the diffusion denoisers — all of them route high-resolution features around the bottleneck. U-Net just got there first and stated it most clearly.

Which is usually what it takes for an architecture to still be the default eleven years on.
