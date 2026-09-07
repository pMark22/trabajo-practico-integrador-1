# Sistema de Gestión de Blog Personal

API REST desarrollada con Node.js y Express para la gestión de un blog personal. El sistema permite registrar y autenticar usuarios, administrar perfiles, crear y gestionar artículos, administrar etiquetas y asociarlas a los artículos.

## Tecnologías utilizadas

- Node.js
- Express
- Sequelize
- MySQL
- JSON Web Token (JWT)
- bcrypt
- express-validator
- CORS
- dotenv
- cookie-parser
- ESModules

## Estructura del proyecto

    trabajo-practico-integrador-1/
    │
    ├── src/
    │   ├── config/
    │   │   └── database.js
    │   │
    │   ├── controllers/
    │   │   ├── article.controller.js
    │   │   ├── articleTag.controller.js
    │   │   ├── auth.controller.js
    │   │   ├── profile.controller.js
    │   │   ├── tag.controller.js
    │   │   └── user.controller.js
    │   │
    │   ├── helpers/
    │   │   ├── bcript.helper.js
    │   │   └── jwt.helper.js
    │   │
    │   ├── middlewares/
    │   │   ├── admin.middleware.js
    │   │   ├── auth.middleware.js
    │   │   ├── owner.middleware.js
    │   │   ├── validate.js
    │   │   └── validations/
    │   │       ├── article.validation.js
    │   │       ├── articleTag.validation.js
    │   │       ├── profile.validation.js
    │   │       ├── tag.validation.js
    │   │       └── user.validation.js
    │   │
    │   ├── models/
    │   │   ├── article.model.js
    │   │   ├── articleTag.model.js
    │   │   ├── profile.model.js
    │   │   ├── tag.model.js
    │   │   └── user.model.js
    │   │
    │   └── routes/
    │       ├── article.routes.js
    │       ├── articleTag.routes.js
    │       ├── auth.routes.js
    │       ├── profile.routes.js
    │       ├── tag.routes.js
    │       └── user.routes.js
    │
    ├── .env
    ├── .gitignore
    ├── app.js
    ├── package.json
    └── README.md

## Configuración

### 1. Clonar el repositorio

    git clone URL_DEL_REPOSITORIO

### 2. Instalar dependencias

    npm install

### 3. Configurar las variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=blog

    JWT_SECRET=tu_clave_secreta

    PORT=3000

Los valores de la base de datos deben adaptarse a la configuración local de MySQL.

### 4. Crear la base de datos

En MySQL crear la base de datos:

    CREATE DATABASE blog;

Las tablas son creadas y sincronizadas mediante Sequelize al iniciar la aplicación.

### 5. Ejecutar el servidor

    node app.js

El servidor se ejecutará en:

    http://localhost:3000

## Autenticación

La autenticación utiliza JSON Web Token (JWT).

Al iniciar sesión correctamente, el token se almacena en una cookie `httpOnly`.

El sistema cuenta con dos roles:

- `user`
- `admin`

Los administradores poseen permisos adicionales para gestionar usuarios y etiquetas, además de poder modificar artículos de otros usuarios.

## Funcionalidades

### Usuarios

- Registrar usuarios.
- Consultar usuarios.
- Consultar un usuario por ID.
- Crear usuarios.
- Actualizar usuarios.
- Eliminar usuarios mediante borrado lógico.
- Asignar roles.
- Validar username, email y contraseña.
- Evitar usernames y emails duplicados.

### Perfiles

- Creación automática del perfil durante el registro.
- Consultar el perfil del usuario autenticado.
- Actualizar nombre y apellido.
- Actualizar biografía.
- Actualizar avatar.
- Actualizar fecha de nacimiento.
- Validar los datos del perfil.

### Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Cierre de sesión.
- Generación de JWT.
- Verificación de JWT.
- Hash de contraseñas mediante bcrypt.
- Uso de cookies `httpOnly`.
- Protección de rutas privadas.

### Artículos

- Crear artículos.
- Consultar artículos publicados.
- Consultar un artículo por ID.
- Consultar artículos de un usuario.
- Consultar un artículo específico de un usuario.
- Actualizar artículos.
- Eliminar artículos mediante borrado lógico.
- Control de propietario.
- Los usuarios solo pueden modificar sus propios artículos.
- Los administradores pueden modificar artículos de cualquier usuario.

### Etiquetas

