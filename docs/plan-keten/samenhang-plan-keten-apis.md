---
sidebar_position: 2
id: samenhang-plan-keten-apis
title: Samenhang tussen Plan-Keten APIs
slug: /plan-keten/samenhang-plan-keten-apis
---

# Samenhang tussen Plan-Keten APIs


Ten bate van de bedrijfsfuncties van DSO-LV biedt de OBO Kadaster een aantal REST API's aan. Voor bepaalde use cases zijn deze API's op zichzelf bruikbaar, maar vaker nog zijn er meerdere API's nodig om tot een antwoord op je vraag te komen. Vandaar dat in dit document kort ingegaan wordt op de samenhang tussen, in het bijzonder, de volgende REST API's:
1. Omgevingsinformatie Ontsluiten API
2. Ruimtelijke Plannen Opvragen API
3. Omgevingsdocumenten Presenteren API
4. Omgevingsdocumenten Geometrie Opvragen API

# Overview

Wanneer je wilt weten welke wet- en regelgeving of beleidsinformatie er is vastgesteld op een bepaalde plek,
is het niet voldoende om alleen Omgevingsdocumenten (d.w.z. documenten op basis van de Omgevingswet) te raadplegen.
Je moet ook wet- en regelgeving op basis van de Wet ruimtelijke ordening (Wro) meenemen om een compleet beeld te hebben
van de lokale wet- en regelgeving; gemeenten hebben namelijk nog tot en met 2031 de tijd om hun wet- en regelgeving
over te brengen naar het Omgevingsplan.

Vandaar dat het DSO een API aanbiedt om tijdens deze overgangssituatie zowel documenten uit het oude domein
als documenten uit het nieuwe domein te kunnen vinden; dit is de Omgevingsinformatie Ontsluiten API. 
Wanneer je als raadpleger vervolgens details nodig hebt uit een specifiek document,
dan kun je deze opvragen in een domeinspecifieke API.

Hieronder zie je welk soort API's je allemaal tegenkomt in een typische workflow,
waarbij je begint met een algemene vraag en uitkomt bij een specifieke geometrie,
bijvoorbeeld het werkingsgebied van een regel:

```mermaid
flowchart TD
S(["Start"])
S --> OIS["Omgevingsinformatie Ontsluiten API"]
OIS --> Domein{"Uit welk domein komt het document?"}
Domein --> |WRO| RP["Ruimtelijke Plannen Opvragen API"]
Domein --> |Omgevingswet| Ozon["Omgevingsdocumenten Presenteren API"]
Ozon --> OzonVerbeelden{"Bron-geometrie of verbeelding op de kaart?"}
OzonVerbeelden -->|Verbeelding op de kaart| VT["OGC API Vector Tiles (PDOK)"]
OzonVerbeelden --> |Bron-geometrie| Geo["Omgevingsdocumenten Geometrie Opvragen API"]
RP --> RpVerbeelden{"Bron-geometrie of verbeelding op de kaart?"}
RpVerbeelden --> |Bron-geometrie| RP
RpVerbeelden -->|Verbeelding op de kaart| VT["OGC API Vector Tiles (PDOK)"]
```

Hierbij is het relevant wat je als afnemer wilt doen met de geometrie.
Wil je deze verbeelden, bijvoorbeeld om een kaartbeeld te tonen in een browser,
dan is het verstandig om de OGC API Vector Tiles te gebruiken.
Wil je zelf beschikking hebben over de bron-geometrie, bijvoorbeeld omdat je hier
databewerking op wilt doen, dan is het verstandig om geometrieën (GeoJSON)
op te halen uit de Ruimtelijke Plannen Opvragen API of de Omgevingsdocumenten Geomtrie Opvragen API,
respectievelijk voor het Wro-domein en het Omgevingswet-domein.

# Omgevingsinformatie Ontsluiten

De Omgevingsinformatie Ontsluiten API is zoals boven toegelicht de API om
over de twee verschillende domeinen heen (Wro en Omgevingswet) documenten met
wet- en regelgeving te vinden. Dit kan op basis van een geo-bevraging (GeoJSON),
via _fuzzy search_ op basis van kenmerken van het document zoals bijvoorbeeld de citeertitel,
of op basis van de identificatie van het document, zoals het plan-id (Wro) of het Work-Id (Omgevingswet).

```mermaid
flowchart TD
S(["Start"]) --> Begin

subgraph OIS[Omgevingsinformatie Ontsluiten API]
    Begin{"Ik wil een document zoeken... "}
    Begin -->|op basis van tekst| DocumentTekst["Document zoeken op basis van tekst"]
    Begin -->|op de kaart| DocumentGeo["Document zoeken op de kaart"]
end

DocumentTekst --> Domein{"Uit welk domein komt het document?"}
DocumentGeo --> Domein
Domein --> |WRO| RP["Ruimtelijke Plannen Opvragen API"]
Domein --> |Omgevingswet| Ozon["Omgevingsdocumenten Presenteren API"]
```

# Ruimtelijke Plannen

