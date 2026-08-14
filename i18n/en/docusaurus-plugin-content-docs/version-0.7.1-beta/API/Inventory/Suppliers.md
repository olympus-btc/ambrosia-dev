### Supplier Management

The supplier endpoints manage the contact information of the restaurant's suppliers.

### GET `/suppliers`

Retrieves all suppliers in the system.

**Authorization:** `suppliers_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/suppliers" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "1c322996-8696-4dcb-b14e-8c7abd8a4880",
    "name": "Central Distributor",
    "contact": "María García",
    "phone": "+34 666 123 456",
    "email": "maria@distribuidora.com",
    "address": "Calle Mayor 123, Madrid"
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No suppliers found"
```

### GET `/suppliers/{id}`

Retrieves a specific supplier by its ID.

**Authorization:** `suppliers_read`

**Path Parameters:**

- `id` (string): ID of the supplier to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/suppliers/5f7037ea-a0cc-4820-9df4-90a80960d897" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "5f7037ea-a0cc-4820-9df4-90a80960d897",
  "name": "Central Distributor",
  "contact": "María García",
  "phone": "+34 666 123 456",
  "email": "maria@distribuidora.com",
  "address": "Calle Mayor 123, Madrid"
}
```

### POST `/suppliers`

Creates a new supplier.

**Authorization:** `suppliers_create`

**Request Body:**

```json
{
  "name": "string",
  "contact": "string",
  "phone": "string",
  "email": "string",
  "address": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/suppliers" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fresh Fruits and Vegetables",
    "contact": "Ana López",
    "phone": "+34 688 345 678",
    "email": "ana@frutasfrescas.com",
    "address": "Mercado Central, Puesto 15, Sevilla"
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "10980f77-45fa-4a5c-bd3b-bb93d9b6ca0f",
  "message": "Supplier added successfully"
}
```

### PUT `/suppliers/{id}`

Updates an existing supplier.

**Authorization:** `suppliers_update`

**Path Parameters:**

- `id` (string): ID of the supplier to update.

**Request Body:**

```json
{
  "name": "string",
  "contact": "string",
  "phone": "string",
  "email": "string",
  "address": "string"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/suppliers/a1bbc895-297f-42d8-bc92-e7dc61b81d6f" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Central Distributor Ltd.",
    "contact": "María García Rodríguez",
    "phone": "+34 666 123 456",
    "email": "maria.garcia@distribuidora.com",
    "address": "Calle Mayor 123, 28001 Madrid"
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "10980f77-45fa-4a5c-bd3b-bb93d9b6ca0f",
  "message": "Supplier updated successfully"
}
```

### DELETE `/suppliers/{id}`

Deletes a supplier from the system.

**Authorization:** `suppliers_delete`

**Path Parameters:**

- `id` (string): ID of the supplier to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/suppliers/supplier-uuid-1" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

### Notes

:::info
- Supplier IDs are UUIDs generated automatically.
- All fields (`name`, `contact`, `phone`, `email`, `address`) are required.
- Suppliers can be associated with ingredients for inventory control.
:::
