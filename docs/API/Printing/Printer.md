### Gestión de Impresoras

Endpoints para gestionar las impresoras de tickets.

## Impresoras del Sistema

- `GET /printers/available`: Obtiene la lista de impresoras detectadas en el sistema operativo.
  - **Authorization:** Requiere token de autenticación.
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
    "Cocina"
  ]
  ```

- `POST /printers/set`: Establece la impresora activa para un tipo específico creando o actualizando una configuración.
  - **Authorization:** Requiere token de autenticación.
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
      "printerName": "Cocina"
    }'
  ```
  - **Response Body (200 OK):**
  ```text
  "Printer Cocina set for KITCHEN"
  ```

- `POST /printers/print`: Envía un trabajo de impresión.
  - **Authorization:** Requiere token de autenticación.
  - **Request Body:**
  ```json
  {
    "templateName": "string (opcional)",
    "ticketData": { ... },
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerId": "string (opcional, UUID de config)",
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
        "tableName": "Mesa 5",
        "roomName": "Salón Principal",
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

## Configuraciones de Impresoras

- `GET /printers/configs`: Obtiene todas las configuraciones de impresoras guardadas.
  - **Authorization:** Requiere token de autenticación.
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
      "printerName": "Cocina",
      "templateName": null,
      "isDefault": true,
      "enabled": true,
      "createdAt": "2025-10-06T12:00:00Z"
    }
  ]
  ```

- `POST /printers/configs`: Crea una nueva configuración de impresora.
  - **Authorization:** Requiere token de autenticación.
  - **Request Body:**
  ```json
  {
    "printerType": "KITCHEN" | "CUSTOMER" | "BAR",
    "printerName": "string",
    "templateName": "string (opcional)",
    "isDefault": false,
    "enabled": true
  }
  ```
  - **Response Body (201 Created):**
  ```json
  { "id": "new-config-uuid" }
  ```

- `PUT /printers/configs/{id}`: Actualiza una configuración de impresora. Todos los campos son opcionales.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:** `id` (string): ID de la configuración
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

- `DELETE /printers/configs/{id}`: Elimina una configuración de impresora.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:** `id` (string): ID de la configuración
  - **Response Body (204 No Content)**

- `POST /printers/configs/{id}/default`: Establece una configuración como impresora predeterminada para su tipo.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:** `id` (string): ID de la configuración
  - **Response Body (200 OK)**