In de Ruimtelijke Plannen API zijn teksten, planobjecten en geometrieën op te halen uit een Ruimtelijk Plan, bijvoorbeeld een Bestemmingsplan.

```mermaid
flowchart TD
OIS["Omgevingsinformatie Ontsluiten API"]
OIS --> Plannen
subgraph RP[Ruimtelijke Plannen Opvragen API]
Plannen
Plannen --> TekstenPlanobjecten{Teksten of gebieden?}
TekstenPlanobjecten --> |Teksten| Teksten
TekstenPlanobjecten --> |Planobjecten| Planobjecten["Planobjecten (bijv. Bestemmingvlakken, Bouwvlakken, Functieaanduidingen, Gebiedsaanduidingen, etc.)"]
Teksten --> |Planobjecten bij tekst| Planobjecten
end
Planobjecten --> RpVerbeelden{"Bron-geometrie of verbeelding op de kaart?"}
RpVerbeelden --> |"Bron-geometrie (met expand)"| Planobjecten
RpVerbeelden -->|Verbeelding op de kaart| VT["OGC API Vector Tiles (PDOK)"]
```

# Omgevingsdocumenten Presenteren

In de Omgevingsdocumenten Presenteren API kun je de teksten en annotaties (bijvoorbeeld Regels, Activiteiten, Gebiedsaanwijzingen) op
te halen op basis van een specifiek Omgevingsdocument, bijvoorbeeld een Regeling of Ontwerpregeling.

```mermaid
flowchart TD
OIS["Omgevingsinformatie Ontsluiten API"]
OIS --> Type
subgraph Ozon[Omgevingsdocumenten Presenteren API]
Type{Regeling, Ontwerpregeling of BOPA?}
Type --> |Regeling| Regeling
Type --> |Ontwerpregeling| Ontwerpregeling
Type --> |BOPA| BOPA["BOPA (/omgevingsvergunningen)"]
Regeling --> RegelingTekstOfAnnotaties{Tekst of Annotaties?}
RegelingTekstOfAnnotaties -->|Tekst| Documentstructuur
Documentstructuur -->|Annotaties bij specifiek documentcomponent| Annotaties
RegelingTekstOfAnnotaties -->|Alle annotaties van de Regeling| Annotaties
Ontwerpregeling --> OntwerpregelingTekstOfAnnotaties{Tekst of Annotaties?}
OntwerpregelingTekstOfAnnotaties -->|Tekst| OntwerpDocumentstructuur[Documentstructuur met wijzigmarkeringen]
OntwerpregelingTekstOfAnnotaties -->|Alle annotaties van de Ontwerpregeling| OntwerpAnnotaties["Annotaties met wijzigmarkeringen (/annotaties/renvooi)"]
OntwerpDocumentstructuur -->|Annotaties bij specifiek documentcomponent| OntwerpAnnotaties
end
Annotaties --> Verbeelden
OntwerpAnnotaties --> Verbeelden
BOPA --> Verbeelden
Verbeelden{"Bron-geometrie of verbeelding op de kaart?"}
Verbeelden --> |Bron-geometrie| Geo["Omgevingsdocumenten Geometrie Opvragen API"]
Verbeelden -->|Verbeelding op de kaart| VT["OGC API Vector Tiles (PDOK)"]
```

# Omgevingsdocumenten Geometrie Opvragen

In de Omgevingsdocumenten Geometrie Opvragen API kan vervolgens de geometrie (GeoJSON) opgehaald worden bij specifieke objecten uit de Omgevingsdocumenten Presenteren API.

# Voorbeeldflow op basis van Arazzo

Onderstaande Arazzo-specificatie TODO beschrijft een workflow, waarbij op basis van een puntlocatie een document gevonden wordt, en vervolgens een gebiedsaanwijzing (annotatie) uit dat document opgehaald wordt,
waarbij daarna de geometrie opgehaald wordt.

