### Gestión de Categorías

Los endpoints de categorías permiten crear, consultar, actualizar y eliminar categorías para distintos tipos de recursos del inventario. Las categorías se agrupan por `type`, que debe ser uno de: `dish`, `ingredient`, `product`.

### GET `/categories`

Obtiene todas las categorías del tipo indicado.

**Authorization:** `categories_read`

**Query Parameters:**

- `type` (string, requerido): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/categories?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  { "id": "9f5c...", "name": "Bebidas" },
  { "id": "a2d1...", "name": "Cafetería" }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No categories added yet"
```

### GET `/categories/{id}`

Obtiene una categoría por su ID y tipo.

**Authorization:** `categories_read`

**Path Parameters:**

- `id` (string).

**Query Parameters:**

- `type` (string, requerido): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/categories/9f5c...?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{ "id": "9f5c...", "name": "Bebidas" }
```

**Response Body (Error - 404 Not Found):** categoría no encontrada.

```json
"Category not found"
```

### POST `/categories`

Crea una nueva categoría.

**Authorization:** `categories_create`

**Request Body:**

```json
{
  "name": "Bebidas",
  "type": "product"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/categories" \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -d '{
    "name": "Bebidas",
    "type": "product"
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{ "id": "b5a6...", "message": "Category added successfully" }
```

**Posibles errores (400 Bad Request):** `Missing or malformed type`, `Failed to create category`.

### PUT `/categories/{id}`

Actualiza una categoría existente (por ID), indicando el tipo en el body.

**Authorization:** `categories_update`

**Path Parameters:**

- `id` (string).

**Request Body:**

```json
{
  "name": "Bebidas Frías",
  "type": "product"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/categories/b5a6..." \
  -H "Content-Type: application/json" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -d '{
    "name": "Bebidas Frías",
    "type": "product"
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{ "id": "b5a6...", "message": "Category updated successfully" }
```

**Posibles errores:**

- 400 Bad Request: `Missing or malformed ID/type`
- 404 Not Found: `Category with ID: <id> not found`

### DELETE `/categories/{id}`

Elimina (lógico) una categoría por ID y tipo.

**Authorization:** `categories_delete`

**Path Parameters:**

- `id` (string).

**Query Parameters:**

- `type` (string, requerido): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/categories/b5a6...?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

**Posibles errores (400 Bad Request):** `Cannot delete category - it may be in use or not found`.

### Esquemas

`CategoryItem` (respuesta):

```json
{ "id": "string", "name": "string" }
```

`CategoryUpsert` (petición):

```json
{ "name": "string", "type": "dish|ingredient|product" }
```

### Notas

:::info
- `type` es obligatorio y debe ser uno de: `dish`, `ingredient`, `product`.
- Los nombres de categorías son únicos por `type`; si ya existe una con el mismo nombre y tipo, la creación/actualización falla (400).
- El borrado es lógico (`is_deleted = 1`) y no es posible eliminar una categoría que esté en uso.
:::
