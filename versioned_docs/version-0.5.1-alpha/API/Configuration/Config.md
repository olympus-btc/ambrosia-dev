### Gestión de Configuración

Endpoints para gestionar la configuración general de la aplicación.

- `GET /config`: Obtiene la configuración actual de la aplicación.
  - **Authorization:** Ninguna (público)
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

- `PUT /config`: Actualiza la configuración de la aplicación.
  - **Authorization:** Requiere `settings_update`
  :::note Importante
  Este endpoint requiere el envío del objeto de configuración **completo**. Omitir campos obligatorios (`businessName`, `businessType`) resultará en un error `500 Internal Server Error`.
  :::
  - **Request Body:**
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

### Archivos

- `POST /uploads`: Sube uno o más archivos al servidor (imágenes, logos, etc.).
  - **Authorization:** Requiere access token si el sistema ya fue inicializado. Libre durante la configuración inicial.
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
  - **Response Body (400 Bad Request):** no se envió ningún archivo
  ```json
  { "message": "No files uploaded" }
  ```

- `GET /uploads/{filename}`: Accede a un archivo subido previamente.
  - **Authorization:** No requiere autenticación (archivos estáticos)
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/uploads/logo.png"
  ```

---

### Monedas

- `GET /currencies`: Lista todas las monedas disponibles en el sistema.
  - **Authorization:** Requiere `settings_read`
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

- `GET /base-currency`: Obtiene la moneda base configurada para el negocio.
  - **Authorization:** Requiere `settings_read`
  :::caution Bug conocido
  Existe una implementación duplicada en `Routing.kt` que responde `200 { "currency_id": null }` cuando no hay moneda base. El comportamiento correcto (documentado aquí) es el de `Currency.kt`. Issue reportado al equipo de backend.
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
  - **Response Body (404 Not Found):** moneda base no configurada
  ```json
  { "message": "Base currency not set" }
  ```

- `PUT /base-currency`: Establece la moneda base por acrónimo.
  - **Authorization:** Requiere `settings_update`
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
  - **Response Body (400 Bad Request):** acrónimo en blanco o ausente
  ```json
  { "message": "Acronym is required" }
  ```
  - **Response Body (404 Not Found):** acrónimo desconocido
  ```json
  { "message": "Unknown currency acronym: XYZ" }
  ```
