### Role Management

The role endpoints manage the different user roles in the system.

### GET `/roles`

Retrieves all roles in the system.

**Authorization:** `roles_read`

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/roles \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  {
    "id": "e7349203-1bdf-4d8a-8a83-0f5dccb23e1b",
    "role": "coolrolename",
    "password": "******",
    "isAdmin": true
  }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No roles found"
```

### GET `/roles/{id}`

Retrieves a specific role by its ID.

**Authorization:** `roles_read`

**Path Parameters:**

- `id` (string): ID of the role to retrieve.

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/roles/76ee1086-b945-4170-b2e6-9fbeb95ae0be \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "e7349203-1bdf-4d8a-8a83-0f5dccb23e1b",
  "role": "coolrolename",
  "password": "******",
  "isAdmin": true
}
```

### POST `/roles`

Creates a new role in the system.

**Authorization:** `roles_create`

**Request Body:**

```json
{
  "role": "string",
  "password": "string",
  "isAdmin": true
}
```

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:9154/roles \
  -H 'Content-Type: application/json' \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -d '{
    "role": "admin",
    "password": "S3cur3P4ssw0rd!!",
    "isAdmin": true
  }'
```

**Response Body (Success - 201 Created):**

```json
{
  "id": "5f80cf01-9448-4332-a981-0140cba12279",
  "message": "Role added successfully"
}
```

**Response Body (Error - 400 Bad Request):** blank or invalid role name.

```json
"Invalid role data"
```

### PUT `/roles/{id}`

Updates an existing role.

**Authorization:** `roles_update`

**Path Parameters:**

- `id` (string): ID of the role to update.

**Request Body:**

```json
{
  "role": "admin",
  "password": "S3cur3P4ssw0rd!!",
  "isAdmin": true
}
```

**cURL Example:**

```bash
curl -X PUT http://127.0.0.1:9154/roles/76ee1086-b945-4170-b2e6-9fbeb95ae0be \
  -H 'Content-Type: application/json' \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -d '{
    "role": "admin",
    "password": "S3cur3P4ssw0rd123!!",
    "isAdmin": true
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "message": "Role updated successfully"
}
```

**Response Body (Error - 400 Bad Request):** blank role name.

```json
"Invalid role data"
```

**Response Body (Error - 404 Not Found):**

```json
"Role with ID: {id} not found"
```

### DELETE `/roles/{id}`

Deletes a role from the system.

**Authorization:** `roles_delete`

**Path Parameters:**

- `id` (string): ID of the role to delete.

**cURL Example:**

```bash
curl -X DELETE http://127.0.0.1:9154/roles/76ee1086-b945-4170-b2e6-9fbeb95ae0be \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response:** `204 No Content` (no body).

---

## Role Permissions

### GET `/roles/{id}/permissions`

Lists the permissions assigned to a role.

**Authorization:** `roles_read`

**Path Parameters:**

- `id` (string): Role ID.

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/roles/76ee1086-b945-4170-b2e6-9fbeb95ae0be/permissions \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  { "id": "0f3c...", "name": "products_read", "description": "List and view products", "enabled": true },
  { "id": "1a2b...", "name": "orders_create", "description": "Create new orders", "enabled": true }
]
```

**Response Body (No permissions - 200 OK):**

```json
"No permissions found for this role"
```

### PUT `/roles/{id}/permissions`

Fully replaces the permissions assigned to a role.

**Authorization:** `roles_update`

**Path Parameters:**

- `id` (string): Role ID.

**Request Body:**

```json
{
  "permissions": ["products_read", "orders_create", "orders_read"]
}
```

The keys in `permissions` correspond to each permission's `name` field.

**cURL Example:**

```bash
curl -X PUT http://127.0.0.1:9154/roles/76ee1086-b945-4170-b2e6-9fbeb95ae0be/permissions \
  -H 'Content-Type: application/json' \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  -d '{
    "permissions": ["products_read", "orders_create", "orders_read"]
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "roleId": "76ee1086-b945-4170-b2e6-9fbeb95ae0be",
  "assigned": 3
}
```

**Response Body (Error - 404 Not Found):** the role does not exist.

```json
"Role with ID: {id} not found"
```

### Notes

:::info
- Role IDs are unique UUIDs in the system.
- Deleting a role may affect users assigned to it.
- The `role` (name) field is required and cannot be blank when creating or updating.
- A role can be created or edited with no permissions assigned.
:::
