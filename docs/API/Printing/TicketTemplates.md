### Gestión de Plantillas de Tickets

Endpoints para gestionar las plantillas de tickets utilizadas en la impresión.

:::info Autorización
Todos los endpoints de plantillas requieren únicamente un `accessToken` válido (`auth-jwt`); no usan permisos granulares.
:::

### GET `/templates`

Obtiene todas las plantillas de tickets disponibles.

**Authorization:** `accessToken` válido.

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

Obtiene una plantilla de ticket por su ID.

**Authorization:** `accessToken` válido.

**Path Parameters:**

- `id` (string): ID de la plantilla a obtener.

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

**Response:** `404 Not Found` si la plantilla no existe.

### POST `/templates`

Crea una nueva plantilla de ticket.

**Authorization:** `accessToken` válido.

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

**Response Body (409 Conflict):** nombre de plantilla duplicado.

```json
{ "error": "Template name already exists" }
```

### PUT `/templates/{id}`

Actualiza una plantilla existente.

**Authorization:** `accessToken` válido.

**Path Parameters:**

- `id` (string): ID de la plantilla a actualizar.

**Request Body:** igual al de creación.

**Response Body (200 OK):** actualización correcta.

**Response Body (409 Conflict):** la plantilla no existe o el nombre ya está en uso.

```json
{ "error": "Failed to update template. It might not exist or the name is already taken." }
```

### DELETE `/templates/{id}`

Elimina una plantilla de ticket.

**Authorization:** `accessToken` válido.

**Path Parameters:**

- `id` (string): ID de la plantilla a eliminar.

**Response:** `204 No Content` si se elimina; `404 Not Found` si no existe.

### Notas

:::info
El detalle de los modelos `TicketTemplate`, `TicketElement`, `ElementType`, etc. está en [Models](./Models.md).
:::
