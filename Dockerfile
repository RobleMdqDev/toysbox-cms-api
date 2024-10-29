FROM node:lts-alpine

# Establece el entorno a producción
ENV NODE_ENV=production

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Instala las dependencias y el CLI de Nest de forma global
RUN npm install -g @nestjs/cli && \
    npm install --production --silent && \
    mv node_modules ../

# Crea el directorio swagger y asigna permisos
RUN mkdir -p /usr/src/app/swagger && chmod -R 777 /usr/src/app/swagger

# Cambiar permisos al archivo después de crear el directorio swagger
RUN chmod -R 777 /usr/src/app/swagger

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto donde la aplicación estará corriendo
EXPOSE 5000

# Cambia el propietario de la carpeta de trabajo
RUN chown -R node /usr/src/app

# Cambia al usuario "node" (sin privilegios de root)
USER node

# Comando para iniciar el servidor
CMD ["npm", "start"]
