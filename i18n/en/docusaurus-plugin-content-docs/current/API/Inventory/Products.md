### Product Management

The product endpoints let you create, retrieve, update, and delete inventory products (Store module).

:::tip Naming convention
JSON fields use **camelCase** (`imageUrl`, `costCents`, `categoryIds`, `minStockThreshold`, `maxStockThreshold`, `priceCents`). The `SKU` field is uppercase as-is.
:::

### GET `/products`

Retrieves all products.

**Authorization:** `products_read`

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/products \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "b5a6...",
    "SKU": "SKU-0001",
    "name": "Americano coffee",
    "description": "240ml cup of coffee",
    "imageUrl": null,
    "costCents": 5000,
    "categoryIds": ["9f5c..."],
    "quantity": 10,
    "minStockThreshold": 5,
    "maxStockThreshold": 100,
    "priceCents": 25000
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No products found"
```

### GET `/products/{id}`

Retrieves a product by its ID.

**Authorization:** `products_read`

**Path Parameters:**

- `id` (string).

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/products/b5a6... \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Not found - 404 Not Found):**

```json
"Product not found"
```

### POST `/products`

Creates a new product.

**Authorization:** `products_create`

**Request Body:**

```json
{
  "SKU": "SKU-0001",
  "name": "Americano coffee",
  "description": "240ml cup of coffee",
  "imageUrl": null,
  "costCents": 5000,
  "categoryIds": ["9f5c..."],
  "quantity": 10,
  "minStockThreshold": 5,
  "maxStockThreshold": 100,
  "priceCents": 25000
}
```

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:9154/products \
  -H 'Content-Type: application/json' \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -d '{
    "SKU": "SKU-0001",
    "name": "Americano coffee",
    "costCents": 5000,
    "categoryIds": ["9f5c..."],
    "quantity": 10,
    "minStockThreshold": 5,
    "maxStockThreshold": 100,
    "priceCents": 25000
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "b5a6...",
  "message": "Product added successfully"
}
```

**Response Body (Invalid data - 400 Bad Request):**

```json
{
  "message": "Invalid product data"
}
```

**Response Body (Duplicate SKU - 409 Conflict):**

```json
{
  "message": "SKU already exists"
}
```

### PUT `/products/{id}`

Updates an existing product.

**Authorization:** `products_update`

**Path Parameters:**

- `id` (string).

**Request Body:** same as creation, with the updated fields.

**Response Body (Success - 200 OK):**

```json
{
  "id": "b5a6...",
  "message": "Product updated successfully"
}
```

**Response Body (Not found - 404 Not Found):**

```json
{
  "message": "Product with ID b5a6... not found"
}
```

**Response Body (Duplicate SKU - 409 Conflict):**

```json
{
  "message": "SKU already exists"
}
```

### POST `/products/stock`

Adjusts the stock of one or more products. `quantity` may be negative to decrement.

**Authorization:** `orders_create`

**Request Body:**

```json
[
  { "productId": "b5a6...", "quantity": 10 },
  { "productId": "c7d8...", "quantity": -3 }
]
```

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:9154/products/stock \
  -H 'Content-Type: application/json' \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -d '[{ "productId": "b5a6...", "quantity": 10 }]'
```

**Response Body (Success - 200 OK):**

```json
{
  "message": "Stock adjusted successfully"
}
```

**Response Body (Insufficient stock - 400 Bad Request):**

```json
"Invalid or insufficient stock"
```

### DELETE `/products/{id}`

Soft-deletes a product.

**Authorization:** `products_delete`

**Path Parameters:**

- `id` (string).

**Response:** `204 No Content` (no body).

### Notes

:::info Product model
Required fields: `name`, `costCents`, `priceCents`, `quantity`, `minStockThreshold`, `maxStockThreshold`. Optional: `SKU`, `description`, `imageUrl`. `categoryIds` is an array of UUIDs (may be empty). In this version there are **no** product variants or bundles.
:::

:::tip
- `costCents` and `priceCents` are expressed in **cents**.
- Deletion is soft (`is_deleted = 1`).
:::
