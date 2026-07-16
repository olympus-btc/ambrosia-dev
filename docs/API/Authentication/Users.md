### Gestión de Usuarios

Los endpoints de usuarios permiten gestionar las cuentas de usuario en el sistema Ambrosia POS.

:::warning Nombre del campo de rol
El campo del rol difiere entre crear y actualizar:
- **`POST /users`** recibe el modelo `User`, donde el rol se envía en el campo **`role`** (UUID de un rol existente).
- **`PUT /users/{id}`** recibe `UpdateUserRequest`, donde el rol se envía en el campo **`roleId`**.
:::

### GET `/users`

Obtiene todos los usuarios del sistema.

**Authorization:** Ninguna (público en esta versión).

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users"
```

**Response Body (Éxito - 200 OK):**

```json
[
  {
    "id": "e911705c-e1b4-4997-ab02-ef7460491ac0",
    "name": "cooluser1",
    "pin": "****",
    "refreshToken": null,
    "role": null,
    "roleId": "e7349203-1bdf-4d8a-8a83-0f5dccb23e1b",
    "email": null,
    "phone": null,
    "isAdmin": false
  }
]
```

**Response Body (Lista vacía - 200 OK):**

```json
"No users found"
```

### GET `/users/{id}`

Obtiene un usuario específico por su ID.

**Authorization:** Ninguna (público en esta versión).

**Path Parameters:**

- `id` (string): ID del usuario a obtener.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "name": "admin",
  "pin": "****",
  "refreshToken": null,
  "role": null,
  "roleId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
  "email": "admin@ambrosia.com",
  "phone": null,
  "isAdmin": true
}
```

### GET `/users/me`

Obtiene el usuario autenticado actualmente, junto con sus permisos.

**Authorization:** requiere `accessToken` válido.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users/me" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "user": {
    "userId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
    "name": "admin",
    "role": "Admin",
    "roleId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
    "isAdmin": true,
    "email": null,
    "phone": null
  },
  "perms": [
    { "id": "perm-uuid", "name": "orders_read", "description": "Read orders", "enabled": true }
  ]
}
```

### POST `/users`

Crea un nuevo usuario en el sistema.

**Authorization:** `users_create`

**Request Body:**

```json
{
  "name": "string",
  "pin": "string (mínimo 4 caracteres)",
  "role": "UUID de un rol existente",
  "email": "string (opcional)",
  "phone": "string (opcional)",
  "isAdmin": false
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/users" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "newuser",
    "pin": "1234",
    "role": "262006ea-8782-4b08-ac3b-b3f13270fec3"
  }'
```

**Response Body (Éxito - 201 Created):**

```json
{
  "id": "new-user-uuid",
  "message": "User added successfully"
}
```

**Response Body (Nombre duplicado - 409 Conflict):**

```json
{
  "message": "User name already exists"
}
```

### PUT `/users/{id}`

Actualiza un usuario existente. Todos los campos son opcionales (pero al menos uno debe enviarse).

**Authorization:** `users_update`

**Path Parameters:**

- `id` (string): ID del usuario a actualizar.

**Request Body:**

```json
{
  "name": "string",
  "pin": "string",
  "roleId": "UUID (ID del rol)",
  "email": "string",
  "phone": "string",
  "refreshToken": "string"
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "updateduser",
    "pin": "5678",
    "roleId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "User updated successfully"
}
```

### DELETE `/users/{id}`

Elimina un usuario del sistema.

**Authorization:** `users_delete`

**Path Parameters:**

- `id` (string): ID del usuario a eliminar.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (sin cuerpo).

**Response Body (409 Conflict):** al intentar borrar el último usuario o el último administrador.

```json
{
  "message": "Cannot delete the last user"
}
```

### Notas

:::info
- `GET /users` y `GET /users/{id}` son **públicos** (sin autenticación) en esta versión.
- Los IDs de usuarios son UUID generados automáticamente.
- El PIN se almacena hasheado y se devuelve enmascarado como `"****"`; mínimo 4 caracteres.
:::

:::warning
Recuerda: en la **creación** el rol va en el campo `role`; en la **actualización** va en `roleId`. Ver el aviso al inicio de la página.
:::
