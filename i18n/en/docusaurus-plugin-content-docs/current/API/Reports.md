---
sidebar_label: Reports
---

### Reports

Endpoints for generating per-product sales reports.

### GET `/reports`

Generates a per-product sales report, with optional filters.

**Authorization:** `reports_read`

**Query Parameters (all optional):**

- `period` (string): predefined period (e.g. `day`, `week`, `month`).
- `productName` (string): filter by product name.
- `userId` (string): filter by user.
- `paymentMethod` (string): filter by payment method.
- `startDate` (string, `YYYY-MM-DD`): start date.
- `endDate` (string, `YYYY-MM-DD`): end date.

:::info Date rules
`startDate` and `endDate` must be used **together** (both or neither), and `startDate` cannot be after `endDate`. The format must be `YYYY-MM-DD`; otherwise `400` is returned.
:::

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/reports?startDate=2025-01-01&endDate=2025-01-31&paymentMethod=Cash" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (Success - 200 OK):** a `ProductSalesReport` object.

```json
{
  "totalRevenueCents": 150000,
  "totalItemsSold": 12,
  "totalBtcSatoshis": 0,
  "sales": [
    {
      "orderId": "order-uuid",
      "productName": "Americano coffee",
      "quantity": 2,
      "priceAtOrder": 25000,
      "userName": "Ana García",
      "paymentMethod": "Cash",
      "saleDate": "2025-01-15T14:30:00Z",
      "satoshiAmount": null,
      "exchangeRateAtPayment": null,
      "exchangeRateCurrency": null,
      "fiatAmountAtPayment": null,
      "paymentId": "payment-uuid"
    }
  ]
}
```

**Response Body (Invalid parameters - 400 Bad Request):**

```json
{ "message": "Invalid startDate: 2025-13-01. Expected format YYYY-MM-DD" }
```

### Notes

:::info Model
- `totalRevenueCents` and `priceAtOrder` are expressed in **cents**; `totalBtcSatoshis` in **satoshis**.
- In this version, `ProductSaleItem` does **not** include `variantId` or `discountAmount`.
:::

:::info Related reports
Other order reports live in [Restaurant / Orders](./Restaurant/Orders.md):
- `GET /orders/with-payments` — orders with payment information (`orders_read`).
- `GET /orders/total-sales/{date}` — total sales by date (`orders_read`).
:::
