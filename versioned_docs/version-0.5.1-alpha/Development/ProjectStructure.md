# Estructura del Proyecto

Esta sección describe la estructura de directorios del repositorio principal de **Ambrosia POS**, un sistema integral para restaurantes y retail con integración de Bitcoin.

```text
ambrosia/
├── .github/                # Workflows de CI/CD (Linter, Tests, E2E)
├── client/                 # Frontend Next.js (React 19, Tailwind CSS)
│   ├── __tests__/          # Pruebas unitarias del cliente
│   ├── public/             # Activos estáticos (SVG, imágenes)
│   └── src/                # Código fuente del frontend
│       ├── app/            # App Router de Next.js (páginas y layouts)
│       ├── components/     # Componentes React reutilizables
│       ├── hooks/          # Custom Hooks de React
│       ├── i18n/           # Configuración de internacionalización
│       ├── lib/            # Librerías y configuraciones compartidas
│       ├── modules/        # Módulos específicos de la aplicación
│       └── services/       # Servicios para llamadas a API
├── doc/                    # Documentación adicional (instalación, propuesta)
├── electron/               # Wrapper de escritorio para la aplicación
│   ├── scripts/            # Scripts de construcción para distintas plataformas
│   ├── services/           # Lógica del lado del sistema (Backend, Phoenixd)
│   └── utils/              # Utilidades de salud y gestión de puertos
├── imgs/                   # Activos visuales e iconos del proyecto
├── scripts/                # Scripts de utilidad (instalar, desinstalar, ejecutar)
├── server/                 # Backend Kotlin (Ktor Framework)
│   ├── app/                # Aplicación principal del servidor
│   │   └── src/            # Código fuente (Kotlin/Java)
│   ├── e2e_tests_py/       # Pruebas End-to-End escritas en Python (Pytest)
│   └── gradle/             # Configuración de Gradle Wrapper
├── docker-compose.yml      # Orquestación de servicios (Server, Client, Phoenixd)
├── Makefile                # Automatización de tareas de construcción y ejecución
└── README.md               # Documentación principal del proyecto
```

:::info Repositorio Principal
Puedes encontrar el código fuente completo en nuestro [repositorio oficial en GitHub](https://github.com/olympus-btc/ambrosia).
:::
