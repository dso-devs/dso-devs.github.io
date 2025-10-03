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

-----Toelichtings-tekst - Nader in te vullen-----

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

# Omgevingsinformatie Ontsluiten

-----Toelichtings-tekst - Nader in te vullen-----

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

-----Toelichtings-tekst - Nader in te vullen-----

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

-----Toelichtings-tekst - Nader in te vullen-----

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


