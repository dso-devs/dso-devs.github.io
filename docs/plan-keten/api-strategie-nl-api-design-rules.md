---
sidebar_position: 3
id: api-strategie-nl-api-design-rules
title: DSO-LV API-strategie ↔ NL API Design Rules
slug: /plan-keten/api-strategie-nl-api-design-rules
---

# DSO-LV API-strategie ↔ NL API Design Rules

## Samenvatting
Binnen DSO-LV gebruiken we vastgestelde kaders voor **API-ontwerp** en **URI-stabiliteit**. Deze kaders – de [API-strategie v2.0 (26-03-2020)](https://iplo.nl/publish/pages/162339/dso_architectuur_api-strategie_2_0_vastgesteld-1-.pdf) en de [URI-strategie v2.0 (26-03-2020)](https://iplo.nl/publish/pages/162339/uri-strategie.pdf) – borgen een open, voorspelbaar en uitbreidbaar stelsel. Daarnaast volgen we de landelijke [NL REST API Design Rules (ADR)](https://gitdocumentatie.logius.nl/publicatie/api/adr/) en plaatsen DSO-specifieke keuzes expliciet in de documentatie. Dit sluit aan op de [Nederlandse Digitaliseringsstrategie (NDS)](https://www.digitaleoverheid.nl/nederlandse-digitaliseringsstrategie-nds/), waarin uniforme en goed gedocumenteerde koppelvlakken randvoorwaardelijk zijn.

## Wat betekent dit concreet voor developers?
- **Design-afspraken.** Developers mogen ervan uitgaan dat API's ontworpen en ontwikkeld worden in lijn met de NL REST API Design Rules;
  uitbreiding en nuancering hiervan zijn vastgelegd in specifieke DSO architectuurdocumentatie zoals de DSO API strategie;  
- **Versiebeheer & stabiliteit.** Developers mogen ervan uitgaan dat API's toegankelijk gemaakt worden conform afspraken vastgelegd in de NL REST API Design Rules
  en aanvullend in de DSO [URI-strategie v2.0](https://iplo.nl/publish/pages/162339/uri-strategie.pdf);
  dit geldt in het bijzonder voor het volgen van Semantic Versioning, het naast elkaar aanbieden van verschillende versies van één API, en het in- en uitfaseren van (major versions van ) API's;
- **Vindbaarheid & documentatie.** Developers mogen ervan uitgaan dat API's en hun documentatie vindbaar zijn op developer.omgevingswet.overheid.nl en op andere openbare catalogi van API's.

## Acties **PI-36** (Q4 2025)
1. **DSO-kaders updaten a.d.h.v. ADR:** pas de DSO API strategie aan op plekken waar die ingehaald is door ADR.
2. **Gap-scan:** toets (nieuwe/bestaande) API’s op ADR + DSO-kaders; documenteer bevindingen per API.  
3. **Checklist & CI-linters:** enforce OAS-validatie, verplichte velden en consistente foutcodes in de pipeline.  
4. **Error-catalogus:** centrale voorbeelden (request/response) die het DSO-errorformaat demonstreren.  
5. **URI do’s & don’ts:** korte leidraad met migratietips bij versie-upgrades.  
6. **Doc-upgrade:** per API een compacte “Getting started + Troubleshooting” met links naar de bronkaders.
7. **Knooppunt gereedmaken:** standaarden en tooling borgen binnen het Knooppunt (checklists/linters, reviewboard, supportkanaal, releasekalender en templates) zodat teams self-service kunnen aansluiten en conform ADR/DSO-kaders leveren.




