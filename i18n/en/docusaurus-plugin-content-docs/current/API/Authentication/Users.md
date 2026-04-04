### User Management

The user endpoints allow you to manage user accounts in the Ambrosia POS system.

- `GET /users`: Gets all the users in the system.
  - **Authorization:** None (public)
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users"
  ```
  - **Response Body (Success - 200 OK):**
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
  - **Response Body (No Content - 204 No Content):**
  ```json
  "No users found"
  ```

- `GET /users/{id}`: Gets a specific user by their ID.
  - **Authorization:** None (public)
  - **Path Parameters:**
    - `id` (string): ID of the user to get
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be"
  ```
  - **Response Body (Success - 200 OK):**
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

- `GET /users/me`: Gets the currently authenticated user along with their permissions.
  - **Authorization:** Requires valid access token
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/users/me" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (Success - 200 OK):**
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

- `POST /users`: Creates a new user in the system.
  - **Authorization:** Requires `users_create`
  - **Request Body:**
  ```json
  {
    "name": "string",
    "pin": "string (minimum 4 characters)",
    "roleId": "UUID (Role ID)",
    "email": "string (optional)",
    "phone": "string (optional)",
    "isAdmin": false
  }
  ```
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
  - **Response Body (Success - 201 Created):**
  ```json
  { "id": "new-user-uuid", "message": "User added successfully" }
  ```

- `PUT /users/{id}`: Updates an existing user. All fields are optional.
  - **Authorization:** Requires `users_update`
  - **Path Parameters:**
    - `id` (string): ID of the user to update
  - **Request Body:**
  ```json
  {
    "name": "string",
    "pin": "string",
    "roleId": "UUID (Role ID)",
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
  - **Response Body (Success - 200 OK):**
  ```json
  { "id": "76ee1086-b945-4170-b2e6-9fbeb95ae0be", "message": "User updated successfully" }
  ```

- `DELETE /users/{id}`: Deletes a user from the system.
  - **Authorization:** Requires `users_delete`
  - **Path Parameters:**
    - `id` (string): ID of the user to delete
  - **cURL Example:**
  ```bash
  curl -X DELETE "http://127.0.0.1:9154/users/76ee1086-b945-4170-b2e6-9fbeb95ae0be" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (Success - 204 No Content)**

### Important notes:
- `GET /users` and `GET /users/{id}` are public (no authentication required)
- User IDs are automatically generated UUIDs
- Use `roleId` (UUID) to assign a role when creating or updating a user
- The PIN is stored hashed and returned masked as `"****"` for security; minimum 4 characters
