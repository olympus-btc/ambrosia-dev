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

**Authorization:** `settings_read`

:::caution Endpoint duplicado
Existe una segunda implementación **pública** de `GET /base-currency` en `Routing.kt` que responde `200 { "currency_id": null }` cuando no hay moneda base. La versión autenticada (documentada aquí) vive en `Currency.kt`.
:::

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/base-currency" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
{
  "id": "1",
  "acronym": "USD",
  "name": "US Dollar",
  "symbol": "$",
  "countryName": "United States",
  "countryCode": "US"
}
```

**Response Body (404 Not Found):**

```json
{ "message": "Base currency not set" }
```

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
