# Graph Report - crea-acc-backend  (2026-08-13)

## Corpus Check
- 88 files · ~19,475 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 431 nodes · 519 edges · 61 communities (49 shown, 12 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `cb34f9fd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- authJWT.js
- dependencies
- models/index.js
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
- activity.js
- www
- fermentation.js
- supplies.controller.js
- user.controller.js
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
- app.js
- association.js
- form.js
- property.js
- sale.js
- supply.js
- supply_type.js
- survey.js
- routes/type_activity.js

## God Nodes (most connected - your core abstractions)
1. `checkActivityEditable()` - 16 edges
2. `verifyToken()` - 10 edges
3. `createLot()` - 9 edges
4. `createUser()` - 7 edges
5. `createProperty()` - 5 edges
6. `tokenFor()` - 5 edges
7. `Testing — Backend` - 5 edges
8. `createActivity()` - 4 edges
9. `closeDb()` - 4 edges
10. `truncateAll()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `updateActivity()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/activity.controller.js → utils/activityEditGuard.js
- `deleteActivity()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/activity.controller.js → utils/activityEditGuard.js
- `updateDrying()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/drying.controller.js → utils/activityEditGuard.js
- `deleteDrying()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/drying.controller.js → utils/activityEditGuard.js
- `updateFermentation()` --calls--> `checkActivityEditable()`  [EXTRACTED]
  controllers/fermentation.controller.js → utils/activityEditGuard.js

## Import Cycles
- None detected.

## Communities (61 total, 12 thin omitted)

### Community 0 - "authJWT.js"
Cohesion: 0.33
Nodes (5): config, jwt, verifyToken(), usersController, { verifyToken }

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): bcryptjs, cookie-parser, debug, dotenv, express, http-errors, jade, jsonwebtoken (+19 more)

### Community 2 - "models/index.js"
Cohesion: 0.05
Nodes (30): { Activity, Lot }, { checkActivityEditable }, deleteActivity(), updateActivity(), { checkActivityEditable }, deleteDrying(), { Drying, Lot }, updateDrying() (+22 more)

### Community 3 - "auth.controller.js"
Cohesion: 0.16
Nodes (12): bcrypt, config, db, generateAccessToken(), generateAndStoreRefreshToken(), jwt, refreshToken(), signin() (+4 more)

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
Cohesion: 0.17
Nodes (4): { Response }, express, responseController, router

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
Nodes (4): { Response_Selected_Option }, controller, express, router

### Community 13 - "crop.js"
Cohesion: 0.40
Nodes (4): cropController, express, router, { verifyToken }

### Community 14 - "README.md"
Cohesion: 0.10
Nodes (19): 🔐 Autenticación, ✨ Características, 🗂️ Estructura del proyecto, 🗃️ Modelo de datos, 🗺️ Notas conocidas y roadmap, ⚙️ Puesta en marcha, 🔌 Recursos de la API, 🔗 Repos relacionados (+11 more)

### Community 15 - "variety.js"
Cohesion: 0.22
Nodes (5): { Variety, Crop }, express, router, varietyController, { verifyToken }

### Community 17 - "activity.js"
Cohesion: 0.40
Nodes (4): activityController, express, router, { verifyToken }

### Community 18 - "www"
Cohesion: 0.43
Nodes (5): models, onError(), onListening(), resyncIdSequences(), start()

### Community 19 - "fermentation.js"
Cohesion: 0.40
Nodes (4): express, fermentationController, router, { verifyToken }

### Community 21 - "user.controller.js"
Cohesion: 0.20
Nodes (4): bcrypt, { Op }, SAFE_ATTRIBUTES, { User }

### Community 22 - "user.model.js"
Cohesion: 0.33
Nodes (3): bcrypt, {
    Model
}, User

### Community 46 - "harvest.js"
Cohesion: 0.40
Nodes (4): express, harvestController, router, { verifyToken }

### Community 50 - "survey.controller.js"
Cohesion: 0.15
Nodes (3): { Crop, Variety }, db, { Op }

### Community 51 - "app.js"
Cohesion: 0.29
Nodes (4): dryingController, express, router, { verifyToken }

### Community 52 - "association.js"
Cohesion: 0.33
Nodes (3): associationController, express, router

### Community 53 - "form.js"
Cohesion: 0.40
Nodes (4): express, formController, router, { verifyToken }

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

### Community 58 - "survey.js"
Cohesion: 0.40
Nodes (4): express, router, surveyController, { verifyToken }

### Community 59 - "routes/type_activity.js"
Cohesion: 0.40
Nodes (4): express, router, typeActivityController, { verifyToken }

## Knowledge Gaps
- **196 isolated node(s):** `{ Activity, Lot }`, `{ checkActivityEditable }`, `{ Crop, Variety }`, `{ where }`, `{ Drying, Lot }` (+191 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `verifyToken()` connect `authJWT.js` to `crop.js`, `variety.js`, `form.js`, `property.js`, `supply.js`, `supply_type.js`, `survey.js`, `routes/type_activity.js`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `{ Activity, Lot }`, `{ checkActivityEditable }`, `{ Crop, Variety }` to the rest of the system?**
  _196 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `models/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.054901960784313725 - nodes in this community are weakly interconnected._
- **Should `factories.js` be split into smaller, more focused modules?**
  _Cohesion score 0.08879492600422834 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._