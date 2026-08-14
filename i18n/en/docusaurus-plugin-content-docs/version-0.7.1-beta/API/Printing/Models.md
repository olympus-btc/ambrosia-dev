### Printing Data Models

These are the data models used by the printing and ticket template endpoints.

#### PrintRequest

Used to send a print request.

```kotlin
@Serializable
data class PrintRequest(
    val templateName: String? = null,      // Template name (optional)
    val ticketData: TicketData,            // Ticket data to print
    val printerType: PrinterType,          // KITCHEN, CUSTOMER or BAR
    val printerId: String? = null,         // Printer config UUID (optional)
    val broadcast: Boolean = false,        // Send to all printers of the type
    val forceTemplateName: Boolean = false // Force exact template with no fallback
)
```

#### PrinterType (Enum)

Printer types / ticket destinations.

- `KITCHEN`
- `CUSTOMER`
- `BAR`

#### SetPrinterRequest

Used to assign a printer to a type.

```kotlin
@Serializable
data class SetPrinterRequest(
    val printerType: PrinterType, // KITCHEN, CUSTOMER or BAR
    val printerName: String       // Printer name
)
```

#### PrinterConfig

Persisted printer configuration.

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

Defines the structure and content of a ticket template.

```kotlin
@Serializable
data class TicketTemplate(
    val id: String,
    val name: String,                  // Unique template name
    val elements: List<TicketElement>  // List of elements composing the ticket
)
```

In create/update requests (`TicketTemplateRequest`), each element is sent as a `TicketElementCreateRequest` (`type`, `value`, `style?`), without `id`, `templateId`, or `order`.

#### TicketElement

Represents an individual element within a ticket template.

```kotlin
@Serializable
data class TicketElement(
    val id: String,
    val templateId: String,
    val order: Int,
    val type: ElementType,          // Element type (HEADER, TEXT, etc.)
    val value: String,              // Content or placeholder (e.g. {{ticket.total}})
    val style: ElementStyle? = null // Optional element style
)
```

#### ElementType (Enum)

Element types that can be used in a template.

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

Defines the style of a `TicketElement`.

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

Contains the specific data of a ticket to be printed.

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

Represents an individual item in the `TicketData` list.

```kotlin
@Serializable
data class TicketDataItem(
    val quantity: Int,
    val name: String,
    val price: Double,
    val comments: List<String> = emptyList()
)
```
