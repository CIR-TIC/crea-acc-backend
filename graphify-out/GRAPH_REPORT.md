# Graph Report - crea-acc-backend  (2026-08-14)

## Corpus Check
- 91 files · ~24,054 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 461 nodes · 579 edges · 68 communities (54 shown, 14 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3bb8639c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- authJWT.js
- dependencies
- activity.controller.js
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
- user.controller.js
- harvest.js
- survey.controller.js
- drying.js
- association.js
- drying.controller.js
- property.js
- sale.js
- supply.js
- supply_type.js
- checkActivityEditable
- routes/type_activity.js
- www
- fermentation.controller.js
- sale.controller.js
- supplies.controller.js
- crop.controller.js
- variety.controller.js
- activityEditGuard.js

## God Nodes (most connected - your core abstractions)
1. `checkActivityEditable()` - 16 edges
2. `createLot()` - 9 edges
3. `createUser()` - 9 edges
4. `verifyToken()` - 8 edges
5. `createQuestion()` - 7 edges
6. `tokenFor()` - 7 edges
7. `createForm()` - 6 edges
8. `Testing — Backend` - 5 edges
9. `createOption()` - 5 edges
10. `createProperty()` - 5 edges

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

## Communities (68 total, 14 thin omitted)

### Community 0 - "authJWT.js"
Cohesion: 0.33
Nodes (5): config, jwt, verifyToken(), usersController, { verifyToken }

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): bcryptjs, cookie-parser, debug, dotenv, express, http-errors, jade, jsonwebtoken (+19 more)

### Community 2 - "activity.controller.js"
Cohesion: 0.25
Nodes (4): { Activity, Lot }, { checkActivityEditable }, deleteActivity(), updateActivity()

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
Cohesion: 0.07
Nodes (52): app, {
  createUser,
  createProperty,
  createLot,
  createActivity,
  createHarvest,
  createDrying,
  createFermentation,
  createSale,
  tokenFor,
}, EIGHT_DAYS_AGO, { models, truncateAll, closeDb }, request, app, { createAssociation, createUser }, request (+44 more)

### Community 7 - "response.controller.js"
Cohesion: 0.16
Nodes (8): createResponse(), { Response, Option }, updateResponse(), validateOptionBelongsToQuestion(), express, responseController, router, { verifyToken }

### Community 9 - "package.json"
Cohesion: 0.12
Nodes (16): jest, nodemon, devDependencies, jest, nodemon, supertest, engines, node (+8 more)

### Community 10 - "option.controller.js"
Cohesion: 0.17
Nodes (5): { Option }, express, optionController, router, { verifyToken }

### Community 11 - "question.controller.js"
Cohesion: 0.17
Nodes (5): { Question }, express, questionController, router, { verifyToken }

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
Cohesion: 0.18
Nodes (7): { Supply_Type }, basename, db, fs, opts, path, Sequelize

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

### Community 33 - "user.controller.js"
Cohesion: 0.20
Nodes (4): bcrypt, { Op }, SAFE_ATTRIBUTES, { User }

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

### Community 53 - "drying.controller.js"
Cohesion: 0.25
Nodes (5): { checkActivityEditable }, deleteDrying(), { Drying, Lot }, updateDrying(), { where }

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

### Community 58 - "checkActivityEditable"
Cohesion: 0.32
Nodes (5): { checkActivityEditable }, deleteHarvest(), { Harvest }, updateHarvest(), checkActivityEditable()

### Community 59 - "routes/type_activity.js"
Cohesion: 0.40
Nodes (4): express, router, typeActivityController, { verifyToken }

### Community 61 - "www"
Cohesion: 0.43
Nodes (5): models, onError(), onListening(), resyncIdSequences(), start()

### Community 62 - "fermentation.controller.js"
Cohesion: 0.29
Nodes (4): { checkActivityEditable }, deleteFermentation(), { Fermentation }, updateFermentation()

### Community 63 - "sale.controller.js"
Cohesion: 0.29
Nodes (4): { checkActivityEditable }, deleteSale(), { Sale, Lot }, updateSale()

## Knowledge Gaps
- **211 isolated node(s):** `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características`, `🧱 Stack tecnológico`, `⚙️ Puesta en marcha` (+206 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `checkActivityEditable()` connect `checkActivityEditable` to `activity.controller.js`, `activityEditGuard.js`, `drying.controller.js`, `fermentation.controller.js`, `sale.controller.js`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `verifyToken()` connect `authJWT.js` to `crop.js`, `variety.js`, `property.js`, `supply.js`, `supply_type.js`, `routes/type_activity.js`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **What connects `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características` to the rest of the system?**
  _211 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `factories.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06610259122157588 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._