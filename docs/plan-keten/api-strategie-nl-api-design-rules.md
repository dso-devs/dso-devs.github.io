---
sidebar_position: 8
id: api-strategie-nl-api-design-rules
title: DSO-LV API-strategie ↔ NL API Design Rules
slug: /plan-keten/api-strategie-nl-api-design-rules
---

# DSO-LV API-strategie ↔ NL API Design Rules

## Samenvatting
Binnen DSO-LV gebruiken we vastgestelde kaders voor **API-ontwerp** en **URI-stabiliteit**. Deze kaders – de [API-strategie v2.0 (26-03-2020)](https://iplo.nl/publish/pages/162339/dso_architectuur_api-strategie_2_0_vastgesteld-1-.pdf) en de [URI-strategie v2.0 (26-03-2020)](https://iplo.nl/publish/pages/162339/uri-strategie.pdf) – borgen een open, voorspelbaar en uitbreidbaar stelsel. Daarbij *alignen* we met de landelijke [NL REST API Design Rules (ADR)](https://gitdocumentatie.logius.nl/publicatie/api/adr/) en plaatsen DSO-specifieke keuzes expliciet in de documentatie. Dit sluit aan op de [Nederlandse Digitaliseringsstrategie (NDS)](https://www.digitaleoverheid.nl/nederlandse-digitaliseringsstrategie-nds/), waarin uniforme en goed gedocumenteerde koppelvlakken randvoorwaardelijk zijn.

## Waarom *alignen*?
- **Interoperabiliteit & voorspelbaarheid.** Herkenbare ontwerp- en documentatiepatronen over domeinen heen, consistente URI’s en foutafhandeling
- **Snellere integratie.** Duidelijke OpenAPI-specificaties, vaste error-structuren en praktische “getting started”
- **Beleid ↔ praktijk.** API’s als enabler voor “data bij de bron” en service-gedreven ketens binnen de NDS

## Wat betekent dit concreet voor developers?
- **Design-afspraken.** Ontwerp en documenteer API’s in lijn met ADR; leg DSO-specifieke keuzes (bijv. URI-patronen, versiebeleid) expliciet vast in je repo en publicatie. Zie: [ADR landing](https://gitdocumentatie.logius.nl/publicatie/api/adr/).  
- **Error-model.** Gebruik het DSO-errorformaat (beschreven in de API-strategie, *Bijlage H: Standaardformaat foutmeldingen*) als standaard binnen DSO-LV; beschrijf waar nodig een mapping naar ADR-conventies. Zie: [API-strategie v2.0 (PDF)](https://iplo.nl/publish/pages/162339/dso_architectuur_api-strategie_2_0_vastgesteld-1-.pdf).  
- **Versiebeheer & stabiliteit.** Versioneer voorspelbaar; houd URI’s betekenisvol en stabiel conform de [URI-strategie v2.0](https://iplo.nl/publish/pages/162339/uri-strategie.pdf).  
- **Vindbaarheid & documentatie.** Publiceer complete en actuele OpenAPI-specificaties; voeg een korte “Getting started + Troubleshooting” toe met voorbeeld-calls en foutcodes (en natuurlijk links naar Dev2Dev-pagina’s ;)

## Acties **PI-36** (Q4 2025)
1. **Gap-scan:** toets (nieuwe/bestaande) API’s op ADR + DSO-kaders; documenteer bevindingen per API.  
2. **Checklist & CI-linters:** enforce OAS-validatie, verplichte velden en consistente foutcodes in de pipeline.  
3. **Error-catalogus:** centrale voorbeelden (request/response) die het DSO-errorformaat demonstreren.  
4. **URI do’s & don’ts:** korte leidraad met migratietips bij versie-upgrades.  
5. **Doc-upgrade:** per API een compacte “Getting started + Troubleshooting” met links naar de bronkaders.
6. **Knooppunt gereedmaken:** standaarden en tooling borgen binnen het Knooppunt (checklists/linters, reviewboard, supportkanaal, releasekalender en templates) zodat teams self-service kunnen aansluiten en conform ADR/DSO-kaders leveren.



