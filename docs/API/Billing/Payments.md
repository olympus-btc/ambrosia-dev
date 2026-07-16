### Gestión de Pagos

Los endpoints de pagos permiten administrar las transacciones, métodos de pago y monedas del sistema.

:::tip Convención de nombres
Los campos JSON usan **camelCase** (`methodId`, `currencyId`, `transactionId`, `paymentId`, `ticketId`).
:::

## Pagos Principales

### GET `/payments`

Obtiene todos los pagos del sistema.

**Authorization:** `payments_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/payments" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

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

**Response Body (Lista vacía - 200 OK):**

```json
"No payments found"
```

### GET `/payments/{id}`

Obtiene un pago específico por su ID.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): ID del pago a obtener.

**Response Body (Éxito - 200 OK):**

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

Crea un nuevo pago.

**Authorization:** `payments_create`

**Request Body:**

```json
{
  "methodId": "string",
  "currencyId": "string",
  "transactionId": "string (opcional)",
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

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "generated-uuid",
  "message": "Payment added successfully"
}
```

### PUT `/payments/{id}`

Actualiza un pago existente.

**Authorization:** `payments_update`

**Path Parameters:**

- `id` (string): ID del pago a actualizar.

**Request Body:**

```json
{
  "methodId": "string",
  "currencyId": "string",
  "transactionId": "string",
  "amount": 0.0
}
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "payment-uuid-1",
  "message": "Payment updated successfully"
}
```

### DELETE `/payments/{id}`

Elimina un pago del sistema.

**Authorization:** `payments_delete`

**Path Parameters:**

- `id` (string): ID del pago a eliminar.

**Response:** `204 No Content` (sin cuerpo).

**Response Body (Error - 400 Bad Request):** el pago no existe o está en uso.

```json
"Failed to delete payment or payment is in use"
```

## Métodos de Pago

### GET `/payments/methods`

Obtiene todos los métodos de pago disponibles.

**Authorization:** `payments_read`

**Response Body (Éxito - 200 OK):**

```json
[
  { "id": "method-uuid-1", "name": "Efectivo" },
  { "id": "method-uuid-2", "name": "Tarjeta de Crédito" },
  { "id": "method-uuid-3", "name": "Bitcoin Lightning" }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No payment methods found"
```

### GET `/payments/methods/{id}`

Obtiene un método de pago específico.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): ID del método de pago.

**Response Body (Éxito - 200 OK):**

```json
{ "id": "method-uuid-1", "name": "Efectivo" }
```

## Monedas

### GET `/payments/currencies`

Obtiene todas las monedas disponibles.

**Authorization:** `payments_read`

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "currency-uuid-1",
    "acronym": "EUR",
    "name": "Euro",
    "symbol": "€",
    "countryName": "España",
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

**Response Body (Lista vacía - 200 OK):**

```json
"No currencies found"
```

### GET `/payments/currencies/{id}`

Obtiene una moneda específica.

**Authorization:** `payments_read`

**Path Parameters:**

- `id` (string): ID de la moneda.

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "currency-uuid-1",
  "acronym": "EUR",
  "name": "Euro",
  "symbol": "€",
  "countryName": "España",
  "countryCode": "ES"
}
```

## Relaciones Ticket-Pago

### POST `/payments/ticket-payments`

Crea una relación entre un ticket y un pago.

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

**Response Body (Éxito - 201 Created):**

```json
{
  "paymentId": "payment-uuid-1",
  "ticketId": "ticket-uuid-1",
  "message": "Ticket payment relationship created successfully"
}
```

### GET `/payments/ticket-payments/by-ticket/{ticketId}`

Obtiene todos los pagos de un ticket.

**Authorization:** `payments_read`

**Path Parameters:**

- `ticketId` (string): ID del ticket.

### GET `/payments/ticket-payments/by-payment/{paymentId}`

Obtiene todos los tickets de un pago.

**Authorization:** `payments_read`

**Path Parameters:**

- `paymentId` (string): ID del pago.

### DELETE `/payments/ticket-payments`

Elimina una relación ticket-pago específica.

**Authorization:** `payments_delete`

**Query Parameters:**

- `paymentId` (string): ID del pago.
- `ticketId` (string): ID del ticket.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/payments/ticket-payments?paymentId=payment-uuid-1&ticketId=ticket-uuid-1" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

### DELETE `/payments/ticket-payments/by-ticket/{ticketId}`

Elimina todas las relaciones de pago de un ticket.

**Authorization:** `payments_delete`

**Path Parameters:**

- `ticketId` (string): ID del ticket.

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::warning Permiso de ticket-payments
`POST /payments/ticket-payments` está anidado bajo `payments_update` (no `payments_create`).
:::

:::info
- Un pago debe estar asociado a un método (`methodId`) y a una moneda (`currencyId`) válidos.
- Un ticket puede tener múltiples pagos (pagos mixtos) y un pago puede cubrir varios tickets (pagos divididos).
- El sistema soporta Bitcoin Lightning Network como método de pago.
:::
