---
sidebar_position: 1
---

### Órdenes de Tienda

Endpoints para gestionar el flujo de ventas del módulo Store. A diferencia del módulo restaurant, las órdenes de tienda se resuelven en una sola operación de checkout sin estado de mesa ni mesero.

- `GET /store/orders`: Obtiene todas las órdenes de la tienda.
  - **Authorization:** Requiere `orders_read`
  - **Query Parameters:**
    - `status` (string, opcional): Filtra por estado de la orden
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/store/orders" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):** Lista de órdenes.

- `GET /store/orders/{id}`: Obtiene una orden específica por su ID.
  - **Authorization:** Requiere `orders_read`
  - **Path Parameters:**
    - `id` (string): ID de la orden
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/store/orders/order-uuid" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):** Objeto de la orden.
  - **Response Body (400 Bad Request):**
  ```json
  "Missing order ID"
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Order not found"
  ```

- `POST /store/orders/checkout`: Procesa una venta completa: crea la orden, el ticket y el pago en una sola operación.
  - **Authorization:** Requiere `orders_create`
  - **Request Body:**
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
    "ticketNotes": ""
  }
  ```
  - **cURL Example:**
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
  - **Response Body (201 Created):**
  ```json
  {
    "orderId": "order-uuid",
    "ticketId": "ticket-uuid",
    "paymentId": "payment-uuid"
  }
  ```
  - **Response Body (400 Bad Request):** stock insuficiente, ítems inválidos o datos de pago incorrectos
  ```json
  "Checkout failed: check items, stock levels, and payment details"
  ```

- `DELETE /store/orders/{id}`: Cancela una orden.
  - **Authorization:** Requiere `orders_delete`
  - **Path Parameters:**
    - `id` (string): ID de la orden
  - **cURL Example:**
  ```bash
  curl -X DELETE "http://127.0.0.1:9154/store/orders/order-uuid" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  "Order cancelled successfully"
  ```
  - **Response Body (400 Bad Request):**
  ```json
  "Missing order ID"
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Order not found or already closed"
  ```

### Notas

- `priceAtOrder` se expresa en centavos (ej. `25000` = $250.00) para evitar errores de punto flotante.
- El checkout descuenta stock automáticamente. Si algún producto no tiene stock suficiente, la operación falla completa.
- El campo `transactionId` es útil para vincular pagos externos (Lightning, tarjeta) con la orden.
