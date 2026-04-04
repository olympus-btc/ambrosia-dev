### Gestión de Plantillas de Tickets

Endpoints para gestionar las plantillas de tickets utilizadas para la impresión.

- `GET /templates`: Obtiene todas las plantillas de tickets disponibles.
  - **Authorization:** Requiere token de autenticación.
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/templates" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  [
    {
      "id": "template-uuid",
      "name": "Default Customer Ticket",
      "elements": [ ... ]
    }
  ]
  ```

- `GET /templates/{id}`: Obtiene una plantilla de ticket por su ID.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:**
    - `id` (string): ID de la plantilla a obtener.
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/templates/template-uuid" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (200 OK):**
  ```json
  {
    "id": "template-uuid",
    "name": "Default Customer Ticket",
    "elements": [ ... ]
  }
  ```
  - **Response Body (404 Not Found):**
  ```json
  "Template '...' not found"
  ```

- `POST /templates`: Crea una nueva plantilla de ticket.
  - **Authorization:** Requiere token de autenticación.
  - **Request Body:**
  ```json
  {
    "name": "string",
    "elements": [
      {
        "type": "HEADER",
        "value": "{{config.businessName}}",
        "style": { "bold": true, "justification": "CENTER", "fontSize": "NORMAL" }
      }
    ]
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/templates" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "My Custom Template",
      "elements": [
        {
          "type": "HEADER",
          "value": "{{config.businessName}}",
          "style": { "bold": true, "justification": "CENTER" }
        }
      ]
    }'
  ```
  - **Response Body (201 Created):**
  ```json
  { "id": "new-template-uuid" }
  ```

- `PUT /templates/{id}`: Actualiza una plantilla existente.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:**
    - `id` (string): ID de la plantilla a actualizar.
  - **Request Body:** Igual al de creación.
  - **Response Body (200 OK)**

- `DELETE /templates/{id}`: Elimina una plantilla de ticket.
  - **Authorization:** Requiere token de autenticación.
  - **Path Parameters:**
    - `id` (string): ID de la plantilla a eliminar.
  - **Response Body (204 No Content)**
