### Autenticación

Los endpoints de autenticación gestionan el inicio y cierre de sesión mediante cookies HTTP con tokens JWT (`accessToken` y `refreshToken`).

### POST `/auth/login`

Autentica a un usuario y establece cookies de sesión con los tokens JWT.

**Authorization:** Ninguna (endpoint público).

**Request Body:**

```json
{
  "name": "string",
  "pin": "string"
}
```

**cURL Example:**

El servidor responderá con cabeceras `Set-Cookie` que contienen los tokens necesarios.

```bash
curl -i -X POST http://127.0.0.1:9154/auth/login \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "cooluser1",
    "pin": "0000"
  }'
```

**Response Body (Éxito - 200 OK):**

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

**Response Headers:** se establecen las cookies `accessToken` (1 min) y `refreshToken` (30 días).

**Response Body (Sin permisos - 403 Forbidden):** el usuario se autenticó pero su rol no tiene permisos asignados.

**Response Body (Credenciales inválidas - 401 Unauthorized):**

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

Se acompaña de la cabecera `Retry-After` (segundos).

:::info Requisitos de autenticación
Tras un login exitoso, es **obligatorio** incluir las cookies recibidas (`accessToken` y `refreshToken`) en todas las peticiones a endpoints protegidos. En un navegador esto ocurre automáticamente.

**Ejemplo:** `Cookie: accessToken=...; refreshToken=...`
:::

### POST `/auth/refresh`

Renueva el `accessToken` usando el `refreshToken` almacenado en cookies.

**Authorization:** el `refreshToken` debe estar presente en las cookies.

**cURL Example:**

```bash
curl -v -X POST http://127.0.0.1:9154/auth/refresh \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "message": "Access token refreshed successfully",
  "accessToken": "..."
}
```

**Response Headers:** se actualiza la cookie `accessToken`.

### POST `/auth/logout`

Cierra la sesión del usuario, revoca el refresh token y elimina las cookies de autenticación.

**Authorization:** requiere `accessToken` válido (enviado automáticamente vía cookies).

**cURL Example:**

```bash
curl -X POST http://127.0.0.1:9154/auth/logout \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Éxito - 200 OK):**

```json
{
  "message": "Logout successful"
}
```

**Response Headers:** se eliminan las cookies `accessToken` y `refreshToken`.

### Notas

:::tip Mejores prácticas
- La autenticación se maneja mediante cookies HTTP con tokens JWT.
- El `accessToken` dura poco (1 minuto) para minimizar riesgos; el `refreshToken` dura 30 días.
- Si el access token expira, usa `/auth/refresh` para obtener uno nuevo sin interrumpir al usuario.
:::

:::warning Rate limiting en login
Tras 5 intentos fallidos, `POST /auth/login` aplica un bloqueo con espera creciente siguiendo la sucesión de Fibonacci (en minutos), por dirección IP. Mientras dura el bloqueo devuelve `429` con la cabecera `Retry-After` y `{ "retryAfter": <segundos> }`. Implementado en `Authorize.kt`.
:::
