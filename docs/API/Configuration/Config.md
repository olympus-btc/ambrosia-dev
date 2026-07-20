### Gestión de Configuración

Endpoints para gestionar la configuración general de la aplicación, archivos subidos y monedas.

## Configuración

### GET `/config`

Obtiene la configuración actual de la aplicación.

**Authorization:** Ninguna (público).

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/config"
```

**Response Body (200 OK):**

```json
{
  "id": 1,
  "businessType": "store",
  "businessName": "Ambrosia Restaurant",
  "businessAddress": "123 Main Street, Anytown",
  "businessPhone": "555-1234",
  "businessEmail": "contact@ambrosia.com",
  "businessTaxId": "ABC123456",
  "businessLogoUrl": null,
  "businessTypeConfirmed": false
}
```

**Response Body (404 Not Found):**

```json
"Config not found"
```

### PUT `/config`

Actualiza la configuración de la aplicación.

**Authorization:** `settings_update`

:::warning Objeto completo
Este endpoint requiere el objeto de configuración **completo**. Omitir campos obligatorios (`businessName`, `businessType`) resulta en `500 Internal Server Error`.
:::

**Request Body:**

```json
{
  "businessType": "store",
  "businessName": "string",
  "businessAddress": "string (opcional)",
  "businessPhone": "string (opcional)",
  "businessEmail": "string (opcional)",
  "businessTaxId": "string (opcional)",
  "businessLogoUrl": "string (opcional)",
  "businessTypeConfirmed": false
}
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/config" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "store",
    "businessName": "Ambrosia Updated",
    "businessAddress": "456 Oak Avenue, Anytown",
    "businessPhone": "555-5678",
    "businessEmail": "info@ambrosia.com",
    "businessTaxId": "XYZ987654",
    "businessLogoUrl": null,
    "businessTypeConfirmed": true
  }'
```

**Response Body (200 OK):**

```json
{ "message": "Config updated successfully" }
```

**Response Body (404 Not Found):**

```json
"Failed to update config"
```

## Archivos

### POST `/uploads`

Sube uno o más archivos al servidor (imágenes, logos, etc.).

**Authorization:** requiere `accessToken` si el sistema ya fue inicializado; libre durante la configuración inicial.

**Content-Type:** `multipart/form-data`.

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/uploads" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -F "file=@/path/to/logo.png"
```

**Response Body (201 Created):**

```json
{
  "uploads": [
    {
      "path": "/uploads/logo.png",
      "url": "http://127.0.0.1:9154/uploads/logo.png"
    }
  ]
}
```

**Response Body (400 Bad Request):**

```json
{ "message": "No files uploaded" }
```

### GET `/uploads/{filename}`

Accede a un archivo subido previamente (archivos estáticos, sin autenticación).

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/uploads/logo.png"
```

## Monedas

### GET `/currencies`

Lista todas las monedas disponibles en el sistema.

**Authorization:** `settings_read`

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/currencies" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
[
  {
    "id": "1",
    "acronym": "USD",
    "name": "US Dollar",
    "symbol": "$",
    "countryName": "United States",
    "countryCode": "US"
  },
  {
    "id": "2",
    "acronym": "EUR",
    "name": "Euro",
    "symbol": "€",
    "countryName": "European Union",
    "countryCode": "EU"
  }
]
```

### GET `/base-currency`

Obtiene la moneda base configurada para el negocio.

**Authorization:** ninguna — este endpoint es **público**.

:::caution Endpoint duplicado: gana la versión pública
`GET /base-currency` está registrado **dos veces**: una versión pública en `Routing.kt` y una protegida con `settings_read` en `Currency.kt`. En `Api.kt` se invoca `configureRouting()` antes que `configureCurrency()`, así que la ruta pública se registra primero y es la que responde. **La versión autenticada queda inalcanzable**, junto con su respuesta `404 { "message": "Base currency not set" }`.
:::

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/base-currency"
```

**Response Body (200 OK - con moneda base configurada):**

```json
{
  "currencyId": "bccfc932-d89b-477a-b65b-04f97cae4aae",
  "id": "bccfc932-d89b-477a-b65b-04f97cae4aae",
  "acronym": "USD",
  "name": "United States Dollar",
  "symbol": "$",
  "countryName": "United States",
  "countryCode": "US"
}
```

:::note `currencyId` e `id` están duplicados
`BaseCurrencyResponse` declara ambos campos y el servidor los rellena con el **mismo** UUID. Es redundante, pero así responde hoy.
:::

**Response Body (200 OK - sin moneda base configurada):**

```json
{ "currency_id": null }
```

:::info Inconsistencia de nomenclatura
Fíjate en el cambio de clave: cuando hay moneda base, el objeto usa `currencyId` (camelCase); cuando no la hay, la respuesta es `{ "currency_id": null }` (snake_case), porque ese caso se construye con un `mapOf` literal en `Routing.kt`. Un cliente debe contemplar ambas formas.
:::

### PUT `/base-currency`

Establece la moneda base por acrónimo.

**Authorization:** `settings_update`

**Request Body:**

```json
{ "acronym": "USD" }
```

**cURL Example:**

```bash
curl -X PUT "http://127.0.0.1:9154/base-currency" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "acronym": "USD" }'
```

**Response Body (200 OK):**

```json
{
  "id": "1",
  "acronym": "USD",
  "name": "US Dollar",
  "symbol": "$"
}
```

**Response Body (400 Bad Request):**

```json
{ "message": "Acronym is required" }
```

**Response Body (404 Not Found):**

```json
{ "message": "Unknown currency acronym: XYZ" }
```
