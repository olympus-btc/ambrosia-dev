---
sidebar_position: 1
---

### Endpoints Generales

Endpoints generales del sistema Ambrosia POS que proporcionan información básica y configuración.

## Endpoint Raíz

### GET `/`

Endpoint raíz de la API.

**Authorization:** No requiere autenticación.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/"
```

**Response Body (200 OK):**

```json
"Root path of the API Nothing to see here"
```

## Health

### GET `/api/health`

Verifica que el servidor está en ejecución.

**Authorization:** No requiere autenticación.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/api/health"
```

**Response Body (200 OK):**

```json
{
  "status": "healthy",
  "timestamp": "1712150400000"
}
```

## Configuración Inicial

Estos endpoints gestionan el proceso de primera configuración del sistema. Solo son relevantes en el primer arranque.

### GET `/initial-setup`

Verifica si el sistema ya fue inicializado.

**Authorization:** No requiere autenticación.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/initial-setup"
```

**Response Body (200 OK):**

```json
{
  "initialized": false,
  "needsBusinessType": false
}
```

### POST `/initial-setup`

Ejecuta la configuración inicial — crea el rol admin, el primer usuario y guarda los datos del negocio. Si el sistema ya fue inicializado pero falta confirmar el tipo de negocio, este endpoint también lo resuelve.

**Authorization:** No requiere autenticación.

**Request Body (primera configuración):**

```json
{
  "businessType": "restaurant",
  "businessName": "Mi Negocio",
  "businessCurrency": "USD",
  "userName": "admin",
  "userPassword": "S3cur3P4ssw0rd!!",
  "userPin": "1234",
  "businessAddress": "string (opcional)",
  "businessPhone": "string (opcional)",
  "businessEmail": "string (opcional)",
  "businessTaxId": "string (opcional)",
  "businessRFC": "string (opcional, alias de businessTaxId)",
  "businessLogoUrl": "string (opcional)",
  "businessLogo": "string (opcional, alias de businessLogoUrl)"
}
```

**Request Body (solo confirmar tipo de negocio):**

```json
{
  "businessType": "store"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/initial-setup" \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "restaurant",
    "businessName": "Mi Restaurante",
    "businessCurrency": "USD",
    "userName": "admin",
    "userPassword": "S3cur3P4ssw0rd!!",
    "userPin": "1234"
  }'
