# Team Roadmap

Aplicación de planificación que combina tareas de Jira, fechas planificadas localmente
y ausencias para mostrar el roadmap y la carga del equipo. La interfaz está en inglés.

## Guía para Tony: presentación y consulta rápida

Esta guía describe el comportamiento implementado al **20 de septiembre de 2026**.
La primera parte sirve para presentar el producto; al final se conservan las
instrucciones técnicas de configuración y despliegue.

### Qué resuelve

Permite responder qué trabajo está previsto, quién tiene capacidad y dónde hay
sobrecarga o información pendiente. Jira sigue siendo la fuente de tareas,
responsables, estados y horas registradas. La app guarda en PostgreSQL las fechas
locales, el stack, las estimaciones locales de subtareas y las ausencias.

**No escribe cambios en Jira ni es un reporte histórico de horas trabajadas.**
Tampoco cambia automáticamente responsables o fechas para resolver una sobrecarga.

### Recorrido sugerido para presentar en 10 minutos

1. **Roadmap** (`/`): mostrar las iniciativas y ventanas del Gantt. Explicar que
   una barra larga representa una ventana de fechas, no dedicación exclusiva.
2. **Team workload**: expandir un rol y una persona para explicar las horas por
   semana y las tareas que las componen. Mostrar también el gráfico de esfuerzo.
   Un promedio sano del rol puede esconder una persona sobrecargada.
3. **Plan tasks** (`/gantt/planning`): buscar un ID, seleccionar una tarea y
   mostrar Start, End y Local stack. Cambiar Show a Subtask para mostrar Local
   effort. Guardar mantiene los filtros de la vista; no persisten al recargar
   el navegador o salir de la pantalla.
4. **Team availability** (`/gantt/availability`): mostrar cómo una ausencia reduce
   la capacidad. Volver a Roadmap o usar Refresh roadmap para ver el recálculo.
5. **Needs attention** e **Information** (`/information`): cerrar mostrando dónde
   consultar datos faltantes y ejemplos de las reglas que siguen los cálculos.

### Reglas que conviene poder explicar

#### Esfuerzo y capacidad no son lo mismo

- **1 MD = 8 horas de esfuerzo.** MD es una unidad de estimación, no un día de calendario.
- La capacidad para planificar es **6 horas productivas por persona y día hábil**.
  Una semana de cinco días sin ausencias ofrece 30 h, no 40 h.
- Team workload muestra **8 semanas a partir del lunes de la semana actual**.
  Excluye fines de semana y ausencias registradas de los días disponibles.
- Las tareas normales usan **Original Estimate de Jira Time Tracking**. El
  custom field de MD y las estimaciones locales no reemplazan ese valor.
- Las subtareas usan **Local effort**, en MD. Su Original Estimate de Jira no se
  usa para estimarlas. Sin MD local positivo, aparecen en Needs attention y no
  agregan carga.
- El trabajo pendiente es el esfuerzo efectivo menos las horas registradas en
  Jira, con mínimo cero. Registrar horas no reduce la estimación original.

#### Padre y subtareas: solo esfuerzo propio de las subtareas

Si una tarea tiene subtareas, el padre queda excluido del Gantt, la carga y Plan
tasks. Su esfuerzo no se reparte ni se cuenta como un saldo adicional.

- Padre de 10 MD, subtarea A de 3 MD locales y B/C sin estimación: se cuentan
  **3 MD**. B y C aparecen en Needs attention hasta que se cargue su MD local.
- Subtareas de 3 y 4 MD: total **7 MD**, sin esfuerzo residual del padre.
- Subtareas de 8 y 5 MD: total **13 MD**, sin comparación con el presupuesto padre.
- Tarea sin subtareas: conserva su propio Original Estimate de Jira Time Tracking.

El padre sigue excluido si sus subtareas están cerradas, no tienen fechas o
estimación, o pertenecen a personas fuera del equipo. Se consulta el campo
estándar subtasks de Jira además de los vínculos parent de las subtareas cargadas.
Las subtareas cerradas no aportan carga futura. Los worklogs de cada subtarea
reducen solo su propio esfuerzo pendiente. Epics y User Stories conservan su
tratamiento como contexto.

