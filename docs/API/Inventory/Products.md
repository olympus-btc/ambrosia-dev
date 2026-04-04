### Gestión de Productos

Los endpoints de productos permiten crear, consultar, actualizar y eliminar productos del inventario.

- `GET /products`: Obtiene todos los productos.
  - **Authorization:** Requiere access token válido (enviado automáticamente via cookies)
  - **cURL Example:**
  ```bash
  curl -X GET http://127.0.0.1:9154/products \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  [
    {
      "id": "b5a6...",
      "SKU": "SKU-0001",
      "name": "Café americano",
      "description": "Taza de café 240ml",
      "image_url": null,
      "cost_cents": 5000,
      "category_ids": ["9f5c..."],
      "quantity": 10,
      "min_stock_threshold": 5,
      "max_stock_threshold": 100,
      "price_cents": 25000
    }
  ]
  ```
  - **Response Body (Sin contenido - 204 No Content):**
  ```json
  "No products found"
  ```

- `GET /products/{id}`: Obtiene un producto por su ID.
  - **Authorization:** Requiere access token válido
  - **Path Parameters:** `id` (string)
  - **cURL Example:**
  ```bash
  curl -X GET http://127.0.0.1:9154/products/b5a6... \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```

- `POST /products`: Crea un nuevo producto.
  - **Authorization:** Requiere `products_create`
  - **Request Body:**
  ```json
  {
    "SKU": "SKU-0001",
    "name": "Café americano",
    "description": "Taza de café 240ml",
    "image_url": null,
    "cost_cents": 5000,
    "category_ids": ["9f5c..."],
    "quantity": 10,
    "min_stock_threshold": 5,
    "max_stock_threshold": 100,
    "price_cents": 25000
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST http://127.0.0.1:9154/products \
    -H 'Content-Type: application/json' \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -d '{
      "SKU": "SKU-0001",
      "name": "Café americano",
      "description": "Taza de café 240ml",
      "image_url": null,
      "cost_cents": 5000,
      "category_ids": ["9f5c..."],
      "quantity": 10,
      "min_stock_threshold": 5,
      "max_stock_threshold": 100,
      "price_cents": 25000
    }'
  ```
  - **Response Body (Éxito - 201 Created):**
  ```json
  { "id": "b5a6...", "message": "Product added successfully" }
  ```

- `PUT /products/{id}`: Actualiza un producto existente.
  - **Authorization:** Requiere `products_update`
  - **Path Parameters:** `id` (string)
  - **Request Body:** Igual al de creación, con los campos actualizados.
  - **Response Body (Éxito - 200 OK):**
  ```json
  { "id": "b5a6...", "message": "Product updated successfully" }
  ```

- `POST /products/stock`: Ajusta el stock de uno o más productos.
  - **Authorization:** Requiere `orders_create`
  - **Request Body:** Array de ajustes. `quantity` puede ser negativo para decrementar.
  ```json
  [
    { "product_id": "b5a6...", "quantity": 10 },
    { "product_id": "c7d8...", "quantity": -3 }
  ]
  ```
  - **cURL Example:**
  ```bash
  curl -X POST http://127.0.0.1:9154/products/stock \
    -H 'Content-Type: application/json' \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -d '[{ "product_id": "b5a6...", "quantity": 10 }]'
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  { "message": "Stock updated successfully" }
  ```

- `DELETE /products/{id}`: Elimina (lógico) un producto.
  - **Authorization:** Requiere `products_delete`
  - **Path Parameters:** `id` (string)
  - **Response Body (Éxito - 204 No Content)**

### Notas
- Los campos requeridos son: `SKU`, `name`, `cost_cents`, `price_cents`, `quantity`, `min_stock_threshold`, `max_stock_threshold`.
- `category_ids` es un array de UUIDs (puede estar vacío).
- El borrado es lógico (`is_deleted = 1`).
