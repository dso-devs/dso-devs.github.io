---
sidebar_position: 7
id: omgevingsdocumenten-geometrie-opvragen-api
title: Omgevingsdocumenten Geometrie Opvragen API
slug: /plan-keten/omgevingsdocumenten-geometrie-opvragen-api
---

# Omgevingsdocumenten Geometrie opvragen API (v1)

Met deze API kun je alle in het DSO bekende **geometrieën** opvragen. Op basis van een **geometrieIdentificatie** levert de API een **GeoJSON**-response met de coördinaten die de geometrie beschrijven.

:::note
De API ontsluit geometrieën uit zowel **pre-productie** als **productie** en gebruikt dezelfde **API-key** als de andere Omgevingsdocumenten-API’s.
:::

## Omgevingen & basis-URLs

- **Productie:** `https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/`
- **Pre-productie:** `https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/`

## Authenticatie

- **API-key vereist**, meegeven als header `x-api-key`.  
  API-key aanvragen: [ontwikkelaarsportaal](https://developer.omgevingswet.overheid.nl/formulieren/api-key-aanvragen-0/).

## Belangrijk over CRS

Ondersteunde CRS’s (coördinatenreferentiesystemen):

- **RD** (EPSG:28992)
- **ETRS89** (EPSG:4258)
- **ETRF2000** (EPSG:9067)

:::caution
Geef **altijd** de queryparameter `crs` mee. Zonder `crs` wordt volgens de Nederlandse API-strategie CRS84 verondersteld, maar **CRS84 wordt door deze API niet ondersteund**. Requests zonder `crs` resulteren in **HTTP 422**.
:::

## Quick Start

### 1️⃣ Eén geometrie opvragen (GeoJSON)

**Endpoint:** `/geometrieen/{geometrieIdentificatie}`  
**Query:** `crs` (verplicht)  
**Headers:** `x-api-key`

~~~ts title="Voorbeeld (GET)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/geometrieen/622a6d8d-99a7-40fe-8428-8b8625ae4378?crs=http%3A%2F%2Fwww.opengis.net%2Fdef%2Fcrs%2FEPSG%2F0%2F28992'
~~~

_Resultaat:_ GeoJSON met het geometrietype (bijvoorbeeld `MultiPolygon`) en de coördinaten. Eventuele “trailing zeros” die bronhouders hebben aangeleverd, worden niet uitgeleverd.

### 2️⃣ Ondersteunde CRS’s opvragen

**Endpoint:** `/crss`  
Geeft de lijst met ondersteunde CRS’s terug.

~~~ts title="Voorbeeld (GET)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/crss'
~~~

### 3️⃣ Health en info

**Endpoints:** `/app-health` en `/app-info` — status, versie en beschrijving van de API.

~~~ts title="Voorbeeld (health)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/app-health'
~~~

~~~ts title="Voorbeeld (info)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/app-info'
~~~

### 4️⃣ OpenAPI specificatie ophalen

**Endpoints:** `/openapi.json` en `/openapi.yaml`

~~~ts title="Voorbeeld (OpenAPI JSON)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/openapi.json'
~~~

~~~ts title="Voorbeeld (OpenAPI YAML)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <API_KEY>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/geometrieopvragen/v1/openapi.yaml'
~~~

## Waar komt de geometrieIdentificatie vandaan?

In de praktijk vind je geometrie-IDs via de **Omgevingsdocumenten Presenteren API**:

- **v7:** zoek locaties met document-ID en laat geometrie-IDs meesturen via `_expandScope=omvat.geometrieIdentificaties`.  
  Endpoint: `.../presenteren/v7/locaties/_zoek`

~~~ts title="Voorbeeld (v7, POST)" hideLineNumbers
curl --request POST \
  --header 'x-api-key: <API_KEY>' \
  --header 'content-type: application/json' \
  --data '{
    "zoekParameters": [
      { "parameter": "document.identificatie",
        "zoekWaarden": ["/akn/nl/act/pv30/2023/omgevingsverordeningpl"] }
    ]
  }' \
  'https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v7/locaties/_zoek?toonAlleenWerkingsgebieden=false&_expand=true&_expandScope=omvat.geometrieIdentificaties'
~~~

- **v8:** haal regeltekst-annotaties van een document op; de response bevat locaties met bijbehorende geometrie-IDs.  
  Endpoint: `.../presenteren/v8/regelingen/{uriIdentificatie}/regeltekstannotaties`

*(Gebruik de Presenteren-API documentatie voor exacte parameters en filters.)*

## Links & documentatie

- **API-registerpagina:** https://developer.omgevingswet.overheid.nl/api-register/api/omgevingsdocumenten-geometrie-opvragen/  
- **Functionele documentatie (PDF):** “Functionele documentatie Geometrie opvragen v1 API” (20 december 2024)  
- **Standaarden:** OpenAPI-standaard; API- en URI-strategie (DSO); “Geospatial module” van de Nederlandse API-strategie

