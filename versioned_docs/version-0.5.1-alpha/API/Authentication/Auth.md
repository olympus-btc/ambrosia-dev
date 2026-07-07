### Autenticación

- `POST /auth/login`: Autentica a un usuario específico y establece cookies de sesión con tokens JWT (access token y refresh token).
 - **Request Body:**
  ``` JSON
  {
    "name": "string",
    "pin": "string"
  }
  ``` 
  - **cURL Example:**
  
  Realiza la siguiente petición para iniciar sesión. El servidor responderá con cabeceras `Set-Cookie` que contienen los tokens necesarios.

  ```bash
  curl -i -X POST http://127.0.0.1:9154/auth/login \
    -H 'Content-Type: application/json' \
    -d '{
      "name": "cooluser1",
      "pin": "0000"
    }'
  ```

:::info Requisitos de Autenticación
Tras un login exitoso, es **obligatorio** incluir los tokens recibidos (`accessToken` y `refreshToken`) en la cabecera `Cookie` de todas las peticiones a endpoints protegidos.

**Ejemplo:**
`Cookie: accessToken=...; refreshToken=...`
:::

- **Response Body (Éxito - 200 OK):**
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
      "... (lista completa de permisos)"
    ]
  }
  ```
  - **Response Headers:** Se establecen cookies `accessToken` (1 min) y `refreshToken` (30 días)

- `POST /auth/refresh`: Renueva el access token usando el refresh token almacenado en cookies.
 - **Request:** El refresh token debe estar presente en las cookies
 - **cURL Example:**
  ```Bash
  curl -v -X POST http://127.0.0.1:9154/auth/refresh \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):**
  ```JSON
  {"message":"Access token refreshed successfully","accessToken":"..."}
  ```
  - **Response Headers:** Se actualiza la cookie `accessToken`

- `POST /auth/logout`: Cierra la sesión del usuario, revoca el refresh token y elimina las cookies de autenticación.
 - **Authorization:** Requiere access token válido (enviado automáticamente via cookies)
 - **cURL Example:** 
  ```Bash
  curl -X POST http://127.0.0.1:9154/auth/logout \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):**
  ```JSON
  {
    "message": "Logout successful"
  }
  ```
  - **Response Headers:** Se eliminan las cookies `accessToken` y `refreshToken`

### Notas importantes:

:::tip Mejores Prácticas
- La autenticación se maneja mediante cookies HTTP con tokens JWT para mayor seguridad.
- El `accessToken` tiene una duración corta (1 minuto) para minimizar riesgos, mientras que el `refreshToken` dura 30 días.
- Para endpoints protegidos, el navegador envía automáticamente las cookies.
- Si el access token expira, el sistema debe usar automáticamente `/auth/refresh` para obtener uno nuevo sin interrumpir al usuario.
:::

:::warning Rate Limiting en Login
Después de 5 intentos fallidos, `POST /auth/login` aplica un bloqueo con espera creciente siguiendo la sucesión de Fibonacci (en minutos). Implementado en `Authorize.kt`.
:::
