# Graph Report - crea-acc-backend  (2026-08-12)

## Corpus Check
- 84 files · ~15,178 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 397 nodes · 449 edges · 50 communities (41 shown, 9 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `187c1210`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- authJWT.js
- dependencies
- models/index.js
- auth.controller.js
- form.controller.js
- lot.controller.js
- app.js
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
- activity.controller.js
- www
- fermentation.js
- supply.js
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

## God Nodes (most connected - your core abstractions)
1. `verifyToken()` - 16 edges
2. `Testing — Backend` - 5 edges
3. `createUser()` - 5 edges
4. `scripts` - 4 edges
5. `models` - 4 edges
6. `truncateAll()` - 4 edges
7. `closeDb()` - 4 edges
8. `generateAccessToken()` - 3 edges
9. `generateAndStoreRefreshToken()` - 3 edges
10. `signin()` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (50 total, 9 thin omitted)

### Community 0 - "authJWT.js"
Cohesion: 0.07
Nodes (26): { Supply_Type }, config, jwt, verifyToken(), dryingController, express, router, { verifyToken } (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): bcryptjs, cookie-parser, debug, dotenv, express, http-errors, jade, jsonwebtoken (+19 more)

### Community 2 - "models/index.js"
Cohesion: 0.06
Nodes (14): { Drying, Lot }, { where }, { Sale, Lot }, db, { Op }, basename, db, fs (+6 more)

### Community 3 - "auth.controller.js"
Cohesion: 0.17
Nodes (12): bcrypt, config, db, generateAccessToken(), generateAndStoreRefreshToken(), jwt, refreshToken(), signin() (+4 more)

### Community 4 - "form.controller.js"
Cohesion: 0.15
Nodes (5): db, express, formController, router, { verifyToken }

### Community 5 - "lot.controller.js"
Cohesion: 0.15
Nodes (5): { Lot, Property, User }, express, lotController, router, { verifyToken }

### Community 6 - "app.js"
Cohesion: 0.12
Nodes (22): app, { createAssociation, createUser }, request, { truncateAll, closeDb }, closeDb(), models, truncateAll(), authConfig (+14 more)

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
Cohesion: 0.22
Nodes (5): { Crop, Variety }, cropController, express, router, { verifyToken }

### Community 14 - "README.md"
Cohesion: 0.10
Nodes (19): 🔐 Autenticación, ✨ Características, 🗂️ Estructura del proyecto, 🗃️ Modelo de datos, 🗺️ Notas conocidas y roadmap, ⚙️ Puesta en marcha, 🔌 Recursos de la API, 🔗 Repos relacionados (+11 more)

### Community 15 - "variety.js"
Cohesion: 0.22
Nodes (5): { Variety, Crop }, express, router, varietyController, { verifyToken }

### Community 16 - "property.controller.js"
Cohesion: 0.15
Nodes (5): db, express, propertyController, router, { verifyToken }

### Community 17 - "activity.controller.js"
Cohesion: 0.17
Nodes (5): { Activity, Lot }, activityController, express, router, { verifyToken }

### Community 18 - "www"
Cohesion: 0.43
Nodes (5): models, onError(), onListening(), resyncIdSequences(), start()

### Community 19 - "fermentation.js"
Cohesion: 0.22
Nodes (5): { Fermentation }, express, fermentationController, router, { verifyToken }

### Community 20 - "supply.js"
Cohesion: 0.18
Nodes (5): { Supplies, Supply_Type, User }, express, router, supplyController, { verifyToken }

### Community 21 - "user.controller.js"
Cohesion: 0.20
Nodes (4): bcrypt, { Op }, SAFE_ATTRIBUTES, { User }

### Community 22 - "user.model.js"
Cohesion: 0.33
Nodes (3): bcrypt, {
    Model
}, User

### Community 46 - "harvest.js"
Cohesion: 0.22
Nodes (5): { Harvest }, express, harvestController, router, { verifyToken }

## Knowledge Gaps
- **181 isolated node(s):** `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características`, `🧱 Stack tecnológico`, `⚙️ Puesta en marcha` (+176 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `verifyToken()` connect `authJWT.js` to `form.controller.js`, `lot.controller.js`, `crop.js`, `harvest.js`, `variety.js`, `property.controller.js`, `activity.controller.js`, `fermentation.js`, `supply.js`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.010) - this node is a cross-community bridge._
- **What connects `Tabla de contenidos`, `🚀 Sobre el proyecto`, `✨ Características` to the rest of the system?**
  _181 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `authJWT.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06507936507936508 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `models/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06451612903225806 - nodes in this community are weakly interconnected._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.12315270935960591 - nodes in this community are weakly interconnected._