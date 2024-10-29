### Estructura de la Base de Datos

#### 1. **Proyectos (Projects)**

Esta tabla representa los proyectos que contienen diferentes tipos de contenido.

```sql
CREATE TABLE Projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. **Tipos de Contenido (ContentTypes)**

Esta tabla representa los diferentes tipos de contenido que un proyecto puede tener, como páginas de blog, productos, etc.

```sql
CREATE TABLE ContentTypes (
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES Projects(id) ON DELETE CASCADE,
    name VARCHAR(255),
    description TEXT,
    is_repeatable BOOLEAN DEFAULT TRUE, -- Define si el tipo es repetible o único
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. **Tipos de Campos (FieldTypes)**

Esta tabla contiene todos los posibles tipos de campos que pueden ser utilizados en los `Fields` y `ContentTypeFields`.

```sql
CREATE TABLE FieldTypes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
```

#### Poblar la Tabla `FieldTypes` con los Tipos de Campo.

```sql
INSERT INTO FieldTypes (name, description) VALUES
('UID', 'Unique Identifier'),
('Rich Text', 'A rich text field with formatting options'),
('Link', 'A link to web, media, or internal document'),
('Content Relationship', 'Define content relations & internal links'),
('Boolean', 'An input that is either true or false'),
('Timestamp', 'A calendar date picker with time'),
('Number', 'A number input field'),
('Color', 'A color picker'),
('Group', 'A group of fields'),
('Image', 'A responsive image field with constraints'),
('Link to media', 'A link to files, document, and media'),
('Select', 'A dropdown field of options for content creators'),
('Date', 'A calendar date picker'),
('Embed', 'Embed videos, songs, tweets, etc.'),
('GeoPoint', 'A field for storing geo-coordinates'),
('Key Text', 'A simple text string field');
```

#### 4. **Campos Personalizados en ContentTypes (ContentTypeFields)**

Estos son los campos que pueden estar directamente asociados a los `ContentTypes`.

```sql
CREATE TABLE ContentTypeFields (
    id SERIAL PRIMARY KEY,
    content_type_id INT REFERENCES ContentTypes(id) ON DELETE CASCADE,
    field_type_id INT REFERENCES FieldTypes(id) ON DELETE RESTRICT, -- Apunta a FieldTypes
    name VARCHAR(255),
    value TEXT, -- Almacena el valor del campo (texto, imagen, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. **Componentes (Components)**

Los `Components` estructuran el contenido de los `ContentTypes`.

```sql
CREATE TABLE Components (
    id SERIAL PRIMARY KEY,
    content_type_id INT REFERENCES ContentTypes(id) ON DELETE CASCADE,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. **Campos dentro de los Componentes (Fields)**

Los campos dentro de un `Component` pueden tener un tipo específico que referencia a `FieldTypes`.

```sql
CREATE TABLE Fields (
    id SERIAL PRIMARY KEY,
    component_id INT REFERENCES Components(id) ON DELETE CASCADE,
    name VARCHAR(255),
    field_type_id INT REFERENCES FieldTypes(id) ON DELETE RESTRICT, -- Apunta a FieldTypes
    field_data_type VARCHAR(50), -- Indica la tabla de datos (UID, Rich Text, etc.)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tablas Específicas para Tipos de Campo

#### 1. **UID (Unique Identifier)**:

```sql
CREATE TABLE FieldUID (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    uid VARCHAR(255) UNIQUE
);
```

#### 2. **Rich Text**:

```sql
CREATE TABLE FieldRichText (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    rich_text JSONB -- Almacena el texto enriquecido como un JSON
);
```

#### 3. **Link**:

```sql
CREATE TABLE FieldLink (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    url TEXT,
    document_reference TEXT -- En caso de que el enlace sea a otro documento
);
```

#### 4. **Boolean**:

```sql
CREATE TABLE FieldBoolean (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    value BOOLEAN
);
```

#### 5. **Image**:

```sql
CREATE TABLE FieldImage (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    url TEXT, -- URL de la imagen
    alt_text TEXT, -- Texto alternativo
    width INT,
    height INT
);
```

#### 6. **Key Text**:

Esta tabla almacena cadenas de texto simples.

```sql
CREATE TABLE FieldKeyText (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    key_text_value VARCHAR(255) -- Valor de texto
);
```

#### 7. **Content Relationship**:

Esta tabla almacena relaciones entre contenido, como referencias a otros documentos o enlaces internos.

```sql
CREATE TABLE FieldContentRelationship (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    related_content_id INT, -- ID del contenido relacionado
    related_content_type VARCHAR(255) -- Tipo de contenido relacionado (puede referirse a otro ContentType)
);
```

#### 8. **Timestamp**:

Esta tabla almacena valores de fecha y hora.

```sql
CREATE TABLE FieldTimestamp (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    timestamp_value TIMESTAMP -- Valor de la marca de tiempo
);
```

#### 9. **Number**:

Esta tabla almacena valores numéricos.

```sql
CREATE TABLE FieldNumber (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    number_value DECIMAL(10, 2) -- Valor numérico (puedes ajustar la precisión según las necesidades)
);
```

#### 10. **Color**:

Esta tabla almacena valores de color.

```sql
CREATE TABLE FieldColor (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    color_value VARCHAR(7) -- Almacena el color en formato hexadecimal (#RRGGBB)
);
```

#### 11. **Group**:

Esta tabla representa un grupo de campos, permitiendo agrupar múltiples tipos de campos.

```sql
CREATE TABLE FieldGroup (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    group_name VARCHAR(255) -- Nombre del grupo
);
```

#### 12. **Link to Media**:

Esta tabla es similar a `FieldLink`, pero específica para enlaces a archivos o medios.

```sql
CREATE TABLE FieldLinkToMedia (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    media_url TEXT, -- URL del archivo o medio
    media_type VARCHAR(50) -- Tipo de medio (imagen, video, etc.)
);
```

#### 13. **Select**:

Esta tabla representa un campo de selección, con opciones específicas.

```sql
CREATE TABLE FieldSelect (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    selected_option VARCHAR(255) -- Opción seleccionada
);
```

#### 14. **Date**:

Esta tabla almacena valores de fecha.

```sql
CREATE TABLE FieldDate (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    date_value DATE -- Valor de la fecha
);
```

#### 15. **Embed**:

Esta tabla almacena contenido embebido, como vídeos o tweets.

```sql
CREATE TABLE FieldEmbed (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    embed_url TEXT, -- URL del contenido embebido
    embed_type VARCHAR(50), -- Tipo de contenido embebido (video, tweet, etc.)
    embed_data JSONB -- Datos adicionales sobre el contenido embebido
);
```

#### 16. **GeoPoint**:

Esta tabla almacena coordenadas geográficas.

```sql
CREATE TABLE FieldGeoPoint (
    id SERIAL PRIMARY KEY,
    field_id INT REFERENCES Fields(id) ON DELETE CASCADE,
    latitude FLOAT, -- Latitud
    longitude FLOAT -- Longitud
);
```

---

### Ejemplo de Consultas para Insertar Datos

#### Crear un `ContentType`:

```sql
INSERT INTO ContentTypes (project_id, name, description, is_repeatable)
VALUES (1, 'Blog Post', 'Un tipo de contenido para posts del blog', TRUE);
```

#### Crear un `Field` en un Componente y añadir datos de tipo Rich Text:

```sql
-- Crear el campo dentro del Componente
INSERT INTO Fields (component_id, name, field_type_id, field_data_type)
VALUES (1, 'Rich Content', 2, 'FieldRichText');

-- Luego inserto los datos del rich text en la tabla correspondiente
INSERT INTO FieldRichText (field_id, rich_text)
VALUES (LASTVAL(), '{"type": "paragraph", "content": "Este es un ejemplo de texto enriquecido."}');
```

#### Insertar un Campo `Content Relationship`:

```sql
-- Insertar un campo de relación de contenido
INSERT INTO Fields (component_id, name, field_type_id, field_data_type)
VALUES (1, 'Related Content', 4, 'FieldContentRelationship');

-- Insertar datos en la tabla correspondiente
INSERT INTO FieldContentRelationship (field_id, related_content_id, related_content_type)
VALUES (LASTVAL(), 10, 'Blog Post');
```

---

### Relación Final de las Tablas

1. **Projects** es la entidad principal.
2. **ContentTypes** define los tipos de contenido que pueden ser repetibles o únicos.
3. **ContentTypeFields** permite que los `ContentTypes` tengan campos personalizados.
4. **Components** estructuran el contenido de un `ContentType`.
5. **Fields** representan campos dentro de un Componente.
6. **FieldTypes** define los tipos de campos posibles.
7. Las tablas específicas como `FieldRichText`, `FieldLink`, `FieldUID`, etc., almacenan los datos reales de los campos.

### Ventajas de esta Estructura

- **Flexibilidad**: Puedes añadir nuevos tipos de campos sin modificar demasiado la estructura.
- **Escalabilidad**: Cada tipo de campo tiene su propia tabla para almacenar su información.
- **Modularidad**: Los `Components` y `Fields` permiten una gran modularidad para construir páginas.
