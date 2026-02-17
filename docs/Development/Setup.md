# Contribuir a Ambrosia POS

¡Gracias por tu interés en contribuir a Ambrosia POS! Nos encanta la colaboración comunitaria. Ya sea que estés corrigiendo un error, añadiendo una funcionalidad, mejorando la documentación o ayudando con el soporte a la comunidad, tu ayuda es bienvenida para construir el futuro de los pagos con Bitcoin.

## Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Primeros Pasos](#primeros-pasos)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno de Desarrollo](#configuración-del-entorno-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Pruebas (Testing)](#pruebas-testing)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reporte de Problemas](#reporte-de-problemas)
- [Recursos de Desarrollo](#recursos-de-desarrollo)
- [Comunidad](#comunidad)

## Código de Conducta

Este proyecto se adhiere a nuestro **[Código de Conducta](https://github.com/olympus-btc/ambrosia/blob/main/CODE_OF_CONDUCT.md)**. Al participar, se espera que cumplas con este código. Por favor, informa de comportamientos inaceptables a **contact@ambrosiapay.com**.

## Primeros Pasos

### Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las dependencias necesarias. Por favor, consulta nuestra **[Guía de Dependencias del Proyecto](https://github.com/olympus-btc/ambrosia/blob/main/doc/dependencies.md)** para instrucciones detalladas sobre la instalación de:

- **Java 21 (JDK)**
- **Node.js**
- **Docker**
- **Gradle**

### Colaboradores por primera vez

Si eres nuevo en el código abierto, echa un vistazo a:
- [First Contributions](https://github.com/firstcontributions/first-contributions)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

## Cómo Contribuir

### Tipos de Contribuciones

Aceptamos varios tipos de contribuciones:

- 🔍 **Revisar nuestro código** en [GitHub](https://github.com/olympus-btc/ambrosia)
- 🐛 **Reportar errores** o sugerir mejoras
- 💡 **Contribuir con ideas** para nuevas funcionalidades
- 🧪 **Probar la beta** e informar de problemas
- 📝 **Documentación**: 
    Mejorar nuestros documentos, README o comentarios de código
    
    - [Desarrollo](https://github.com/olympus-btc/ambrosia-dev)
    - [Tutorial](https://github.com/olympus-btc/ambrosia-tutorial)
- 🍴 **Hacer un fork del repositorio** y enviar tus Pull Requests (PRs)

### Antes de Empezar

1. **Busca problemas existentes** para evitar duplicados.
2. **Discute cambios mayores** abriendo un problema (issue) primero.

## Configuración del Entorno de Desarrollo

Una guía clara y ordenada para trabajar en Ambrosia‑POS usando herramientas nativas.

### Requisitos:
- SDKMAN (oficial: https://sdkman.io/)
  ```bash
  curl -s "https://get.sdkman.io" | bash
  source "$HOME/.sdkman/bin/sdkman-init.sh"
  ```
- Java 21 (Temurin):
  ```bash
  sdk list java
  sdk install java 21-tem
  java -version
  ```
- Gradle:
  ```bash
  sdk install gradle
  gradle -v
  ```
- Node.js >= 18 y npm.
- phoenixd (Lightning):
  ```bash
  curl -fsSL https://raw.githubusercontent.com/olympus-btc/ambrosia-dev/master/scripts/install.sh | bash -s -- --yes
  ```

### Verificación rápida
```bash
java -version && gradle -v | head -n1 && node -v && npm -v
```

### Pasos de Configuración

1. **Haz un fork del repositorio** en GitHub.
2. **Clona tu fork** localmente:
   ```bash
   git clone https://github.com/TU-USUARIO/ambrosia.git
   cd ambrosia
   ```

3. **Paso 1 · Iniciar phoenixd**
   Tras la instalación, asegúrate de que el servicio esté corriendo y que `~/.phoenix` esté inicializado según la guía de Mastering phoenixd.

4. **Paso 2 · Servidor / Backend (Kotlin/Ktor)**:
   ```bash
   cd server
   ./gradlew run    # API en :9154
   ```
   - Tests: `./gradlew test`

5. **Paso 3 · Cliente / Frontend (Next.js)**:
   ```bash
   cd client
   npm install
   npm run dev      # web en :3000
   ```
   - Lint: `npm run lint`
   - Tests: `npm test`

6. **Paso 4 · Configuración de Electron (Escritorio)**:
   ```bash
   cd electron
   npm install
   npm run dev
   ```
   *(Consulta el [README de Electron](https://github.com/olympus-btc/ambrosia/blob/main/electron/README.md) para más detalles)*

### Endpoints locales
- API: http://127.0.0.1:9154
- Web: http://127.0.0.1:3000

### Solución de problemas
:::tip Consejos
- Usa el wrapper `./gradlew` para evitar problemas de PATH.
- Si algún puerto está ocupado, cambia `3000`/`9154` o detén el proceso en conflicto.
- phoenixd: valida que corre y que `~/.phoenix` contiene la configuración esperada.
:::

## Estándares de Código

### Guía de Estilo

- **Cliente**: Sigue las prácticas estándar de React/Next.js. Usa `npm run lint` para verificar problemas de estilo.
- **Servidor**: Sigue las convenciones estándar de Kotlin.
- **Commits**: Escribe mensajes de commit significativos.

### Formato de Mensajes de Commit

Recomendamos usar [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(ámbito): descripción
```

Ejemplos:
- `feat(auth): add login support`
- `fix(server): resolve null pointer exception`
- `docs(readme): update installation steps`

## Pruebas (Testing)

### Cliente (Frontend)

Dentro de `client/`:
```bash
npm test
```

### Servidor (Backend)

Dentro de `server/`:
```bash
./gradlew test
```

### Pruebas E2E

El proyecto incluye pruebas de extremo a extremo (E2E) para la API del servidor escritas en Python.
Para instrucciones detalladas, consulta el **[README de Pruebas E2E](https://github.com/olympus-btc/ambrosia/blob/main/server/e2e_tests_py/README.md)**.

## Proceso de Pull Request

### ¿Cómo enviar un Pull Request?

1. **Crea una rama** para tu cambio (`git checkout -b feature/funcionalidad-increible`).
2. **Realiza tus modificaciones** y haz commit de ellas.
3. **Ejecuta las pruebas** para asegurar que no haya regresiones.
4. **Sube a tu fork** y envía un Pull Request al repositorio principal.

### Lista de verificación

- [ ] El código sigue las guías de estilo
- [ ] Las pruebas pasan localmente
- [ ] La documentación está actualizada si es necesario

## Reporte de Problemas

- **Reportes de Errores**: Incluye pasos claros para reproducirlo, comportamiento esperado frente al real y detalles del entorno.
- **Solicitudes de Funcionalidades**: Describe la funcionalidad propuesta, el caso de uso y la motivación.

## Recursos de Desarrollo

### Estructura del Proyecto

*   `client/` - Aplicación frontend (Next.js/React).
*   `server/` - Aplicación backend (Kotlin/Ktor).
*   `electron/` - Envoltorio de escritorio (Electron).
*   `doc/` - Documentación del proyecto.
*   `scripts/` - Scripts de utilidad e instalación.

### Comandos Útiles

**Servidor:**
```bash
./gradlew run   # Ejecutar servidor
./gradlew jar   # Construir JAR
```

**Cliente:**
```bash
npm run dev     # Iniciar servidor de desarrollo
npm run build   # Construir para producción
npm start       # Iniciar servidor de producción
```

## Comunidad

**¡Mantente conectado!**

Síguenos en nuestras redes sociales y únete a la comunidad de desarrolladores y emprendedores que están construyendo el futuro de los pagos con Bitcoin.
