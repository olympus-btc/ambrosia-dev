### Ticket Template Management

Endpoints for managing the ticket templates used for printing.

:::info Authorization
All template endpoints require only a valid `accessToken` (`auth-jwt`); they do not use granular permissions.
:::

### GET `/templates`

Retrieves all available ticket templates.

**Authorization:** valid `accessToken`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/templates" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
[
  {
    "id": "template-uuid",
    "name": "Default Customer Ticket",
    "elements": []
  }
]
```

### GET `/templates/{id}`

Retrieves a ticket template by its ID.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): ID of the template to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/templates/template-uuid" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
{
  "id": "template-uuid",
  "name": "Default Customer Ticket",
  "elements": []
}
```

**Response:** `404 Not Found` if the template does not exist.

### POST `/templates`

Creates a new ticket template.

**Authorization:** valid `accessToken`.

**Request Body:**

```json
{
  "name": "string",
  "elements": [
    {
      "type": "HEADER",
      "value": "{{config.businessName}}",
      "style": { "bold": true, "justification": "CENTER", "fontSize": "NORMAL" }
    }
  ]
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/templates" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Custom Template",
    "elements": [
      {
        "type": "HEADER",
        "value": "{{config.businessName}}",
        "style": { "bold": true, "justification": "CENTER" }
      }
    ]
  }'
```

**Response Body (201 Created):**

```json
{ "id": "new-template-uuid" }
```

**Response Body (409 Conflict):** duplicate template name.

```json
{ "error": "Template name already exists" }
```

### PUT `/templates/{id}`

Updates an existing template.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): ID of the template to update.

**Request Body:** same as creation.

**Response Body (200 OK):** successful update.

**Response Body (409 Conflict):** the template does not exist or the name is already taken.

```json
{ "error": "Failed to update template. It might not exist or the name is already taken." }
```

### DELETE `/templates/{id}`

Deletes a ticket template.

**Authorization:** valid `accessToken`.

**Path Parameters:**

- `id` (string): ID of the template to delete.

**Response:** `204 No Content` if deleted; `404 Not Found` if it does not exist.

### Notes

:::info
The details of the `TicketTemplate`, `TicketElement`, `ElementType`, etc. models are in [Models](./Models.md).
:::
