### User Management

The user endpoints manage user accounts in the Ambrosia POS system.

:::warning Role field name
The role field differs between create and update:
- **`POST /users`** receives the `User` model, where the role is sent in the **`role`** field (UUID of an existing role).
- **`PUT /users/{id}`** receives `UpdateUserRequest`, where the role is sent in the **`roleId`** field.
:::

### GET `/users`

Retrieves all users in the system.

**Authorization:** None (public in this version).

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users"
```

**Response Body (Success - 200 OK):**

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

**Response Body (Empty list - 200 OK):**

```json
"No users found"
```

### GET `/users/{id}`

Retrieves a specific user by their ID.

**Authorization:** None (public in this version).

**Path Parameters:**

- `id` (string): ID of the user to retrieve.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be"
```

**Response Body (Success - 200 OK):**

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

Retrieves the currently authenticated user together with their permissions.

**Authorization:** requires a valid `accessToken`.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/users/me" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

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

Creates a new user in the system.

**Authorization:** `users_create`

**Request Body:**

```json
{
  "name": "string",
  "pin": "string (minimum 4 characters)",
  "role": "UUID of an existing role",
  "email": "string (optional)",
  "phone": "string (optional)",
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

**Response Body (Success - 201 Created):**

```json
{
  "id": "new-user-uuid",
  "message": "User added successfully"
}
```

**Response Body (Duplicate name - 409 Conflict):**

```json
{
  "message": "User name already exists"
}
```

### PUT `/users/{id}`

Updates an existing user. All fields are optional (but at least one must be provided).

**Authorization:** `users_update`

**Path Parameters:**

- `id` (string): ID of the user to update.

**Request Body:**

```json
{
  "name": "string",
  "pin": "string",
  "roleId": "UUID (role ID)",
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

**Response Body (Success - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "User updated successfully"
}
```

### DELETE `/users/{id}`

Deletes a user from the system.

**Authorization:** `users_delete`

**Path Parameters:**

- `id` (string): ID of the user to delete.

**cURL Example:**

```bash
curl -X DELETE "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response:** `204 No Content` (no body).

**Response Body (409 Conflict):** when trying to delete the last user or the last administrator.

```json
{
  "message": "Cannot delete the last user"
}
```

### Notes

:::info
- `GET /users` and `GET /users/{id}` are **public** (no authentication) in this version.
- User IDs are UUIDs generated automatically.
- The PIN is stored hashed and returned masked as `"****"`; minimum 4 characters.
:::

:::warning
Remember: on **create** the role goes in the `role` field; on **update** it goes in `roleId`. See the note at the top of the page.
:::