#### Distribución de horas: considera las otras tareas de la persona

No reparte cada tarea por igual sin mirar el resto. Prioriza las ventanas con menos
margen y distribuye horas en los días con menor carga. Si aparece una sobrecarga,
intenta redistribuir las asignaciones dentro de las ventanas permitidas para
encontrar un encaje con la capacidad disponible.

Ejemplo con la misma persona, semanas completas, sin ausencias:

- A requiere 30 h y puede hacerse en las semanas 1 y 2.
- B requiere 30 h y solo puede hacerse en la semana 2.
- Resultado: **A ocupa 30 h en la semana 1; B ocupa 30 h en la semana 2**.

Busca equilibrar la carga, no terminar todo lo antes posible. Con A de 20 h y B
de 10 h en esas mismas ventanas, asigna 15 h de A en la primera semana y 5 h de A
más 10 h de B en la segunda. Si el trabajo no cabe, mantiene visible la sobrecarga:
no mueve fechas, no reasigna personas ni inventa capacidad. Es una distribución
de horas divisibles, no una garantía de ejecución que modele dependencias entre tareas.

#### Cómo leer porcentajes, colores y disponibilidad

- Utilización semanal = horas planificadas / capacidad semanal × 100.
  Por ejemplo, 25 h / 30 h = 83,3% (la interfaz redondea el porcentaje).
- Con cinco días disponibles: verde hasta 30 h inclusive; amarillo por encima
  de 30 h y hasta 40 h inclusive; rojo por encima de 40 h.
- Los límites se ajustan a los días disponibles: con tres días son 18 h y 24 h.
  El umbral rojo **no aumenta la capacidad planificable de 6 h diarias**.
- El porcentaje describe la semana completa. Las horas libres consideran solo
  hoy y los días futuros, descontando el trabajo pendiente. Hoy cuenta como un
  día completo; las horas no usadas de días pasados no se recuperan.
- Ejemplo al miércoles: quedan 18 h de capacidad de miércoles a viernes y 12 h
  pendientes; hay 6 h libres. La carga planificada de toda la semana puede ser distinta.
- **Free from** identifica el primer día disponible con menos de 80% de carga
  pendiente, dentro de una semana con capacidad libre. Es una regla distinta
  del semáforo. El total disponible por persona empieza en esa fecha y termina
  al cerrar el horizonte de ocho semanas.

#### Fechas y límites importantes

- Start local prevalece sobre Jira Target Start. First Time In Progress solo
  sirve como alternativa si la tarea está actualmente In Progress.
- Sin inicio, una tarea va a Needs attention y no entra en la carga fechada.
  Con inicio pero sin End local se calcula una ventana provisional a partir
  del esfuerzo y los días disponibles; sigue faltando confirmar la fecha final.
- Una subtarea sin fechas puede reservar presupuesto del padre aunque todavía
  no aparezca en la carga por semana. Revisar Needs attention antes de comprometer trabajo.
- Done, Cancelled, Resolved, Closed y Obsolete no agregan carga futura; las
  subtareas finalizadas pueden seguir consumiendo presupuesto del padre.
  Blocked no es un estado final.
- Si toda la ventana ya pasó o no contiene días disponibles, la app no traslada
  automáticamente el trabajo pendiente al futuro: hay que revisar las fechas.
- No sumar a mano las estimaciones del Gantt para obtener capacidad: el workload
  aplica el descuento padre/subtareas y el Gantt conserva las ventanas y estimaciones.
- El alcance es el equipo configurado: tareas sin responsable o asignadas fuera
  de ese equipo no se cuentan. By role agrupa el Gantt por stack efectivo; Team
  workload agrupa personas por el rol del equipo, que no cambia al editar un stack.
- Los filtros de Needs attention solo afectan sus listas, no los totales de carga.
  El histograma usa las mismas horas semanales que Team workload, pero cada persona
  tiene su propia escala: comparar valores, no alturas entre gráficos de personas distintas.

## Referencia técnica breve

Java 21, Spring Boot 3.5.5, Vaadin 24.9.5, PostgreSQL y migraciones Flyway.
La UI y los cálculos viven en el mismo proyecto; no hay que iniciar un frontend separado.

