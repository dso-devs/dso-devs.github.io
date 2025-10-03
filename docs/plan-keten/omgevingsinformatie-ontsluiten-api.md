---
sidebar_position: 4
id: omgevingsinformatie-ontsluiten-api
title: Omgevingsinformatie Ontsluiten API (v2)
slug: /plan-keten/omgevingsinformatie-ontsluiten-api
---

# Omgevingsinformatie Ontsluiten API (v2)

De Omgevingsinformatie ontsluiten-API ontsluit omgevingsinformatie uit meerdere bronnen in samenhang.

:::caution
**Let op** deze API is nog in ontwikkeling en moet beschouwd worden als **bèta**.
:::

## Omgevingen & basis-URLs

- **Productieomgeving:** `https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2`
- **Pre-productieomgeving:** `https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2`

## Authenticatie

- **API-key voor het DSO**, te gebruiken als header `x-api-key`.  
  Aanvragen kan via [deze link](https://developer.omgevingswet.overheid.nl/formulieren/api-key-aanvragen-0/).

## Quick Start

### 1) Zoeken met filters of locatie

**Endpoint:** `/documenten/_zoek`  
Geeft een **gepagineerde** lijst met omgevingsdocumenten en IMRO-documenten terug.

**Query parameters:** `geldigOp`, `beschikbaarOp`, `inclusiefToekomstigGeldig`, `synchroniseerMetTileset`, `page`, `size`,
`_sort`, `Content-Crs`.

**Zoekparameters (body):**

- `_find` – zoeken op basis van volledige identificatie, `uriIdentificatie`, `titel` of `expressionId`.
- `bestuurslaag` – één van `GEMEENTE`, `PROVINCIE`, `WATERSCHAP`, `RIJK`.
- `regelgevingOfOverig` – `REGELGEVING` of `OVERIG`.
- `geometrie` – GeoJSON in **RD-formaat** met maximaal drie decimalen.

**Voorbeeld:**

```shell
curl --request POST \
  --header 'x-api-key: <key-hier>' \
  --header 'content-crs: http://www.opengis.net/def/crs/EPSG/0/28992' \
  --header 'content-type: application/json' \
  --data '{"geometrie":{"type":"Point","coordinates":[155000,463000]}}' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/documenten/_zoek?page=1&size=20&sort=sortDatum,desc'
```

### 2) Zoeken met suggesties

**Endpoint:** `/documenten/_suggereer`  
Zoekt op basis van een (on)volledige zoekterm naar omgevingsdocumenten of IMRO-documenten; zoekt op zowel exacte als ‘fuzzy’ overeenkomsten.  

**Query parameters:** `geldigOp`, `beschikbaarOp`, `inclusiefToekomstigGeldig`, `synchroniseerMetTileset`,`limit`.

**Voorbeeld**

```shell
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/documenten/_suggereer?_find=Plan%20Amsterdam&geldigOp=2024-11-27&beschikbaarOp=2024-11-27T12:34:56Z&limit=5'
```

_Resultaat:_ lijst met matches; geen paginering. Limiteren kan met de `limit`-parameter.

### 3) Details op identificatie

**Endpoint:** `/documenten/{uriIdentificatie}`  
Levert aanvullende, meer uitgebreide (meta-)informatie over één omgevingsdocument of IMRO-document.  
**Parameters (bron):** padparam `uriIdentificatie`, optioneel `geldigOp`, `beschikbaarOp`.

**Formaat per documenttype (bron):**

- Omgevingsdocument: **AKN-identificatie** waarbij alle non-alfanumerieke tekens zijn vervangen met regex `[^\w]+` →
  `_`.
- Ontwerp omgevingsdocument: **technischId** (samenvoeging van **IMOW-identificatie** en **ontwerpbesluitIdentificatie
  **), waarbij `[^\w]+` is vervangen door `_`.
- IMRO-document: **identificatie van het plan**.

**Voorbeeld:**

```shell
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/documenten/_akn_nl_act_gm0772_2020_omgevingsplan?geldigOp=2024-11-27&beschikbaarOp=2024-11-27T12:34:56Z'
```

### 4) Versie-details op `expressionId`

**Endpoint:** `/omgevingsdocumentversies/{expressionId}`  
Gebruikt `uriExpressionId` (ge-escapete versie van `expressionId`); escaping met regex `[^\w]+` (alle non-alfanumerieke tekens, waaronder `/`, `@`, `-`, `;`) → `_`. Bij gebruik van een `expressionId` van een tijdelijk deel bepaalt `beschikbaarVanaf` van dat tijdelijke deel welke versie van de hoofdregeling wordt teruggeleverd. De selectie van de hoofdregeling is **uitsluitend gebaseerd op beschikbaarheid**, niet op geldigheid.

**Voorbeeld:**

```shell
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/omgevingsdocumentversies/_akn_nl_act_gm0014_2020_omgevingsplan_nld_2024_09_30_5' 
```

## Metadata

- **CRS endpoint:** `/crss` → RD (`http://www.opengis.net/def/crs/EPSG/0/28992`)
- **Health/info:** `/app-health` en `/app-info`
- **OpenAPI:** `/openapi.json` en `/openapi.yaml` — **TODO:** OAS-link toevoegen.

## Links

- **API-registerpagina:** [developer.omgevingswet.overheid.nl — Omgevingsinformatie ontsluiten](https://developer.omgevingswet.overheid.nl/api-register/api/omgevingsinformatie-ontsluiten/)
- **Functionele documentatie (PDF):** *Functionele documentatie Omgevingsinformatie Ontsluiten v2 API — Versie 1.1 september 2025*
- **OpenAPI:** *Omgevingsinformatie-Ontsluiten-v2.json* — **TODO:** URL toevoegen"