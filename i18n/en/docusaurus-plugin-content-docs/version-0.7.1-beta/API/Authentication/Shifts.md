### Shift Management

The shift endpoints manage staff work schedules.

:::tip Naming convention
JSON fields use **camelCase** (`userId`, `shiftDate`, `startTime`, `endTime`, `initialAmount`, `finalAmount`, `difference`). The exception is the `user_id` query param of `GET /shifts/open`, which is kept in snake_case.
:::

### GET `/shifts`

Retrieves all shifts in the system.

**Authorization:** `shifts_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "670ee547-bc75-4c02-89ff-2cd45f12c77f",
    "userId": "f9c9d4fc-c4b7-4c42-8ae3-bb4649b34f2b",
    "shiftDate": "1753523565371",
    "startTime": "1753523565371",
    "endTime": "1753549837824",
    "notes": "Morning shift",
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
    "notes": "Afternoon shift - In progress",
    "initialAmount": 500.00,
    "finalAmount": null,
    "difference": null
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No shifts found"
```

### GET `/shifts/open`

Retrieves the currently open shift.

**Authorization:** `shifts_read`

**Query Parameters:**

- `user_id` (string, optional): Filter by specific user.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts/open?user_id=ac5f7527-3c9a-4d89-9133-ee5d8fde631e" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (Success - 200 OK):** the open `Shift` object.

**Response:** `204 No Content` if there is no open shift.

### GET `/shifts/{id}`

Retrieves a specific shift by its ID.

**Authorization:** `shifts_read`

**Path Parameters:**

- `id` (string): ID of the shift to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "userId": "ac5f7527-3c9a-4d89-9133-ee5d8fde631e",
  "shiftDate": "1753523565371",
  "startTime": "1753523565371",
  "endTime": "1753549837824",
  "notes": "Morning shift",
  "initialAmount": 500.00,
  "finalAmount": 520.00,
  "difference": 20.00
}
```

### POST `/shifts`

Creates a new shift.

**Authorization:** `shifts_create`

**Request Body:**

```json
{
  "userId": "string",
  "shiftDate": "Unix Timestamp (string)",
  "startTime": "Unix Timestamp (string)",
  "endTime": "Unix Timestamp (optional)",
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
    "notes": "Morning shift",
    "initialAmount": 500.00
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "3bbaee46-57f7-461b-9df5-bd40c61823ee",
  "message": "Shift added successfully"
}
```

**Response Body (Shift already open - 409 Conflict):**

```json
"There is already an open shift"
```

### PUT `/shifts/{id}`

Updates an existing shift.

**Authorization:** requires **both `shifts_create` AND `shifts_update`** (see note).

**Path Parameters:**

- `id` (string): ID of the shift to update.

**Request Body:**

```json
{
  "userId": "string",
  "shiftDate": "Unix Timestamp (string)",
  "startTime": "Unix Timestamp (string)",
  "endTime": "Unix Timestamp (optional)",
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
    "notes": "Shift extended for special events",
    "initialAmount": 500.00
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "message": "Shift updated successfully"
}
```

### POST `/shifts/{id}/close`

Closes an open shift.

**Authorization:** `shifts_create`

**Path Parameters:**

- `id` (string): ID of the shift to close.

**Request Body (optional):**

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

**Response Body (Success - 200 OK):**

```json
{
  "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
  "message": "Shift closed successfully"
}
```

### DELETE `/shifts/{id}`

Deletes a shift from the system.

**Authorization:** `shifts_delete`

**Path Parameters:**

- `id` (string): ID of the shift to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/shifts/03978988-42ff-4cb9-a790-c51aceb39b2b" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response:** `204 No Content` (no body).

### Notes

:::warning Double permission on PUT
In this version, `PUT /shifts/{id}` is nested inside two authorization blocks, so it requires the role to hold **both `shifts_create` and `shifts_update`** simultaneously.
:::

:::info
- Shift IDs are UUIDs generated automatically.
- The `endTime` field may be `null` for shifts in progress.
- There can be no more than one open shift: `POST /shifts` returns `409` if one already exists.
:::
