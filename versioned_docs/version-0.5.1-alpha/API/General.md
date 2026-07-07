---
sidebar_position: 1
---

### Endpoints Generales

Endpoints generales del sistema Ambrosia POS que proporcionan información básica y configuración.

## Endpoint Raíz

- `GET /`: Endpoint raíz de la API.
  - **Authorization:** No requiere autenticación
  - **cURL Example:**
  ```bash
  curl -X GET "http://127.0.0.1:9154/"
  ```
  - **Response Body (200 OK):**
  ```json
  "Root path of the API Nothing to see here"
  ```

## Health

- `GET /api/health`: Verifica que el servidor está en ejecución.
  - **Authorization:** No requiere autenticación
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

## Configuración Inicial

Estos endpoints gestionan el proceso de primera configuración del sistema. Solo son relevantes en el primer arranque.

- `GET /initial-setup`: Verifica si el sistema ya fue inicializado.
  - **Authorization:** No requiere autenticación
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

- `POST /initial-setup`: Ejecuta la configuración inicial del sistema — crea el rol admin, el primer usuario y guarda los datos del negocio. Si el sistema ya fue inicializado pero falta confirmar el tipo de negocio, este endpoint también lo resuelve.
  - **Authorization:** No requiere autenticación
  - **Request Body (primera configuración):**
  ```json
  {
    "businessType": "restaurant",
    "businessName": "Mi Negocio",
    "businessCurrency": "USD",
    "userName": "admin",
    "userPassword": "S3cur3P4ssw0rd!!",
    "userPin": "1234",
    "businessAddress": "string (opcional)",
    "businessPhone": "string (opcional)",
    "businessEmail": "string (opcional)",
    "businessTaxId": "string (opcional)",
    "businessRFC": "string (opcional, alias de businessTaxId)",
    "businessLogoUrl": "string (opcional)",
    "businessLogo": "string (opcional, alias de businessLogoUrl)"
  }
  ```
  - **Request Body (solo confirmar tipo de negocio):**
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
      "businessName": "Mi Restaurante",
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
  - **Response Body (400 Bad Request):** datos faltantes o tipo de negocio inválido
  ```json
  { "message": "Invalid business type" }
  ```
  - **Response Body (404 Not Found):** acrónimo de moneda desconocido
  ```json
  { "message": "Unknown currency acronym: XYZ" }
  ```
  - **Response Body (409 Conflict):** sistema ya inicializado
  ```json
  { "message": "Initial setup already completed" }
  ```

---

### Códigos de Estado HTTP

La API utiliza los siguientes códigos de estado HTTP estándar:

#### Éxito (2xx)
- **200 OK**: Operación exitosa
- **201 Created**: Recurso creado exitosamente
- **204 No Content**: Sin contenido (lista vacía o eliminación exitosa)

#### Error del Cliente (4xx)
- **400 Bad Request**: Solicitud incorrecta (parámetros faltantes o inválidos)
- **401 Unauthorized**: No autenticado o token inválido
- **403 Forbidden**: Acceso denegado (permisos insuficientes)
- **404 Not Found**: Recurso no encontrado

#### Error del Servidor (5xx)
- **500 Internal Server Error**: Error interno del servidor

---

### Formato de Datos

#### Timestamps
- **Formato de timestamp**: 1753549837824 (Unix timestamp in milliseconds)

#### Identificadores
- **Tipo**: UUID v4
- **Formato**: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
- **Ejemplo**: `76ee1086-b945-4170-b2e6-9fbeb95ae0be`

#### Monedas y Cantidades
- **Formato numérico**: Punto decimal (ejemplo: 45.50)
- **Precisión**: 2 decimales para cantidades monetarias
- **Monedas soportadas**: MXN, USD, BTC

---

### Autenticación

#### Esquema de Autenticación
- **Tipo**: JWT (JSON Web Tokens)
- **Almacenamiento**: Cookies HTTP
- **Access Token**: Duración de 1 minuto
- **Refresh Token**: Duración de 30 días

#### Cookies de Autenticación
- **accessToken**: Token de acceso para operaciones de la API
- **refreshToken**: Token para renovar el access token

#### Endpoints de Autenticación
- **Login**: `POST /auth/login`
- **Refresh**: `POST /auth/refresh`
- **Logout**: `POST /auth/logout`

