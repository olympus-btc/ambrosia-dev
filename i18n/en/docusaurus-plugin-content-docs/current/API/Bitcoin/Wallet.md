### Wallet Management (Bitcoin Lightning)

The wallet endpoints manage the integrated Bitcoin Lightning wallet (Phoenix) of the POS system.

:::info Authorization by realm
- **`/wallet/invoice`** → `accessToken` only (`auth-jwt` realm). Intended for creating invoices from the checkout flow without exposing wallet credentials.
- **`/wallet/auth`** and **`/wallet/logout`** → **admin** (`accessToken` of an admin user).
- **Everything else** (`createinvoice`, `decodeinvoice`, `payinvoice`, `payoffer`, `payonchain`, `bumpfee`, `export`, `getinfo`, `getbalance`, `seed`, `closechannel`, `payments/*`) → **`walletAccessToken`** (`auth-jwt-wallet` realm), obtained from `POST /wallet/auth`.
:::

:::warning Phoenix errors
When the Phoenix node fails or is unreachable, these endpoints return `503` with a `WalletErrorResponse`: `{ "message": "...", "code": <int?>, "source": "..." }`.
:::

## Wallet Authentication

### POST `/wallet/auth`

Authorizes wallet access for an administrator and issues the `walletAccessToken` cookie.

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

**Response Headers:** sets the `walletAccessToken` cookie.

### POST `/wallet/logout`

Logs out of the wallet, revokes the token, and clears the cookie.

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

**Response Headers:** clears the `walletAccessToken` cookie.

## Invoices and Payments

### POST `/wallet/invoice`

Creates a Lightning invoice. Requires only `accessToken` (no `walletAccessToken`), ideal for the checkout flow.

**Authorization:** `accessToken` (`auth-jwt`).

**Request Body:** same as `POST /wallet/createinvoice`.

**Response Body (200 OK):** same as `POST /wallet/createinvoice`.

### POST `/wallet/createinvoice`

Creates a Lightning invoice to receive payments. If `exchangeRate` + `exchangeRateCurrency` are sent, the rate is persisted against the `paymentHash`.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "description": "string",
  "amountSat": 50000,
  "externalId": "string (optional)",
  "expirySeconds": 3600,
  "exchangeRate": 65000.0,
  "exchangeRateCurrency": "USD",
  "fiatAmount": 32.50
}
```

`description` is required; `amountSat` and the rest are optional.

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/wallet/createinvoice" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: walletAccessToken=$WALLET_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Order #123 payment",
    "amountSat": 50000,
    "externalId": "order-123",
    "expirySeconds": 3600
  }'
```

**Response Body (Success - 200 OK):**

```json
{
  "amountSat": 50000,
  "paymentHash": "abcdef1234567890abcdef1234567890abcdef12",
  "serialized": "lnbc500u1p3xnhl2pp5..."
}
```

### POST `/wallet/decodeinvoice`

Decodes a Lightning invoice and returns its amount and description.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{ "invoice": "lnbc500u1p3xnhl2pp5..." }
```

**Response Body (200 OK):**

```json
{
  "amountSat": 50000,
  "description": "Order #123 payment"
}
```

**Response Body (400 Bad Request):**

```json
{ "error": "Could not decode invoice" }
```

### POST `/wallet/payinvoice`

Pays a Lightning invoice. Accepts optional `exchangeRate` + `exchangeRateCurrency` to record the rate.

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

`invoice` is required; `amountSat` and the rates are optional.

**Response Body (Success - 200 OK):**

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

Pays a BOLT12 offer.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "amountSat": 30000,
  "offer": "lno1qcp4256wpj...",
  "message": "string (optional)"
}
```

**Response Body (Success - 200 OK):** same as `payinvoice` (`PaymentResponse`).

### POST `/wallet/payonchain`

