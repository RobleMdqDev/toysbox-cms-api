# CMS API con NestJS y TypeORM

Este proyecto implementa una API para un CMS (Content Management System) utilizando NestJS y TypeORM. El sistema permite gestionar proyectos, tipos de contenido, componentes y campos personalizados.

## Configuración del Entorno

### Base de Datos PostgreSQL con Docker

El proyecto utiliza PostgreSQL como base de datos. Para desarrollo local, se proporciona una configuración de Docker Compose:

1. **Requisitos previos:**
   - Docker y Docker Compose instalados en tu sistema

2. **Configuración:**
   - El archivo `docker-compose.yml` incluye:
     - PostgreSQL 16
     - Puerto: 5432
     - Usuario: postgres
     - Contraseña: postgres
     - Base de datos: cms_db
     - Volumen persistente para los datos

3. **Comandos útiles:**
   ```bash
   # Iniciar la base de datos
   docker-compose up -d

   # Detener la base de datos
   docker-compose down

   # Ver logs
   docker-compose logs postgres

   # Conectarse a la base de datos
   docker exec -it cms_postgres psql -U postgres -d cms_db
   ```

4. **Comandos PostgreSQL útiles:**
   - `\l`: Listar bases de datos
   - `\c cms_db`: Conectar a la base de datos
   - `\dt`: Listar tablas
   - `\q`: Salir

### Variables de Entorno

El proyecto utiliza variables de entorno para la configuración de la base de datos. Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=cms_db
```

## Documentación API (Swagger)

La API está documentada usando Swagger. Para acceder a la documentación interactiva:

1. Inicia el servidor: `npm run dev`
2. Abre en tu navegador: `http://localhost:3000/api`

La documentación incluye:
- Descripción detallada de todos los endpoints
- Esquemas de datos
- Ejemplos de peticiones y respuestas
- Interfaz interactiva para probar los endpoints

## Estructura del Proyecto

### Módulos Principales

1. **Projects**: Gestiona los proyectos que contienen diferentes tipos de contenido
2. **ContentTypes**: Maneja los tipos de contenido que pueden ser repetibles o únicos
3. **Components**: Administra los componentes que estructuran el contenido
4. **Fields**: Gestiona los diferentes tipos de campos y sus valores

### Entidades Principales

#### Project
- `id`: Identificador único
- `name`: Nombre del proyecto
- `description`: Descripción del proyecto
- `created_at`: Fecha de creación
- Relación: One-to-Many con ContentTypes

#### ContentType
- `id`: Identificador único
- `name`: Nombre del tipo de contenido
- `description`: Descripción
- `is_repeatable`: Indica si el tipo es repetible
- `created_at`: Fecha de creación
- Relaciones:
  - Many-to-One con Project
  - One-to-Many con Components
  - One-to-Many con ContentTypeFields

#### Component
- `id`: Identificador único
- `name`: Nombre del componente
- `description`: Descripción
- `created_at`: Fecha de creación
- Relaciones:
  - Many-to-One con ContentType
  - One-to-Many con Fields

#### Field
- `id`: Identificador único
- `name`: Nombre del campo
- `field_data_type`: Tipo de dato del campo
- `created_at`: Fecha de creación
- Relaciones:
  - Many-to-One con Component
  - Many-to-One con FieldType

### Tipos de Campos Implementados

1. **UID**: Identificador único
2. **RichText**: Texto enriquecido con formato
3. **Link**: Enlaces a web o documentos
4. **Boolean**: Valores verdadero/falso
5. **Timestamp**: Fecha y hora
6. **Number**: Valores numéricos
7. **Color**: Valores de color
8. **Image**: Imágenes con metadatos
9. **MediaLink**: Enlaces a archivos multimedia
10. **Select**: Opciones de selección
11. **Date**: Fechas
12. **Embed**: Contenido embebido
13. **GeoPoint**: Coordenadas geográficas
14. **KeyText**: Texto simple

## Endpoints API

### Projects
- `GET /projects`: Obtener todos los proyectos
- `GET /projects/:id`: Obtener un proyecto específico
- `POST /projects`: Crear un nuevo proyecto
- `PUT /projects/:id`: Actualizar un proyecto
- `DELETE /projects/:id`: Eliminar un proyecto

### Content Types
- `GET /content-types`: Obtener todos los tipos de contenido
- `GET /content-types/:id`: Obtener un tipo de contenido específico
- `POST /content-types`: Crear un nuevo tipo de contenido
- `PUT /content-types/:id`: Actualizar un tipo de contenido
- `DELETE /content-types/:id`: Eliminar un tipo de contenido

### Components
- `GET /components`: Obtener todos los componentes
- `GET /components/:id`: Obtener un componente específico
- `POST /components`: Crear un nuevo componente
- `PUT /components/:id`: Actualizar un componente
- `DELETE /components/:id`: Eliminar un componente

### Fields
- `GET /fields`: Obtener todos los campos
- `GET /fields/:id`: Obtener un campo específico
- `POST /fields`: Crear un nuevo campo
- `PUT /fields/:id`: Actualizar un campo
- `DELETE /fields/:id`: Eliminar un campo

## Características Implementadas

1. **Relaciones Complejas**: Sistema completo de relaciones entre entidades
2. **Tipos de Campos Especializados**: Implementación de múltiples tipos de campos con sus propias estructuras
3. **Validación de Datos**: Cada tipo de campo tiene su propia validación
4. **Gestión de Contenido Flexible**: Permite crear estructuras de contenido personalizadas
5. **Sistema Modular**: Arquitectura modular para fácil extensión
6. **Documentación API**: Swagger UI integrado para documentación interactiva

## Tecnologías Utilizadas

- NestJS: Framework backend
- TypeORM: ORM para base de datos
- PostgreSQL: Base de datos
- TypeScript: Lenguaje de programación
- Docker: Contenedorización para desarrollo
- Swagger: Documentación de API