### Configuration Management

Endpoints for managing the general application configuration.

- `GET /config`: Gets the current application configuration.
  - **Authorization:** None (public)
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/config"
  ```
  - **Response Body (200 OK):**
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
  - **Response Body (404 Not Found):**
  ```json
  "Config not found"
  ```

- `PUT /config`: Updates the application configuration.
  - **Authorization:** Requires `settings_update`
  :::note Important
  This endpoint requires the **complete** configuration object to be sent. Omitting mandatory fields (`businessName`, `businessType`) will result in a `500 Internal Server Error`.
  :::
  - **Request Body:**
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
  - **cURL Example:**
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
  - **Response Body (200 OK):**
  ```json
  {
    "message": "Config updated successfully"
  }
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Failed to update config"
  ```

---

### File Uploads

- `POST /uploads`: Uploads one or more files to the server (images, logos, etc.).
  - **Authorization:** Requires access token if the system is already initialized. Open during initial setup.
  - **Content-Type:** `multipart/form-data`
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/uploads" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -F "file=@/path/to/logo.png"
  ```
  - **Response Body (201 Created):**
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
  - **Response Body (400 Bad Request):** no file sent
  ```json
  { "message": "No files uploaded" }
  ```

- `GET /uploads/{filename}`: Accesses a previously uploaded file.
  - **Authorization:** No authentication required (static files)
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/uploads/logo.png"
  ```

---

### Currencies

- `GET /currencies`: Lists all available currencies in the system.
  - **Authorization:** Requires `settings_read`
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/currencies" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  [
    { "id": "1", "name": "US Dollar", "acronym": "USD", "symbol": "$" },
    { "id": "2", "name": "Euro", "acronym": "EUR", "symbol": "€" }
  ]
  ```

- `GET /base-currency`: Gets the base currency configured for the business.
  - **Authorization:** Requires `settings_read`
  :::caution Known Bug
  There is a duplicate implementation in `Routing.kt` that responds `200 { "currency_id": null }` when no base currency is set. The correct behavior (documented here) is from `Currency.kt`. Issue reported to the backend team.
  :::
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/base-currency" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  { "id": "1", "name": "US Dollar", "acronym": "USD", "symbol": "$" }
  ```
  - **Response Body (404 Not Found):** base currency not configured
  ```json
  { "message": "Base currency not set" }
  ```

- `PUT /base-currency`: Sets the base currency by acronym.
  - **Authorization:** Requires `settings_update`
  - **Request Body:**
  ```json
  { "acronym": "USD" }
  ```
  - **cURL Example:**
  ```bash
  curl -X PUT "http://127.0.0.1:9154/base-currency" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "acronym": "USD" }'
  ```
  - **Response Body (200 OK):**
  ```json
  { "id": "1", "name": "US Dollar", "acronym": "USD", "symbol": "$" }
  ```
  - **Response Body (400 Bad Request):** blank or missing acronym
  ```json
  { "message": "Acronym is required" }
  ```
  - **Response Body (404 Not Found):** unknown acronym
  ```json
  { "message": "Unknown currency acronym: XYZ" }
  ```