Makes an on-chain Bitcoin payment.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "amountSat": 100000,
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "feerateSatByte": 15
}
```

**Response Body (Success - 200 OK):**

```json
{
  "txId": "1234567890abcdef...",
  "amountSat": 100000,
  "feesSat": 2250
}
```

### POST `/wallet/bumpfee`

Increases the fee of an on-chain transaction. The body is an integer (feerate in sat/byte).

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
25
```

**Response Body (Success - 200 OK):**

```json
{
  "txId": "fedcba0987654321...",
  "newFeerateSatByte": 25,
  "additionalFeesSat": 1500
}
```

### POST `/wallet/closechannel`

Closes a Lightning channel.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{
  "channelId": "string",
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "feerateSatByte": 10
}
```

**Response Body (200 OK):** Phoenix service result.

### POST `/wallet/export`

Exports the transaction history in CSV format.

**Authorization:** `walletAccessToken`.

**Request Body:**

```json
{ "from": "2024-01-01", "to": "2024-12-31" }
```

**Response Body (200 OK):** CSV export result.

## Node Information

### GET `/wallet/getinfo`

Retrieves Lightning node information.

**Authorization:** `walletAccessToken`.

**Response Body (Success - 200 OK):**

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

Retrieves the Lightning wallet balance.

**Authorization:** `walletAccessToken`.

**Response Body (Success - 200 OK):**

```json
{
  "balanceSat": 1000000,
  "feeCreditSat": 5000
}
```

### GET `/wallet/seed`

Retrieves the wallet seed (mnemonic).

**Authorization:** `walletAccessToken`.

**Response Body (200 OK):** seed data from Phoenix.

:::warning
Exposes the wallet seed. Use only in secure, controlled contexts.
:::

## Payment Management

### GET `/wallet/payments/incoming`

Lists incoming payments (enriched with exchange rate if recorded).

**Authorization:** `walletAccessToken`.

**Query Parameters:**

- `from` (long): start timestamp.
- `to` (long): end timestamp.
- `limit` (int): result limit (default: 20).
- `offset` (int): pagination offset (default: 0).
- `all` (boolean): include all payments (default: false).
- `externalId` (string): specific external ID.

**Response Body (Success - 200 OK):** list of `IncomingPaymentWithRate`.

```json
[
  {
    "type": "payment",
    "subType": "lightning",
    "paymentHash": "abcdef1234567890",
    "description": "Order #123 payment",
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

Retrieves a specific incoming payment.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentHash` (string): payment hash.

### GET `/wallet/payments/outgoing`

Lists outgoing payments.

**Authorization:** `walletAccessToken`.

**Query Parameters:** `from`, `to`, `limit` (20), `offset` (0), `all` (false).

**Response Body (Success - 200 OK):** list of `OutgoingPaymentWithRate`.

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

Retrieves an outgoing payment by ID.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentId` (string): payment ID.

### GET `/wallet/payments/outgoingbyhash/{paymentHash}`

Retrieves an outgoing payment by hash.

**Authorization:** `walletAccessToken`.

**Path Parameters:**

- `paymentHash` (string): payment hash.

## Real-Time Payments WebSocket

### GET `/ws/payments`

WebSocket connection to receive real-time Lightning payment notifications.

**Authorization:** valid `accessToken` (JWT via cookie).

**Protocol:** WebSocket (`ws://` or `wss://`).

**Connection example:**

```javascript
const ws = new WebSocket("ws://127.0.0.1:9154/ws/payments");
ws.onmessage = (event) => console.log(JSON.parse(event.data));
```

**Connection established message:**

```json
{ "type": "connected" }
```

**Payment received message:**

```json
{
  "type": "payment_received",
  "timestamp": 1712150400000,
  "amountSat": 50000,
  "paymentHash": "abcdef1234567890",
  "externalId": "order-123",
  "payerNote": "Order #123 payment"
}
```

### Notes

:::info
- Amounts are expressed in **satoshis** (1 BTC = 100,000,000 sats).
- Phoenix Wallet must be configured and synchronized; otherwise the endpoints respond `503`.
- Lightning invoices have a configurable expiry time (`expirySeconds`).
:::
