### Gestión de Tickets

Los endpoints de tickets permiten administrar las facturas y recibos del sistema de punto de venta.

:::tip Convención de nombres
Los campos JSON usan **camelCase** (`orderId`, `userId`, `ticketDate`, `totalAmount`).
:::

### GET `/tickets`

Obtiene todos los tickets del sistema.

**Authorization:** `tickets_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/tickets" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "2be55b66-819e-47f6-870a-a0d2cfbca279",
    "orderId": "11122afd-3dda-4455-82de-310fc94f58db",
    "userId": "941bc7aa-ee4c-45cf-844d-1a624a870fed",
    "ticketDate": "2025-07-27T10:30:00Z",
    "status": 1,
    "totalAmount": 45.50,
    "notes": "Pago en efectivo"
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No tickets found"
```

### GET `/tickets/{id}`

Obtiene un ticket específico por su ID.

**Authorization:** `tickets_read`

**Path Parameters:**

- `id` (string): ID del ticket a obtener.

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "12226fd9-7299-4c75-b573-2d4a586ac8ab",
  "orderId": "83bb3cc3-7c60-4ad2-a4c3-e0601c028106",
  "userId": "22ed1170-ccb7-4a2d-9fc6-47ac6b39c2ca",
  "ticketDate": "2025-07-27T10:30:00Z",
  "status": 1,
  "totalAmount": 45.50,
  "notes": "Pago en efectivo"
}
```

### POST `/tickets`

Crea un nuevo ticket.

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
    "notes": "Pago mixto: efectivo + tarjeta"
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "1633ebd2-7462-4c6c-aa57-41143e8a087a",
  "message": "Ticket added successfully"
}
```

### PUT `/tickets/{id}`

Actualiza un ticket existente.

**Authorization:** `tickets_update`

**Path Parameters:**

- `id` (string): ID del ticket a actualizar.

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

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "2ce883f9-bd79-447c-b840-af418ca2223c",
  "message": "Ticket updated successfully"
}
```

### DELETE `/tickets/{id}`

Elimina un ticket del sistema.

**Authorization:** `tickets_delete`

**Path Parameters:**

- `id` (string): ID del ticket a eliminar.

**Response:** `204 No Content` (sin cuerpo).

### Notas

:::info
- Un ticket debe estar asociado a una orden (`orderId`) y a un usuario (`userId`) válidos.
- El campo `notes` es requerido (puede ser una cadena vacía).
- Estados de ticket comunes: `1` Pendiente, `2` Pagado, `3` Cancelado.
- El `totalAmount` debe coincidir con el total de la orden asociada.
:::
