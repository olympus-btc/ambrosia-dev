### Gestión de Órdenes

Los endpoints de órdenes permiten gestionar los pedidos del restaurante, incluyendo los platos asociados.

:::tip Convención de nombres
Todos los campos JSON usan **camelCase** (`userId`, `tableId`, `createdAt`, `priceAtOrder`). Las excepciones son algunos query params (`start_date`, `end_date`) que se conservan en snake_case porque así los lee el servidor.
:::

### GET `/orders`

Obtiene todas las órdenes del sistema.

**Authorization:** `orders_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
    "tableId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "open",
    "total": 45.50,
    "createdAt": "2025-01-15T14:30:00Z"
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No orders found"
```

### GET `/orders/{id}`

Obtiene una orden específica por su ID.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID de la orden a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
  "tableId": "123e4567-e89b-12d3-a456-426614174000",
  "status": "open",
  "total": 45.50,
  "createdAt": "2025-01-15T14:30:00Z"
}
```

**Response Body (No encontrada - 404 Not Found):**

```json
{
  "message": "Order 76ee1086-b945-4170-b2e6-9fbeb95ae0be not found"
}
```

### GET `/orders/{id}/complete`

Obtiene una orden completa con todos sus platos.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID de la orden a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be/complete" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "order": {
    "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
    "tableId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "open",
    "total": 45.50,
    "createdAt": "2025-01-15T14:30:00Z"
  },
  "dishes": [
    {
      "id": "dish-uuid-1",
      "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
      "dishId": "pizza-uuid",
      "priceAtOrder": 15.99,
      "notes": "Sin cebolla",
      "status": "pending",
      "shouldPrepare": true
    }
  ]
}
```

### POST `/orders`

Crea una nueva orden en el sistema.

**Authorization:** `orders_create`

**Request Body:**

```json
{
  "userId": "string",
  "tableId": "string (opcional)",
  "status": "open | closed | paid",
  "total": 0.0,
  "createdAt": "ISO 8601 (e.g. 2025-01-15T14:30:00Z)"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/orders" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
    "tableId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "open",
    "total": 0.0,
    "createdAt": "2025-01-15T14:30:00Z"
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "new-order-uuid",
  "message": "Order created successfully"
}
```

### POST `/orders/with-dishes`

Crea una orden completa con platos incluidos. El total se recalcula automáticamente a partir de los platos.

**Authorization:** `orders_create`

**Request Body:**

```json
{
  "order": {
    "userId": "string",
    "tableId": "string",
    "status": "string",
    "total": 0.0,
    "createdAt": "2025-01-15T14:30:00Z"
  },
  "dishes": [
    {
      "dishId": "string",
      "priceAtOrder": 0.0,
      "notes": "string"
    }
  ]
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/orders/with-dishes" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "order": {
      "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
      "tableId": "123e4567-e89b-12d3-a456-426614174000",
      "status": "open",
      "total": 0.0,
      "createdAt": "2025-01-15T14:30:00Z"
    },
    "dishes": [
      {
        "dishId": "pizza-uuid",
        "priceAtOrder": 15.99,
        "notes": "Extra queso"
      }
    ]
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "message": "Order with dishes created successfully",
  "id": "new-order-uuid"
}
```

### PUT `/orders/{id}`

Actualiza una orden existente.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): ID de la orden a actualizar.

**Request Body:**

```json
{
  "userId": "string",
  "tableId": "string",
  "status": "string",
  "total": 0.0,
  "createdAt": "2025-01-15T14:30:00Z"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
    "tableId": "123e4567-e89b-12d3-a456-426614174000",
    "status": "paid",
    "total": 48.75,
    "createdAt": "2025-01-15T14:30:00Z"
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Order updated successfully"
}
```

### DELETE `/orders/{id}`

Elimina una orden del sistema.

**Authorization:** `orders_delete`

**Path Parameters:**

- `id` (string): ID de la orden a eliminar.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response:** `204 No Content` (sin cuerpo).

## Gestión de Platos en Órdenes

### GET `/orders/{id}/dishes`

