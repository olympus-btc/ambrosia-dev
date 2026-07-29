### Category Management

The category endpoints let you create, retrieve, update, and delete categories for different inventory resources. Categories are grouped by `type`, which must be one of: `dish`, `ingredient`, `product`.

### GET `/categories`

Retrieves all categories of the given type.

**Authorization:** `categories_read`

**Query Parameters:**

- `type` (string, required): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/categories?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  { "id": "9f5c...", "name": "Drinks" },
  { "id": "a2d1...", "name": "Coffee shop" }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No categories added yet"
```

### GET `/categories/{id}`

Retrieves a category by its ID and type.

**Authorization:** `categories_read`

**Path Parameters:**

- `id` (string).

**Query Parameters:**

- `type` (string, required): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/categories/9f5c...?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{ "id": "9f5c...", "name": "Drinks" }
```

**Response Body (Error - 404 Not Found):** category not found.

```json
"Category not found"
```

### POST `/categories`

Creates a new category.

**Authorization:** `categories_create`

**Request Body:**

```json
{
  "name": "Drinks",
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
    "name": "Drinks",
    "type": "product"
  }'
```

**Response Body (Success - 201 Created):**

```json
{ "id": "b5a6...", "message": "Category added successfully" }
```

**Possible errors (400 Bad Request):** `Missing or malformed type`, `Failed to create category`.

### PUT `/categories/{id}`

Updates an existing category (by ID), specifying the type in the body.

**Authorization:** `categories_update`

**Path Parameters:**

- `id` (string).

**Request Body:**

```json
{
  "name": "Cold Drinks",
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
    "name": "Cold Drinks",
    "type": "product"
  }'
```

**Response Body (Success - 200 OK):**

```json
{ "id": "b5a6...", "message": "Category updated successfully" }
```

**Possible errors:**

- 400 Bad Request: `Missing or malformed ID/type`
- 404 Not Found: `Category with ID: <id> not found`

### DELETE `/categories/{id}`

Soft-deletes a category by ID and type.

**Authorization:** `categories_delete`

**Path Parameters:**

- `id` (string).

**Query Parameters:**

- `type` (string, required): `dish` | `ingredient` | `product`.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/categories/b5a6...?type=product" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response:** `204 No Content` (no body).

**Possible errors (400 Bad Request):** `Cannot delete category - it may be in use or not found`.

### Schemas

`CategoryItem` (response):

```json
{ "id": "string", "name": "string" }
```

`CategoryUpsert` (request):

```json
{ "name": "string", "type": "dish|ingredient|product" }
```

### Notes

:::info
- `type` is required and must be one of: `dish`, `ingredient`, `product`.
- Category names are unique per `type`; if one already exists with the same name and type, create/update fails (400).
- Deletion is soft (`is_deleted = 1`) and a category that is in use cannot be deleted.
:::
