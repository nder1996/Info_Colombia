# Usar una imagen base de Java
FROM openjdk:17-jdk-slim-bullseye

# Establecer directorio de trabajo
WORKDIR /app

# Copiar el archivo WAR compilado
COPY target/*.war app.war

# Exponer el puerto
EXPOSE 8700

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/app.war"]
