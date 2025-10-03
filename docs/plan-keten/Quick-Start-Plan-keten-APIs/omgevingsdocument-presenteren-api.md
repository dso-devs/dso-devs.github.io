---
sidebar_position: 6
id: omgevingsdocument-presenteren-api
title: Omgevingsdocument Presenteren API (v8)
slug: /plan-keten/omgevingsdocument-presenteren-api
---

# Omgevingsdocumenten Presenteren API (v8)

De **Presenteren-API** is bedoeld voor het **objectgericht ontsluiten** van omgevingsdocumenten binnen het DSO. De inhoud van omgevingsdocumenten van bevoegde gezagen (Rijk, Provincies, Gemeenten en Waterschappen) wordt via **Ozon** beschikbaar gesteld en kan in samenhang met annotaties (zoals activiteiten, locaties en gebiedsaanwijzingen) in bijvoorbeeld een viewer worden weergegeven.

:::caution
**Status en versies:** v8 is beschikbaar. v7 blijft beschikbaar tot en met **31-10-2025** en blijft daarna **unsupported** tot **01-02-2026**.
:::

## Omgevingen & basis-URLs

- **Productie:** `https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/`
- **Pre-productie:** `https://service.pre.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/`

## Authenticatie & throttling

- **API-key vereist** — meegeven als header `x-api-key`.  
  **API-key aanvragen:** [ontwikkelaarsportaal](https://developer.omgevingswet.overheid.nl/formulieren/api-key-aanvragen-0/).
- **Bevragingslimiet:** maximaal **200 requests per seconde**.

## Quick Start

> Endpoints zijn ontworpen om objecten zo uit te leveren dat ze op een kaart gevisualiseerd kunnen worden.

### 1️⃣ Basis-request (GET)

Gebruik de basis-URL van de gewenste omgeving en roep een **lees-endpoint** uit de specificatie aan.

~~~ts title="Voorbeeld (skelet)" hideLineNumbers
curl --request GET \
  --header 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/PAD_UIT_SPECIFICATIE'
~~~

### 2️⃣ Zoeken / filteren (POST)

Voor zoek- of filteroperaties wordt doorgaans een **POST** met **JSON-body** gebruikt (zie functionele documentatie of OpenAPI voor het schema).

~~~ts title="Voorbeeld (skelet)" hideLineNumbers
curl --request POST \
  --header 'x-api-key: <key-hier>' \
  --header 'content-type: application/json' \
  --data 'JSON_BODY_VOLGENS_SPEC' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/ZOEKENDPOINT_UIT_SPEC'
~~~

### 3️⃣ Objecten combineren

Combineer meerdere ingangen (bijv. objecten plus annotaties) om inhoud **in samenhang** te presenteren.

~~~ts title="Voorbeeld (patroon)" hideLineNumbers
# 1) Haal object A op
curl -H 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/OBJECT_ENDPOINT'

# 2) Haal gerelateerde annotaties op
curl -H 'x-api-key: <key-hier>' \
  'https://service.omgevingswet.overheid.nl/publiek/omgevingsdocumenten/api/presenteren/v8/ANNOTATIE_ENDPOINT'
~~~

### 4️⃣ Versie-migratie

Werk je nog met **v7**? Raadpleeg de **migratiehandleiding** en migreer naar **v8** vóór 31-10-2025 (v7 blijft daarna nog unsupported tot 01-02-2026).

- Migratiehandleiding (pdf): **TODO: link invoegen**
- Functionele documentatie v8 (pdf, 16 april 2025): **TODO: link invoegen**

## API-specificaties

- **OpenAPI v8:** *Omgevingsdocumenten-Presenteren-v8.json* — **TODO: URL invoegen**  
- **OpenAPI v7:** *Omgevingsdocumenten-Presenteren-v7.json* — **TODO: URL invoegen**

## Standaarden

- **STOP / TPOD** (CIM-OP, CIM-OW)  
- **OpenAPI**, **JSON**, **JSON Schema**  
- **API- en URI-strategie** (DSO)

## Meer informatie

- Deze service is van belang in het proces **omgevingsdocumenten opvragen**.  
- **Feedback:** deel je bevindingen via het forum — **TODO: link invoegen**.
