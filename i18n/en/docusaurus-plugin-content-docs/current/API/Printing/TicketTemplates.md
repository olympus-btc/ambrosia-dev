### Ticket Template Management

Endpoints for managing the ticket templates used for printing.

- `GET /templates`: Gets all available ticket templates.
  - **Authorization:** Requires authentication token.
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

- `GET /templates/{id}`: Gets a ticket template by its ID.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:**
    - `id` (string): ID of the template to get.
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

- `POST /templates`: Creates a new ticket template.
  - **Authorization:** Requires authentication token.
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

- `PUT /templates/{id}`: Updates an existing template.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:**
    - `id` (string): ID of the template to update.
  - **Request Body:** Same as creation.
  - **Response Body (200 OK)**

- `DELETE /templates/{id}`: Deletes a ticket template.
  - **Authorization:** Requires authentication token.
  - **Path Parameters:**
    - `id` (string): ID of the template to delete.
  - **Response Body (204 No Content)**
