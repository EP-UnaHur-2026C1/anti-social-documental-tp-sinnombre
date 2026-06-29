# Feedback del Trabajo Práctico (TP2 — MongoDB)

## Integrantes

Según el padrón, el equipo está integrado por dos personas:

- **Cristian Monzón** (`ivanm93`) — realizó la totalidad del trabajo.
- **Alan Valdez** — no registra commits en el repositorio.

> En la práctica, todo el desarrollo lo sostuvo Monzón. Teniendo eso en cuenta, el alcance logrado es muy destacable. 👏

---

## Resumen General

¡Muy buen trabajo! 🎉 Aunque todo el desarrollo lo sostuvo un solo integrante (Monzón), resuelve el MVP de forma muy completa: modelado documental **referenciado**, CRUD de cada entidad, rutas para las relaciones, validación de `ObjectId` y —lo más importante— la **regla de los comentarios antiguos aplicada y configurable** mediante un middleware. La documentación incluye Swagger y colección de Postman, y hasta se animaron a sumar temas que exceden la materia (hash de contraseñas, verificación por email).

### Estado por criterio

| Criterio        | Estado | Comentario breve |
|-----------------|:------:|------------------|
| Arquitectura    |   ✅   | Capas claras; un middleware por responsabilidad. |
| Modelado        |   ✅   | Referenciado coherente; `nickName` único. |
| Validaciones    |   ⚠️   | Validan obligatoriedad, pero no la existencia de las referencias (Obs. 1). |
| Middlewares     |   ✅   | `validateObjectId` (con `isValid`) y `commentsVisibility` reutilizables. |
| API REST        |   ✅   | CRUD + relaciones (tags, imágenes). |
| Configuración   |   ✅   | `MONGO_URI` y `COMMENTS_VISIBLE_MONTHS` por `.env`. |
| Documentación   |   ✅   | Swagger + colección de Postman + Docker. |

---

## Fortalezas

### 1. Regla de comentarios antiguos en un middleware, aplicada y configurable ⏳
**Ubicación:** `src/middlewares/commentsVisibility.js`, `src/controllers/comment.controller.js`

El middleware calcula la fecha límite desde `COMMENTS_VISIBLE_MONTHS` y la deja en `req.limitDate`; los controladores la usan para filtrar:

```js
const comments = await Comment.find({ createdAt: { $gte: req.limitDate } })...
```

Se aplica en el listado y en el detalle de comentarios (que devuelve 404 “no visible” si está fuera de la ventana), y el umbral es configurable. Encapsularlo en un middigleware reutilizable es una decisión muy linda. 🎯

### 2. Validación de `ObjectId` correcta ♻️
**Ubicación:** `src/middlewares/validateObjectId.js`

Usa `mongoose.Types.ObjectId.isValid` y se aplica en las rutas con `:id`, devolviendo 400 ante un id mal formado. Es el chequeo que la materia espera para Mongo.

### 3. Modelado referenciado coherente 🗃️
**Ubicación:** `src/models/`

Entidades separadas con referencias (`author`, `postId`, `tags`, `images`), `nickName` único, y `populate` para navegarlas. Decisión clara y consistente.

### 4. Documentación y prácticas extra 📚🔐
**Ubicación:** `docs/`, `Unahur Anti-social Net.postman_collection.json`, `src/models/User.js`

Swagger, colección de Postman y Docker. Además sumaron hash de contraseñas (bcrypt) y verificación por email, que están **por encima** de lo pedido: un plus de iniciativa.

---

## Observaciones

### 1. Las validaciones no verifican la existencia de las referencias

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/middlewares/validateComment.js`, `src/controllers/post.controller.js` (`addTagToPost`, `addImageToPost`)

**Descripción:**
`validateComment`/`validatePost` chequean que los campos obligatorios estén presentes, pero no que el `author`/`postId`/`tagId` **existan** en la base. Y `addTagToPost`/`addImageToPost` hacen `Post.findById(...)` seguido de `post.tags.push(...)` sin verificar que el post exista: si el id es válido pero no corresponde a ningún post, `post` es `null` y la operación falla con error de servidor.

**Impacto:**
Permite crear comentarios/posts con referencias inexistentes, y algunas rutas de relación responden 500 en vez de un 404 claro.

**Recomendación:**
Sumar una verificación de existencia (un pequeño middleware genérico `existeMiddleware(Modelo)`, similar a `validateObjectId`) antes de crear o asociar, y chequear `if (!post) return 404` en los controladores de relación.

---

### 2. Las rutas de relación reciben los ids por body y sin validar formato

**Estado:** ⚠️  **Severidad:** 🟡 Mejora recomendada
**Ubicación:** `src/routes/post.routes.js` (`/add-tag`, `/add-image`, `/remove-tag`, `/remove-image`)

**Descripción:**
Estas rutas toman `postId`/`tagId`/`imageId` del **body** y no pasan por `validateObjectId`, a diferencia de las rutas con `:id`. Un id mal formado no se valida antes de consultar.

**Recomendación:**
Modelarlas como sub-recursos con parámetros de ruta (por ejemplo `POST /posts/:id/tags/:tagId`) y reutilizar `validateObjectId`, para mantener la consistencia con el resto de la API.

---

## Conclusión

Es una entrega muy completa y prolija (sostenida por un solo integrante, Monzón): la regla de negocio resuelta y configurable en un middleware, validación de `ObjectId`, modelado referenciado coherente, buena documentación y hasta extras fuera de programa. 🌟

Los ajustes son menores y van en la línea de reforzar la integridad referencial y unificar las rutas de relación. ¡Felicitaciones por el esfuerzo y la prolijidad! 🚀
