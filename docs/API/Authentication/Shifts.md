### Gestión de Turnos

Los endpoints de turnos permiten administrar los horarios de trabajo del personal.

:::tip Convención de nombres
Los campos JSON usan **camelCase** (`userId`, `shiftDate`, `startTime`, `endTime`, `initialAmount`, `finalAmount`, `difference`). La excepción es el query param `user_id` de `GET /shifts/open`, que se conserva en snake_case.
:::

### GET `/shifts`

Obtiene todos los turnos del sistema.

**Authorization:** `shifts_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "670ee547-bc75-4c02-89ff-2cd45f12c77f",
    "userId": "f9c9d4fc-c4b7-4c42-8ae3-bb4649b34f2b",
    "shiftDate": "1753523565371",
    "startTime": "1753523565371",
    "endTime": "1753549837824",
    "notes": "Turno de mañana",
    "initialAmount": 500.00,
    "finalAmount": 520.00,
    "difference": 20.00
  },
  {
    "id": "c145e48c-210e-49fd-b2fd-3b8fbaf76529",
    "userId": "b3ddbf81-7934-49ed-b495-086f8c5eda93",
    "shiftDate": "1753523565371",
    "startTime": "1753523565371",
    "endTime": null,
    "notes": "Turno de tarde - En curso",
    "initialAmount": 500.00,
    "finalAmount": null,
    "difference": null
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No shifts found"
```

### GET `/shifts/open`

Obtiene el turno abierto actualmente.

**Authorization:** `shifts_read`

**Query Parameters:**

- `user_id` (string, opcional): Filtra por usuario específico.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts/open?user_id=ac5f7527-3c9a-4d89-9133-ee5d8fde631e" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (Éxito - 200 OK):** objeto `Shift` del turno abierto.

**Response:** `204 No Content` si no hay turno abierto.

### GET `/shifts/{id}`

Obtiene un turno específico por su ID.

**Authorization:** `shifts_read`

**Path Parameters:**

- `id` (string): ID del turno a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "userId": "ac5f7527-3c9a-4d89-9133-ee5d8fde631e",
  "shiftDate": "1753523565371",
  "startTime": "1753523565371",
  "endTime": "1753549837824",
  "notes": "Turno de mañana",
  "initialAmount": 500.00,
  "finalAmount": 520.00,
  "difference": 20.00
}
```

### POST `/shifts`

Crea un nuevo turno.

**Authorization:** `shifts_create`

**Request Body:**

```json
{
  "userId": "string",
  "shiftDate": "Unix Timestamp (string)",
  "startTime": "Unix Timestamp (string)",
  "endTime": "Unix Timestamp (opcional)",
  "notes": "string",
  "initialAmount": 0.0
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/shifts" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "ac5f7527-3c9a-4d89-9133-ee5d8fde631e",
    "shiftDate": "1753523565371",
    "startTime": "1753523565371",
    "notes": "Turno de mañana",
    "initialAmount": 500.00
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "3bbaee46-57f7-461b-9df5-bd40c61823ee",
  "message": "Shift added successfully"
}
```

**Response Body (Turno ya abierto - 409 Conflict):**

```json
"There is already an open shift"
```

### PUT `/shifts/{id}`

Actualiza un turno existente.

**Authorization:** requiere **`shifts_create` Y `shifts_update`** (ver nota).

**Path Parameters:**

- `id` (string): ID del turno a actualizar.

**Request Body:**

```json
{
  "userId": "string",
  "shiftDate": "Unix Timestamp (string)",
  "startTime": "Unix Timestamp (string)",
  "endTime": "Unix Timestamp (opcional)",
  "notes": "string",
  "initialAmount": 0.0,
  "finalAmount": 0.0,
  "difference": 0.0
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "03978988-42ff-4cb9-a790-c51aceb39b2b",
    "shiftDate": "1753523565371",
    "startTime": "1753523565371",
    "endTime": "1753549837824",
    "notes": "Turno extendido por eventos especiales",
    "initialAmount": 500.00
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "message": "Shift updated successfully"
}
```

### POST `/shifts/{id}/close`

Cierra un turno abierto.

**Authorization:** `shifts_create`

**Path Parameters:**

- `id` (string): ID del turno a cerrar.

**Request Body (opcional):**

```json
{
  "finalAmount": 520.00,
  "difference": 20.00
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db/close" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "finalAmount": 520.00, "difference": 20.00 }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "message": "Shift closed successfully"
}
```

### DELETE `/shifts/{id}`

Elimina un turno del sistema.

**Authorization:** `shifts_delete`

**Path Parameters:**

- `id` (string): ID del turno a eliminar.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/shifts/03978988-42ff-4cb9-a790-c51aceb39b2b" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::warning Doble permiso en PUT
En esta versión, `PUT /shifts/{id}` está anidado dentro de dos bloques de autorización, por lo que exige que el rol tenga **`shifts_create` y `shifts_update`** simultáneamente.
:::

:::info
- Los IDs de turnos son UUID generados automáticamente.
- El campo `endTime` puede ser `null` para turnos en curso.
- No puede haber más de un turno abierto: `POST /shifts` devuelve `409` si ya existe uno.
:::
