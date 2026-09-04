---
id: "43"
slug: "weathernext-3-learns-from-observations-not-forecasts"
title: "WeatherNext 3 Stopped Learning From Forecasts and Started Learning From the Sky"
comments: "0"
image: "/assets/images/blog/weathernext-3.webp"
category: "AI Research"
desc: "Google DeepMind's model trains on live satellite mosaics and raw station readings instead of forecast output. That one change removes a six-hour lag."
date: "Sep 03, 2026"
tags: ["WeatherNext", "Google DeepMind", "Weather Forecasting", "Model Release"]
---


# WeatherNext 3 Stopped Learning From Forecasts and Started Learning From the Sky

Google DeepMind and Google Research announced **WeatherNext 3** on 3 September 2026. Brightband's independent evaluation calls it the most advanced and accurate global weather model built so far.

The benchmark numbers are good. They're not what makes this release interesting. The interesting part is a training decision, and its implications run well past meteorology.

## The lag nobody talks about

Machine-learning weather models carry a dependency that's easy to overlook.

Everything up to and including WeatherNext 2 trained on **numerical weather prediction output**. These models learned to imitate the products of physics-based simulation: reanalysis grids, assimilated fields, output that had already been through a pipeline before anyone fed it to a network.

That approach works. It also inherits a hard limit. NWP analysis products aren't instantaneous; they're assembled from observations through a data assimilation cycle, and that cycle takes roughly **six hours**. Train a model to eat those products and the freshest thing it can reason about is already six hours stale.

Fine for a five-day outlook. For a thunderstorm building over your city in the next ninety minutes, six hours is the entire event.

So Google changed what the model eats.

## Learning from observations directly

WeatherNext 3 is a **Functional Generative Network (FGN) mesh transformer**, and it takes three inputs: live hourly geostationary satellite mosaics, historical analysis data, and sparse weather station observations trained on *directly*.

That third input is the subtle one. Station data is irregular by nature. Thousands of points scattered unevenly across the planet, dense across Europe and North America, thin over oceans and much of the global south. The conventional move is to interpolate those points onto a regular grid and train on the grid, because grids are what networks like. WeatherNext 3 trains against the points themselves.

Google's own framing: *"Our model learns directly from real-time observations, enabling it to provide timely and more localized predictions for the weather events that impact people the most."*

![WeatherNext 3 architecture: geostationary satellite mosaic and analysis fields feed the model, which emits dense gridded fields plus sparse station and cyclone outputs](/assets/images/blog/weathernext-3-architecture.webp)

There's a detail in the architecture diagram that the announcement text skips over. The outputs aren't one product. They split into **dense gridded fields** (predicted analysis at 0.25°, predicted analysis at 0.1°, precipitation at 0.1°) and **sparse targets** served by dedicated heads: a station head and a cyclone head.

That multi-head design is why one model can be good at a smooth global field *and* at a point forecast for a specific airport. Those are different prediction problems with different error structures. Give each its own head and neither gets compromised to serve the other.

## What it delivers

| Property | WeatherNext 3 | WeatherNext 2 |
|---|---|---|
| Update cadence | Hourly | 6-hour increments |
| Surface temperature & moisture | 5 km | — |
| Other surface variables | 10 km | — |
| Atmospheric variables (e.g. wind) | 25 km | — |
| Effective sharpness | ~5x WeatherNext 2 | baseline |

Read the resolution row carefully, because the headline is doing some work. **5 km applies to temperature and moisture only.** Other surface fields sit at 10 km, atmospheric variables at 25 km. The allocation makes sense: near-surface temperature is where local detail matters most, and it's where dense station data exists to supervise it. But "5 km model" flattens a three-tier reality into one number.

The cadence change is arguably bigger anyway. A forecast that refreshes twenty-four times a day rather than four changes what you can build on top of it.

## The precipitation result, and how to read it

Precipitation is the hardest common variable to forecast and the one this release leans on hardest. Reported CRPS improvements, where lower is better:

| Reference dataset | CRPS improvement |
|---|---|
| NASA IMERG (satellite) | 60% |
| MRMS (radar) | 30% |
| Rain gauges (direct) | 10% at early lead times |

Plus up to **50% more accurate precipitation forecasts** at planning horizons of a day or more.

Every one of those numbers is real. The ordering deserves a second look, though. The improvement is largest against satellite-derived precipitation, smaller against radar, smallest against rain gauges. Gauges being the closest thing to ground truth we have.

