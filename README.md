# Roadmap AR1

POC interna con Spring Boot, Vaadin y PostgreSQL. Lee issues de Jira y guarda localmente las fechas y las ausencias. No escribe en Jira.

## Requisitos y arranque

- JDK 21, con `JAVA_HOME` configurado.
- Maven 3.9 o el wrapper `mvnw.cmd` en Windows / `./mvnw` en Linux.
- PostgreSQL y acceso a Jira. El puerto de base predeterminado es 5433, para el túnel SSH del equipo.

Variables de entorno: `JIRA_BASE_URL`, `JIRA_TOKEN` y `DB_PASSWORD` son obligatorias. Opcionales: `JIRA_PROJECT` (TTAR), `DB_URL`, `DB_HOST` (127.0.0.1), `DB_PORT` (5433), `DB_USER` (bruno), `DB_POOL_SIZE` (5), `SERVER_PORT` (8082). No guardar secretos en el repositorio.

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
- Inicio: planificación local, luego Target Start de Jira (`customfield_12832`), luego First Time In Progress (`customfield_13034`) si está In Progress. El tooltip identifica el origen. Una tarea sin inicio queda en la bandeja pendiente y no entra en la capacidad.
- Sin fin local se estima una ventana de MD días hábiles. Es un supuesto de duración, no una garantía de dedicación al 100%: esfuerzo y capacidad usan 8 h y 6 h respectivamente. La bandeja permite revisar estas fechas.
- Esfuerzo normal: Jira (`customfield_14230`), esfuerzo local, 3 MD. Las subtareas identificadas por parent usan esfuerzo local o 1 MD. Cero, negativos, NaN e infinito no son estimaciones válidas. Las fracciones positivas se redondean hacia arriba.
- Pendiente = máximo entre cero y estimación menos horas registradas. Una tarea abierta con la estimación agotada se registra en el diagnóstico interno; no se asume que esté terminada. El roadmap no muestra un bloque de advertencias.
- Epic y User Story son contexto y no consumen capacidad propia. El roster está en `GanttTeamRoster`. Estas convenciones deben coincidir con el uso del Jira del equipo.
- La nivelación mantiene las fechas. Si el reparto inicial sobrecarga un día, una asignación de flujo máximo busca alternativas factibles. El exceso inevitable se conserva dentro de la ventana; si no hay ningún día disponible, las horas quedan sin ubicación y se advierten.
- El plan semanal y el pendiente se acumulan por separado. Libre desde busca un día personal disponible con menos de 80% de carga pendiente y saldo semanal positivo. Solo cuenta horas desde esa fecha hasta el horizonte de ocho semanas. El trabajo sin fechas se muestra por separado. El esfuerzo vencido se conserva en el diagnóstico interno y no se suma a la capacidad futura.

## Migraciones

Solo se conserva `V1__create_roadmap_tables.sql`, sin seeds ni limpieza de datos. V1 crea `roadmap_schedule`, `team_absence`, restricciones e índice. Usá un build limpio para eliminar copias antiguas de V2/V3 en `target`.

Una base nueva arranca vacía. Si una base existente ya registró V2/V3 en `flyway_schema_history`, la validación puede detectar migraciones faltantes. Revisá ese historial y preservá una copia de la base antes de adoptar esta línea inicial. No ejecutar TRUNCATE, clean, repair ni editar el historial automáticamente. Este cambio no modifica bases existentes ni recupera datos eliminados anteriormente.

## Alcance

Se mantiene un módulo, Vaadin Flow y JdbcTemplate. Quedan como decisiones opcionales el control de concurrencia, medios días, feriados, filtros y actualización en segundo plano. Multiempresa, roles avanzados y alta disponibilidad están fuera del alcance de esta POC.
