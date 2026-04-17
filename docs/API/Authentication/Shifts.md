### Gestión de Turnos

Los endpoints de turnos permiten administrar los horarios de trabajo del personal del restaurante.

- `GET /shifts`: Obtiene todos los turnos del sistema.
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/shifts" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN" 
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  [
    {
      "id": "670ee547-bc75-4c02-89ff-2cd45f12c77f",
      "user_id": "f9c9d4fc-c4b7-4c42-8ae3-bb4649b34f2b",
      "shift_date": "1753523565371",
      "start_time": "1753523565371",
      "end_time": "1753549837824",
      "notes": "Turno de mañana"
    },
    {
      "id": "c145e48c-210e-49fd-b2fd-3b8fbaf76529",
      "user_id": "b3ddbf81-7934-49ed-b495-086f8c5eda93",
      "shift_date": "1753523565371",
      "start_time": "1753523565371",
      "end_time": null,
      "notes": "Turno de tarde - En curso"
    }
  ]
  ```
  - **Response Body (Sin contenido - 204 No Content):**
  ```json
  "No shifts found"
  ```

- `GET /shifts/{id}`: Obtiene un turno específico por su ID.
  - **Authorization:** Requiere access token válido (enviado automáticamente via cookies)
  - **Path Parameters:**
    - `id` (string): ID del turno a obtener
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  {
    "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
    "user_id": "ac5f7527-3c9a-4d89-9133-ee5d8fde631e",
    "shift_date": "1753523565371",
    "start_time": "1753523565371",
    "end_time": "1753549837824",
    "notes": "Turno de mañana"
  }
  ```

- `GET /shifts/open`: Obtiene el turno abierto actualmente.
  - **Authorization:** Requiere `shifts_read`
  - **Query Parameters:**
    - `user_id` (string, opcional): Filtra por usuario específico
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/shifts/open?user_id=ac5f7527-3c9a-4d89-9133-ee5d8fde631e" \
    -H "Cookie: accessToken=$ACCESS_TOKEN"
  ```
  - **Response Body (Éxito - 200 OK):** Objeto `Shift` del turno abierto
  - **Response Body (Sin turno abierto - 204 No Content)**

- `POST /shifts`: Crea un nuevo turno.
  - **Authorization:** Requiere `shifts_create`
  - **Request Body:**
  ```json
  {
    "user_id": "string",
    "shift_date": "Unix Timestamp",
    "start_time": "Unix Timestamp",
    "end_time": "Unix Timestamp (opcional)",
    "notes": "string",
    "initial_amount": 0.0
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/shifts" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "user_id": "ac5f7527-3c9a-4d89-9133-ee5d8fde631e",
      "shift_date": "1753523565371",
      "start_time": "1753523565371",
      "notes": "Turno de mañana",
      "initial_amount": 500.00
    }'
  ```
  - **Response Body (Éxito - 201 Created):**
  ```json
  {
    "id": "3bbaee46-57f7-461b-9df5-bd40c61823ee",
    "message": "Shift added successfully"
  }
  ```

- `PUT /shifts/{id}`: Actualiza un turno existente.
  - **Authorization:** Requiere `shifts_update`
  - **Path Parameters:**
    - `id` (string): ID del turno a actualizar
  - **Request Body:**
  ```json
  {
    "user_id": "string",
    "shift_date": "Unix Timestamp",
    "start_time": "Unix Timestamp",
    "end_time": "Unix Timestamp (opcional)",
    "notes": "string",
    "initial_amount": 0.0,
    "final_amount": 0.0,
    "difference": 0.0
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X PUT "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "user_id": "03978988-42ff-4cb9-a790-c51aceb39b2b",
      "shift_date": "1753523565371",
      "start_time": "1753523565371",
      "end_time": "1753549837824",
      "notes": "Turno extendido por eventos especiales",
      "initial_amount": 500.00
    }'
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  {
    "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
    "message": "Shift updated successfully"
  }
  ```

- `POST /shifts/{id}/close`: Cierra un turno abierto.
  - **Authorization:** Requiere `shifts_update`
  - **Path Parameters:**
    - `id` (string): ID del turno a cerrar
  - **Request Body (opcional):**
  ```json
  {
    "final_amount": 520.00,
    "difference": 20.00
  }
  ```
  - **cURL Example:**
  ```bash
  curl -X POST "http://127.0.0.1:9154/shifts/0e5805f1-ff25-4c9d-823b-cacc81eb31db/close" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{ "final_amount": 520.00, "difference": 20.00 }'
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  {
    "id": "0e5805f1-ff25-4c9d-823b-cacc81eb31db",
    "message": "Shift closed successfully"
  }
  ```

- `DELETE /shifts/{id}`: Elimina un turno del sistema.
  - **Authorization:** Requiere access token válido (enviado automáticamente via cookies)
  - **Path Parameters:**
    - `id` (string): ID del turno a eliminar
  - **cURL Example:**
  ```bash
  curl -X DELETE "http://127.0.0.1:9154/shifts/03978988-42ff-4cb9-a790-c51aceb39b2b" \
    -H "Cookie: accessToken=$ACCESS_TOKEN" \
    -H "Cookie: refreshToken=$REFRESH_TOKEN" \
  ```
  - **Response Body (Éxito - 200 OK):**
  ```json
  {
    "id": "03978988-42ff-4cb9-a790-c51aceb39b2b",
    "message": "Shift deleted successfully"
  }
  ```

### Notas importantes:
- Todos los endpoints de turnos requieren autenticación a excepción del GET, que es requerido al iniciar sessión
- Los IDs de turnos son UUID generados automáticamente
- Un turno debe estar asociado a un usuario válido (`user_id`)
- El campo `end_time` puede ser `null` para turnos en curso
- El campo `notes` es opcional y puede contener información adicional
- No puede haber turnos solapados para el mismo usuario en la misma fecha
