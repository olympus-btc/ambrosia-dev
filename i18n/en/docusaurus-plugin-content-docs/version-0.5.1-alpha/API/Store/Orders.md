---
sidebar_position: 1
---

### Store Orders

Endpoints for managing the sales flow of the Store module. Unlike the restaurant module, store orders are resolved in a single checkout operation with no table or server state.

- `GET /store/orders`: Retrieves all store orders.
  - **Authorization:** Requires `orders_read`
  - **Query Parameters:**
    - `status` (string, optional): Filter by order status
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/store/orders" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):** List of orders.

- `GET /store/orders/{id}`: Retrieves a specific order by ID.
  - **Authorization:** Requires `orders_read`
  - **Path Parameters:**
    - `id` (string): Order ID
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/store/orders/order-uuid" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):** Order object.
  - **Response Body (400 Bad Request):**
  ```json
  "Missing order ID"
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Order not found"
  ```

- `POST /store/orders/checkout`: Processes a complete sale — creates the order, ticket, and payment in a single operation.
  - **Authorization:** Requires `orders_create`
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
    "transactionId": "string (optional)",
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
  - **Response Body (400 Bad Request):** insufficient stock, invalid items, or incorrect payment data
  ```json
  "Checkout failed: check items, stock levels, and payment details"
  ```

- `DELETE /store/orders/{id}`: Cancels an order.
  - **Authorization:** Requires `orders_delete`
  - **Path Parameters:**
    - `id` (string): Order ID
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

### Notes

- `priceAtOrder` is expressed in cents (e.g., `25000` = $250.00) to avoid floating-point errors.
- Checkout automatically decrements stock. If any product has insufficient stock, the entire operation fails.
- The `transactionId` field is useful for linking external payments (Lightning, card) to the order.
