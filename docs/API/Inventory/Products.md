### Gestión de Productos

Los endpoints de productos permiten crear, consultar, actualizar y eliminar productos del inventario (módulo Store).

:::tip Convención de nombres
Los campos JSON usan **camelCase** (`imageUrl`, `costCents`, `categoryIds`, `minStockThreshold`, `maxStockThreshold`, `priceCents`). El campo `SKU` va en mayúsculas tal cual.
:::

### GET `/products`

Obtiene todos los productos.

**Authorization:** `products_read`

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/products \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "b5a6...",
    "SKU": "SKU-0001",
    "name": "Café americano",
    "description": "Taza de café 240ml",
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

**Response Body (Lista vacía - 200 OK):**

```json
"No products found"
```

### GET `/products/{id}`

Obtiene un producto por su ID.

**Authorization:** `products_read`

**Path Parameters:**

- `id` (string).

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/products/b5a6... \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (No encontrado - 404 Not Found):**

```json
"Product not found"
```

### POST `/products`

Crea un nuevo producto.

**Authorization:** `products_create`

**Request Body:**

```json
{
  "SKU": "SKU-0001",
  "name": "Café americano",
  "description": "Taza de café 240ml",
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
    "name": "Café americano",
    "costCents": 5000,
    "categoryIds": ["9f5c..."],
    "quantity": 10,
    "minStockThreshold": 5,
    "maxStockThreshold": 100,
    "priceCents": 25000
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "b5a6...",
  "message": "Product added successfully"
}
```

**Response Body (Datos inválidos - 400 Bad Request):**

```json
{
  "message": "Invalid product data"
}
```

**Response Body (SKU duplicado - 409 Conflict):**

```json
{
  "message": "SKU already exists"
}
```

### PUT `/products/{id}`

Actualiza un producto existente.

**Authorization:** `products_update`

**Path Parameters:**

- `id` (string).

**Request Body:** igual al de creación, con los campos actualizados.

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "b5a6...",
  "message": "Product updated successfully"
}
```

**Response Body (No encontrado - 404 Not Found):**

```json
{
  "message": "Product with ID b5a6... not found"
}
```

**Response Body (SKU duplicado - 409 Conflict):**

```json
{
  "message": "SKU already exists"
}
```

### POST `/products/stock`

Ajusta el stock de uno o más productos. `quantity` puede ser negativo para decrementar.

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

**Response Body (Éxito - 200 OK):**

```json
{
  "message": "Stock adjusted successfully"
}
```

**Response Body (Stock insuficiente - 400 Bad Request):**

```json
"Invalid or insufficient stock"
```

### DELETE `/products/{id}`

Elimina (borrado lógico) un producto.

**Authorization:** `products_delete`

**Path Parameters:**

- `id` (string).

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::info Modelo de producto
Campos requeridos: `name`, `costCents`, `priceCents`, `quantity`, `minStockThreshold`, `maxStockThreshold`. Opcionales: `SKU`, `description`, `imageUrl`. `categoryIds` es un array de UUIDs (puede estar vacío). En esta versión **no** existen variantes de producto ni bundles.
:::

:::tip
- `costCents` y `priceCents` se expresan en **centavos**.
- El borrado es lógico (`is_deleted = 1`).
:::
