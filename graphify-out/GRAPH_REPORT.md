# Graph Report - crea-acc-backend  (2026-08-11)

## Corpus Check
- 73 files · ~11,538 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 336 nodes · 368 edges · 46 communities (35 shown, 11 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d61bfaf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- app.js
- dependencies
- models/index.js
- auth.controller.js
- form.controller.js
- lot.controller.js
- survey.controller.js
- response.controller.js
- type_activity.controller.js
- package.json
- option.controller.js
- question.controller.js
- response_option.controller.js
- crop.js
- sale.js
- variety.js
- property.controller.js
- supply_type.js
- www
- association.js
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

## God Nodes (most connected - your core abstractions)
1. `verifyToken()` - 16 edges
2. `generateAccessToken()` - 3 edges
3. `generateAndStoreRefreshToken()` - 3 edges
4. `signin()` - 3 edges
5. `refreshToken()` - 3 edges
6. `scripts` - 3 edges
7. `User` - 3 edges
8. `Question` - 2 edges
9. `Response` - 2 edges
10. `engines` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (46 total, 11 thin omitted)

### Community 0 - "app.js"
Cohesion: 0.07
Nodes (29): config, jwt, verifyToken(), activityController, express, router, { verifyToken }, dryingController (+21 more)

### Community 1 - "dependencies"
Cohesion: 0.07
Nodes (27): bcryptjs, cookie-parser, debug, dotenv, express, http-errors, jade, jsonwebtoken (+19 more)

### Community 2 - "models/index.js"
Cohesion: 0.07
Nodes (11): { Activity, Lot }, { Drying, Lot }, { where }, { Fermentation }, { Harvest }, basename, db, fs (+3 more)

### Community 3 - "auth.controller.js"
Cohesion: 0.16
Nodes (12): bcrypt, config, db, generateAccessToken(), generateAndStoreRefreshToken(), jwt, refreshToken(), signin() (+4 more)

### Community 4 - "form.controller.js"
Cohesion: 0.15
Nodes (5): db, express, formController, router, { verifyToken }

### Community 5 - "lot.controller.js"
Cohesion: 0.15
Nodes (5): { Lot, Property, User }, express, lotController, router, { verifyToken }

### Community 6 - "survey.controller.js"
Cohesion: 0.15
Nodes (6): db, { Op }, express, router, surveyController, { verifyToken }

### Community 7 - "response.controller.js"
Cohesion: 0.17
Nodes (4): { Response }, express, responseController, router

### Community 8 - "type_activity.controller.js"
Cohesion: 0.17
Nodes (5): { Type_activity }, express, router, typeActivityController, { verifyToken }

### Community 9 - "package.json"
Cohesion: 0.17
Nodes (11): nodemon, devDependencies, nodemon, engines, node, name, private, scripts (+3 more)

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

### Community 14 - "sale.js"
Cohesion: 0.22
Nodes (5): { Sale, Lot }, express, router, saleController, { verifyToken }

### Community 15 - "variety.js"
Cohesion: 0.22
Nodes (5): { Variety, Crop }, express, router, varietyController, { verifyToken }

### Community 17 - "supply_type.js"
Cohesion: 0.25
Nodes (5): { Supply_Type }, express, router, supplyTypeController, { verifyToken }

### Community 18 - "www"
Cohesion: 0.43
Nodes (5): models, onError(), onListening(), resyncIdSequences(), start()

### Community 19 - "association.js"
Cohesion: 0.33
Nodes (3): associationController, express, router

### Community 22 - "user.model.js"
Cohesion: 0.33
Nodes (3): bcrypt, {
    Model
}, User

## Knowledge Gaps
- **143 isolated node(s):** `{ Activity, Lot }`, `db`, `config`, `jwt`, `bcrypt` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **11 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `verifyToken()` connect `app.js` to `form.controller.js`, `lot.controller.js`, `survey.controller.js`, `type_activity.controller.js`, `crop.js`, `sale.js`, `variety.js`, `supply_type.js`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `start()` (e.g. with `onError()` and `onListening()`) actually correct?**
  _`start()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `{ Activity, Lot }`, `db`, `config` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.06882591093117409 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `models/index.js` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._