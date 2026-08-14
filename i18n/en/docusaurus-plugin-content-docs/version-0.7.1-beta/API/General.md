---
sidebar_position: 1
---

### General Endpoints

General endpoints of the Ambrosia POS system that provide basic information and configuration.

## Root Endpoint

### GET `/`

API root endpoint.

**Authorization:** No authentication required.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/"
```

**Response Body (200 OK):**

```json
"Root path of the API Nothing to see here"
```

## Health

### GET `/api/health`

Verifies that the server is running.

**Authorization:** No authentication required.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/api/health"
```

**Response Body (200 OK):**

```json
{
  "status": "healthy",
  "timestamp": "1712150400000"
}
```

## Initial Setup

These endpoints handle the first-time setup process. They are only relevant on first boot.

### GET `/initial-setup`

Checks whether the system has already been initialized.

**Authorization:** No authentication required.

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/initial-setup"
```

**Response Body (200 OK):**

```json
{
  "initialized": false,
  "needsBusinessType": false
}
```

### POST `/initial-setup`

Runs the initial setup — creates the admin role, the first user, and stores the business data. If the system is already initialized but the business type still needs to be confirmed, this endpoint also resolves that.

**Authorization:** No authentication required.

**Request Body (first-time setup):**

```json
{
  "businessType": "restaurant",
  "businessName": "My Business",
  "businessCurrency": "USD",
  "userName": "admin",
  "userPassword": "S3cur3P4ssw0rd!!",
  "userPin": "1234",
  "businessAddress": "string (optional)",
  "businessPhone": "string (optional)",
  "businessEmail": "string (optional)",
  "businessTaxId": "string (optional)",
  "businessRFC": "string (optional, alias of businessTaxId)",
  "businessLogoUrl": "string (optional)",
  "businessLogo": "string (optional, alias of businessLogoUrl)"
}
```

**Request Body (confirm business type only):**

```json
{
  "businessType": "store"
}
```

**cURL Example:**

```bash
curl -X POST "http://127.0.0.1:9154/initial-setup" \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "restaurant",
    "businessName": "My Restaurant",
    "businessCurrency": "USD",
    "userName": "admin",
    "userPassword": "S3cur3P4ssw0rd!!",
    "userPin": "1234"
  }'