```yaml


arazzo: 1.0.0
info:
  title: Samenhang Plan-Keten • Amersfoort punt → Gebiedsaanwijzingen (via annotaties) → Geometrie
  version: 1.0.0
  description: >
    Start met een puntlocatie (RD) in Amersfoort via Omgevingsinformatie v2,
    vraag Gebiedsaanwijzingen op via het Presenteren v8 annotatie-endpoint,
    en haal de geometrie van één Gebiedsaanwijzing op via Geometrie Opvragen v1.

servers:
  - id: dso-prod
    url: https://service.omgevingswet.overheid.nl
    description: DSO-LV productie

actors:
  - id: omgevingsinformatie
    type: api
    name: Omgevingsinformatie Ontsluiten v2
    baseUrl: /publiek/omgevingsinformatie/api/ontsluiten/v2         # basis-URL v2 [5](https://dso-devs.github.io/docs/plan-keten/omgevingsinformatie-ontsluiten-api)
    security:
      - type: apiKey
        in: header
        name: x-api-key
  - id: presenteren
    type: api
    name: Omgevingsdocumenten Presenteren v8
    baseUrl: /publiek/omgevingsdocumenten/api/presenteren/v8         # basis-URL v8 [6](https://developer.omgevingswet.overheid.nl/api-register/api/omgevingsdocument-presenteren/)
    security:
      - type: apiKey
        in: header
        name: x-api-key
  - id: geometrie
    type: api
    name: Omgevingsdocumenten Geometrie Opvragen v1
    baseUrl: /publiek/omgevingsdocumenten/api/geometrieopvragen/v1   # basis-URL v1 [7](https://dso-devs.github.io/docs/plan-keten/omgevingsdocumenten-geometrie-opvragen-api)
    security:
      - type: apiKey
        in: header
        name: x-api-key

workflow:
  - id: stap1-punt-amersfoort
    name: Zoek documenten op puntlocatie (RD) in Amersfoort
    actor: omgevingsinformatie
    request:
      method: POST
      endpoint: /documenten/_zoek                                  # geo-zoek Omgevingsinformatie v2 [5](https://dso-devs.github.io/docs/plan-keten/omgevingsinformatie-ontsluiten-api)
      headers:
        Content-Type: application/json
        Content-Crs: http://www.opengis.net/def/crs/EPSG/0/28992   # RD vereist als Content-Crs [5](https://dso-devs.github.io/docs/plan-keten/omgevingsinformatie-ontsluiten-api)
      query:
        page: 1
        size: 20
        _sort: sortDatum,desc
      body:
        geometrie:
          type: Point
          coordinates: [155000, 463000]                           # RD-voorbeeld (Amersfoort) [5](https://dso-devs.github.io/docs/plan-keten/omgevingsinformatie-ontsluiten-api)
    response:
      save:
        - key: zoekResultaat
          path: $

  - id: stap2-annotaties-gebiedsaanwijzingen
    name: Haal Gebiedsaanwijzing(en) op via v8 annotatie-endpoint op dezelfde puntlocatie
    actor: presenteren
    request:
      method: POST
      endpoint: {ANNOTATIE_ENDPOINT}                               # VUL IN: endpoint voor regeltekst-/divisie-annotaties (v8) [1](https://developer.omgevingswet.overheid.nl/publish/pages/166112/migratiehandleiding.pdf)[3](https://developer.omgevingswet.overheid.nl/publish/pages/166112/functionele-documentatie-api-omgevingsdocumenten-presenteren-v8-16-april-2025.pdf)
      headers:
        Content-Type: application/json
        Content-Crs: http://www.opengis.net/def/crs/EPSG/0/28992   # CRS84 wordt niet ondersteund; geef RD mee [4](https://developer.omgevingswet.overheid.nl/publish/pages/166112/omgevingsdocumenten-presenteren-v8.json)
      # Veel annotatie-endpoints ondersteunen tijdreis-parameters zoals geldigOp/inWerkingOp/beschikbaarOp en synchroniseerMetTileset.
      # Voeg ze hier desgewenst toe; zie v8 spec. [4](https://developer.omgevingswet.overheid.nl/publish/pages/166112/omgevingsdocumenten-presenteren-v8.json)
      body:
        geometrie:
          type: Point
          coordinates: [155000, 463000]
        # Afhankelijk van het gekozen annotatie-endpoint kun je ook filteren op artikel of documentcomponent.
        # Zie de functionele documentatie voor schema's en filters. [3](https://developer.omgevingswet.overheid.nl/publish/pages/166112/functionele-documentatie-api-omgevingsdocumenten-presenteren-v8-16-april-2025.pdf)
    response:
      save:
        # NB: de annotatie-respons in v8 is self-contained en bevat OW-objecten zoals Gebiedsaanwijzing(en) inclusief relaties. [1](https://developer.omgevingswet.overheid.nl/publish/pages/166112/migratiehandleiding.pdf)
        - key: eersteGebiedsaanwijzing
          path: $.annotaties.gebiedsaanwijzingen[0]                # PAS AAN naar de feitelijke sleutel in jouw endpoint-respons
        - key: geometrieIdentificatie
          path: $.annotaties.gebiedsaanwijzingen[0].werkingsgebied.locaties[0].geometrieIdentificatie

  - id: stap3-geometrie-ophalen
    name: Haal GeoJSON geometrie op voor geselecteerde Gebiedsaanwijzing
    actor: geometrie
    request:
      method: GET
      endpoint: /geometrieen/${{ geometrieIdentificatie }}        # id → GeoJSON [7](https://dso-devs.github.io/docs/plan-keten/omgevingsdocumenten-geometrie-opvragen-api)
      headers: {}
      query:
        crs: http://www.opengis.net/def/crs/EPSG/0/28992           # verplicht; anders 422 [7](https://dso-devs.github.io/docs/plan-keten/omgevingsdocumenten-geometrie-opvragen-api)
    response:
      save:
        - key: geojson
          path: $
      output:
        - name: resultaat
          value:
            gebiedsaanwijzing: ${{ eersteGebiedsaanwijzing }}


```

