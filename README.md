<a name="top"></a>
<p align="center">
  <img src="./docs/banner.svg" alt="CREA / CIR-ACC — Backend" width="100%" />
</p>

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?logo=node.js&logoColor=white" alt="Node.js >= 18"></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express 4"></a>
  <a href="https://sequelize.org/"><img src="https://img.shields.io/badge/Sequelize-6-52B0E7?logo=sequelize&logoColor=white" alt="Sequelize 6"></a>
  <a href="https://neon.tech/"><img src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" alt="PostgreSQL / Neon"></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/Auth-JWT-000000?logo=jsonwebtokens&logoColor=white" alt="JWT auth"></a>
  <a href="./TESTING.md"><img src="https://img.shields.io/badge/tests-Jest%20%2B%20Supertest-C21325?logo=jest&logoColor=white" alt="Jest + Supertest"></a>
  <br/>
  <img src="https://img.shields.io/badge/estado-en%20desarrollo-yellow" alt="En desarrollo">
  <a href="https://github.com/CIR-TIC/crea-acc-backend"><img src="https://img.shields.io/github/last-commit/CIR-TIC/crea-acc-backend" alt="Último commit"></a>
</p>

<p align="center">
  API REST de trazabilidad de producción de café para el proyecto <strong>CREA (CIR-ACC)</strong>.<br/>
  Consumida por la app móvil offline-first <a href="https://github.com/CIR-TIC/cir-acc-mobile"><code>cir-acc-mobile</code></a>.
</p>

---

## Tabla de contenidos

