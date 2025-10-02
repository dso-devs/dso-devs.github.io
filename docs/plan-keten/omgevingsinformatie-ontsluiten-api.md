---
sidebar_position: 4
id: omgevingsinformatie-ontsluiten-api
title: Omgevingsinformatie Ontsluiten API (v2)
slug: /plan-keten/omgevingsinformatie-ontsluiten-api
---

# Omgevingsinformatie Ontsluiten API (v2)

De Omgevingsinformatie ontsluiten-API ontsluit omgevingsinformatie uit meerdere bronnen in samenhang.

:::note Status
Let op: deze API is nog in ontwikkeling en moet beschouwd worden als **bèta**.
:::

## Omgevingen & basis-URLs
- **Productieomgeving:** `https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2`
- **Pre-productieomgeving:** `https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2`

## Authenticatie
- **API-key via het DSO-LV knooppunt**, te gebruiken als header `x-api-key`.  
  **TODO:** link voor api-key aanvragen toevoegen.

## Quick Start

### 1) Zoeken met suggesties
**Endpoint:** `/documenten/_suggereer`  
Zoekt op basis van een (on)volledige zoekterm naar omgevingsdocumenten of IMRO-documenten; zoekt op zowel exacte als ‘fuzzy’ overeenkomsten.  
**Optionele parameters (bron):** `geldigOp`, `beschikbaarOp`, `inclusiefToekomstigGeldig`, `synchroniseerMetTileset` en een limietparameter (in voorbeeld als `limiet`).  

**Voorbeeld (GET-URL):**
~~~text
https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/documenten/_suggereer?_find=Plan%20Amsterdam&geldigOp=2024-11-27&beschikbaarOp=2024-11-27T12%3A34%3A56Z&limiet=10
~~~

_Resultaat:_ lijst met matches; geen paginering. Limiteren kan met de parameter voor het maximum aantal resultaten.

### 2) Details op identificatie
**Endpoint:** `/documenten/{uriIdentificatie}`  
Levert aanvullende, meer uitgebreide (meta-)informatie over één omgevingsdocument of IMRO-document.  
**Parameters (bron):** padparam `uriIdentificatie`, optioneel `geldigOp`, `beschikbaarOp`.  

**Formaat per documenttype (bron):**
- Omgevingsdocument: **AKN-identificatie** waarbij alle non-alfanumerieke tekens zijn vervangen met regex `[^\w]+` → `_`.
- Ontwerp omgevingsdocument: **technischId** (samenvoeging van **IMOW-identificatie** en **ontwerpbesluitIdentificatie**), waarbij `[^\w]+` is vervangen door `_`.
- IMRO-document: **identificatie van het plan**.

**Voorbeeld (GET-URL):**
~~~text
https://service.omgevingswet.overheid.nl/publiek/omgevingsinformatie/api/ontsluiten/v2/documenten/_akn_nl_act_gm0772_2020_omgevingsplan?geldigOp=2024-11-27&beschikbaarOp=2024-11-27T12%3A34%3A56Z
~~~

### 3) Zoeken met filters of locatie
**Endpoint:** `/documenten/_zoek`  
Geeft een **gepagineerde** lijst met omgevingsdocumenten en IMRO-documenten terug.  

**Headers:** `geldigOp`, `beschikbaarOp`, `inclusiefToekomstigGeldig`, `synchroniseerMetTileset`, `page`, `size`, `_sort`, `Content-Crs`.  

**Zoekparameters (bron):**
- `_find` – zoeken op basis van volledige identificatie, `uriIdentificatie`, `titel` of `expressionId`.
- `bestuurslaag` – één van `GEMEENTE`, `PROVINCIE`, `WATERSCHAP`, `RIJK`.
- `regelgevingOfOverig` – `REGELGEVING` of `OVERIG`.
- `geometrie` – GeoJSON in **RD-formaat** met maximaal drie decimalen.

**Voorbeeld body:**
~~~json
{
  "_find": "Omgevingsverordening provincie Utrecht",
  "bestuurslaag": "PROVINCIE",
  "regelgevingOfOverig": "REGELGEVING",
  "geometrie": {
    "type": "Point",
    "coordinates": [155000, 463000]
  }
}
~~~

**Alternatieve body:**
~~~json
{
  "identificaties": [
    "/akn/nl/act/gm0448/2020/omgevingsplan",
    "NL.IMRO.1641.OPB061-ON01"
  ]
}
~~~

> Het is niet mogelijk om deze parameters in combinatie te gebruiken. Als gezocht wordt met `identificaties` dan mogen de andere parameters niet worden gevuld.

### 4) Versie-details op `expressionId`
**Endpoint:** `/omgevingsdocumentversies/{expressionId}`  
Gebruikt `uriExpressionId` (ge-escapete versie van `expressionId`); escaping met regex `[^\w]+` (alle non-alfanumerieke tekens, waaronder `/`, `@`, `-`, `;`) → `_`.  
Bij gebruik van een `expressionId` van een tijdelijk deel bepaalt `beschikbaarVanaf` van dat tijdelijke deel welke versie van de hoofdregeling wordt teruggeleverd. De selectie van de hoofdregeling is **uitsluitend gebaseerd op beschikbaarheid**, niet op geldigheid.

## CRS & health/specs
- **CRS endpoint:** `/crss` → RD (`http://www.opengis.net/def/crs/EPSG/0/28992`)
- **Health/info:** `/app-health` en `/app-info`
- **OpenAPI:** `/openapi.json` en `/openapi.yaml` — **TODO:** OAS-link toevoegen.

## Foutafhandeling
**TODO:** formele foutafhandeling toevoegen indien beschikbaar in de bron.

## Links
- **API-registerpagina:** [developer.omgevingswet.overheid.nl — Omgevingsinformatie ontsluiten](https://developer.omgevingswet.overheid.nl/api-register/api/omgevingsinformatie-ontsluiten/)
- **Functionele documentatie (PDF):** *Functionele documentatie Omgevingsinformatie Ontsluiten v2 API — Versie 1.1 september 2025*
- **OpenAPI:** *Omgevingsinformatie-Ontsluiten-v2.json* — **TODO:** URL toevoegen.
