### Ticket Management

The ticket endpoints manage the invoices and receipts of the point-of-sale system.

:::tip Naming convention
JSON fields use **camelCase** (`orderId`, `userId`, `ticketDate`, `totalAmount`).
:::

### GET `/tickets`

Retrieves all tickets in the system.

**Authorization:** `tickets_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/tickets" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "2be55b66-819e-47f6-870a-a0d2cfbca279",
    "orderId": "11122afd-3dda-4455-82de-310fc94f58db",
    "userId": "941bc7aa-ee4c-45cf-844d-1a624a870fed",
    "ticketDate": "2025-07-27T10:30:00Z",
    "status": 1,
    "totalAmount": 45.50,
    "notes": "Cash payment"
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No tickets found"
```

### GET `/tickets/{id}`

Retrieves a specific ticket by its ID.

**Authorization:** `tickets_read`

**Path Parameters:**

- `id` (string): ID of the ticket to retrieve.

**Response Body (Success - 200 OK):**

```json
{
  "id": "12226fd9-7299-4c75-b573-2d4a586ac8ab",
  "orderId": "83bb3cc3-7c60-4ad2-a4c3-e0601c028106",
  "userId": "22ed1170-ccb7-4a2d-9fc6-47ac6b39c2ca",
  "ticketDate": "2025-07-27T10:30:00Z",
  "status": 1,
  "totalAmount": 45.50,
  "notes": "Cash payment"
}
```

### POST `/tickets`

Creates a new ticket.

**Authorization:** `tickets_create`

**Request Body:**

```json
{
  "orderId": "string",
  "userId": "string",
  "ticketDate": "2025-07-27T10:30:00Z",
  "status": 1,
  "totalAmount": 0.0,
  "notes": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/tickets" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": "80506193-de42-4a5e-958f-9e6c9b59d19d",
    "userId": "f31def9e-2382-4b51-b61d-199843b663b0",
    "ticketDate": "2025-07-27T12:00:00Z",
    "status": 1,
    "totalAmount": 67.25,
    "notes": "Mixed payment: cash + card"
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "1633ebd2-7462-4c6c-aa57-41143e8a087a",
  "message": "Ticket added successfully"
}
```

### PUT `/tickets/{id}`

Updates an existing ticket.

**Authorization:** `tickets_update`

**Path Parameters:**

- `id` (string): ID of the ticket to update.

**Request Body:**

```json
{
  "orderId": "string",
  "userId": "string",
  "ticketDate": "2025-07-27T10:30:00Z",
  "status": 1,
  "totalAmount": 0.0,
  "notes": "string"
}
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "2ce883f9-bd79-447c-b840-af418ca2223c",
  "message": "Ticket updated successfully"
}
```

### DELETE `/tickets/{id}`

Deletes a ticket from the system.

**Authorization:** `tickets_delete`

**Path Parameters:**

- `id` (string): ID of the ticket to delete.

**Response:** `204 No Content` (no body).

### Notes

:::info
- A ticket must be associated with a valid order (`orderId`) and user (`userId`).
- The `notes` field is required (it may be an empty string).
- Common ticket statuses: `1` Pending, `2` Paid, `3` Cancelled.
- `totalAmount` should match the total of the associated order.
:::