Obtiene todos los platos de una orden específica.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID de la orden.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be/dishes" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "dish-uuid-1",
    "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "dishId": "pizza-uuid",
    "priceAtOrder": 15.99,
    "notes": "Sin cebolla",
    "status": "pending",
    "shouldPrepare": true
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No dishes found for this order"
```

### POST `/orders/{id}/dishes`

Agrega platos a una orden existente. El total de la orden se recalcula automáticamente.

**Authorization:** `orders_create`

**Path Parameters:**

- `id` (string): ID de la orden.

**Request Body:**

```json
[
  {
    "dishId": "string",
    "priceAtOrder": 0.0,
    "notes": "string"
  }
]
```

**Response Body (Éxito - 201 Created):**

```json
{
  "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Dishes added to order successfully"
}
```

### PUT `/orders/{id}/dishes/{dishId}`

Actualiza un plato específico de una orden. Recalcula el total.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): ID de la orden.
- `dishId` (string): ID del plato dentro de la orden.

**Request Body:**

```json
{
  "dishId": "string",
  "priceAtOrder": 0.0,
  "notes": "string",
  "status": "pending",
  "shouldPrepare": true
}
```

**Response Body (Éxito - 200 OK):**

```json
{
  "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "dishId": "dish-uuid-1",
  "message": "Order dish updated successfully"
}
```

### DELETE `/orders/{id}/dishes/{dishId}`

Elimina un plato específico de una orden. Recalcula el total.

**Authorization:** `orders_delete`

**Response:** `204 No Content` (sin cuerpo).

### DELETE `/orders/{id}/dishes`

Elimina todos los platos de una orden y pone el total en 0.

**Authorization:** `orders_delete`

**Response:** `204 No Content` (sin cuerpo).

## Filtros y Acciones Adicionales

### GET `/orders/with-payments`

Obtiene órdenes junto con información de pago. Soporta filtros por query params.

**Authorization:** `orders_read`

**Query Parameters (todos opcionales):**

- `startDate` / `endDate` (string, YYYY-MM-DD)
- `status` (string)
- `userId` (string)
- `paymentMethod` (string)
- `minTotal` / `maxTotal` (number)
- `sortBy` (string)
- `sortOrder` (`asc` | `desc`)

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/with-payments?status=paid&startDate=2025-01-01&endDate=2025-01-31" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "userName": "Juan Pérez",
    "tableId": null,
    "status": "paid",
    "total": 45.50,
    "createdAt": "2025-01-15T14:30:00Z",
    "paymentMethod": "Efectivo",
    "paymentMethodIds": ["method-uuid"],
    "satoshiAmount": null,
    "exchangeRateAtPayment": null,
    "exchangeRateCurrency": null,
    "fiatAmountAtPayment": null
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No orders found"
```

### GET `/orders/user/{userId}`

Obtiene todas las órdenes de un usuario específico.

**Authorization:** `orders_read`

**Path Parameters:**

- `userId` (string): ID del usuario.

### GET `/orders/table/{tableId}`

Obtiene todas las órdenes de una mesa específica.

**Authorization:** `orders_read`

**Path Parameters:**

- `tableId` (string): ID de la mesa.

### GET `/orders/status/{status}`

Obtiene todas las órdenes con un estado específico.

**Authorization:** `orders_read`

**Path Parameters:**

- `status` (string): Estado de la orden (`open`, `closed`, `paid`).

### GET `/orders/date-range`

Obtiene órdenes dentro de un rango de fechas.

**Authorization:** `orders_read`

**Query Parameters:**

- `start_date` (string): Fecha de inicio (formato YYYY-MM-DD).
- `end_date` (string): Fecha de fin (formato YYYY-MM-DD).

:::info
Este endpoint conserva los query params en **snake_case** (`start_date`, `end_date`), a diferencia del resto de filtros que usan camelCase.
:::

### GET `/orders/total-sales/{date}`

Obtiene el total de ventas para una fecha específica.

**Authorization:** `orders_read`

**Path Parameters:**

- `date` (string): Fecha (formato YYYY-MM-DD).

**Response Body (200 OK):**

```json
{
  "date": "2025-01-15",
  "total_sales": "1234.50"
}
```

:::info
La clave `total_sales` se mantiene en snake_case y su valor se devuelve como **string** (no como número).
:::

### PUT `/orders/{id}/calculate-total`

Recalcula y actualiza el total de una orden a partir de sus platos.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): ID de la orden.

**Response Body (200 OK):**

```json
{
  "message": "Order total updated successfully",
  "total": 48.75
}
```

### Notas

:::info Modelo de datos
El modelo `Order` en esta versión es `{ id, userId, tableId?, status, total, createdAt }` — **no** existe el campo `waiter` ni `discountAmount`. `total` es un número decimal (no centavos). Cada `OrderDish` incluye `status` y `shouldPrepare`.
:::

:::tip
- Los IDs son UUID generados automáticamente por el servidor.
- Las listas vacías se devuelven como `200 OK` con un string descriptivo, no como `204`.
- Los DELETE exitosos devuelven `204 No Content` sin cuerpo.
- Los tokens (`accessToken`) se envían automáticamente vía cookies del navegador.
:::

:::info Reportes relacionados
Para reportes de ventas por producto consulta [Reports](../Reports.md) (`GET /reports`).
:::