```

**Response Body (201 Created):**

```json
{
  "message": "Initial setup completed",
  "userId": "f9b9d411-590f-4d10-a164-0173805857de",
  "roleId": "70d96869-b363-4b5f-a972-897afd30a68c"
}
```

`userId` y `roleId` son UUID (string), no enteros.

**Response Body (400 Bad Request):** datos faltantes o tipo de negocio inválido.

```json
{ "message": "Invalid business type" }
```

**Response Body (404 Not Found):** acrónimo de moneda desconocido.

```json
{ "message": "Unknown currency acronym: XYZ" }
```

**Response Body (409 Conflict):** sistema ya inicializado.

```json
{ "message": "Initial setup already completed" }
```

---

### Códigos de Estado HTTP

#### Éxito (2xx)

- **200 OK**: Operación exitosa. Las **listas vacías** también devuelven `200` con un string descriptivo (ej. `"No orders found"`).
- **201 Created**: Recurso creado exitosamente.
- **202 Accepted**: Operación aceptada pero aún no completada (ej. `POST /store/orders/checkout-if-paid` con pago Lightning sin confirmar → `{ "status": "pending" }`).
- **204 No Content**: Sin cuerpo. Se usa en los `DELETE` exitosos (excepto `DELETE /store/orders/{id}`) y en `GET /shifts/open` cuando no hay turno abierto.

#### Error del Cliente (4xx)

- **400 Bad Request**: Parámetros faltantes o inválidos.
- **401 Unauthorized**: No autenticado o token inválido.
- **403 Forbidden**: Permisos insuficientes (`Permission required`, `Admin privileges required`, `Wallet access required`).
- **404 Not Found**: Recurso no encontrado.
- **409 Conflict**: Conflicto de estado — SKU duplicado, nombre de usuario/rol duplicado, turno ya abierto, borrado del último admin, etc.
- **429 Too Many Requests**: Límite de intentos de login. Incluye la cabecera `Retry-After` y `{ "retryAfter": <segundos> }`.

#### Error del Servidor (5xx)

- **500 Internal Server Error**: Error interno del servidor.
- **503 Service Unavailable**: Servicio externo no disponible (nodo Phoenix o impresión).

---

### Formato de Datos

#### Timestamps

- Los timestamps suelen ser Unix en milisegundos (ej. `1753549837824`), enviados/recibidos como string o número según el campo. Algunas fechas usan ISO 8601 (`2025-01-15T14:30:00Z`).

#### Identificadores

- **Tipo**: UUID v4.
- **Ejemplo**: `76ee1086-b945-4170-b2e6-9fbeb95ae0be`.

#### Monedas y Cantidades

- Los importes del módulo restaurant se expresan como decimales (ej. `45.50`).
- Los importes del módulo Store (productos, checkout, reportes) se expresan como **enteros en centavos** (ej. `25000` = $250.00).
- Montos Lightning en **satoshis**.

---

### Autenticación

- **Tipo**: JWT en cookies HTTP.
- **accessToken** (`auth-jwt`): operaciones estándar de la API. Duración ~1 minuto.
- **refreshToken**: renueva el access token. Duración 30 días.
- **walletAccessToken** (`auth-jwt-wallet`): requerido por la mayoría de endpoints `/wallet/*`. Se obtiene en `POST /wallet/auth`.
- Endpoints: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`.

---

### Paginación

Algunos endpoints (p. ej. los de `/wallet/payments/*`) soportan paginación:

- **limit** (int): máximo de resultados (por defecto: 20).
- **offset** (int): resultados a omitir (por defecto: 0).
- **all** (boolean): mostrar todos sin paginación.

```bash
curl -X GET "http://127.0.0.1:9154/wallet/payments/incoming?limit=10&offset=20" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: walletAccessToken=$WALLET_ACCESS_TOKEN"
```

:::info
`/wallet/payments/incoming` requiere `walletAccessToken` además del `accessToken`.
:::

---

### Filtros Comunes

La mayoría de los query params de filtro usan **camelCase** (`userId`, `paymentMethod`, `minTotal`, `startDate`, `endDate`, `sortBy`, `sortOrder`).

**Excepciones en snake_case** (por cómo las lee el servidor):

- `user_id` en `GET /shifts/open`.
- `start_date` / `end_date` en `GET /orders/date-range`.
- La clave `total_sales` en la respuesta de `GET /orders/total-sales/{date}`.

Los endpoints de wallet usan `from` / `to` (timestamps) para filtrar por fecha.

---

### Manejo de Errores

Los errores gestionados por el manejador central devuelven un objeto:

```json
{ "message": "Descripción del error" }
```

Excepciones:

- Algunas validaciones a nivel de ruta responden con un **string plano** (ej. `"Missing or malformed ID"`, `"There is already an open shift"`).
- Los errores de Phoenix devuelven `WalletErrorResponse`: `{ "message": "...", "code": <int?>, "source": "..." }`.

---

### Entornos

- **Desarrollo**: URL base `http://127.0.0.1:9154`, SQLite local.
- **Producción**: URL según despliegue, HTTPS obligatorio.

---

### Tipos de Datos Personalizados

#### Estados de Mesa

- `available`, `occupied`, `reserved`.

#### Estados de Orden

- `open`, `closed`, `paid` (valores válidos del campo `status` de una orden).

#### Estados de Plato (preparación)

- El `status` de un `OrderDish` refleja el flujo de cocina (por ejemplo `pending`); cada plato incluye además `shouldPrepare`.

#### Estados de Ticket

- `1` Pendiente, `2` Pagado, `3` Cancelado.

---

### Integración Bitcoin Lightning

El sistema incluye integración con Bitcoin Lightning Network a través del servicio Phoenix: crear facturas, procesar pagos, consultar balance/transacciones y pagos on-chain. Ver [Wallet](./Bitcoin/Wallet.md).

---

### Seguridad

- **PIN**: se almacenan con PBKDF2WithHmacSHA256 (10.000 iteraciones, clave de 256 bits), usando la clave maestra de la app + el nombre de usuario como salt (`SecurePinProcessor.hashPinForStorage()`).
- **JWT**: firmados con clave secreta.
- **Cookies HttpOnly**: para mitigar XSS.
- **Producción**: HTTPS obligatorio, certificados SSL válidos, backups regulares y monitoreo.
