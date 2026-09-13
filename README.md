# Roadmap AR1

POC interna con Spring Boot, Vaadin y PostgreSQL. Lee issues de Jira y guarda localmente las fechas y las ausencias. No escribe en Jira.

## Requisitos y arranque

- JDK 21, con `JAVA_HOME` configurado.
- Maven 3.9 o el wrapper `mvnw.cmd` en Windows / `./mvnw` en Linux.
- PostgreSQL y acceso a Jira. El puerto de base predeterminado es 5433, para el túnel SSH del equipo.

Copiá `.env.example` como `.env` y completá los valores obligatorios. Compose carga ese archivo automáticamente. Para ejecutar directamente desde Maven o el IDE, cargá las mismas variables en el proceso. `.env` está ignorado por Git y nunca debe contenerse en una imagen.

Desarrollo:

```powershell
.\mvnw.cmd vaadin:prepare-frontend spring-boot:run
```

Build completo y ejecución:

```powershell
.\mvnw.cmd clean verify -Pproduction
java -jar target/roadmap-0.0.1-SNAPSHOT.jar
```

Rutas: `/` para roadmap, `/gantt/planning` para fechas, `/gantt/availability` para ausencias. Usá Actualizar para cargar los cambios de otras sesiones. Las ediciones siguen la regla de último guardado; aún no hay control de versiones concurrentes.

## Configuración

Todas las variables usan el prefijo `ROADMAP_`. Los secretos no tienen valores predeterminados.

| Variable | Qué configura | Requisito | Default |
| --- | --- | --- | --- |
| `ROADMAP_SERVER_PORT` | Puerto HTTP de Spring Boot | Opcional | `8082` |
| `ROADMAP_LOG_LEVEL` | Nivel de log de `com.example.roadmap` | Opcional | `INFO` |
| `ROADMAP_VAADIN_LAUNCH_BROWSER` | Apertura automática del navegador local | Opcional | `false` |
| `ROADMAP_JIRA_BASE_URL` | URL base de Jira, sin `/rest/api/2/search` | Obligatoria | Ninguno |
| `ROADMAP_JIRA_TOKEN` | Bearer token de Jira | Obligatoria, secreto | Ninguno |
| `ROADMAP_JIRA_PROJECT` | Project key usado en el JQL | Opcional | `TTAR` |
| `ROADMAP_JIRA_CONNECT_TIMEOUT` | Tiempo máximo para conectar con Jira | Opcional | `10s` |
| `ROADMAP_JIRA_READ_TIMEOUT` | Tiempo máximo para leer una respuesta de Jira | Opcional | `30s` |
| `ROADMAP_DB_URL` | URL JDBC completa. Si existe, reemplaza host, puerto y nombre | Opcional | Derivada |
| `ROADMAP_DB_HOST` | Host de PostgreSQL cuando no hay URL completa | Opcional | `127.0.0.1` |
| `ROADMAP_DB_PORT` | Puerto de PostgreSQL cuando no hay URL completa | Opcional | `5433` |
| `ROADMAP_DB_NAME` | Nombre de la base cuando no hay URL completa | Opcional | `roadmap` |
| `ROADMAP_DB_USERNAME` | Usuario de PostgreSQL | Obligatoria | Ninguno |
| `ROADMAP_DB_PASSWORD` | Password de PostgreSQL | Obligatoria, secreto | Ninguno |
| `ROADMAP_DB_POOL_SIZE` | Máximo de conexiones Hikari | Opcional | `5` |
| `ROADMAP_TEAM_MEMBERS` | Roster completo consultado y mostrado por el roadmap | Opcional | Roster AR1 actual |
| `ROADMAP_STACK_ALIASES_FRONTEND` | Labels de Jira interpretados como Front | Opcional | `front,frontend,...` |
| `ROADMAP_STACK_ALIASES_BACKEND` | Labels de Jira interpretados como BE | Opcional | `be,backend,...` |
| `ROADMAP_STACK_ALIASES_MOBILE` | Labels de Jira interpretados como Mobile | Opcional | `mobile,stack mobile` |
| `ROADMAP_STACK_ALIASES_DEVOPS` | Labels de Jira interpretados como DevOps | Opcional | `devops,dev ops,stack devops` |

### Roster

`ROADMAP_TEAM_MEMBERS` contiene todos los integrantes en una sola variable para poder agregar, quitar o modificar personas desde la VM. Cada entrada usa `usuario Jira|nombre visible|rol` y las entradas se separan con comas:

```env
ROADMAP_TEAM_MEMBERS=bfestino|Bruno Festino|MOBILE,rdente|Rodrigo Dente|DEVOPS
```

Los roles permitidos son `FRONTEND`, `BACKEND`, `MOBILE` y `DEVOPS`. El orden de la variable es el orden visual del equipo. La aplicación rechaza al iniciar entradas incompletas, roles desconocidos y usernames duplicados.

### Campos personalizados de Jira

Estos IDs dependen del esquema de la instancia de Jira y aceptan el formato `customfield_<número>`:

| Variable | Campo esperado | Uso en el roadmap | Default actual |
| --- | --- | --- | --- |
| `ROADMAP_JIRA_FIELD_EFFORT_ESTIMATE` | Estimación de esfuerzo en MD | Calcula el esfuerzo pendiente de una tarea | `customfield_14230` |
| `ROADMAP_JIRA_FIELD_EPIC_LINK` | Clave de la épica relacionada | Agrupa tareas bajo su épica | `customfield_10830` |
| `ROADMAP_JIRA_FIELD_TARGET_START` | Target Start | Fecha Jira preferida cuando no hay planificación local | `customfield_12832` |
| `ROADMAP_JIRA_FIELD_FIRST_TIME_IN_PROGRESS` | Primera entrada a In Progress | Inicio alternativo para tareas actualmente In Progress | `customfield_13034` |

