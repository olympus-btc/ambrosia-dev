---
sidebar_position: 1
---

### Store Orders

Endpoints for the Store module's sales flow. Unlike the restaurant module, store orders are resolved in a single checkout operation with no table or waiter state.

:::tip Prices in cents
All monetary amounts in a store order (`total`, `priceAtOrder`) are integers in **cents** (e.g. `25000` = $250.00) to avoid floating-point errors.
:::

### GET `/store/orders`

Retrieves all store orders.

**Authorization:** `orders_read`

**Query Parameters:**

- `status` (string, optional): Filter by order status.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/store/orders" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
[
  {
    "id": "order-uuid",
    "userId": "user-uuid",
    "userName": "Ana García",
    "status": "closed",
    "total": 50000,
    "createdAt": "2025-01-15T14:30:00Z",
    "items": [
      {
        "productId": "product-uuid",
        "quantity": 2,
        "priceAtOrder": 25000
      }
    ]
  }
]
```

### GET `/store/orders/{id}`

Retrieves a specific order by its ID.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): Order ID.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/store/orders/order-uuid" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
{
  "id": "order-uuid",
  "userId": "user-uuid",
  "userName": "Ana García",
  "status": "closed",
  "total": 50000,
  "createdAt": "2025-01-15T14:30:00Z",
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 2,
      "priceAtOrder": 25000
    }
  ]
}
```

**Response Body (400 Bad Request):**

```json
{
  "message": "Missing order ID"
}
```

**Response Body (404 Not Found):**

```json
{
  "message": "Order not found"
}
```

### POST `/store/orders/checkout`

Processes a complete sale: creates the order, ticket, and payment in a single operation. Deducts stock automatically.

**Authorization:** `orders_create`

**Request Body:**

```json
{
  "userId": "string",
  "items": [
    {
      "productId": "string",
      "quantity": 1,
      "priceAtOrder": 25000
    }
  ],
  "paymentMethodId": "string",
  "currencyId": "string",
  "amount": 250.00,
  "transactionId": "string (optional)",
  "ticketNotes": "",
  "satoshiAmount": null,
  "exchangeRateAtPayment": null,
  "paymentHash": null,
  "exchangeRateCurrency": null,
  "fiatAmountAtPayment": null
}
```

Optional fields: `transactionId`, `ticketNotes` (defaults to `""`), and the Lightning-related ones (`satoshiAmount`, `exchangeRateAtPayment`, `paymentHash`, `exchangeRateCurrency`, `fiatAmountAtPayment`).

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/store/orders/checkout" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "items": [
      { "productId": "product-uuid", "quantity": 2, "priceAtOrder": 25000 }
    ],
    "paymentMethodId": "method-uuid",
    "currencyId": "currency-uuid",
    "amount": 500.00
  }'
```

**Response Body (201 Created):**

```json
{
  "orderId": "order-uuid",
  "ticketId": "ticket-uuid",
  "paymentId": "payment-uuid"
}
```

**Response Body (400 Bad Request):** insufficient stock, invalid items, or wrong payment details.

```json
{
  "message": "Checkout failed: check items, stock levels, and payment details"
}
```

### POST `/store/orders/checkout-if-paid`

Checkout variant for Lightning payments: only processes the sale if the payment for the given `paymentHash` is already confirmed by Phoenix. It is idempotent: if that `paymentHash` was already processed, it returns the existing checkout.

**Authorization:** `orders_create`

**Request Body:** identical to `POST /store/orders/checkout`, but **`paymentHash` is required**.

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/store/orders/checkout-if-paid" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-uuid",
    "items": [
      { "productId": "product-uuid", "quantity": 2, "priceAtOrder": 25000 }
    ],
    "paymentMethodId": "method-uuid",
    "currencyId": "currency-uuid",
    "amount": 500.00,
    "paymentHash": "abc123..."
  }'
```

**Response Body (200 OK - payment already processed):** returns the existing checkout.

```json
{
  "orderId": "order-uuid",
  "ticketId": "ticket-uuid",
  "paymentId": "payment-uuid"
}
```

**Response Body (202 Accepted - payment not yet confirmed):**

```json
{
  "status": "pending"
}
```

**Response Body (200 OK - processed in this call):**

```json
{
  "status": "completed",
  "orderId": "order-uuid",
  "ticketId": "ticket-uuid",
  "paymentId": "payment-uuid"
}
```

**Response Body (400 Bad Request - missing `paymentHash`):**

```json
{
  "message": "paymentHash required"
}
```

### DELETE `/store/orders/{id}`

Cancels an order.

**Authorization:** `orders_delete`

**Path Parameters:**

- `id` (string): Order ID.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/store/orders/order-uuid" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
{
  "message": "Order cancelled successfully"
}
```

**Response Body (400 Bad Request):**

```json
{
  "message": "Missing order ID"
}
```

**Response Body (404 Not Found):**

```json
{
  "message": "Order not found or already closed"
}
```

### Notes

:::info
Unlike other DELETE endpoints in the API (which return `204 No Content`), `DELETE /store/orders/{id}` returns `200 OK` with a `{ "message": ... }` object.
:::

:::tip
- `total` and `priceAtOrder` are expressed in **cents** (e.g. `25000` = $250.00).
- Checkout deducts stock automatically. If any product lacks sufficient stock, the whole operation fails.
- The `transactionId` field links external (card) payments to the order; for Lightning, use `paymentHash` together with `checkout-if-paid`.
:::
