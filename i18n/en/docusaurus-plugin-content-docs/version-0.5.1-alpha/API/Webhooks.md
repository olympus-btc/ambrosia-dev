---
sidebar_label: Webhooks
---

### Webhooks

Endpoints that receive external notifications from integrated services.

- `POST /webhook/phoenixd`: Receives payment notifications from the Phoenix node.
  - **Authorization:** No JWT required — authenticated via HMAC-SHA256 signature in the `X-Phoenix-Signature` header
  - **Request Headers:**
    - `X-Phoenix-Signature` (string, **required**): HMAC-SHA256 signature of the request body using the `webhookSecret` configured in `phoenix.conf`
  - **Request Body:**
  ```json
  {
    "type": "string",
    "timestamp": 1712150400000,
    "amountSat": 50000,
    "paymentHash": "abcdef1234567890",
    "externalId": "order-123",
    "payerNote": "Payment for order #123",
    "payerKey": "string"
  }
  ```
  - **Response Body (200 OK):**
  ```json
  "Ok"
  ```
  - **Response Body (401 Unauthorized):** missing header
  ```json
  "Missing X-Phoenix-Signature header"
  ```
  - **Response Body (401 Unauthorized):** invalid signature
  ```json
  "Invalid signature"
  ```
  - **Response Body (400 Bad Request):** malformed payload
  ```json
  "Invalid payload"
  ```

### Notes

- The validated payload is forwarded internally to all registered observers via `PhoenixWebhookNotifier`, which in turn emits it to the `GET /ws/payments` WebSocket.
- The signature is verified with HMAC-SHA256 using the `webhookSecret` from the Phoenix configuration file. If the secret is not configured, the endpoint rejects all requests.
- The `externalId` field corresponds to the `externalId` sent when creating a Lightning invoice — use it to correlate payments with orders.
