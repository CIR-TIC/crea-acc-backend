# Testing — Backend

Tests de integración con **Jest** + **Supertest**: se levanta la app de Express (`app.js`, sin `listen`) y se le hacen requests HTTP reales contra una base de datos Postgres real y separada, no mocks.

## Cómo correr los tests

```bash
npm test
```

## Cómo está armado

- **Base de datos de pruebas**: un proyecto Neon aparte no es necesario — basta con una segunda base de datos dentro del mismo proyecto/branch de Postgres (por convención `<nombre_db>_test`). Se configura en `.env.test` (no se commitea; ver `.env.test.example` como plantilla) con `NODE_ENV=test`.
- **`jest.config.js`**:
  - `setupFiles` carga `.env.test` antes de cada archivo de test.
  - `globalSetup` recrea los esquemas `app` y `form` desde cero (`DROP SCHEMA ... CASCADE` + `sequelize.sync()`) una sola vez antes de correr toda la suite.
  - `maxWorkers: 1` para que los archivos de test corran en serie contra la misma base compartida.
- **`tests/helpers/db.js`**: `truncateAll()` vacía todas las tablas (con `RESTART IDENTITY CASCADE`) — se llama en un `beforeEach` de cada archivo de test para que los tests no interfieran entre sí.
- **`tests/helpers/factories.js`**: helpers para crear datos de prueba directo contra los modelos de Sequelize (`createAssociation`, `createUser`, `createProperty`, `createForm`, `createSection`, `createQuestion`, `createOption`, `createSurveySubmission`, `createResponse`) y para generar un JWT válido (`tokenFor(userId)`) sin pasar por el endpoint de login.

## Qué está cubierto hoy

| Archivo | Cubre |
|---|---|
| `tests/auth.test.js` | `POST /auth/signup` (registro exitoso, email duplicado, cédula duplicada) y `POST /auth/signin` (login exitoso, contraseña incorrecta, usuario no encontrado) — incluyendo que los mensajes de error estén en español |
| `tests/property.test.js` | `POST /properties` (creación y asociación al usuario, validación de campos, 403 sin token), `GET /properties` (403 para no-administradores), `GET /properties/:propertyId` y `GET /properties/me` (un producer puede ver su propia propiedad, no la de otros; 404 si no existe) |
| `tests/user.test.js` | `GET /users/me` (perfil sin exponer la contraseña, 403 sin token) y `PUT /users/me/password` (cambio exitoso verificando login con la clave nueva, 401 si la actual es incorrecta y no cambia nada, 400 si la nueva es muy corta) |
| `tests/survey.test.js` | `POST /forms` (detalle anidado con secciones/preguntas/opciones, 400 sin id, 404, 403 sin token), `GET /forms` (403 sin token), `POST /surveys` (envío con texto/número/radio/checkbox, checkbox opcional vacío no crea respuesta, 400 si falta una pregunta obligatoria aunque no venga en el body, 400 número inválido o fuera de `min_value`/`max_value`, 400 opción que no pertenece a la pregunta, 404 formulario inexistente, 409 código de envío duplicado, 403 sin token), `POST /surveys/getSurveySubmissionDetails` (detalle con opciones seleccionadas, 400/404/403) |
| `tests/response.test.js` | `POST /submissions` (`createResponse`: respuesta de texto, 400 si la opción no pertenece a la pregunta, 409 respuesta duplicada para la misma pregunta/envío, 403 sin token), `GET/PUT/DELETE /submissions/:id`, `POST /response_options` (`createResponseOption`: selección válida, 400 opción ajena a la pregunta de la respuesta, 409 selección duplicada, 403 sin token) |

El resto de recursos (`lots`, `activities`, `supplies`, etc.) todavía no tienen tests — son el siguiente candidato natural a cubrir. Sin cubrir dentro del dominio de encuestas: `question.controller.js` y `option.controller.js` (CRUD simple sin validación propia, ejercitado indirectamente vía los tests de `/forms`), y `updateSurvey`/`deleteSurvey`.

## Convención para sumar tests nuevos

1. Un archivo por recurso: `tests/<recurso>.test.js` (ej. `tests/lot.test.js`).
2. `beforeEach` con `truncateAll()` al inicio de cada archivo, `afterAll` con `closeDb()` al final — copiar el patrón de `tests/property.test.js`.
3. Usar los helpers de `tests/helpers/factories.js` para crear datos base; si un recurso nuevo necesita su propio factory (ej. `createLot`), agregarlo ahí en vez de duplicar `models.X.create(...)` en cada test.
4. Para cada endpoint nuevo, cubrir como mínimo: el caso feliz, un caso de validación fallida, y el caso de autorización (sin token / usuario sin permiso).
5. Actualizar la tabla de "Qué está cubierto hoy" de este archivo con el archivo y una frase de qué prueba.