---

### Paginación

Algunos endpoints soportan parámetros de paginación:

#### Parámetros de Query
- **limit** (int): Número máximo de resultados (por defecto: 20)
- **offset** (int): Número de resultados a omitir (por defecto: 0)
- **all** (boolean): Mostrar todos los resultados sin paginación

#### Ejemplo de Uso
```Bash
curl -X GET "http://127.0.0.1:9154/wallet/payments/incoming?limit=10&offset=20" \
  -H "Cookie: accessToken=$ACCESS_TOKEN" \
  -H "Cookie: refreshToken=$REFRESH_TOKEN"
```

---

### Filtros Comunes

#### Filtros por Fecha
- **from** (timestamp): Fecha/hora de inicio
- **to** (timestamp): Fecha/hora de fin
- **limit** (date): Fecha específica

#### Filtros por Relación
- **user_id** (uuid): Filtrar por usuario
- **table_id** (uuid): Filtrar por mesa
- **space_id** (uuid): Filtrar por espacio

---

### Manejo de Errores

#### Estructura de Respuesta de Error
```json
{
  "message": "Descripción del error"
}
```

#### Errores Comunes
- **"Missing or malformed ID"**: ID requerido no proporcionado o inválido
- **"Invalid credentials"**: Credenciales de autenticación incorrectas
- **"Unauthorized"**: Token de acceso inválido o expirado
- **"Resource not found"**: El recurso solicitado no existe
- **"Validation failed"**: Los datos de entrada no pasan la validación

### Modos de retorno incorrectos
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

### Entornos

#### Desarrollo
- **URL Base**: `http://127.0.0.1:9154`
- **Base de Datos**: SQLite local
- **Logging**: Nivel DEBUG

#### Producción
- **URL Base**: Configurada según el despliegue
- **Base de Datos**: Sqlite
- **HTTPS**: Obligatorio
- **Logging**: Nivel INFO

---

### Tipos de Datos Personalizados

#### Estados de Mesa
- `available`: Mesa disponible
- `occupied`: Mesa ocupada
- `reserved`: Mesa reservada

#### Estados de Orden
- `pending`: Pedido pendiente
- `preparing`: En preparación
- `ready`: Listo para servir
- `completed`: Completado
- `cancelled`: Cancelado

#### Estados de Ticket
- `1`: Pendiente
- `2`: Pagado
- `3`: Cancelado

---

### Integración Bitcoin Lightning

El sistema incluye integración completa con Bitcoin Lightning Network a través del servicio Phoenix:

#### Funcionalidades
- Crear facturas Lightning
- Procesar pagos Lightning
- Consultar balance y transacciones
- Gestión de pagos on-chain
- Historial de transacciones

#### Monedas Soportadas
- **Satoshis**: Unidad base de Bitcoin
- **Millisatoshis**: Para microtransacciones Lightning
- **Bitcoin**: Conversión automática

---

### Seguridad

#### Medidas de Seguridad
- **Encripción de PIN**: Los PIN's se almacenan encriptados usando PBKDF2WithHmacSHA256 con 10,000 iteraciones y una longitud de clave de 256 bits. La función `hashPinForStorage()` combina la clave maestra de la aplicación con el nombre de usuario como salt para generar un hash único y seguro (implementado en `SecurePinProcessor.kt`)
- **Tokens JWT**: Firmados con clave secreta
- **Cookies HttpOnly**: Para prevenir ataques XSS
- **Validación de entrada**: Todos los datos se validan antes del procesamiento

#### Algoritmo de Encriptación de PIN
- **Algoritmo**: PBKDF2WithHmacSHA256
- **Iteraciones**: 10,000
- **Longitud de clave**: 256 bits
- **Salt**: Combinación de clave maestra de aplicación + nombre de usuario
- **Implementación**: `pos.ambrosia.utils.SecurePinProcessor.hashPinForStorage()`
- **Verificación**: `pos.ambrosia.utils.SecurePinProcessor.verifyPin()`

#### Recomendaciones de Producción
- **HTTPS obligatorio**: Para proteger las comunicaciones
- **Certificados SSL válidos**: Para la confianza del cliente
- **Backup regular**: De la base de datos y configuración
- **Monitoreo**: Logs de acceso y errores
