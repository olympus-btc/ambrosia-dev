### Permission Management

The permission endpoints list the permissions available in the system. These permissions are assigned to roles.

### GET `/permissions`

Retrieves all enabled permissions.

**Authorization:** `permissions_read`

**cURL Example:**

```bash
curl -X GET http://127.0.0.1:9154/permissions \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

**Response Body (Success - 200 OK):**

```json
[
  { "id": "a1b2c3...", "name": "products_read", "description": "List and view products", "enabled": true },
  { "id": "d4e5f6...", "name": "orders_create", "description": "Create orders", "enabled": true },
  { "id": "g7h8i9...", "name": "settings_update", "description": "Update settings/config", "enabled": true }
]
```

**Response Body (Empty list - 200 OK):**

```json
"No permissions found"
```

### Notes

:::info
- Assigning permissions to roles is handled through the Roles endpoints (`PUT /roles/{id}/permissions`).
- The `name` property is the key used to assign permissions (e.g. `products_read`, `orders_update`).
:::
