### Gestión de Wallet (Bitcoin Lightning)

Los endpoints de wallet permiten gestionar la billetera Bitcoin Lightning (Phoenix) integrada en el sistema POS.

:::info Autorización por realm
- **`/wallet/invoice`** → sólo `accessToken` (realm `auth-jwt`). Pensado para crear facturas desde el flujo de cobro sin exponer credenciales de wallet.
- **`/wallet/auth`** y **`/wallet/logout`** → **admin** (`accessToken` de un usuario admin).
- **Todo lo demás** (`createinvoice`, `decodeinvoice`, `payinvoice`, `payoffer`, `payonchain`, `bumpfee`, `export`, `getinfo`, `getbalance`, `seed`, `closechannel`, `payments/*`) → **`walletAccessToken`** (realm `auth-jwt-wallet`), que se obtiene en `POST /wallet/auth`.
:::

:::warning Errores de Phoenix
Cuando el nodo Phoenix falla o no responde, estos endpoints devuelven `503` con un `WalletErrorResponse`: `{ "message": "...", "code": <int?>, "source": "..." }`.
:::

## Autenticación de Wallet

### POST `/wallet/auth`

Autoriza el acceso a las funciones de la wallet para un administrador y emite la cookie `walletAccessToken`.

**Authorization:** admin (`accessToken`).

**Request Body:**

```json
{
  "password": "string"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/wallet/auth" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "password": "S3cur3P4ssw0rd!!" }'
```

**Response Body (200 OK):**

```json
{
  "message": "Login successful",
  "walletTokenExpiresAt": 1712150400000
}
```

**Response Headers:** establece la cookie `walletAccessToken`.

### POST `/wallet/logout`

Cierra la sesión de la wallet, revoca el token y elimina la cookie.

**Authorization:** admin (`accessToken`).

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/wallet/logout" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (200 OK):**

```json
{ "status": "ok" }
```

**Response Headers:** elimina la cookie `walletAccessToken`.

## Facturas y Pagos

### POST `/wallet/invoice`

Crea una factura Lightning. Requiere sólo `accessToken` (sin `walletAccessToken`), ideal para el flujo de cobro.

**Authorization:** `accessToken` (`auth-jwt`).

**Request Body:** igual que `POST /wallet/createinvoice`.

**Response Body (200 OK):** igual que `POST /wallet/createinvoice`.

### POST `/wallet/createinvoice`

Crea una factura Lightning para recibir pagos. Si se envía `exchangeRate` + `exchangeRateCurrency`, la tasa se persiste asociada al `paymentHash`.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "description": "string",
  "amountSat": 50000,
  "externalId": "string (opcional)",
  "expirySeconds": 3600,
  "exchangeRate": 65000.0,
  "exchangeRateCurrency": "USD",
  "fiatAmount": 32.50
}
```

`description` es requerido; `amountSat` y el resto son opcionales.

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/wallet/createinvoice" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: walletAccessToken=$WALLET_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Pago orden #123",
    "amountSat": 50000,
    "externalId": "order-123",
    "expirySeconds": 3600
  }'
```

**Response Body (Éxito - 200 OK):**

```json
{
  "amountSat": 50000,
  "paymentHash": "abcdef1234567890abcdef1234567890abcdef12",
  "serialized": "lnbc500u1p3xnhl2pp5..."
}
```

### POST `/wallet/decodeinvoice`

Decodifica una factura Lightning y devuelve su monto y descripción.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{ "invoice": "lnbc500u1p3xnhl2pp5..." }
```

**Response Body (200 OK):**

```json
{
  "amountSat": 50000,
  "description": "Pago orden #123"
}
```

**Response Body (400 Bad Request):**

```json
{ "error": "Could not decode invoice" }
```

### POST `/wallet/payinvoice`

Paga una factura Lightning. Acepta `exchangeRate` + `exchangeRateCurrency` opcionales para registrar la tasa.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "amountSat": 25000,
  "invoice": "lnbc250u1p3xnhl2pp5...",
  "exchangeRate": 65000.0,
  "exchangeRateCurrency": "USD"
}
```

`invoice` es requerido; `amountSat` y las tasas son opcionales.

**Response Body (Éxito - 200 OK):**

```json
{
  "recipientAmountSat": 25000,
  "routingFeeSat": 100,
  "paymentId": "payment-uuid-123",
  "paymentHash": "abcdef1234567890",
  "paymentPreimage": "1234567890abcdef"
}
```

### POST `/wallet/payoffer`

Paga una oferta BOLT12.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "amountSat": 30000,
  "offer": "lno1qcp4256wpj...",
  "message": "string (opcional)"
}
```

**Response Body (Éxito - 200 OK):** igual que `payinvoice` (`PaymentResponse`).

### POST `/wallet/payonchain`

Realiza un pago on-chain de Bitcoin.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "amountSat": 100000,
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "feerateSatByte": 15
}
```

**Response Body (Éxito - 200 OK):**

```json
{
  "txId": "1234567890abcdef...",
  "amountSat": 100000,
  "feesSat": 2250
}
```

### POST `/wallet/bumpfee`

Incrementa la comisión de una transacción on-chain. El cuerpo es un entero (feerate en sat/byte).

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
25
```

**Response Body (Éxito - 200 OK):**

```json
{
  "txId": "fedcba0987654321...",
  "newFeerateSatByte": 25,
  "additionalFeesSat": 1500
}
```

### POST `/wallet/closechannel`

Cierra un canal Lightning.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "channelId": "string",
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "feerateSatByte": 10
}
```

