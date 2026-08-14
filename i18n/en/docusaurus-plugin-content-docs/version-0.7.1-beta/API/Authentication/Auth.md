### Authentication

The authentication endpoints handle login and logout via HTTP cookies carrying JWT tokens (`accessToken` and `refreshToken`).

### POST `/auth/login`

Authenticates a user and sets session cookies with the JWT tokens.

**Authorization:** None (public endpoint).

**Request Body:**

```json
{
  "name": "string",
  "pin": "string"
}
```

**cURL Example:**

The server responds with `Set-Cookie` headers containing the required tokens.

```bash
curl -i -X POST http://127.0.0.1:9154/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "cooluser1",
    "pin": "0000"
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "message": "Login successful",
  "user": {
    "userId": "f9b9d411-590f-4d10-a164-0173805857de",
    "name": "jordy",
    "role": "Admin",
    "roleId": "70d96869-b363-4b5f-a972-897afd30a68c",
    "isAdmin": true,
    "email": null,
    "phone": null
  },
  "perms": [
    {
      "id": "8b6c652b3f008627a56d392872698566",
      "name": "categories_create",
      "description": "Create categories",
      "enabled": true
    }
  ]
}
```

**Response Headers:** the `accessToken` (1 min) and `refreshToken` (30 days) cookies are set.

**Response Body (No permissions - 403 Forbidden):** the user authenticated but their role has no permissions assigned.

**Response Body (Invalid credentials - 401 Unauthorized):**

```json
{
  "message": "Invalid credentials"
}
```

**Response Body (Rate limit - 429 Too Many Requests):**

```json
{
  "retryAfter": 60
}
```

Accompanied by the `Retry-After` header (seconds).

:::info Authentication requirements
After a successful login it is **mandatory** to include the received cookies (`accessToken` and `refreshToken`) on every request to protected endpoints. In a browser this happens automatically.

**Example:** `Cookie: accessToken=...; refreshToken=...`
:::

### POST `/auth/refresh`

Renews the `accessToken` using the `refreshToken` stored in cookies.

**Authorization:** the `refreshToken` must be present in the cookies.

**cURL Example:**

```bash
curl -v -X POST http://127.0.0.1:9154/auth/refresh \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "message": "Access token refreshed successfully",
  "accessToken": "..."
}
```

**Response Headers:** the `accessToken` cookie is updated.

### POST `/auth/logout`

Logs the user out, revokes the refresh token, and clears the authentication cookies.

**Authorization:** requires a valid `accessToken` (sent automatically via cookies).

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:9154/auth/logout \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
{
  "message": "Logout successful"
}
```

**Response Headers:** the `accessToken` and `refreshToken` cookies are cleared.

### Notes

:::tip Best practices
- Authentication is handled via HTTP cookies carrying JWT tokens.
- The `accessToken` is short-lived (1 minute) to minimize risk; the `refreshToken` lasts 30 days.
- If the access token expires, use `/auth/refresh` to obtain a new one without interrupting the user.
:::

:::warning Login rate limiting
After 5 failed attempts, `POST /auth/login` applies a growing backoff following the Fibonacci sequence (in minutes), per IP address. While blocked it returns `429` with the `Retry-After` header and `{ "retryAfter": <seconds> }`. Implemented in `Authorize.kt`.
:::
