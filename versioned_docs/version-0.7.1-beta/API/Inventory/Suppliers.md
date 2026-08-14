### Gestión de Proveedores

Los endpoints de proveedores permiten administrar la información de contacto de los proveedores del restaurante.

### GET `/suppliers`

Obtiene todos los proveedores del sistema.

**Authorization:** `suppliers_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/suppliers" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "1c322996-8696-4dcb-b14e-8c7abd8a4880",
    "name": "Distribuidora Central",
    "contact": "María García",
    "phone": "+34 666 123 456",
    "email": "maria@distribuidora.com",
    "address": "Calle Mayor 123, Madrid"
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No suppliers found"
```

### GET `/suppliers/{id}`

Obtiene un proveedor específico por su ID.

**Authorization:** `suppliers_read`

**Path Parameters:**

- `id` (string): ID del proveedor a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/suppliers/5f7037ea-a0cc-4820-9df4-90a80960d897" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "5f7037ea-a0cc-4820-9df4-90a80960d897",
  "name": "Distribuidora Central",
  "contact": "María García",
  "phone": "+34 666 123 456",
  "email": "maria@distribuidora.com",
  "address": "Calle Mayor 123, Madrid"
}
```

### POST `/suppliers`

Crea un nuevo proveedor.

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
    "name": "Frutas y Verduras Frescas",
    "contact": "Ana López",
    "phone": "+34 688 345 678",
    "email": "ana@frutasfrescas.com",
    "address": "Mercado Central, Puesto 15, Sevilla"
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "10980f77-45fa-4a5c-bd3b-bb93d9b6ca0f",
  "message": "Supplier added successfully"
}
```

### PUT `/suppliers/{id}`

Actualiza un proveedor existente.

**Authorization:** `suppliers_update`

**Path Parameters:**

- `id` (string): ID del proveedor a actualizar.

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
    "name": "Distribuidora Central S.L.",
    "contact": "María García Rodríguez",
    "phone": "+34 666 123 456",
    "email": "maria.garcia@distribuidora.com",
    "address": "Calle Mayor 123, 28001 Madrid"
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "10980f77-45fa-4a5c-bd3b-bb93d9b6ca0f",
  "message": "Supplier updated successfully"
}
```

### DELETE `/suppliers/{id}`

Elimina un proveedor del sistema.

**Authorization:** `suppliers_delete`

**Path Parameters:**

- `id` (string): ID del proveedor a eliminar.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/suppliers/supplier-uuid-1" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::info
- Los IDs de proveedores son UUID generados automáticamente.
- Todos los campos (`name`, `contact`, `phone`, `email`, `address`) son requeridos.
- Los proveedores pueden asociarse a ingredientes para el control de inventario.
:::
