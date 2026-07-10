### Gestión de Usuarios

Los endpoints de usuarios permiten gestionar las cuentas de usuario en el sistema Ambrosia POS.

- `GET /users`: Obtiene todos los usuarios del sistema.
  - **Authorization:** Ninguna (público)
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users"
  ```
  - **Response Body (Éxito - 200 OK):**
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
  - **Response Body (Sin contenido - 204 No Content):**
  ```json
  "No users found"
  ```

- `GET /users/{id}`: Obtiene un usuario específico por su ID.
  - **Authorization:** Ninguna (público)
  - **Path Parameters:**
    - `id` (string): ID del usuario a obtener
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be"
  ```
  - **Response Body (Éxito - 200 OK):**
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

- `GET /users/me`: Obtiene el usuario autenticado actualmente, junto con sus permisos.
  - **Authorization:** Requiere access token válido
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users/me" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  {
    "user": {
      "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
      "name": "admin",
      "pin": "****",
      "roleId": "262006ea-8782-4b08-ac3b-b3f13270fec3",
      "isAdmin": true
    },
    "perms": [
      { "id": "perm-uuid", "name": "orders_read", "description": null, "enabled": true }
    ]
  }
  ```

- `POST /users`: Crea un nuevo usuario en el sistema.
  - **Authorization:** Requiere `users_create`
  - **Request Body:**
  ```json
  {
    "name": "string",
    "pin": "string (mínimo 4 caracteres)",
    "email": "string (opcional)",
    "phone": "string (opcional)",
    "isAdmin": false
  }
  ```
  - `roleId` **no se acepta en la creación** — asignar el rol vía `PUT /users/{id}`
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/users" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "newuser",
      "pin": "1234",
      "roleId": "262006ea-8782-4b08-ac3b-b3f13270fec3"
    }'
  ```
  - **Response Body (Éxito - 201 Created):**
  ```json
  { "id": "new-user-uuid", "message": "User added successfully" }
  ```

- `PUT /users/{id}`: Actualiza un usuario existente. Todos los campos son opcionales.
  - **Authorization:** Requiere `users_update`
  - **Path Parameters:**
    - `id` (string): ID del usuario a actualizar
  - **Request Body:**
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
  - **cURL Example:**
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
  - **Response Body (Éxito - 200 OK):**
  ```json
  { "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be", "message": "User updated successfully" }
  ```

- `DELETE /users/{id}`: Elimina un usuario del sistema.
  - **Authorization:** Requiere `users_delete`
  - **Path Parameters:**
    - `id` (string): ID del usuario a eliminar
  - **cURL Example:**
  ```bash
  curl -X DELETE "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (Éxito - 204 No Content)**

### Notas importantes:
- `GET /users` y `GET /users/{id}` son públicos (sin autenticación)
- Los IDs de usuarios son UUID generados automáticamente
- `roleId` solo se acepta en `PUT /users/{id}`, no en la creación
- El PIN se almacena hasheado y se devuelve enmascarado como `"****"` por seguridad; mínimo 4 caracteres
