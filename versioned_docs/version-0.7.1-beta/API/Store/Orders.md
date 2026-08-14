---
sidebar_position: 1
---

### Órdenes de Tienda

Endpoints para gestionar el flujo de ventas del módulo Store. A diferencia del módulo restaurant, las órdenes de tienda se resuelven en una sola operación de checkout sin estado de mesa ni mesero.

:::tip Precios en centavos
Todos los importes de una orden de tienda (`total`, `priceAtOrder`) son enteros en **centavos** (ej. `25000` = $250.00) para evitar errores de punto flotante.
:::

### GET `/store/orders`

Obtiene todas las órdenes de la tienda.

**Authorization:** `orders_read`

**Query Parameters:**

- `status` (string, opcional): Filtra por estado de la orden.

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

Obtiene una orden específica por su ID.

**Authorization:** `orders_read`

**Path Parameters:**

- `id` (string): ID de la orden.

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

Procesa una venta completa: crea la orden, el ticket y el pago en una sola operación. Descuenta stock automáticamente.

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
  "transactionId": "string (opcional)",
  "ticketNotes": "",
  "satoshiAmount": null,
  "exchangeRateAtPayment": null,
  "paymentHash": null,
  "exchangeRateCurrency": null,
  "fiatAmountAtPayment": null
}
```

Campos opcionales: `transactionId`, `ticketNotes` (por defecto `""`), y los relacionados con Lightning (`satoshiAmount`, `exchangeRateAtPayment`, `paymentHash`, `exchangeRateCurrency`, `fiatAmountAtPayment`).

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

**Response Body (400 Bad Request):** stock insuficiente, ítems inválidos o datos de pago incorrectos.

```json
{
  "message": "Checkout failed: check items, stock levels, and payment details"
}
```

### POST `/store/orders/checkout-if-paid`

Variante de checkout para pagos Lightning: solo procesa la venta si el pago con el `paymentHash` indicado ya está confirmado por Phoenix. Es idempotente: si ese `paymentHash` ya fue procesado, devuelve el checkout existente.

**Authorization:** `orders_create`

**Request Body:** idéntico a `POST /store/orders/checkout`, pero **`paymentHash` es obligatorio**.

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

**Response Body (200 OK - pago ya procesado previamente):** devuelve el checkout existente.

```json
{
  "orderId": "order-uuid",
  "ticketId": "ticket-uuid",
  "paymentId": "payment-uuid"
}
```

**Response Body (202 Accepted - pago aún no confirmado):**

```json
{
  "status": "pending"
}
```

**Response Body (200 OK - procesado en esta llamada):**

```json
{
  "status": "completed",
  "orderId": "order-uuid",
  "ticketId": "ticket-uuid",
  "paymentId": "payment-uuid"
}
```

**Response Body (400 Bad Request - falta `paymentHash`):**

```json
{
  "message": "paymentHash required"
}
```

### DELETE `/store/orders/{id}`

Cancela una orden.

**Authorization:** `orders_delete`

**Path Parameters:**

- `id` (string): ID de la orden.

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

### Notas

:::info
A diferencia de otros DELETE del API (que devuelven `204 No Content`), `DELETE /store/orders/{id}` devuelve `200 OK` con un objeto `{ "message": ... }`.
:::

:::tip
- `total` y `priceAtOrder` se expresan en **centavos** (ej. `25000` = $250.00).
- El checkout descuenta stock automáticamente. Si algún producto no tiene stock suficiente, la operación falla completa.
- El campo `transactionId` vincula pagos externos (tarjeta) con la orden; para Lightning usa `paymentHash` junto con `checkout-if-paid`.
:::
