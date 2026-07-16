### Configuration Management

Endpoints for managing the general application configuration, uploaded files, and currencies.

## Configuration

### GET `/config`

Retrieves the current application configuration.

**Authorization:** None (public).

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

Updates the application configuration.

**Authorization:** `settings_update`

:::warning Full object
This endpoint requires the **complete** configuration object. Omitting required fields (`businessName`, `businessType`) results in `500 Internal Server Error`.
:::

**Request Body:**

```json
{
  "businessType": "store",
  "businessName": "string",
  "businessAddress": "string (optional)",
  "businessPhone": "string (optional)",
  "businessEmail": "string (optional)",
  "businessTaxId": "string (optional)",
  "businessLogoUrl": "string (optional)",
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

## Files

### POST `/uploads`

Uploads one or more files to the server (images, logos, etc.).

**Authorization:** requires `accessToken` if the system is already initialized; open during initial setup.

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

Accesses a previously uploaded file (static files, no authentication).

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/uploads/logo.png"
```

## Currencies

### GET `/currencies`

Lists all currencies available in the system.

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

Retrieves the base currency configured for the business.

**Authorization:** `settings_read`

:::caution Duplicated endpoint
There is a second **public** implementation of `GET /base-currency` in `Routing.kt` that responds `200 { "currency_id": null }` when no base currency is set. The authenticated version (documented here) lives in `Currency.kt`.
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

Sets the base currency by acronym.

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