- [🚀 Sobre el proyecto](#-sobre-el-proyecto)
- [✨ Características](#-características)
- [🧱 Stack tecnológico](#-stack-tecnológico)
- [⚙️ Puesta en marcha](#️-puesta-en-marcha)
- [🔑 Variables de entorno](#-variables-de-entorno)
- [📜 Scripts](#-scripts)
- [🗂️ Estructura del proyecto](#️-estructura-del-proyecto)
- [🔐 Autenticación](#-autenticación)
- [🔌 Recursos de la API](#-recursos-de-la-api)
- [🗃️ Modelo de datos](#️-modelo-de-datos)
- [🧪 Testing](#-testing)
- [🗺️ Notas conocidas y roadmap](#️-notas-conocidas-y-roadmap)
- [🔗 Repos relacionados](#-repos-relacionados)

## 🚀 Sobre el proyecto

**CREA (CIR-ACC)** es un sistema de trazabilidad para la producción de café: registra productores, sus propiedades (fincas), los lotes de cultivo dentro de cada propiedad, y cada actividad del ciclo del café — siembra, cosecha, secado, fermentación y venta — junto con el inventario de insumos usado en cada una. Además incluye un motor de **encuestas dinámicas** que usan los encuestadores en campo.

Este repositorio es el backend: expone todo lo anterior como una API REST consumida por la app móvil, que trabaja **offline-first** y sincroniza contra este servidor cuando hay conexión.

## ✨ Características

- 🔑 Autenticación con JWT (access + refresh token) y contraseñas hasheadas con bcrypt.
- 🌱 Modelo de dominio completo del ciclo del café: propiedades, lotes, actividades y sus variantes (cosecha, secado, fermentación, venta), inventario de insumos.
- 📋 Motor de encuestas dinámicas desacoplado del dominio de café (formularios, preguntas, opciones, envíos y respuestas), reutilizable para cualquier tipo de encuesta.
- 🛡️ Autorización basada en el rol del usuario y en la propiedad a la que pertenece (un productor solo ve/edita su propia finca).
- 🗣️ Mensajes de error consistentes y en español para toda la API.
- 🧪 Suite de tests de integración contra una base de datos Postgres real (no mocks).

## 🧱 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Runtime | Node.js 18+ |
| Framework HTTP | Express 4 |
| ORM | Sequelize 6 |
| Base de datos | PostgreSQL, hospedada en [Neon](https://neon.tech) |
| Autenticación | `jsonwebtoken` + `bcryptjs` |
| Tests | Jest + Supertest |
| Despliegue previsto | [Render](https://render.com) (API) + Neon (base de datos) |

## ⚙️ Puesta en marcha

```bash
git clone https://github.com/CIR-TIC/crea-acc-backend.git
cd crea-acc-backend

npm install
cp .env.example .env   # completar con tus credenciales, ver tabla abajo

npm run dev             # http://localhost:3000, con recarga automática (nodemon)
```

Al arrancar, `bin/www` crea automáticamente los esquemas `app` y `form` si no existen y sincroniza los modelos de Sequelize contra la base de datos (`sequelize.sync()`) — no hace falta correr migraciones manuales para empezar a desarrollar.

## 🔑 Variables de entorno

| Variable | Descripción |
|---|---|
| `NODE_ENV` | `development`, `test` o `production` |
| `PORT` | Puerto HTTP del servidor (por defecto `3000`) |
| `DATABASE_URL` | Cadena de conexión de Postgres, ej. `postgresql://user:pass@host/db?sslmode=require` |
| `JWT_SECRET` | Secreto usado para firmar los access tokens |

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Levanta el servidor en modo desarrollo (nodemon, recarga automática) |
| `npm start` | Levanta el servidor en modo producción |
| `npm test` | Corre la suite de tests de integración — ver [TESTING.md](./TESTING.md) |

## 🗂️ Estructura del proyecto

```
bin/www              Punto de arranque: crea esquemas, sincroniza modelos, resincroniza secuencias
app.js               Configuración de Express y montaje de rutas
config/              Configuración de Sequelize (config.js) y JWT (auth.config.js)
models/              Modelos de Sequelize (uno por tabla) + asociaciones
controllers/         Lógica de negocio por recurso
routes/              Definición de endpoints REST por recurso
middlewares/         authJWT.js — verificación de JWT (req.userId)
tests/               Tests de integración (Jest + Supertest) — ver TESTING.md
```

## 🔐 Autenticación

| Endpoint | Descripción |
|---|---|
| `POST /auth/signup` | Registro de usuario (rol `pollster` o `producer`) |
| `POST /auth/signin` | Login — responde `accessToken` + `refreshToken` |
| `POST /auth/refreshToken` | Renueva el access token |

Los endpoints protegidos requieren el header `Authorization: Bearer <accessToken>` (o `x-access-token`). El middleware `verifyToken` decodifica el token y expone `req.userId`; los controladores buscan al usuario autenticado a partir de ese id cuando necesitan su rol o su `property_id`.

## 🔌 Recursos de la API

| Prefijo | Recurso |
|---|---|
| `/auth` | Login, registro, refresh de tokens |
| `/users` | Perfil del usuario autenticado — `GET /users/me`, `PUT /users/me/password`, `GET /users/hasProperty` |
| `/properties` | Propiedades (fincas). Un `producer` solo puede ver/editar la suya propia — `GET /properties/me`, `GET /properties/:id` |
| `/lots` | Lotes de cultivo dentro de una propiedad |
| `/activities` | Actividades registradas sobre un lote |
| `/harvests`, `/dryings`, `/fermentations`, `/sales` | Detalle específico por tipo de actividad |
| `/type_activities`, `/crops`, `/variety` | Catálogos de apoyo |
| `/supplies`, `/supply_types` | Inventario de insumos por propiedad |
| `/association` | Asociaciones de productores |
| `/forms`, `/questions`, `/options` | Definición de encuestas dinámicas (esquema `form`) |
| `/surveys`, `/submissions`, `/response_options` | Envíos de encuestas y respuestas |

## 🗃️ Modelo de datos

Los modelos viven en dos esquemas de Postgres:

- **`app`** — dominio de negocio: usuarios, propiedades, lotes, actividades, insumos, asociaciones.
- **`form`** — motor de encuestas dinámicas (formularios, preguntas, opciones, envíos y respuestas), independiente del dominio de café para poder reutilizarse con cualquier tipo de encuesta.

<details>
<summary>Ver diagrama entidad-relación del motor de encuestas (<code>form.*</code>)</summary>

```mermaid
erDiagram
    form ||--o{ question : "defines"
    question ||--o{ option : "has"
    form ||--o{ survey_submission : "submitted_as"
    survey_submission ||--o{ response_answer : "contains"
    question ||--o{ response_answer : "answers_to"
    response_answer ||--o{ option : "selects_single"
    response_answer ||--o{ response_selected_option : "selects_multiple"
    option ||--o{ response_selected_option : "is_selected"

    form {
        INTEGER id PK
        VARCHAR(255) title
        TEXT description
        TIMESTAMP_WITH_TIME_ZONE created_at
        TIMESTAMP_WITH_TIME_ZONE last_updated_at
    }

    question {
        INTEGER id PK
        INTEGER form_id FK
        TEXT label
        VARCHAR(50) input_type
        VARCHAR(50) question_type
        INTEGER position
        BOOLEAN is_required
        JSONB metadata
        TIMESTAMP_WITH_TIME_ZONE created_at
        TIMESTAMP_WITH_TIME_ZONE last_updated_at
    }

    option {
        INTEGER id PK
        INTEGER question_id FK
        VARCHAR(255) value
        INTEGER position
        TIMESTAMP_WITH_TIME_ZONE created_at
        TIMESTAMP_WITH_TIME_ZONE last_updated_at
    }

    survey_submission {
        INTEGER id PK
        INTEGER form_id FK
        VARCHAR(100) submission_code
        TIMESTAMP_WITH_TIME_ZONE submitted_at
        INTEGER submitted_by_user_id FK
        TIMESTAMP_WITH_TIME_ZONE created_at
        TIMESTAMP_WITH_TIME_ZONE last_updated_at
    }

    response_answer {
        INTEGER id PK
        INTEGER survey_submission_id FK
        INTEGER question_id FK
        TEXT text_value
        INTEGER selected_option_id FK
        TIMESTAMP_WITH_TIME_ZONE created_at
        TIMESTAMP_WITH_TIME_ZONE last_updated_at
    }

    response_selected_option {
        INTEGER response_answer_id PK,FK
        INTEGER option_id PK,FK
    }
```

</details>

## 🧪 Testing

```bash
npm test
```

Tests de integración con Jest + Supertest contra una base de datos Postgres real y separada (no mocks). Ver [TESTING.md](./TESTING.md) para cómo está armado el entorno de pruebas y una tabla actualizada de qué endpoints están cubiertos hoy.

## 🗺️ Notas conocidas y roadmap

> [!NOTE]
> El enum de roles de usuario solo admite `pollster` y `producer`; no existe todavía un rol `admin`. Por eso `GET /properties` (listado de todas las propiedades) siempre responde `403` en la práctica, y la eliminación de propiedades no está expuesta como endpoint hasta definir una estrategia de autorización para operaciones administrativas.

- [ ] Definir rol `admin` y su estrategia de autorización.
- [ ] Sumar tests de integración para el resto de recursos (`lots`, `activities`, `supplies`, `surveys`).
- [ ] Configurar despliegue en Render para el ambiente de producción.

## 🔗 Repos relacionados

- [`cir-acc-mobile`](https://github.com/CIR-TIC/cir-acc-mobile) — app móvil (Expo/React Native) que consume esta API.

---

<p align="center"><a href="#top">⬆️ volver arriba</a></p>