```

**Response Body (201 Created):**

```json
{
  "message": "Initial setup completed",
  "userId": "f9b9d411-590f-4d10-a164-0173805857de",
  "roleId": "70d96869-b363-4b5f-a972-897afd30a68c"
}
```

`userId` and `roleId` are UUIDs (strings), not integers.

**Response Body (400 Bad Request):** missing data or invalid business type.

```json
{ "message": "Invalid business type" }
```

**Response Body (404 Not Found):** unknown currency acronym.

```json
{ "message": "Unknown currency acronym: XYZ" }
```

**Response Body (409 Conflict):** system already initialized.

```json
{ "message": "Initial setup already completed" }
```

---

### HTTP Status Codes

#### Success (2xx)

- **200 OK**: Successful operation. **Empty lists** also return `200` with a descriptive string (e.g. `"No orders found"`).
- **201 Created**: Resource created successfully.
- **202 Accepted**: Accepted but not yet completed (e.g. `POST /store/orders/checkout-if-paid` with an unconfirmed Lightning payment → `{ "status": "pending" }`).
- **204 No Content**: No body. Used by successful `DELETE`s (except `DELETE /store/orders/{id}`) and by `GET /shifts/open` when there is no open shift.

#### Client Error (4xx)

- **400 Bad Request**: Missing or invalid parameters.
- **401 Unauthorized**: Not authenticated or invalid token.
- **403 Forbidden**: Insufficient permissions (`Permission required`, `Admin privileges required`, `Wallet access required`).
- **404 Not Found**: Resource not found.
- **409 Conflict**: State conflict — duplicate SKU, duplicate username/role name, an already-open shift, deleting the last admin, etc.
- **429 Too Many Requests**: Login attempt limit. Includes the `Retry-After` header and `{ "retryAfter": <seconds> }`.

#### Server Error (5xx)

- **500 Internal Server Error**: Internal server error.
- **503 Service Unavailable**: External service unavailable (Phoenix node or printing).

---

### Data Format

#### Timestamps

- Timestamps are usually Unix in milliseconds (e.g. `1753549837824`), sent/received as a string or number depending on the field. Some dates use ISO 8601 (`2025-01-15T14:30:00Z`).

#### Identifiers

- **Type**: UUID v4.
- **Example**: `76ee1086-b945-4170-b2e6-9fbeb95ae0be`.

#### Currencies and Amounts

- Restaurant-module amounts are expressed as decimals (e.g. `45.50`).
- Store-module amounts (products, checkout, reports) are expressed as **integers in cents** (e.g. `25000` = $250.00).
- Lightning amounts in **satoshis**.

---

### Authentication

- **Type**: JWT in HTTP cookies.
- **accessToken** (`auth-jwt`): standard API operations. Lifetime ~1 minute.
- **refreshToken**: renews the access token. Lifetime 30 days.
- **walletAccessToken** (`auth-jwt-wallet`): required by most `/wallet/*` endpoints. Obtained from `POST /wallet/auth`.
- Endpoints: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout`.

---

### Pagination

Some endpoints (e.g. `/wallet/payments/*`) support pagination:

- **limit** (int): maximum results (default: 20).
- **offset** (int): results to skip (default: 0).
- **all** (boolean): return all with no pagination.

```bash
curl -X GET "http://127.0.0.1:9154/wallet/payments/incoming?limit=10&offset=20" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: walletAccessToken=$WALLET_ACCESS_TOKEN"
```

:::info
`/wallet/payments/incoming` requires `walletAccessToken` in addition to `accessToken`.
:::

---

### Common Filters

Most filter query params use **camelCase** (`userId`, `paymentMethod`, `minTotal`, `startDate`, `endDate`, `sortBy`, `sortOrder`).

**snake_case exceptions** (because of how the server reads them):

- `user_id` in `GET /shifts/open`.
- `start_date` / `end_date` in `GET /orders/date-range`.
- The `total_sales` key in the `GET /orders/total-sales/{date}` response.

Wallet endpoints use `from` / `to` (timestamps) for date filtering.

---

### Error Handling

Errors handled by the central handler return an object:

```json
{ "message": "Error description" }
```

Exceptions:

- Some route-level validations respond with a **plain string** (e.g. `"Missing or malformed ID"`, `"There is already an open shift"`).
- Phoenix errors return a `WalletErrorResponse`: `{ "message": "...", "code": <int?>, "source": "..." }`.

---

### Environments

- **Development**: base URL `http://127.0.0.1:9154`, local SQLite.
- **Production**: URL per deployment, HTTPS required.

---

### Custom Data Types

#### Table Statuses

- `available`, `occupied`, `reserved`.

#### Order Statuses

- `open`, `closed`, `paid` (valid values of an order's `status` field).

#### Dish (preparation) Statuses

- An `OrderDish`'s `status` reflects the kitchen flow (e.g. `pending`); each dish also includes `shouldPrepare`.

#### Ticket Statuses

- `1` Pending, `2` Paid, `3` Cancelled.

---

### Bitcoin Lightning Integration

The system integrates with the Bitcoin Lightning Network through the Phoenix service: create invoices, process payments, query balance/transactions, and on-chain payments. See [Wallet](./Bitcoin/Wallet.md).

---

### Security

- **PIN**: stored with PBKDF2WithHmacSHA256 (10,000 iterations, 256-bit key), using the app master key + the username as salt (`SecurePinProcessor.hashPinForStorage()`).
- **JWT**: signed with a secret key.
- **HttpOnly cookies**: to mitigate XSS.
- **Production**: HTTPS required, valid SSL certificates, regular backups, and monitoring.