- Crear etiquetas.
- Consultar etiquetas.
- Consultar una etiqueta por ID.
- Actualizar etiquetas.
- Eliminar etiquetas.
- Evitar etiquetas duplicadas.
- Validar nombres de etiquetas.

### Relación Artículo-Etiqueta

- Asociar una etiqueta a un artículo.
- Eliminar una asociación entre artículo y etiqueta.
- Verificar la existencia del artículo.
- Verificar la existencia de la etiqueta.
- Evitar asociaciones duplicadas.
- Permitir la gestión de asociaciones únicamente al autor del artículo o a un administrador.

## Endpoints principales

### Autenticación

    POST /api/auth/register
    POST /api/auth/login
    GET  /api/auth/profile
    PUT  /api/auth/profile
    POST /api/auth/logout

### Usuarios

    GET    /api/users
    GET    /api/users/:id
    POST   /api/users
    PUT    /api/users/:id
    DELETE /api/users/:id

### Artículos

    POST   /api/articles
    GET    /api/articles
    GET    /api/articles/:id
    GET    /api/articles/user/:userId
    GET    /api/articles/user/:userId/:id
    PUT    /api/articles/:id
    DELETE /api/articles/:id

### Etiquetas

    POST   /api/tags
    GET    /api/tags
    GET    /api/tags/:id
    PUT    /api/tags/:id
    DELETE /api/tags/:id

### Artículos y etiquetas

    POST   /api/articles-tags
    DELETE /api/articles-tags/:articleTagId

## Validaciones

El proyecto utiliza `express-validator` para validar los datos recibidos por los endpoints.

Entre las validaciones implementadas se encuentran:

- IDs enteros.
- Username entre 3 y 20 caracteres.
- Username únicamente alfanumérico.
- Email válido.
- Contraseña de mínimo 8 caracteres.
- Contraseña con al menos una letra mayúscula.
- Contraseña con al menos una letra minúscula.
- Contraseña con al menos un número.
- Nombres y apellidos entre 2 y 50 caracteres.
- Biografía de hasta 500 caracteres.
- Avatar mediante URL válida.
- Títulos de artículos entre 3 y 200 caracteres.
- Contenido de artículos de al menos 50 caracteres.
- Excerpt de hasta 500 caracteres.
- Estados de artículo `published` o `archived`.
- Nombres de etiquetas entre 2 y 30 caracteres y sin espacios.
- Verificación de existencia de registros antes de modificarlos o eliminarlos.
- Verificación de unicidad de usernames, emails y etiquetas.

## Códigos HTTP utilizados

- `200 OK` — Consulta, actualización o eliminación realizada correctamente.
- `201 Created` — Recurso creado correctamente.
- `400 Bad Request` — Error de validación o datos incorrectos.
- `401 Unauthorized` — Usuario no autenticado o token inválido.
- `403 Forbidden` — Usuario autenticado pero sin permisos suficientes.
- `404 Not Found` — Recurso no encontrado.
- `500 Internal Server Error` — Error inesperado del servidor.

## Modelos y relaciones

El sistema cuenta con los siguientes modelos:

- User
- Profile
- Article
- Tag
- ArticleTag

Relaciones principales:

    User 1 ─── 1 Profile
    User 1 ─── N Article
    Article N ─── N Tag

La relación entre `Article` y `Tag` se implementa mediante el modelo intermedio `ArticleTag`.

Se utilizan relaciones con eliminación en cascada para mantener la integridad de las asociaciones.

El modelo `User` utiliza borrado lógico mediante Sequelize (`paranoid`).

El modelo `Article` también utiliza borrado lógico.

## Seguridad

- Contraseñas protegidas mediante bcrypt.
- Autenticación mediante JWT.
- Tokens almacenados en cookies `httpOnly`.
- Middleware de autenticación.
- Middleware de autorización para administradores.
- Middleware de control de propietario.
- Validación de datos de entrada.
- Protección de rutas privadas.
- Control de permisos según el rol del usuario.

## Control de versiones

El desarrollo se organizó mediante ramas de Git:

    main
    └── develop
        └── proyecto-integrador

La rama `proyecto-integrador` fue utilizada para desarrollar las funcionalidades del trabajo práctico.

Una vez finalizado el desarrollo, los cambios fueron integrados mediante:

    proyecto-integrador → develop → main

## Autor

Trabajo Práctico Integrador 1

Sistema de Gestión de Blog Personal