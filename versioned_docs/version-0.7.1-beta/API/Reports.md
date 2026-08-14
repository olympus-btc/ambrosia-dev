---
sidebar_label: Reports
---

### Reportes

Endpoints para generar reportes de ventas por producto.

### GET `/reports`

Genera un reporte de ventas por producto, con filtros opcionales.

**Authorization:** `reports_read`

**Query Parameters (todos opcionales):**

- `period` (string): periodo predefinido (ej. `day`, `week`, `month`).
- `productName` (string): filtra por nombre de producto.
- `userId` (string): filtra por usuario.
- `paymentMethod` (string): filtra por método de pago.
- `startDate` (string, `YYYY-MM-DD`): fecha de inicio.
- `endDate` (string, `YYYY-MM-DD`): fecha de fin.

:::info Reglas de fechas
`startDate` y `endDate` deben usarse **juntas** (ambas o ninguna) y `startDate` no puede ser posterior a `endDate`. El formato debe ser `YYYY-MM-DD`; de lo contrario se devuelve `400`.
:::

**cURL Example:**

```bash
curl -X GET "http://127.0.0.1:9154/reports?startDate=2025-01-01&endDate=2025-01-31&paymentMethod=Efectivo" \
  -H "Cookie: accessToken=$ACCESS_TOKEN"
```

**Response Body (Éxito - 200 OK):** objeto `ProductSalesReport`.

```json
{
  "totalRevenueCents": 150000,
  "totalItemsSold": 12,
  "totalBtcSatoshis": 0,
  "sales": [
    {
      "orderId": "order-uuid",
      "productName": "Café americano",
      "quantity": 2,
      "priceAtOrder": 25000,
      "userName": "Ana García",
      "paymentMethod": "Efectivo",
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

**Response Body (Parámetros inválidos - 400 Bad Request):**

```json
{ "message": "Invalid startDate: 2025-13-01. Expected format YYYY-MM-DD" }
```

### Notas

:::info Modelo
- `totalRevenueCents` y `priceAtOrder` se expresan en **centavos**; `totalBtcSatoshis` en **satoshis**.
- En esta versión, `ProductSaleItem` **no** incluye `variantId` ni `discountAmount`.
:::

:::info Reportes relacionados
Otros reportes de órdenes viven en [Restaurant / Orders](./Restaurant/Orders.md):
- `GET /orders/with-payments` — órdenes con información de pago (`orders_read`).
- `GET /orders/total-sales/{date}` — total de ventas por fecha (`orders_read`).
:::
