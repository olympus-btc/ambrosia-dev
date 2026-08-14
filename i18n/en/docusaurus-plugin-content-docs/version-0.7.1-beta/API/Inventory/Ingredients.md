### Ingredient Management

The ingredient endpoints manage the inventory of raw materials.

:::tip Naming convention
JSON fields use **camelCase** (`categoryId`, `lowStockThreshold`, `costPerUnit`).
:::

### GET `/ingredients`

Retrieves all ingredients in the inventory.

**Authorization:** `ingredients_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/ingredients" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "9bd8a46f-9a41-40a7-bb7b-c31567cdc7c1",
    "name": "Rice",
    "categoryId": "b80b3b3f-4fc4-4fab-a988-182de6985c27",
    "quantity": 50.0,
    "unit": "kg",
    "lowStockThreshold": 10.0,
    "costPerUnit": 2.50
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No ingredients found"
```

### GET `/ingredients/{id}`

Retrieves a specific ingredient by its ID.

**Authorization:** `ingredients_read`

**Path Parameters:**

- `id` (string): ID of the ingredient to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/ingredients/abae1423-ba25-49c2-b54a-d0d55c727baf" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "a9cf05f5-e99e-47a5-a50f-bb3546d75a50",
  "name": "Rice",
  "categoryId": "8425ff0d-2322-4c92-875b-588002a8e0e9",
  "quantity": 50.0,
  "unit": "kg",
  "lowStockThreshold": 10.0,
  "costPerUnit": 2.50
}
```

### GET `/ingredients/low_stock/{threshold}`

Retrieves ingredients with low stock.

**Authorization:** `ingredients_read`

**Path Parameters:**

- `threshold` (float): validated as a number, but see the note.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/ingredients/low_stock/15.0" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "91b0df69-ee28-4e48-bd8f-419cb8fd184f",
    "name": "Rice",
    "categoryId": "54d14313-badf-447c-88a6-5342f09cca22",
    "quantity": 8.0,
    "unit": "kg",
    "lowStockThreshold": 10.0,
    "costPerUnit": 2.50
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No low stock ingredients found"
```

:::warning Ignored parameter
In this version, the `{threshold}` value is **validated** (it must be a number, otherwise `400`) but **not used**: the service returns ingredients below their own per-record `lowStockThreshold`, ignoring the path parameter.
:::

### POST `/ingredients`

Creates a new ingredient.

**Authorization:** `ingredients_create`

**Request Body:**

```json
{
  "name": "string",
  "categoryId": "string",
  "quantity": 0.0,
  "unit": "string",
  "lowStockThreshold": 0.0,
  "costPerUnit": 0.0
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/ingredients" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Olive Oil",
    "categoryId": "e13018bf-ffa3-4b22-aa35-6e782f29302a",
    "quantity": 20.0,
    "unit": "liters",
    "lowStockThreshold": 5.0,
    "costPerUnit": 4.50
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "ab68898f-7f1a-4ecc-a7c4-40974727564c",
  "message": "Ingredient added successfully"
}
```

### PUT `/ingredients/{id}`

Updates an existing ingredient.

**Authorization:** `ingredients_update`

**Path Parameters:**

- `id` (string): ID of the ingredient to update.

**Request Body:**

```json
{
  "name": "string",
  "categoryId": "string",
  "quantity": 0.0,
  "unit": "string",
  "lowStockThreshold": 0.0,
  "costPerUnit": 0.0
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/ingredients/11993e13-b748-4634-ab78-2080f212e98e" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bomba Rice",
    "categoryId": "e13018bf-ffa3-4b22-aa35-6e782f29302a",
    "quantity": 60.0,
    "unit": "kg",
    "lowStockThreshold": 15.0,
    "costPerUnit": 3.00
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "ab68898f-7f1a-4ecc-a7c4-40974727564c",
  "message": "Ingredient updated successfully"
}
```

### DELETE `/ingredients/{id}`

Deletes an ingredient from the inventory.

**Authorization:** `ingredients_delete`

**Path Parameters:**

- `id` (string): ID of the ingredient to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/ingredients/e13018bf-ffa3-4b22-aa35-6e782f29302a" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

### Notes

:::info
- An ingredient must be associated with a valid category (`categoryId`).
- Units can be: kg, liters, grams, units, etc.
- `costPerUnit` is used to compute dish costs.
:::
