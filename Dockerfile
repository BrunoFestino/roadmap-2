FROM eclipse-temurin:21-jdk-jammy AS build

WORKDIR /workspace
COPY . .
RUN chmod +x mvnw && ./mvnw -B -Pproduction clean package -DskipTests

FROM eclipse-temurin:21-jre-jammy

RUN groupadd --system roadmap && useradd --system --gid roadmap --home-dir /app roadmap
WORKDIR /app
COPY --from=build --chown=roadmap:roadmap /workspace/target/roadmap-*.jar /app/roadmap.jar

USER roadmap
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/roadmap.jar"]
