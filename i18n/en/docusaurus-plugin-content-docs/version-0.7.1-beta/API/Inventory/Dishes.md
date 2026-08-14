### Dish Management

The dish endpoints manage the restaurant's menu with all available dishes.

### GET `/dishes`

Retrieves all dishes in the system.

**Authorization:** `dish_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/dishes" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "name": "Margherita Pizza",
    "price": 15.99,
    "categoryId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No dishes found"
```

### GET `/dishes/{id}`

Retrieves a specific dish by its ID.

**Authorization:** `dish_read`

**Path Parameters:**

- `id` (string): ID of the dish to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/dishes/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "name": "Margherita Pizza",
  "price": 15.99,
  "categoryId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
}
```

### POST `/dishes`

Creates a new dish in the system.

**Authorization:** `dish_create`

**Request Body:**

```json
{
  "name": "string",
  "price": 0.0,
  "categoryId": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/dishes" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pasta Carbonara",
    "price": 18.75,
    "categoryId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "new-dish-uuid",
  "message": "Dish added successfully"
}
```

### PUT `/dishes/{id}`

Updates an existing dish.

**Authorization:** `dish_update`

**Path Parameters:**

- `id` (string): ID of the dish to update.

**Request Body:**

```json
{
  "name": "string",
  "price": 0.0,
  "categoryId": "string"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/dishes/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Margherita Pizza Premium",
    "price": 17.99,
    "categoryId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Dish updated successfully"
}
```

### DELETE `/dishes/{id}`

Deletes a dish from the system.

**Authorization:** `dish_delete`

**Path Parameters:**

- `id` (string): ID of the dish to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/dishes/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

### Notes

:::info
- Permissions use the **`dish_`** prefix in singular (`dish_read`, `dish_create`, `dish_update`, `dish_delete`).
- Dish IDs are UUIDs generated automatically.
- The `categoryId` field must reference an existing dish category.
- The `name`, `price`, and `categoryId` fields are required.
:::
