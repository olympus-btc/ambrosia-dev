### Gestión de Mesas

Los endpoints de mesas permiten administrar las mesas dentro de cada espacio.

:::tip Convención de nombres
Los campos JSON usan **camelCase** (`spaceId`, `orderId`).
:::

### GET `/tables`

Obtiene todas las mesas del sistema.

**Authorization:** `tables_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/tables" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "31c4a18d-a760-4d1f-a3ca-80b184c2d56c",
    "name": "Mesa 1",
    "status": "available",
    "spaceId": "7743646d-946a-4401-96ca-f970b617485c",
    "orderId": null
  },
  {
    "id": "605850d7-1c91-45dc-aabc-2e3055d8feae",
    "name": "Mesa 2",
    "status": "occupied",
    "spaceId": "ee5078dc-8829-4c91-af1d-2096089d4608",
    "orderId": "b9f9c8c7-180c-49e5-8a45-0cfca41d2dfa"
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No tables found"
```

### GET `/tables/by-space/{id}`

Obtiene todas las mesas de un espacio específico.

**Authorization:** `tables_read`

**Path Parameters:**

- `id` (string): ID del espacio.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/tables/by-space/9c9064f5-f389-4e32-b037-805a86827777" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "9c9064f5-f389-4e32-b037-805a86827777",
    "name": "Mesa 1",
    "status": "available",
    "spaceId": "da787870-0cff-44a7-9179-ceeb49739292",
    "orderId": null
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No tables found for space ID: {id}"
```

### GET `/tables/{id}`

Obtiene una mesa específica por su ID.

**Authorization:** `tables_read`

**Path Parameters:**

- `id` (string): ID de la mesa a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/tables/8dacb80d-0694-4a11-bab0-01a877fea66d" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "2056766b-dcd7-4bb7-a3c7-40d953592195",
  "name": "Mesa 1",
  "status": "available",
  "spaceId": "ded606ff-2d0b-4f89-8352-9d34355043be",
  "orderId": null
}
```

### POST `/tables`

Crea una nueva mesa.

**Authorization:** `tables_create`

**Request Body:**

```json
{
  "name": "string",
  "status": "available",
  "spaceId": "string",
  "orderId": null
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/tables" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mesa 5",
    "status": "available",
    "spaceId": "1a1a67c9-15bf-4f18-aadd-896308ff51c2",
    "orderId": null
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "a77d20d1-49d2-4f6a-af3c-96eb89c5cfcb",
  "message": "Table added successfully"
}
```

### PUT `/tables/{id}`

Actualiza una mesa existente.

**Authorization:** `tables_update`

**Path Parameters:**

- `id` (string): ID de la mesa a actualizar.

**Request Body:**

```json
{
  "name": "string",
  "status": "available|occupied|reserved",
  "spaceId": "string",
  "orderId": "string"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/tables/7088369e-ad06-4ec6-8cc0-68465a395877" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mesa 1 VIP",
    "status": "occupied",
    "spaceId": "c5a51221-851d-4b7e-b534-1847091fcc09",
    "orderId": "d7c7a43c-7884-48b1-82c4-a18e48aafef8"
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "a77d20d1-49d2-4f6a-af3c-96eb89c5cfcb",
  "message": "Table updated successfully"
}
```

### DELETE `/tables/{id}`

Elimina una mesa del sistema.

**Authorization:** `tables_delete`

**Path Parameters:**

- `id` (string): ID de la mesa a eliminar.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/tables/fc5566ef-6e4c-465f-a1ad-d9ff5dfbb92a" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::info
- Los IDs de mesas son UUID generados automáticamente.
- Una mesa debe estar asociada a un espacio válido (`spaceId`).
- Los estados válidos de mesa son: `available`, `occupied`, `reserved`.
- El campo `orderId` se establece cuando hay una orden activa en la mesa.
:::