**Response Body (200 OK):** resultado del servicio Phoenix.

### POST `/wallet/export`

Exporta el historial de transacciones en formato CSV.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{ "from": "2024-01-01", "to": "2024-12-31" }
```

**Response Body (200 OK):** resultado de exportación CSV.

## Información del Nodo

### GET `/wallet/getinfo`

Obtiene información del nodo Lightning.

**Authorization:** `walletAccessToken`.

**Response Body (Éxito - 200 OK):**

```json
{
  "nodeId": "03a1b2c3d4e5f6789012345678901234567890abcdef",
  "channels": [
    {
      "state": "NORMAL",
      "channelId": "0x1234567890abcdef",
      "balanceSat": 1000000,
      "inboundLiquiditySat": 500000,
      "capacitySat": 1500000,
      "fundingTxId": "abcdef1234567890"
    }
  ],
  "chain": "mainnet",
  "blockHeight": 800000,
  "version": "0.6.0"
}
```

### GET `/wallet/getbalance`

Obtiene el balance de la billetera Lightning.

**Authorization:** `walletAccessToken`.

**Response Body (Éxito - 200 OK):**

```json
{
  "balanceSat": 1000000,
  "feeCreditSat": 5000
}
```

### GET `/wallet/seed`

Obtiene la semilla (mnemónico) de la wallet.

**Authorization:** `walletAccessToken`.

**Response Body (200 OK):** datos de semilla desde Phoenix.

:::warning
Expone la semilla de la wallet. Usar únicamente en contextos seguros y controlados.
:::

## Gestión de Pagos

### GET `/wallet/payments/incoming`

Lista los pagos entrantes (enriquecidos con tasa de cambio si se registró).

**Authorization:** `walletAccessToken`.

**Query Parameters:**

- `from` (long): timestamp de inicio.
- `to` (long): timestamp final.
- `limit` (int): límite de resultados (default: 20).
- `offset` (int): offset para paginación (default: 0).
- `all` (boolean): incluir todos los pagos (default: false).
- `externalId` (string): ID externo específico.

**Response Body (Éxito - 200 OK):** lista de `IncomingPaymentWithRate`.

```json
[
  {
    "type": "payment",
    "subType": "lightning",
    "paymentHash": "abcdef1234567890",
    "description": "Pago orden #123",
    "externalId": "order-123",
    "invoice": "lnbc500u1p3...",
    "isPaid": true,
    "isExpired": false,
    "requestedSat": 50000,
    "receivedSat": 50000,
    "fees": 0,
    "completedAt": 1640995300000,
    "createdAt": 1640995200000,
    "exchangeRateAtPayment": 65000.0,
    "exchangeRateCurrency": "USD",
    "fiatAmountAtPayment": 32.50
  }
]
```

### GET `/wallet/payments/incoming/{paymentHash}`

Obtiene un pago entrante específico.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentHash` (string): hash del pago.

### GET `/wallet/payments/outgoing`

Lista los pagos salientes.

**Authorization:** `walletAccessToken`.

**Query Parameters:** `from`, `to`, `limit` (20), `offset` (0), `all` (false).

**Response Body (Éxito - 200 OK):** lista de `OutgoingPaymentWithRate`.

```json
[
  {
    "type": "payment",
    "subType": "lightning",
    "paymentId": "payment-uuid-123",
    "paymentHash": "abcdef1234567890",
    "isPaid": true,
    "sent": 25000,
    "fees": 100,
    "invoice": "lnbc250u1p3...",
    "createdAt": 1640995200000,
    "completedAt": 1640995300000,
    "exchangeRateAtPayment": 65000.0,
    "exchangeRateCurrency": "USD",
    "fiatAmountAtPayment": 16.25
  }
]
```

### GET `/wallet/payments/outgoing/{paymentId}`

Obtiene un pago saliente por ID.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentId` (string): ID del pago.

### GET `/wallet/payments/outgoingbyhash/{paymentHash}`

Obtiene un pago saliente por hash.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentHash` (string): hash del pago.

## WebSocket de Pagos en Tiempo Real

### GET `/ws/payments`

Conexión WebSocket para recibir notificaciones de pagos Lightning en tiempo real.

**Authorization:** `accessToken` válido (JWT vía cookie).

**Protocol:** WebSocket (`ws://` o `wss://`).

**Ejemplo de conexión:**

```javascript
const ws = new WebSocket("ws://127.0.0.1:9154/ws/payments");
ws.onmessage = (event) => console.log(JSON.parse(event.data));
```

**Mensaje de conexión establecida:**

```json
{ "type": "connected" }
```

**Mensaje de pago recibido:**

```json
{
  "type": "payment_received",
  "timestamp": 1712150400000,
  "amountSat": 50000,
  "paymentHash": "abcdef1234567890",
  "externalId": "order-123",
  "payerNote": "Pago orden #123"
}
```

### Notas

:::info
- Los montos están expresados en **satoshis** (1 BTC = 100.000.000 sats).
- Phoenix Wallet debe estar configurado y sincronizado; de lo contrario los endpoints responden `503`.
- Las facturas Lightning tienen tiempo de expiración configurable (`expirySeconds`).
:::
