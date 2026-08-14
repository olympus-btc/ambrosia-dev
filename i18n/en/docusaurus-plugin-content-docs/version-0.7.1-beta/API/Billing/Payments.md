### Payment Management

The payment endpoints manage transactions, payment methods, and currencies in the system.

:::tip Naming convention
JSON fields use **camelCase** (`methodId`, `currencyId`, `transactionId`, `paymentId`, `ticketId`).
:::

## Core Payments

### GET `/payments`

Retrieves all payments in the system.

**Authorization:** `payments_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/payments" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "payment-uuid-1",
    "methodId": "method-uuid-1",
    "currencyId": "currency-uuid-1",
    "transactionId": "txn-123456",
    "amount": 45.50
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No payments found"
```

### GET `/payments/{id}`

Retrieves a specific payment by its ID.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): ID of the payment to retrieve.

**Response Body (Success - 200 OK):**

```json
{
  "id": "payment-uuid-1",
  "methodId": "method-uuid-1",
  "currencyId": "currency-uuid-1",
  "transactionId": "txn-123456",
  "amount": 45.50
}
```

### POST `/payments`

Creates a new payment.

**Authorization:** `payments_create`

**Request Body:**

```json
{
  "methodId": "string",
  "currencyId": "string",
  "transactionId": "string (optional)",
  "amount": 0.0
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/payments" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "methodId": "method-uuid-1",
    "currencyId": "currency-uuid-1",
    "transactionId": "txn-345678",
    "amount": 78.90
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "generated-uuid",
  "message": "Payment added successfully"
}
```

### PUT `/payments/{id}`

Updates an existing payment.

**Authorization:** `payments_update`

**Path Parameters:**

- `id` (string): ID of the payment to update.

**Request Body:**

```json
{
  "methodId": "string",
  "currencyId": "string",
  "transactionId": "string",
  "amount": 0.0
}
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "payment-uuid-1",
  "message": "Payment updated successfully"
}
```

### DELETE `/payments/{id}`

Deletes a payment from the system.

**Authorization:** `payments_delete`

**Path Parameters:**

- `id` (string): ID of the payment to delete.

**Response:** `204 No Content` (no body).

**Response Body (Error - 400 Bad Request):** the payment does not exist or is in use.

```json
"Failed to delete payment or payment is in use"
```

## Payment Methods

### GET `/payments/methods`

Retrieves all available payment methods.

**Authorization:** `payments_read`

**Response Body (Success - 200 OK):**

```json
[
  { "id": "method-uuid-1", "name": "Cash" },
  { "id": "method-uuid-2", "name": "Credit Card" },
  { "id": "method-uuid-3", "name": "Bitcoin Lightning" }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No payment methods found"
```

### GET `/payments/methods/{id}`

Retrieves a specific payment method.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): Payment method ID.

**Response Body (Success - 200 OK):**

```json
{ "id": "method-uuid-1", "name": "Cash" }
```

## Currencies

### GET `/payments/currencies`

Retrieves all available currencies.

**Authorization:** `payments_read`

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "currency-uuid-1",
    "acronym": "EUR",
    "name": "Euro",
    "symbol": "€",
    "countryName": "Spain",
    "countryCode": "ES"
  },
  {
    "id": "currency-uuid-3",
    "acronym": "BTC",
    "name": "Bitcoin",
    "symbol": "₿",
    "countryName": null,
    "countryCode": null
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No currencies found"
```

### GET `/payments/currencies/{id}`

Retrieves a specific currency.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): Currency ID.

**Response Body (Success - 200 OK):**

```json
{
  "id": "currency-uuid-1",
  "acronym": "EUR",
  "name": "Euro",
  "symbol": "€",
  "countryName": "Spain",
  "countryCode": "ES"
}
```

## Ticket-Payment Relationships

### POST `/payments/ticket-payments`

Creates a relationship between a ticket and a payment.

**Authorization:** `payments_update`

**Request Body:**

```json
{
  "paymentId": "string",
  "ticketId": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/payments/ticket-payments" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentId": "payment-uuid-1",
    "ticketId": "ticket-uuid-1"
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "paymentId": "payment-uuid-1",
  "ticketId": "ticket-uuid-1",
  "message": "Ticket payment relationship created successfully"
}
```

### GET `/payments/ticket-payments/by-ticket/{ticketId}`

Retrieves all payments for a ticket.

**Authorization:** `payments_read`

**Path Parameters:**

- `ticketId` (string): Ticket ID.

### GET `/payments/ticket-payments/by-payment/{paymentId}`

Retrieves all tickets for a payment.

**Authorization:** `payments_read`

**Path Parameters:**

- `paymentId` (string): Payment ID.

### DELETE `/payments/ticket-payments`

Deletes a specific ticket-payment relationship.

**Authorization:** `payments_delete`

**Query Parameters:**

- `paymentId` (string): Payment ID.
- `ticketId` (string): Ticket ID.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/payments/ticket-payments?paymentId=payment-uuid-1&ticketId=ticket-uuid-1" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

### DELETE `/payments/ticket-payments/by-ticket/{ticketId}`

Deletes all payment relationships of a ticket.

**Authorization:** `payments_delete`

**Path Parameters:**

- `ticketId` (string): Ticket ID.

**Response:** `204 No Content` (no body).

### Notes

:::warning ticket-payments permission
`POST /payments/ticket-payments` is nested under `payments_update` (not `payments_create`).
:::

:::info
- A payment must be associated with a valid method (`methodId`) and currency (`currencyId`).
- A ticket can have multiple payments (split/mixed payments) and a payment can cover several tickets.
- The system supports the Bitcoin Lightning Network as a payment method.
:::
