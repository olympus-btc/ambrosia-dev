### Order Management

The order endpoints manage restaurant orders, including their associated dishes.

:::tip Naming convention
All JSON fields use **camelCase** (`userId`, `tableId`, `createdAt`, `priceAtOrder`). The exceptions are a few query params (`start_date`, `end_date`) kept in snake_case because that is how the server reads them.
:::

### GET `/orders`

Retrieves all orders in the system.

**Authorization:** `orders_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Success - 200 OK):**

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

**Response Body (Empty list - 200 OK):**

```json
"No orders found"
```

### GET `/orders/{id}`

Retrieves a specific order by its ID.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID of the order to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Success - 200 OK):**

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

**Response Body (Not found - 404 Not Found):**

```json
{
  "message": "Order 76ee1086-b945-4170-b2e6-9fbeb95ae0be not found"
}
```

### GET `/orders/{id}/complete`

Retrieves a complete order with all of its dishes.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID of the order to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be/complete" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Success - 200 OK):**

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
      "notes": "No onion",
      "status": "pending",
      "shouldPrepare": true
    }
  ]
}
```

### POST `/orders`

Creates a new order in the system.

**Authorization:** `orders_create`

**Request Body:**

```json
{
  "userId": "string",
  "tableId": "string (optional)",
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

**Response Body (Success - 201 Created):**

```json
{
  "id": "new-order-uuid",
  "message": "Order created successfully"
}
```

### POST `/orders/with-dishes`

Creates a complete order with dishes included. The total is recalculated automatically from the dishes.

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
        "notes": "Extra cheese"
      }
    ]
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "message": "Order with dishes created successfully",
  "id": "new-order-uuid"
}
```

### PUT `/orders/{id}`

Updates an existing order.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): ID of the order to update.

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

**Response Body (Success - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Order updated successfully"
}
```

### DELETE `/orders/{id}`

Deletes an order from the system.

**Authorization:** `orders_delete`

**Path Parameters:**

- `id` (string): ID of the order to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response:** `204 No Content` (no body).

## Order Dish Management

### GET `/orders/{id}/dishes`

Retrieves all dishes of a specific order.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID of the order.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/orders/76ee1086-b945-4170-b2e6-9fbeb95ae0be/dishes" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "dish-uuid-1",
    "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "dishId": "pizza-uuid",
    "priceAtOrder": 15.99,
    "notes": "No onion",
    "status": "pending",
    "shouldPrepare": true
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No dishes found for this order"
```

### POST `/orders/{id}/dishes`

Adds dishes to an existing order. The order total is recalculated automatically.

**Authorization:** `orders_create`

**Path Parameters:**

- `id` (string): ID of the order.

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

**Response Body (Success - 201 Created):**

```json
{
  "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Dishes added to order successfully"
}
```

### PUT `/orders/{id}/dishes/{dishId}`

Updates a specific dish in an order. Recalculates the total.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): ID of the order.
- `dishId` (string): ID of the dish within the order.

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

**Response Body (Success - 200 OK):**

```json
{
  "orderId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "dishId": "dish-uuid-1",
  "message": "Order dish updated successfully"
}
```

### DELETE `/orders/{id}/dishes/{dishId}`

Removes a specific dish from an order. Recalculates the total.

**Authorization:** `orders_delete`

**Response:** `204 No Content` (no body).

### DELETE `/orders/{id}/dishes`

Removes all dishes from an order and sets the total to 0.

**Authorization:** `orders_delete`

**Response:** `204 No Content` (no body).

## Additional Filters and Actions

### GET `/orders/with-payments`

Retrieves orders together with payment information. Supports filtering via query params.

**Authorization:** `orders_read`

**Query Parameters (all optional):**

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
    "paymentMethod": "Cash",
    "paymentMethodIds": ["method-uuid"],
    "satoshiAmount": null,
    "exchangeRateAtPayment": null,
    "exchangeRateCurrency": null,
    "fiatAmountAtPayment": null
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No orders found"
```

### GET `/orders/user/{userId}`

Retrieves all orders of a specific user.

**Authorization:** `orders_read`

**Path Parameters:**

- `userId` (string): User ID.

### GET `/orders/table/{tableId}`

Retrieves all orders of a specific table.

**Authorization:** `orders_read`

**Path Parameters:**

- `tableId` (string): Table ID.

### GET `/orders/status/{status}`

Retrieves all orders with a specific status.

**Authorization:** `orders_read`

**Path Parameters:**

- `status` (string): Order status (`open`, `closed`, `paid`).

### GET `/orders/date-range`

Retrieves orders within a date range.

**Authorization:** `orders_read`

**Query Parameters:**

- `start_date` (string): Start date (YYYY-MM-DD).
- `end_date` (string): End date (YYYY-MM-DD).

:::info
This endpoint keeps its query params in **snake_case** (`start_date`, `end_date`), unlike the other filters that use camelCase.
:::

### GET `/orders/total-sales/{date}`

Retrieves the total sales for a specific date.

**Authorization:** `orders_read`

**Path Parameters:**

- `date` (string): Date (YYYY-MM-DD).

**Response Body (200 OK):**

```json
{
  "date": "2025-01-15",
  "total_sales": "1234.50"
}
```

:::info
The `total_sales` key stays in snake_case and its value is returned as a **string** (not a number).
:::

### PUT `/orders/{id}/calculate-total`

Recalculates and updates an order's total from its dishes.

**Authorization:** `orders_update`

**Path Parameters:**

- `id` (string): Order ID.

**Response Body (200 OK):**

```json
{
  "message": "Order total updated successfully",
  "total": 48.75
}
```

### Notes

:::info Data model
The `Order` model in this version is `{ id, userId, tableId?, status, total, createdAt }` — there is **no** `waiter` field nor `discountAmount`. `total` is a decimal number (not cents). Each `OrderDish` includes `status` and `shouldPrepare`.
:::

:::tip
- IDs are UUIDs generated automatically by the server.
- Empty lists are returned as `200 OK` with a descriptive string, not as `204`.
- Successful DELETEs return `204 No Content` with no body.
- Tokens (`accessToken`) are sent automatically via browser cookies.
:::

:::info Related reports
For per-product sales reports, see [Reports](../Reports.md) (`GET /reports`).
:::
