---
sidebar_position: 5
id: ruimtelijke-plannen-opvragen-api
title: Ruimtelijke Plannen Opvragen API
slug: /plan-keten/ruimtelijke-plannen-opvragen-api
---

# Ruimtelijke Plannen Opvragen API (v4)

Het doel van Informatiehuis Ruimte is om de bestaande ruimtelijke plannen die te vinden zijn op Ruimtelijkeplannen.nl via een API beschikbaar te maken voor het Digitaal Stelsel Omgevingswet. Aanlevering verloopt via Ruimtelijkeplannen.nl; voor bronhouders verandert er niets aan de bestaande manier van aanlevering en beheer van plannen.

:::caution
**Status:** Versie 4 is beschikbaar in de productieomgeving. Let op: een klein deel van de ruimtelijke plannen is (vanwege technische redenen) niet beschikbaar — zie de actuele lijst (verwijzing staat op het register). Per 1-1-2024: plannen zonder overgangsrecht zijn gemarkeerd met `eindeRechtsgeldigheid: 01-01-2024` en TAM-plannen met `isTamPlan: true`.
:::

## Omgevingen & basis-URL

- **Productie (V4):** `https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/`

## Authenticatie

- **API-key vereist**, te gebruiken als header `x-api-key`.  
  API-key aanvragen kan via [deze pagina](https://developer.omgevingswet.overheid.nl/formulieren/api-key-aanvragen-0/).

## Quick Start

### 1️⃣ Globale zoekfunctie

**Endpoint:** `/_zoek` — geografisch zoeken op alle objecten met een geometrie (teksten vallen hierbuiten).  
**Body/parameters:** exact volgens de functionele documentatie (GeoJSON voor geometrie).

~~~ts title="Voorbeeld:" hideLineNumbers
curl --request POST \
  --header 'x-api-key: <key-hier>' \
  --header 'content-type: application/json' \
  --data '<GEOMETRIE_OF_ANDERE_PARAMS_VOLGENS_SPEC>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/_zoek'
~~~

### 2️⃣ Plannen zoeken of lijst ophalen

**Endpoint:** `/plannen` — meerdere plannen opvragen.  
**Endpoint:** `/plannen/_zoek` — zoeken binnen plannen.

~~~ts title="Voorbeeld lijst:" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/plannen'
~~~

~~~ts title="Voorbeeld zoeken binnen plannen:" hideLineNumbers
curl --request POST \
  --header 'x-api-key: <key-hier>' \
  --header 'content-type: application/json' \
  --data '<ZOEKCRITERIA_VOLGENS_SPEC>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/plannen/_zoek'
~~~

### 3️⃣ Plan-details op `planId`

**Endpoint:** `/plannen/{planId}` — detail van één plan.

~~~ts title="Voorbeeld:" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/plannen/<PLAN_ID>'
~~~

### 4️⃣ Planteksten & artikelen bij plan

**Endpoint:** `/plannen/{planId}/teksten` — planteksten (XHTML).  
**Endpoint:** `/plannen/{planId}/teksten/{id}` — één tekst.  
**Endpoint:** `/plannen/{planId}/artikelen/_zoek` — artikelen zoeken binnen een geometrie.

~~~ts title="Voorbeeld teksten:" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/plannen/<PLAN_ID>/teksten'
~~~

~~~ts title="Voorbeeld artikel-zoek:" hideLineNumbers
curl --request POST \
  --header 'x-api-key: <key-hier>' \
  --header 'content-type: application/json' \
  --data '<GEOMETRIE_OF_ANDERE_PARAMS_VOLGENS_SPEC>' \
  'https://ruimte.omgevingswet.overheid.nl/ruimtelijke-plannen/api/opvragen/v4/plannen/<PLAN_ID>/artikelen/_zoek'
~~~

> **Andere ingangen (zelfde patroon onder `/plannen/{planId}/…`):**  
> `bestemmingsvlakken`, `bouwvlakken`, `functieaanduidingen`, `bouwaanduidingen`, `lettertekenaanduidingen`, `maatvoeringen`, `figuren`, `gebiedsaanduidingen`, `structuurvisiegebieden`, `structuurvisiecomplexen`, `structuurvisieverklaringen`, `besluitvlakken`, `besluitsubvlakken`, `besluitdocument`.  
> Raadpleeg de functionele documentatie voor exacte parameters en filters.

## Metadata

- **Formaat:** JSON; geometrieën als **GeoJSON**; planteksten in **XHTML**.  
- **OpenAPI (YAML):** *link vanuit register*  
- **OpenAPI (ReDoc):** *link vanuit register*  
- **Functionele documentatie (PDF):** *Versie 1.0 — Functionele documentatie Ruimtelijke plannen API v4*  
- **Health/Info:** *indien van toepassing, zie specificatie*

## Informatiemodellen & standaarden

- **IMRO2012**, **SVBP2012**, **IMROPT2012**, **IMRO2008**, **PRPCP2008**, **IMRO2006**, **STRI2006** (verwijzingen zoals op het register).  
- **Formaatstandaarden:** OpenAPI, JSON, JSON Schema, GeoJSON, XHTML.  
- **API- en URI-strategie:** DSO-kaders (volgens registerverwijzing).

## Links

- **API-registerpagina:** https://developer.omgevingswet.overheid.nl/api-register/api/rp-opvragen/  
- **API-key aanvragen:** https://developer.omgevingswet.overheid.nl/formulieren/api-key-aanvragen-0/
