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
    "refreshToken": "****",
    "role": "Mesero",
    "roleId": "e7349203-1bdf-4d8a-8a83-0f5dccb23e1b",
    "email": null,
    "phone": null,
    "isAdmin": false
  }
]
```

:::caution `isAdmin` siempre es `false` en este listado
`getUsers()` no asigna `isAdmin`, por lo que el campo cae al valor por defecto del modelo (`false`) **independientemente de si el usuario es administrador**. Para conocer el estado real usa `GET /users/{id}`, que sí lo consulta.
:::

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
  "role": "Admin",
  "roleId": null,
  "email": "admin@ambrosia.com",
  "phone": null,
  "isAdmin": true
}
```

:::danger Este endpoint puede exponer el refresh token
A diferencia de `GET /users`, que siempre enmascara el token como `"****"`, `getUserById()` devuelve **el valor crudo de la columna `refresh_token`**: `null` si el usuario no tiene sesión activa, pero el **token real y sin enmascarar** si la tiene. Como además el endpoint no requiere autenticación, cualquiera que conozca un ID de usuario puede obtener el token de refresco de una sesión abierta. Trátalo como un fallo de seguridad conocido del servidor, no como comportamiento deseado.
:::

:::info `isAdmin` sí es fiable aquí
Al contrario que en `GET /users`, esta consulta selecciona `r.isAdmin`, así que el valor refleja el estado real del rol.
:::

:::info `roleId` siempre es `null` aquí
La consulta `GET_USER_BY_ID` selecciona `r.role` e `r.isAdmin`, pero **no** `u.role_id`, así que `roleId` nunca se rellena en esta respuesta. Si necesitas el UUID del rol, usa `GET /users`.
:::

### GET `/users/me`

Obtiene el usuario autenticado actualmente, junto con sus permisos.

**Authorization:** requiere `accessToken` válido **y** la cookie `refreshToken`. Si falta esta última, responde `401 { "error": "Refresh token no encontrado" }`.

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
    "roleId": "Admin",
    "isAdmin": true,
    "email": null,
    "phone": null
  },
  "perms": [
    { "id": "perm-uuid", "name": "orders_read", "description": "Read orders", "enabled": true }
  ]
}
```

:::caution `roleId` repite el nombre del rol
El handler construye la respuesta con `roleId = userInfo.role`, es decir, asigna el **nombre** del rol al campo `roleId` en lugar del UUID (que sí está disponible como `userInfo.roleId`). Por eso `role` y `roleId` devuelven el mismo valor. Es un bug conocido del servidor; no dependas de `roleId` en este endpoint.
:::

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