- [JiraGanttDataProvider](src/main/java/com/example/roadmap/gantt/application/data/JiraGanttDataProvider.java): combina Jira, planificación local y ausencias.
- [EffortEstimates](src/main/java/com/example/roadmap/gantt/application/model/EffortEstimates.java) y [TaskHierarchy](src/main/java/com/example/roadmap/gantt/application/model/TaskHierarchy.java): origen del esfuerzo y exclusión de tareas con subtareas.
- [LevelledContour](src/main/java/com/example/roadmap/gantt/application/model/LevelledContour.java) y [CapacityAllocation](src/main/java/com/example/roadmap/gantt/application/model/CapacityAllocation.java): distribución por persona y encaje de horas dentro de fechas.
- [BuildWorkloadReportUseCase](src/main/java/com/example/roadmap/gantt/application/analytics/BuildWorkloadReportUseCase.java): carga semanal, capacidad y disponibilidad.
- [InformationView](src/main/java/com/example/roadmap/gantt/ui/InformationView.java): ayuda dentro de la app.

`./mvnw test` ejecuta las pruebas Java (`.\mvnw.cmd test` en Windows).
`./mvnw -Pproduction package` ejecuta pruebas y empaqueta también el frontend de producción.

## Configuración y despliegue con Jira real

Las instrucciones siguientes permiten conectar la aplicación con Jira y PostgreSQL.

## Prerequisites

- Docker Engine with the Docker Compose plugin (recommended), or Java 21+
- Jira Personal Access Token with read access to the configured project
- PostgreSQL credentials

## First run with Docker Compose

1. Create the ignored runtime file and restrict its permissions:

   ```bash
   cp .env.example .env
   chmod 600 .env
   ```

2. Set these required values in `.env`:

   ```dotenv
   ROADMAP_JIRA_BASE_URL=https://your-jira.example.com
   ROADMAP_JIRA_TOKEN=your_personal_access_token
   ROADMAP_DB_USERNAME=roadmap_user
   ROADMAP_DB_PASSWORD=a-long-random-postgresql-password
   ```

   Review the five `ROADMAP_JIRA_FIELD_*` IDs, `ROADMAP_TEAM_MEMBERS`, and
   `ROADMAP_STACK_ALIASES_*` values as well. They contain instance-specific
   defaults and define the data rendered by the application.

3. Build and start the application and its private PostgreSQL container:

   ```bash
   docker compose up --build -d
   docker compose logs -f roadmap
   ```

   Open `http://localhost:8082`. Flyway initializes an empty database using the
   migrations in `src/main/resources/db/migration` on the first start.

   The database is intentionally not published to the host. Compose overrides
   `ROADMAP_DB_HOST` and `ROADMAP_DB_PORT` to use the internal `postgres:5432`
   service. Leave `ROADMAP_DB_URL` unset when using that database: a full JDBC URL
   takes precedence over the host and port settings.

Stop the stack with `docker compose down`. This preserves PostgreSQL data.
Use `docker compose down -v` only when intentionally deleting all roadmap data
and Flyway history.

## Run locally against PostgreSQL on the VM

Export the values below in the terminal that starts the application:

```bash
export ROADMAP_JIRA_BASE_URL=https://your-jira.example.com
export ROADMAP_JIRA_TOKEN=your_personal_access_token
export ROADMAP_DB_HOST=127.0.0.1
export ROADMAP_DB_PORT=5433
export ROADMAP_DB_NAME=roadmap
export ROADMAP_DB_USERNAME=roadmap_user
read -rsp "PostgreSQL password: " ROADMAP_DB_PASSWORD; export ROADMAP_DB_PASSWORD; echo
```

Keep this SSH tunnel open in a separate terminal:

```bash
ssh -N -L 127.0.0.1:5433:127.0.0.1:5432 -i ~/.ssh/example_key \
  user@database.example.com
```

Then run:

```bash
./mvnw spring-boot:run
```

The application is available at `http://localhost:8082` by default. Flyway
creates and migrates an empty schema automatically.

## Runtime configuration

