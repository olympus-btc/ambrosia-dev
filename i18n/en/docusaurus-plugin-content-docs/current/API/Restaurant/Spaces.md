### Space Management

The space endpoints manage the physical areas of the establishment.

### GET `/spaces`

Retrieves all spaces in the establishment.

**Authorization:** `spaces_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/spaces" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  { "id": "9214936c-0d95-4101-97ac-a2f04e4929bd", "name": "Terrace" },
  { "id": "9008646f-b24b-4e14-9c4a-00cec2d124da", "name": "Main Hall" }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No spaces found"
```

### GET `/spaces/{id}`

Retrieves a specific space by its ID.

**Authorization:** `spaces_read`

**Path Parameters:**

- `id` (string): ID of the space to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/spaces/34fe7489-74e9-4e7a-968a-66cd0cdc00d7" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "34fe7489-74e9-4e7a-968a-66cd0cdc00d7",
  "name": "Terrace"
}
```

### POST `/spaces`

Creates a new space.

**Authorization:** `spaces_create`

**Request Body:**

```json
{
  "name": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/spaces" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Outdoor Garden" }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "cadd2c99-3a87-4fb6-802d-9a57b4c05ba5",
  "message": "Space added successfully"
}
```

### PUT `/spaces/{id}`

Updates an existing space.

**Authorization:** `spaces_update`

**Path Parameters:**

- `id` (string): ID of the space to update.

**Request Body:**

```json
{
  "name": "string"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/spaces/9008646f-b24b-4e14-9c4a-00cec2d124da" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Renovated Terrace" }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "9008646f-b24b-4e14-9c4a-00cec2d124da",
  "message": "Space updated successfully"
}
```

### DELETE `/spaces/{id}`

Deletes a space from the system.

**Authorization:** `spaces_delete`

**Path Parameters:**

- `id` (string): ID of the space to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/spaces/9008646f-b24b-4e14-9c4a-00cec2d124da" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

**Response Body (Error - 400 Bad Request):** if the space does not exist or cannot be deleted.

```json
"Space not found"
```

### Notes

:::info
- Space IDs are UUIDs generated automatically.
- A space can contain multiple tables.
- A space that has tables assigned cannot be deleted (returns `400`).
:::
