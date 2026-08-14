### Printer Management

Endpoints for managing ticket printers.

:::info Authorization
All printer endpoints require only a valid `accessToken` (`auth-jwt`); they do not use granular permissions.
:::

## System Printers

### GET `/printers/available`

Retrieves the list of printers detected by the operating system.

**Authorization:** valid `accessToken`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/printers/available" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
["Printer 1", "Printer 2", "Kitchen"]
```

### POST `/printers/set`

Sets the active printer for a specific type, creating or updating a configuration.

**Authorization:** valid `accessToken`.

**Request Body:**

```json
{
  "printerType": "KITCHEN | CUSTOMER | BAR",
  "printerName": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/printers/set" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "printerType": "KITCHEN",
    "printerName": "Kitchen"
  }'
```

**Response Body (200 OK):**

```text
Printer Kitchen set for KITCHEN
```

**Response Body (409 Conflict):**

```json
{ "error": "Failed to set default printer" }
```

### POST `/printers/print`

Sends a print job.

**Authorization:** valid `accessToken`.

**Request Body:**

```json
{
  "templateName": "string (optional)",
  "ticketData": { "...": "TicketData object" },
  "printerType": "KITCHEN | CUSTOMER | BAR",
  "printerId": "string (optional, config UUID)",
  "broadcast": false,
  "forceTemplateName": false
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/printers/print" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "templateName": "Default Customer Ticket",
    "ticketData": {
      "ticketId": "T-123",
      "tableName": "Table 5",
      "roomName": "Main Hall",
      "date": "2025-10-06",
      "items": [
        { "quantity": 2, "name": "Margherita Pizza", "price": 12.50 }
      ],
      "total": 25.00
    },
    "printerType": "CUSTOMER"
  }'
```

**Response Body (200 OK):**

```text
Print job sent
```

**Response Body (503 Service Unavailable):** any printing error (printer unavailable, template not found, etc.).

```json
{ "message": "Error processing print job" }
```

## Printer Configurations

### GET `/printers/configs`

Retrieves all saved printer configurations.

**Authorization:** valid `accessToken`.

**Response Body (200 OK):**

```json
[
  {
    "id": "config-uuid",
    "printerType": "KITCHEN",
    "printerName": "Kitchen",
    "templateName": null,
    "isDefault": true,
    "enabled": true,
    "createdAt": "2025-10-06T12:00:00Z"
  }
]
```

### POST `/printers/configs`

Creates a new printer configuration.

**Authorization:** valid `accessToken`.

**Request Body:**

```json
{
  "printerType": "KITCHEN | CUSTOMER | BAR",
  "printerName": "string",
  "templateName": "string (optional)",
  "isDefault": false,
  "enabled": true
}
```

**Response Body (201 Created):**

```json
{ "id": "new-config-uuid" }
```

**Response Body (409 Conflict):**

```json
{ "error": "Printer configuration already exists" }
```

### PUT `/printers/configs/{id}`

Updates a printer configuration. All fields are optional.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): Configuration ID.

**Request Body:**

```json
{
  "printerType": "KITCHEN | CUSTOMER | BAR",
  "printerName": "string",
  "templateName": "string",
  "isDefault": false,
  "enabled": true
}
```

**Response:** `200 OK` if updated; `404 Not Found` if it does not exist; `409 Conflict` `{ "error": "Printer configuration already exists" }` on collision.

### DELETE `/printers/configs/{id}`

Deletes a printer configuration.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): Configuration ID.

**Response:** `204 No Content` if deleted; `404 Not Found` if it does not exist.

### POST `/printers/configs/{id}/default`

Sets a configuration as the default printer for its type.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): Configuration ID.

**Response:** `200 OK` if set; `404 Not Found` if it does not exist.

### Notes

:::warning Printing errors
Any failure during `POST /printers/print` is wrapped in a `503` with `{ "message": "Error processing print job" }`, including missing templates or unavailable printers.
:::
