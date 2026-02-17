### Authentication

- `POST /auth/login`: Authenticates a specific user and sets session cookies with JWT tokens (access token and refresh token).
 - **Request Body:**
  ``` JSON
  {
    "name": "string",
    "pin": "string"
  }
  ``` 
  - **cURL Example:**
  
  Perform the following request to log in. The server will respond with `Set-Cookie` headers containing the necessary tokens.

  ```bash
  curl -i -X POST http://127.0.0.1:9154/auth/login \
    -H 'Content-Type: application/json' \
    -d '{
      "name": "jordy",
      "pin": "0000"
    }'
  ```

:::info Authentication Requirements
After a successful login, it is **mandatory** to include the received tokens (`accessToken` and `refreshToken`) in the `Cookie` header of all requests to protected endpoints.

**Example:**
`Cookie: accessToken=...; refreshToken=...`
:::

  - **Response Body (Success - 200 OK):**
  ```JSON
  {
    "message": "Login successful",
    "user": {
      "user_id": "f9b9d411-590f-4d10-a164-0173805857de",
      "name": "jordy",
      "email": null,
      "phone": null,
      "role": "Admin",
      "role_id": "70d96869-b363-4b5f-a972-897afd30a68c",
      "isAdmin": true
    },
    "perms": [
      {
        "id": "8b6c652b3f008627a56d392872698566",
        "name": "categories_create",
        "description": "Create categories",
        "enabled": true
      },
      "... (full list of permissions)"
    ]
  }
  ```
  - **Response Headers:** `accessToken` (1 min) and `refreshToken` (30 days) cookies are set

- `POST /auth/refresh`: Renews the access token using the refresh token stored in cookies.
 - **Request:** The refresh token must be present in the cookies
 - **cURL Example:**
  ```Bash
  curl -v -X POST http://127.0.0.1:9154/auth/refresh \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Success - 200 OK):**
  ```JSON
  {"message":"Access token refreshed successfully","accessToken":"..."}
  ```
  - **Response Headers:** The `accessToken` cookie is updated

- `POST /auth/logout`: Logs out the user, revokes the refresh token, and deletes the authentication cookies.
 - **Authorization:** Requires a valid access token (sent automatically via cookies)
 - **cURL Example:** 
  ```Bash
  curl -X POST http://127.0.0.1:9154/auth/logout \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Success - 200 OK):**
  ```JSON
  {
    "message": "Logout successful"
  }
  ```
  - **Response Headers:** The `accessToken` and `refreshToken` cookies are deleted

### Important notes:

:::tip Best Practices
- Authentication is handled via HTTP cookies with JWT tokens for enhanced security.
- The `accessToken` has a short duration (1 minute) to minimize risks, while the `refreshToken` lasts 30 days.
- For protected endpoints, the browser automatically sends the required cookies.
- If the access token expires, the system should automatically use `/auth/refresh` to obtain a new one without interrupting the user.
:::