There's a defensible reason for that pattern, and it isn't sleight of hand. IMERG is itself a coarse, indirect satellite retrieval carrying substantial error of its own, so a sharper model can diverge from it dramatically while sitting closer to reality. Radar resolves better. Gauges measure actual water in an actual bucket, and they're point measurements being scored against a gridded forecast, which introduces a mismatch all its own.

Still, if you're picking one figure to plan around, take the **10% against gauges**. It's the most conservative and the most defensible of the three. Not a knock on the model, just how to read a scorecard honestly.

![Three-panel comparison: WeatherNext 2 prediction, WeatherNext 3 prediction, and MRMS observed precipitation at 24-hour lead](/assets/images/blog/weathernext-3-precipitation.webp)

The picture is more convincing than any statistic here. Both models initialised at 06:00 UTC on 28 January 2026, both asked for a 24-hour forecast, both checked against observed MRMS precipitation. WeatherNext 2 produces a broad blue smear over the Pacific Northwest. WeatherNext 3 resolves a narrow band of heavy rain running down the coast and inland, the signature of an atmospheric river. The observation panel shows the band was really there.

Anyone who has stared at ML forecast output will recognise what got fixed. Models trained to minimise gridded error learn to hedge, and hedging looks like blur. A blurred forecast scores respectably and answers nobody's actual question, which is *how hard will it rain here*.

## Where it shows up in practice

Two application areas got named attention and both are energy.

For wind, the model predicts speed at **100 metres**: turbine hub height, not the 10-metre standard meteorology conventionally reports. Anyone forecasting turbine output has been extrapolating from 10 m with a wind-shear assumption bolted on. Predicting the height you actually care about deletes a whole error term.

For solar, it's high-resolution cloud cover and radiation. That's the entire problem in solar forecasting. Output follows irradiance, irradiance follows cloud, and cloud is the fastest-moving field in the atmosphere.

Both matter for one reason. Grid operators balance supply against demand continuously, renewable generation *is* weather, and better short-horizon forecasts convert fairly directly into less spinning reserve and fewer curtailment events.

The topography gains deserve a mention too. Because the model resolves terrain at higher resolution, the biggest wins land where terrain drives local weather and conventional forecast infrastructure is thinnest. Google specifically cites **Latin America, Africa and the Asia-Pacific**. Regions with sparse radar coverage have always been served worst by weather modelling, and a model leaning on satellite and station data rather than dense radar is structurally better suited to them.

## How to get at it

Distribution is unusually wide for a research model. Consumer surfaces first: Google Search, the Gemini app, Google Maps. Then the Google Maps Platform Weather API for application developers, Earth Engine for geospatial work, BigQuery for SQL against forecast data, Cloud Storage for bulk download, and a developer API at `developers.google.com/weathernext`.

BigQuery and Earth Engine are the ones I'd look at if you're doing analysis rather than shipping an app. Joining forecast data against your own tables in SQL removes most of the pipeline work weather data usually demands.

## Three things I want to see next

**Cyclone numbers.** The architecture has a dedicated cyclone head. The announcement points at a companion piece on AI cyclone prediction and publishes no track or intensity error figures. Cyclone forecasting carries the highest human stakes in this field, so it's the claim most in need of hard numbers against the operational baselines agencies actually run.

**Verification against operational forecasts.** Every comparison here is against WeatherNext 2 or against observational datasets. Practitioners will want to know how it scores against current ECMWF and NOAA products on their own verification metrics at matched lead times. Brightband's independent evaluation is a good sign. The detail is what counts.

**Behaviour on genuinely extreme events.** A model learning from observations should in principle handle unusual events better, since it isn't filtered through a simulation's assumptions. But rare events are rare in training data by definition, and generative models have a known pull toward the plausible. The test that matters isn't the average case. It's the once-a-decade case.

## The part that generalises

Strip the weather out and there's a lesson here for any scientific field.

For years the practical route to an ML model in a technical domain was to imitate the existing simulator. Train on its output, learn the mapping faster, ship something cheaper. That works, and it comes with a ceiling: you can't be fresher, sharper, or more correct than the thing you're copying.

WeatherNext 3 walks around the ceiling by training on the observations the simulator was built to explain in the first place. The six-hour lag doesn't vanish because the model got faster. It vanishes because the model never needed the intermediate product. Sparse station data became usable because someone designed for points instead of forcing them onto a grid.

Any field with a mature physics-based simulator, a backlog of raw instrument data, and a habit of training on simulator output has the same opening sitting in front of it. Probably along with its own six-hour-equivalent lag that everyone stopped noticing years ago.

Figures and title art are Google's, reproduced from the WeatherNext 3 announcement.
