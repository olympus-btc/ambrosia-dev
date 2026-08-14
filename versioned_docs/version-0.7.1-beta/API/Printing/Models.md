### Modelos de Datos de Impresión

Estos son los modelos de datos utilizados por los endpoints de impresión y plantillas de tickets.

#### PrintRequest

Utilizado para enviar una solicitud de impresión.

```kotlin
@Serializable
data class PrintRequest(
    val templateName: String? = null,      // Nombre de plantilla (opcional)
    val ticketData: TicketData,            // Datos del ticket a imprimir
    val printerType: PrinterType,          // KITCHEN, CUSTOMER o BAR
    val printerId: String? = null,         // UUID de config de impresora (opcional)
    val broadcast: Boolean = false,        // Enviar a todas las impresoras del tipo
    val forceTemplateName: Boolean = false // Forzar plantilla exacta sin fallback
)
```

#### PrinterType (Enum)

Tipos de impresora / destino de ticket.

- `KITCHEN`
- `CUSTOMER`
- `BAR`

#### SetPrinterRequest

Utilizado para asignar una impresora a un tipo.

```kotlin
@Serializable
data class SetPrinterRequest(
    val printerType: PrinterType, // KITCHEN, CUSTOMER o BAR
    val printerName: String       // Nombre de la impresora
)
```

#### PrinterConfig

Configuración de impresora persistida.

```kotlin
@Serializable
data class PrinterConfig(
    val id: String,
    val printerType: PrinterType,
    val printerName: String,
    val templateName: String? = null,
    val isDefault: Boolean = false,
    val enabled: Boolean = true,
    val createdAt: String? = null
)
```

#### TicketTemplate

Define la estructura y contenido de una plantilla de ticket.

```kotlin
@Serializable
data class TicketTemplate(
    val id: String,
    val name: String,                  // Nombre único de la plantilla
    val elements: List<TicketElement>  // Lista de elementos que componen el ticket
)
```

#### TicketElement

Representa un elemento individual dentro de una plantilla de ticket.

```kotlin
@Serializable
data class TicketElement(
    val id: String,
    val templateId: String,
    val order: Int,
    val type: ElementType,          // Tipo de elemento (HEADER, TEXT, etc.)
    val value: String,              // Contenido o placeholder (ej. {{ticket.total}})
    val style: ElementStyle? = null // Estilo opcional del elemento
)
```

En las peticiones de creación/actualización (`TicketTemplateRequest`), cada elemento se envía como `TicketElementCreateRequest` (`type`, `value`, `style?`), sin `id`, `templateId` ni `order`.

#### ElementType (Enum)

Tipos de elementos que se pueden utilizar en una plantilla.

- `HEADER`
- `TEXT`
- `LINE_BREAK`
- `SEPARATOR`
- `TABLE_HEADER`
- `TABLE_ROW`
- `TOTAL_ROW`
- `FOOTER`
- `QRCODE`

#### ElementStyle

Define el estilo de un `TicketElement`.

```kotlin
@Serializable
data class ElementStyle(
    val bold: Boolean = false,
    val justification: Justification = Justification.LEFT,
    val fontSize: FontSize = FontSize.NORMAL
)
```

#### Justification (Enum)

- `LEFT`
- `CENTER`
- `RIGHT`

#### FontSize (Enum)

- `NORMAL`
- `LARGE`
- `EXTRA_LARGE`

#### TicketData

Contiene los datos específicos de un ticket para ser impreso.

```kotlin
@Serializable
data class TicketData(
    val ticketId: String,
    val tableName: String,
    val roomName: String,
    val date: String,
    val items: List<TicketDataItem>,
    val total: Double,
    val invoice: String? = null
)
```

#### TicketDataItem

Representa un ítem individual en la lista de `TicketData`.

```kotlin
@Serializable
data class TicketDataItem(
    val quantity: Int,
    val name: String,
    val price: Double,
    val comments: List<String> = emptyList()
)
```
