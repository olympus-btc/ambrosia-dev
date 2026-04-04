### Printer Management

Endpoints for managing ticket printers.

## System Printers

- `GET /printers/available`: Gets the list of printers detected in the operating system.
  - **Authorization:** Requires authentication token.
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/printers/available" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  [
    "Printer 1",
    "Printer 2",
    "Kitchen"
  ]
  ```

- `POST /printers/set`: Sets the active printer for a specific type by creating or updating a configuration.
  - **Authorization:** Requires authentication token.
  - **Request Body:**
  ```json
  {
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerName": "string"
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/printers/set" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "printerType": "KITCHEN",
      "printerName": "Kitchen"
    }'
  ```
  - **Response Body (200 OK):**
  ```text
  "Printer Kitchen set for KITCHEN"
  ```

- `POST /printers/print`: Sends a print job.
  - **Authorization:** Requires authentication token.
  - **Request Body:**
  ```json
  {
    "templateName": "string (optional)",
    "ticketData": { ... },
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerId": "string (optional, config UUID)",
    "broadcast": false,
    "forceTemplateName": false
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/printers/print" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "templateName": "Default Customer Ticket",
      "ticketData": {
        "ticketId": "T-123",
        "tableName": "Table 5",
        "roomName": "Main Hall",
        "date": "2025-10-06",
        "items": [
          { "quantity": 2, "name": "Pizza Margherita", "price": 12.50 }
        ],
        "total": 25.00
      },
      "printerType": "CUSTOMER"
    }'
  ```
  - **Response Body (200 OK):**
  ```text
  "Print job sent"
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Template '...' not found"
  ```
  - **Response Body (500 Internal Server Error):**
  ```text
  "Error printing: ..."
  ```

## Printer Configurations

- `GET /printers/configs`: Gets all saved printer configurations.
  - **Authorization:** Requires authentication token.
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/printers/configs" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  [
    {
      "id": "config-uuid",
      "printerType": "KITCHEN",
      "printerName": "Kitchen",
      "templateName": null,
      "isDefault": true,
      "enabled": true,
      "createdAt": "2025-10-06T12:00:00Z"
    }
  ]
  ```

- `POST /printers/configs`: Creates a new printer configuration.
  - **Authorization:** Requires authentication token.
  - **Request Body:**
  ```json
  {
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerName": "string",
    "templateName": "string (optional)",
    "isDefault": false,
    "enabled": true
  }
  ```
  - **Response Body (201 Created):**
  ```json
  { "id": "new-config-uuid" }
  ```

- `PUT /printers/configs/{id}`: Updates a printer configuration. All fields are optional.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:** `id` (string): Configuration ID
  - **Request Body:**
  ```json
  {
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerName": "string",
    "templateName": "string",
    "isDefault": false,
    "enabled": true
  }
  ```
  - **Response Body (200 OK)**

- `DELETE /printers/configs/{id}`: Deletes a printer configuration.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:** `id` (string): Configuration ID
  - **Response Body (204 No Content)**

- `POST /printers/configs/{id}/default`: Sets a configuration as the default printer for its type.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:** `id` (string): Configuration ID
  - **Response Body (200 OK)**