| Environment variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `ROADMAP_JIRA_BASE_URL` | Yes | None | Base URL of the Jira instance |
| `ROADMAP_JIRA_TOKEN` | Yes | None | Jira PAT sent as a Bearer token |
| `ROADMAP_JIRA_PROJECT` | Yes | - | Jira project containing the roadmap |
| `ROADMAP_JIRA_CONNECT_TIMEOUT` | No | `10s` | Jira connection timeout |
| `ROADMAP_JIRA_READ_TIMEOUT` | No | `30s` | Jira response timeout |
| `ROADMAP_JIRA_FIELD_EFFORT_ESTIMATE` | No | `customfield_10001` | Legacy field still requested from Jira; not used as the task estimate source (tasks use Time Tracking Original Estimate) |
| `ROADMAP_JIRA_FIELD_EPIC_LINK` | No | `customfield_10002` | Jira field containing the epic link |
| `ROADMAP_JIRA_FIELD_PARENT_MILESTONE` | No | `customfield_10003` | Jira field containing a parent milestone |
| `ROADMAP_JIRA_FIELD_TARGET_START` | No | `customfield_10004` | Jira field containing target start |
| `ROADMAP_JIRA_FIELD_FIRST_TIME_IN_PROGRESS` | No | `customfield_10005` | Jira field containing first in-progress date |
| `ROADMAP_SERVER_PORT` | No | `8082` | HTTP server port |
| `ROADMAP_VAADIN_LAUNCH_BROWSER` | No | `false` | Opens the browser when `true` |
| `ROADMAP_DB_PASSWORD` | Yes | None | PostgreSQL password |
| `ROADMAP_DB_URL` | No | Derived from host, port, and name | Full JDBC connection URL |
| `ROADMAP_DB_HOST` | No | `127.0.0.1` | PostgreSQL host when no JDBC URL is set |
| `ROADMAP_DB_PORT` | No | `5433` | PostgreSQL port when no JDBC URL is set |
| `ROADMAP_DB_NAME` | No | `roadmap` | PostgreSQL database name |
| `ROADMAP_DB_USERNAME` | Yes | None | PostgreSQL user |
| `ROADMAP_DB_POOL_SIZE` | No | `5` | Maximum JDBC connections |
| `ROADMAP_LOG_LEVEL` | No | `INFO` | Application log level |
| `ROADMAP_TEAM_MEMBERS` | No | Example roster | `username\|display name\|role` entries separated by commas |
| `ROADMAP_STACK_ALIASES_FRONTEND` | No | Built-in aliases | Comma-separated Jira labels |
| `ROADMAP_STACK_ALIASES_BACKEND` | No | Built-in aliases | Comma-separated Jira labels |
| `ROADMAP_STACK_ALIASES_MOBILE` | No | Built-in aliases | Comma-separated Jira labels |
| `ROADMAP_STACK_ALIASES_DEVOPS` | No | Built-in aliases | Comma-separated Jira labels |

Never commit Jira or database credentials. Schedules and absences are stored in
PostgreSQL.

## Deploy on an OpenStack VM

This deployment model runs the Compose stack on an OpenStack VM and does not
expose PostgreSQL outside the container network.

1. Create an Ubuntu 24.04 (or equivalent) VM with at least 2 vCPU, 4 GB RAM,
   and persistent volume capacity for the image and PostgreSQL data. Associate
   a floating IP only if external access is required.
2. Install Docker Engine and the Docker Compose plugin on the VM. In the
   OpenStack security group, allow TCP 22 only from administration networks and
   TCP 8082 only from the intended users or reverse proxy. Do not open TCP 5432.
   The image build needs outbound HTTPS access to Maven Central and `nodejs.org`.
3. Transfer the project without `.env`, then create `/opt/roadmap/.env`
   directly on the VM from `.env.example`. Populate the required production
   values, use a unique strong database password, and set `chmod 600 .env`.
4. In `/opt/roadmap`, start it with:

   ```bash
   docker compose up --build -d
   docker compose ps
   docker compose logs --tail=200 roadmap
   ```

5. For a public endpoint, put a TLS-terminating reverse proxy in front of port
   8082 and configure its allowed origin and host settings before exposing it.
   Back up the `roadmap-postgres-data` Docker volume before upgrades or any
   `down -v` operation.
