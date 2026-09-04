---
id: "43"
slug: "weathernext-3-learns-from-observations-not-forecasts"
title: "WeatherNext 3 Stopped Learning From Forecasts and Started Learning From the Sky"
comments: "0"
image: "/assets/images/blog/weathernext-3.webp"
category: "AI Research"
desc: "Google DeepMind's new weather model trains on live satellite mosaics and raw station readings instead of numerical forecast output. That one change removes a six-hour lag."
date: "Sep 03, 2026"
tags: ["WeatherNext", "Google DeepMind", "Weather Forecasting", "Model Release"]
---

# WeatherNext 3 Stopped Learning From Forecasts and Started Learning From the Sky

Google DeepMind and Google Research announced **WeatherNext 3 on September 3, 2026**, and independent evaluation by Brightband calls it the most advanced and accurate global weather model to date.

The headline numbers are strong. But the interesting part of this release is a training decision rather than a benchmark, and it is the kind of change that has consequences well beyond weather.

## The lag that was baked into every previous model

Machine-learning weather models have a dependency problem that is easy to miss.

The previous generation — including WeatherNext 2 — trained on **numerical weather prediction output**. That is, they learned to imitate the products of traditional physics-based simulation: reanalysis grids, assimilated fields, model output that had already been processed.

This worked well and it inherited a structural limitation. NWP analysis products are not instantaneous. They are assembled from observations through a data assimilation cycle, and that cycle carries roughly a **six-hour lag**. A model trained to consume them can only ever be as current as its input, which means the freshest thing it can reason about is already six hours old.

For a five-day outlook that hardly matters. For a thunderstorm forming over your city in the next ninety minutes, six hours is the whole event.

WeatherNext 3 changes what the model eats.

## Learning from observations directly

The new model is a **Functional Generative Network (FGN) mesh transformer**, and it takes three kinds of input:

- **Live hourly geostationary satellite mosaics** — actual current observations of cloud and moisture structure
- **Historical analysis data** — the traditional gridded fields, still useful for large-scale state
- **Sparse weather station observations, trained on directly** — raw point measurements, not interpolated onto a grid first

That third item is the subtle one. Station data is irregular: thousands of points scattered unevenly across the globe, dense in Europe and North America, sparse across oceans and much of the global south. The conventional move is to interpolate those points into a regular grid and train on the grid. WeatherNext 3 trains against the points themselves.

The team's framing is direct: *"Our model learns directly from real-time observations, enabling it to provide timely and more localized predictions for the weather events that impact people the most."*

![WeatherNext 3 architecture: geostationary satellite mosaic and analysis fields feed the model, which emits dense gridded fields plus sparse station and cyclone outputs](/assets/images/blog/weathernext-3-architecture.webp)

The architecture diagram shows the shape of it, and there is a detail worth pulling out. The outputs are not one product. They split into **dense gridded fields** — predicted analysis at 0.25°, predicted analysis at 0.1°, precipitation at 0.1° — and **sparse targets** served by dedicated output heads: a **station head** and a **cyclone head**.

That multi-head design is why the model can be simultaneously good at a smooth global field and at a point forecast for a specific airport. Those are different prediction problems with different error structures, and giving each its own head means neither has to be compromised to serve the other.

## What it delivers

| Property | WeatherNext 3 | WeatherNext 2 |
|---|---|---|
| Update cadence | Hourly | 6-hour increments |
| Surface temperature & moisture | 5 km | — |
| Other surface variables | 10 km | — |
| Atmospheric variables (e.g. wind) | 25 km | — |
| Effective sharpness | ~5x WeatherNext 2 | baseline |

Note that the resolution figure varies by variable. The headline **5 km applies to temperature and moisture**; other surface fields sit at 10 km and atmospheric variables at 25 km. That is a sensible allocation — near-surface temperature is where local detail matters most and where dense station data exists to supervise it — but "5 km model" is a simplification of a three-tier reality.

The hourly cadence is arguably the bigger operational change. Going from a forecast that refreshes four times a day to one that refreshes twenty-four times a day changes what you can build on top of it.

## The precipitation result, and how to read it

Precipitation is the hardest common variable to forecast and the one this release leans on hardest. The reported improvements in CRPS — a proper scoring rule for probabilistic forecasts, where lower is better:

| Reference dataset | CRPS improvement |
|---|---|
| NASA IMERG (satellite) | 60% |
| MRMS (radar) | 30% |
| Rain gauges (direct) | 10% at early lead times |

Plus up to **50% more accurate precipitation forecasts** for planning horizons of a day or more.

All three of those numbers are real, and the ordering deserves a moment's thought. The improvement is largest against satellite-derived precipitation, smaller against radar, and smallest against rain gauges — which are the closest thing to direct ground truth.

