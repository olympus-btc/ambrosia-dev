---
sidebar_label: Webhooks
---

### Webhooks

Endpoints que reciben notificaciones externas de servicios integrados.

- `POST /webhook/phoenixd`: Recibe notificaciones de pago desde el nodo Phoenix.
  - **Authorization:** No requiere JWT — se autentica mediante firma HMAC-SHA256 en el header `X-Phoenix-Signature`
  - **Request Headers:**
    - `X-Phoenix-Signature` (string, **requerido**): Firma HMAC-SHA256 del cuerpo de la petición usando el `webhookSecret` configurado en `phoenix.conf`
  - **Request Body:**
  ```json
  {
    "type": "string",
    "timestamp": 1712150400000,
    "amountSat": 50000,
    "paymentHash": "abcdef1234567890",
    "externalId": "order-123",
    "payerNote": "Pago orden #123",
    "payerKey": "string"
  }
  ```
  - **Response Body (200 OK):**
  ```json
  "Ok"
  ```
  - **Response Body (401 Unauthorized):** header ausente
  ```json
  "Missing X-Phoenix-Signature header"
  ```
  - **Response Body (401 Unauthorized):** firma inválida
  ```json
  "Invalid signature"
  ```
  - **Response Body (400 Bad Request):** payload malformado
  ```json
  "Invalid payload"
  ```

### Notas

- El payload validado se reenvía internamente a todos los observadores registrados vía `PhoenixWebhookNotifier`, que a su vez lo emite al WebSocket `GET /ws/payments`.
- La firma se verifica con HMAC-SHA256 usando el `webhookSecret` del archivo de configuración de Phoenix. Si el secreto no está configurado, el endpoint rechaza todas las peticiones.
- El campo `externalId` corresponde al `externalId` enviado al crear una factura Lightning — úsalo para correlacionar pagos con órdenes.
