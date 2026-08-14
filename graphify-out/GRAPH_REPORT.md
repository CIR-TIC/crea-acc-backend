# Graph Report - crea-acc-backend  (2026-08-14)

## Corpus Check
- 89 files · ~21,548 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 441 nodes · 533 edges · 58 communities (48 shown, 10 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `129ce84c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- authJWT.js
- dependencies
- checkActivityEditable
- auth.controller.js
- form.controller.js
- lot.controller.js
- factories.js
- response.controller.js
- type_activity.controller.js
- package.json
- option.controller.js
- question.controller.js
- response_option.controller.js
- crop.js
- README.md
- variety.js
- property.controller.js
- app.js
- section.model.js
- fermentation.js
- models/index.js
- user.model.js
- option.model.js
- property.model.js
- question.model.js
- response.model.js
- response_selected_option.model.js
- survey_submission.model.js
- association.model.js
- form.model.js
- harvest.js
- survey.controller.js
- drying.js
- association.js
- property.js
- sale.js
- supply.js
- supply_type.js
- routes/type_activity.js

## God Nodes (most connected - your core abstractions)
1. `checkActivityEditable()` - 16 edges
2. `verifyToken()` - 9 edges
3. `createLot()` - 9 edges
4. `createUser()` - 7 edges
5. `createProperty()` - 5 edges
6. `tokenFor()` - 5 edges
7. `Testing — Backend` - 5 edges
8. `closeDb()` - 4 edges
9. `truncateAll()` - 4 edges
10. `createActivity()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `deleteActivity()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/activity.controller.js → utils/activityEditGuard.js
- `updateActivity()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/activity.controller.js → utils/activityEditGuard.js
- `deleteDrying()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/drying.controller.js → utils/activityEditGuard.js
- `updateDrying()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/drying.controller.js → utils/activityEditGuard.js
- `deleteFermentation()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/fermentation.controller.js → utils/activityEditGuard.js

## Import Cycles
- None detected.

## Communities (58 total, 10 thin omitted)

### Community 0 - "authJWT.js"
Cohesion: 0.33
Nodes (5): config, jwt, verifyToken(), usersController, { verifyToken }

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): bcryptjs, cookie-parser, debug, dotenv, express, http-errors, jade, jsonwebtoken (+19 more)

### Community 2 - "checkActivityEditable"
Cohesion: 0.07
Nodes (23): { Activity, Lot }, { checkActivityEditable }, deleteActivity(), updateActivity(), { checkActivityEditable }, deleteDrying(), { Drying, Lot }, updateDrying() (+15 more)

### Community 3 - "auth.controller.js"
Cohesion: 0.16
Nodes (12): bcrypt, config, db, generateAccessToken(), generateAndStoreRefreshToken(), jwt, refreshToken(), signin() (+4 more)

### Community 4 - "form.controller.js"
Cohesion: 0.15
Nodes (5): db, express, formController, router, { verifyToken }

### Community 5 - "lot.controller.js"
Cohesion: 0.15
Nodes (5): { Lot, Property, User, Activity, Harvest, Fermentation, Drying, Sale }, express, lotController, router, { verifyToken }

### Community 6 - "factories.js"
Cohesion: 0.09
Nodes (37): app, {
  createUser,
  createProperty,
  createLot,
  createActivity,
  createHarvest,
  createDrying,
  createFermentation,
  createSale,
  tokenFor,
}, EIGHT_DAYS_AGO, { models, truncateAll, closeDb }, request, app, { createAssociation, createUser }, request (+29 more)

### Community 7 - "response.controller.js"
Cohesion: 0.16
Nodes (8): createResponse(), { Response, Option }, updateResponse(), validateOptionBelongsToQuestion(), express, responseController, router, { verifyToken }

### Community 9 - "package.json"
Cohesion: 0.12
Nodes (16): jest, nodemon, devDependencies, jest, nodemon, supertest, engines, node (+8 more)

### Community 10 - "option.controller.js"
Cohesion: 0.18
Nodes (4): { Option }, express, optionController, router

### Community 11 - "question.controller.js"
Cohesion: 0.18
Nodes (4): { Question }, express, questionController, router

### Community 12 - "response_option.controller.js"
Cohesion: 0.18
Nodes (8): createResponseOption(), { Response_Selected_Option, Response, Option }, updateResponseOption(), validateOptionMatchesResponseQuestion(), controller, express, router, { verifyToken }

### Community 13 - "crop.js"
Cohesion: 0.40
Nodes (4): cropController, express, router, { verifyToken }

### Community 14 - "README.md"
Cohesion: 0.10
Nodes (19): 🔐 Autenticación, ✨ Características, 🗂️ Estructura del proyecto, 🗃️ Modelo de datos, 🗺️ Notas conocidas y roadmap, ⚙️ Puesta en marcha, 🔌 Recursos de la API, 🔗 Repos relacionados (+11 more)

### Community 15 - "variety.js"
Cohesion: 0.40
Nodes (4): express, router, varietyController, { verifyToken }

### Community 17 - "app.js"
Cohesion: 0.29
Nodes (4): activityController, express, router, { verifyToken }

### Community 19 - "fermentation.js"
Cohesion: 0.40
Nodes (4): express, fermentationController, router, { verifyToken }

### Community 21 - "models/index.js"
Cohesion: 0.05
Nodes (19): models, onError(), onListening(), resyncIdSequences(), start(), { Crop, Variety }, { Supplies, Supply_Type, User }, { Supply_Type } (+11 more)

### Community 22 - "user.model.js"
Cohesion: 0.33
Nodes (3): bcrypt, {
    Model
}, User

### Community 25 - "question.model.js"
Cohesion: 0.33
Nodes (4): {
    Model
}, Question, VALID_INPUT_TYPES, VALID_QUESTION_TYPES

### Community 46 - "harvest.js"
Cohesion: 0.40
Nodes (4): express, harvestController, router, { verifyToken }

### Community 50 - "survey.controller.js"
Cohesion: 0.15
Nodes (6): db, { Op }, express, router, surveyController, { verifyToken }

### Community 51 - "drying.js"
Cohesion: 0.40
Nodes (4): dryingController, express, router, { verifyToken }

### Community 52 - "association.js"
Cohesion: 0.33
Nodes (3): associationController, express, router

### Community 54 - "property.js"
Cohesion: 0.40
Nodes (4): express, propertyController, router, { verifyToken }

### Community 55 - "sale.js"
Cohesion: 0.40
Nodes (4): express, router, saleController, { verifyToken }

### Community 56 - "supply.js"
Cohesion: 0.40
Nodes (4): express, router, supplyController, { verifyToken }

### Community 57 - "supply_type.js"
Cohesion: 0.40
Nodes (4): express, router, supplyTypeController, { verifyToken }

### Community 59 - "routes/type_activity.js"
Cohesion: 0.40
Nodes (4): express, router, typeActivityController, { verifyToken }

## Knowledge Gaps
- **201 isolated node(s):** `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características`, `🧱 Stack tecnológico`, `⚙️ Puesta en marcha` (+196 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `verifyToken()` connect `authJWT.js` to `form.controller.js`, `crop.js`, `variety.js`, `property.js`, `supply.js`, `supply_type.js`, `routes/type_activity.js`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **What connects `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características` to the rest of the system?**
  _201 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `checkActivityEditable` be split into smaller, more focused modules?**
  _Cohesion score 0.06923076923076923 - nodes in this community are weakly interconnected._
- **Should `factories.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08879492600422834 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._