There is a defensible reason for that pattern rather than anything suspicious. IMERG is itself a coarse, indirect satellite retrieval with substantial error of its own, so a sharper model can diverge from it dramatically while being closer to reality. Radar is better resolved. Gauges measure actual water in an actual bucket, and they are also point measurements being compared against a gridded forecast, which introduces its own mismatch.

Still, if you are choosing which figure to plan around, **the 10% against gauges is the most conservative and most defensible** of the three. That is not a criticism of the model; it is how to read the scorecard honestly.

![Three-panel comparison: WeatherNext 2 prediction, WeatherNext 3 prediction, and MRMS observed precipitation at 24-hour lead](/assets/images/blog/weathernext-3-precipitation.webp)

The visual comparison is more persuasive than any single statistic. Both models were initialised at 06:00 UTC on 28 January 2026 and asked for a 24-hour forecast, checked against observed MRMS precipitation. WeatherNext 2 produces a broad blue smear across the Pacific Northwest. WeatherNext 3 resolves a distinct narrow band of heavy precipitation running along the coast and inland — the signature of an atmospheric river — and the observation shows that band was really there.

For anyone who has looked at ML forecast output before, that is the familiar failure mode being fixed. Models trained to minimise gridded error learn to hedge, and hedging looks like blur. A blurred forecast can score respectably while being useless for the question people actually ask, which is *how hard will it rain here*.

## Where it shows up in practice

Two application areas got specific attention, and both are energy.

**Wind.** The model predicts wind speed at **100 metres** — turbine hub height, rather than the 10-metre standard that meteorology conventionally reports. Anyone forecasting turbine output has been extrapolating from 10 m with a wind-shear assumption; a model that predicts the height you actually care about removes a whole error term.

**Solar.** High-resolution cloud cover and radiation prediction, which is the entire problem in solar forecasting. Output is a function of irradiance, irradiance is a function of cloud, and cloud is the fastest-moving field in the atmosphere.

Both matter for the same reason: grid operators must balance supply and demand continuously, and renewable generation is weather. Better short-horizon forecasts translate fairly directly into less spinning reserve and fewer curtailment events.

The topography point is also worth noting. Because the model resolves terrain at higher resolution, the gains are largest in places where terrain drives local weather and where conventional forecast infrastructure is thinnest — the announcement specifically cites **Latin America, Africa and the Asia-Pacific**. Regions with sparse radar coverage have historically been served worst by weather modelling, and a model that leans on satellite and station data rather than dense radar networks is structurally better suited to them.

## How to get at it

WeatherNext 3 is unusually widely distributed for a research model release:

- **Consumer surfaces** — Google Search, the Gemini app, Google Maps
- **Google Maps Platform Weather API** — for application developers
- **Google Earth Engine** — for geospatial analysis
- **BigQuery** — for SQL-based work against forecast data
- **Google Cloud Storage** — bulk download for research and modelling
- **Developer API** — at `developers.google.com/weathernext`

The BigQuery and Earth Engine routes are the interesting ones for anyone doing analysis rather than building an app. Being able to join forecast data against your own tables in SQL removes most of the pipeline work that weather data normally demands.

## What I would want to see next

Three gaps, stated plainly.

**Cyclone numbers.** The architecture includes a dedicated cyclone head, and the announcement points to a companion piece on AI cyclone prediction without publishing track or intensity error figures. Cyclone forecasting is where weather modelling has the highest human stakes, and it is the claim most in need of hard numbers against the operational baselines that agencies actually use.

**Verification against operational forecasts.** The comparisons here are against WeatherNext 2 and against observational datasets. The question practitioners will ask is how it scores against the current operational products from ECMWF and NOAA on their own verification metrics, at matched lead times. Brightband's independent evaluation is a good sign; the detail is what matters.

**Behaviour on genuinely extreme events.** A model that learns from observations should in principle handle unusual events better, since it is not filtered through a simulation's assumptions. But rare events are rare in training data by definition, and generative models have a known tendency to regress toward the plausible. The interesting test is not the average case, it is the once-a-decade case.

## Why this release is worth attention beyond meteorology

Strip out the domain and the lesson generalises.

For years the practical path to an ML model in a scientific field was to imitate the existing simulator: train on its output, learn its mapping faster, ship something cheaper. That works, and it inherits a ceiling — you cannot be fresher, more detailed, or more correct than the thing you are imitating.

WeatherNext 3 goes around it by training on the observations the simulator was itself built to explain. The six-hour lag disappears not because the model is faster but because it never needed the intermediate product. Sparse station data becomes usable because the model was designed to predict points rather than being forced onto a grid.

That is a template. Any field with a mature physics-based simulator, a backlog of raw instrument data, and a habit of training ML models on simulator output has the same opportunity sitting there — and probably the same six-hour-equivalent lag it has stopped noticing.

**Source**: [Google — Introducing WeatherNext 3](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/). Figures and title art are Google's, reproduced from the announcement. This write-up is our own summary and analysis, not a reproduction of Google's text.