La consulta solicita los IDs configurados y la respuesta se interpreta con esos mismos IDs. Los cuatro deben ser distintos. Cambiarlos no requiere recompilar.

### Aliases de stack

Cada variable `ROADMAP_STACK_ALIASES_*` es una lista de labels Jira separados por comas. La comparación ignora mayúsculas, guiones, guiones bajos y espacios repetidos. Un alias no puede pertenecer a dos stacks diferentes. Labels reconocidos de stacks distintos producen `Stack ambiguo`, igual que antes.

## Docker Compose y OpenStack

En una VM con Docker y Docker Compose:

```bash
cp .env.example .env
# Editar .env y completar ROADMAP_JIRA_BASE_URL, ROADMAP_JIRA_TOKEN,
# ROADMAP_DB_USERNAME y ROADMAP_DB_PASSWORD.
docker compose up --build -d
docker compose logs -f roadmap
```

Compose construye el backend con Java 21, inicia PostgreSQL 16 en una red interna y conserva sus datos en el volumen `roadmap-postgres-data`. Solo publica el puerto del backend. Dentro de Compose, la aplicación usa `postgres:5432`; fuera de Compose conserva los defaults del túnel local `127.0.0.1:5433`.

El flujo de configuración es: `.env` de la VM, `compose.yml`, variables del contenedor, `application.properties`, Spring Boot. Para cambiar Jira, roster, aliases, puertos o timeouts no hace falta hacer `git pull` ni reconstruir la imagen. Modificá `.env` y recreá el contenedor con `docker compose up -d`.

## Pruebas y demo sin credenciales

```powershell
.\mvnw.cmd clean test
```

Las pruebas Java no compilan el frontend. Cubren calendario, conservación de esfuerzo, disponibilidad, asignación, lecturas por actualización, Jira simulado y persistencia con PostgreSQL temporal real. La primera ejecución descarga los binarios de PostgreSQL; no requiere Docker ni usa tu base.

Para la demo local y el E2E:

```powershell
.\mvnw.cmd test-compile -Pproduction dependency:build-classpath '-Dmdep.outputFile=target/test-classpath.txt'
.\.tools\run-demo.ps1
```

La demo escucha en `http://127.0.0.1:18083`, usa issues sintéticos fechados en septiembre de 2026 y una base temporal nueva. Sus controles de fallos viven en `src/test`, solo se exponen en la demo local y no se empaquetan en la aplicación. Al cerrarla se descarta la base.

```powershell
npm.cmd --prefix .tools ci
node .tools/e2e.cjs
```

El E2E inicia un Chrome headless propio. Guarda capturas y resultados en `.tools/evidence`. Las pruebas escriben exclusivamente sobre la demo local.

## Reglas de cálculo

- Una actualización toma una instantánea de tareas, hitos, planificación y ausencias. Las tres proyecciones reutilizan esos datos.
- 1 MD = 8 horas de esfuerzo; capacidad = 6 horas por día hábil disponible. Sábados, domingos y ausencias completas no aportan capacidad. No se modelan medios días ni feriados adicionales.
- Inicio: planificación local, luego el campo configurado por `ROADMAP_JIRA_FIELD_TARGET_START`, luego el campo configurado por `ROADMAP_JIRA_FIELD_FIRST_TIME_IN_PROGRESS` si está In Progress. El tooltip identifica el origen. Una tarea sin inicio queda en la bandeja pendiente y no entra en la capacidad.
- Sin fin local se estima una ventana de MD días hábiles. Es un supuesto de duración, no una garantía de dedicación al 100%: esfuerzo y capacidad usan 8 h y 6 h respectivamente. La bandeja permite revisar estas fechas.
- Esfuerzo normal: el campo configurado por `ROADMAP_JIRA_FIELD_EFFORT_ESTIMATE`, esfuerzo local, 3 MD. Las subtareas identificadas por parent usan esfuerzo local o 1 MD. Cero, negativos, NaN e infinito no son estimaciones válidas. Las fracciones positivas se redondean hacia arriba.
- Pendiente = máximo entre cero y estimación menos horas registradas. Una tarea abierta con la estimación agotada se registra en el diagnóstico interno; no se asume que esté terminada. El roadmap no muestra un bloque de advertencias.
- Epic y User Story son contexto y no consumen capacidad propia. El roster se carga desde `ROADMAP_TEAM_MEMBERS`. Estas convenciones deben coincidir con el uso del Jira del equipo.
- La nivelación mantiene las fechas. Si el reparto inicial sobrecarga un día, una asignación de flujo máximo busca alternativas factibles. El exceso inevitable se conserva dentro de la ventana; si no hay ningún día disponible, las horas quedan sin ubicación y se advierten.
- El plan semanal y el pendiente se acumulan por separado. Libre desde busca un día personal disponible con menos de 80% de carga pendiente y saldo semanal positivo. Solo cuenta horas desde esa fecha hasta el horizonte de ocho semanas. El trabajo sin fechas se muestra por separado. El esfuerzo vencido se conserva en el diagnóstico interno y no se suma a la capacidad futura.

## Migraciones

`V1__create_roadmap_tables.sql` crea las tablas, restricciones e índice sin seeds ni limpieza de datos. `V2__add_local_task_stack.sql` agrega el stack opcional de planificación y su restricción de valores. Flyway aplica ambas migraciones en orden y una base nueva arranca vacía.

## Alcance

Se mantiene un módulo, Vaadin Flow y JdbcTemplate. Quedan como decisiones opcionales el control de concurrencia, medios días, feriados, filtros y actualización en segundo plano. Multiempresa, roles avanzados y alta disponibilidad están fuera del alcance de esta POC.
