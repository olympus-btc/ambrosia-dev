---
sidebar_position: 1
---

### General Endpoints

General endpoints of the Ambrosia POS system that provide basic information and configuration.

## Root Endpoint

- `GET /`: Root endpoint of the API.
  - **Authorization:** No authentication required
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/"
  ```
  - **Response Body (200 OK):**
  ```json
  "Root path of the API Nothing to see here"
  ```

## Health

- `GET /api/health`: Checks that the server is running.
  - **Authorization:** No authentication required
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/api/health"
  ```
  - **Response Body (200 OK):**
  ```json
  {
    "status": "healthy",
    "timestamp": "1712150400000"
  }
  ```

## Initial Setup

These endpoints manage the first-run setup process. Only relevant on the first boot.

- `GET /initial-setup`: Checks whether the system has already been initialized.
  - **Authorization:** No authentication required
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/initial-setup"
  ```
  - **Response Body (200 OK):**
  ```json
  {
    "initialized": false,
    "needsBusinessType": false
  }
  ```

- `POST /initial-setup`: Runs the initial system setup — creates the admin role, the first user, and saves business data. If the system was already initialized but the business type was not confirmed, this endpoint handles that too.
  - **Authorization:** No authentication required
  - **Request Body (first-time setup):**
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
    "businessRFC": "string (optional, alias for businessTaxId)",
    "businessLogoUrl": "string (optional)",
    "businessLogo": "string (optional, alias for businessLogoUrl)"
  }
  ```
  - **Request Body (confirm business type only):**
  ```json
  {
    "businessType": "store"
  }
  ```
  - **cURL Example:**
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
  - **Response Body (201 Created):**
  ```json
  {
    "message": "Initial setup completed",
    "userId": 1,
    "roleId": 1
  }
  ```
  - **Response Body (400 Bad Request):** missing data or invalid business type
  ```json
  { "message": "Invalid business type" }
  ```
  - **Response Body (404 Not Found):** unknown currency acronym
  ```json
  { "message": "Unknown currency acronym: XYZ" }
  ```
  - **Response Body (409 Conflict):** system already initialized
  ```json
  { "message": "Initial setup already completed" }
  ```

---

### HTTP Status Codes

The API uses the following standard HTTP status codes:

#### Success (2xx)
- **200 OK**: Successful operation
- **201 Created**: Resource created successfully
- **204 No Content**: No content (empty list or successful deletion)

#### Client Error (4xx)
- **400 Bad Request**: Incorrect request (missing or invalid parameters)
- **401 Unauthorized**: Not authenticated or invalid token
- **403 Forbidden**: Access denied (insufficient permissions)
- **404 Not Found**: Resource not found

#### Server Error (5xx)
- **500 Internal Server Error**: Internal server error

---

### Data Format

#### Timestamps
- **Timestamp format**: 1753549837824 (Unix timestamp in milliseconds)

#### Identifiers
- **Type**: UUID v4
- **Format**: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
- **Example**: `76ee1086-b945-4170-b2e6-9fbeb95ae0be`

#### Currencies and Amounts
- **Numeric format**: Decimal point (example: 45.50)
- **Precision**: 2 decimal places for monetary amounts
- **Supported currencies**: MXN, USD, BTC

---

### Authentication

#### Authentication Scheme
- **Type**: JWT (JSON Web Tokens)
- **Storage**: HTTP Cookies
- **Access Token**: Duration of 1 minute
- **Refresh Token**: Duration of 30 days

#### Authentication Cookies
- **accessToken**: Access token for API operations
- **refreshToken**: Token to renew the access token

#### Authentication Endpoints
- **Login**: `POST /auth/login`
- **Refresh**: `POST /auth/refresh`
- **Logout**: `POST /auth/logout`

---

### Pagination

Some endpoints support pagination parameters:

#### Query Parameters
- **limit** (int): Maximum number of results (default: 20)
- **offset** (int): Number of results to skip (default: 0)
- **all** (boolean): Show all results without pagination

#### Usage Example
```Bash
curl -X GET "http://127.0.0.1:9154/wallet/payments/incoming?limit=10&offset=20" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

---

### Common Filters

#### Filters by Date
- **from** (timestamp): Start date/time
- **to** (timestamp): End date/time
- **limit** (date): Specific date

#### Filters by Relationship
- **user_id** (uuid): Filter by user
- **table_id** (uuid): Filter by table
- **space_id** (uuid): Filter by space

---

### Error Handling

#### Error Response Structure
```json
{
  "message": "Error description"
}
```

#### Common Errors
- **"Missing or malformed ID"**: Required ID not provided or invalid
- **"Invalid credentials"**: Incorrect authentication credentials
- **"Unauthorized"**: Invalid or expired access token
- **"Resource not found"**: The requested resource does not exist
- **"Validation failed"**: Input data does not pass validation

### Incorrect return modes
- **Response Body (Error - 400 Bad Request):**
  ```json
  "Missing or malformed ID"
  ```
- **Response Body (Error - 404 Not Found):**
  ```json
  "Resource not found"
  ```
- **Response Body (Error - 403 Forbidden):**
  ```json
  {"message":"Unauthorized API access"}
  ```


---

### Environments

#### Development
- **Base URL**: `http://127.0.0.1:9154`
- **Database**: Local SQLite
- **Logging**: DEBUG Level

#### Production
- **Base URL**: Configured according to the deployment
- **Database**: Sqlite
- **HTTPS**: Mandatory
- **Logging**: INFO Level

---

### Custom Data Types

#### Table States
- `available`: Table available
- `occupied`: Table occupied
- `reserved`: Table reserved

#### Order States
- `pending`: Pending order
- `preparing`: In preparation
- `ready`: Ready to serve
- `completed`: Completed
- `cancelled`: Canceled

#### Ticket States
- `1`: Pending
- `2`: Paid
- `3`: Canceled

---

### Bitcoin Lightning Integration

The system includes full integration with the Bitcoin Lightning Network through the Phoenix service:

#### Functionalities
- Create Lightning invoices
- Process Lightning payments
- Check balance and transactions
- On-chain payment management
- Transaction history

#### Supported Currencies
- **Satoshis**: Base unit of Bitcoin
- **Millisatoshis**: For Lightning microtransactions
- **Bitcoin**: Automatic conversion

---

### Security

#### Security Measures
- **PIN Encryption**: PINs are stored encrypted using PBKDF2WithHmacSHA256 with 10,000 iterations and a key length of 256 bits. The `hashPinForStorage()` function combines the application's master key with the username as a salt to generate a unique and secure hash (implemented in `SecurePinProcessor.kt`)
- **JWT Tokens**: Signed with a secret key
- **HttpOnly Cookies**: To prevent XSS attacks
- **Input validation**: All data is validated before processing

#### PIN Encryption Algorithm
- **Algorithm**: PBKDF2WithHmacSHA256
- **Iterations**: 10,000
- **Key length**: 256 bits
- **Salt**: Combination of application master key + username
- **Implementation**: `pos.ambrosia.utils.SecurePinProcessor.hashPinForStorage()`
- **Verification**: `pos.ambrosia.utils.SecurePinProcessor.verifyPin()`

#### Production Recommendations
- **HTTPS mandatory**: To protect communications
- **Valid SSL certificates**: For client trust
- **Regular backup**: Of the database and configuration
- **Monitoring**: Access and error logs
