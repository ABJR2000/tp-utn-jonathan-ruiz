🚀 Proyecto CRUD MongoDB: API RESTful Modular

🎯 Descripción del Proyecto

Este proyecto es una API RESTful desarrollada con Node.js, Express y Mongoose que implementa las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las entidades Productos y Categorías.

La arquitectura sigue el patrón de separación de responsabilidades, con una Capa de Servicios que maneja la lógica de negocio y las interacciones directas con MongoDB, manteniendo los Controladores ligeros y centrados en la gestión HTTP.

También incluye un sistema de autenticación básico para la entidad Usuarios utilizando bcrypt para el hasheo de contraseñas y JSON Web Tokens (JWT) para proteger las rutas sensibles (POST, PUT, DELETE).

🛠️ Tecnologías Utilizadas

Categoría

Tecnología

Uso Principal

Lenguaje

Node.js

Entorno de ejecución de JavaScript

Framework

Express.js

Servidor web y enrutamiento

Base de Datos

MongoDB

Base de datos NoSQL

ORM/ODM

Mongoose

Modelado de datos y gestión de MongoDB

Seguridad

bcryptjs

Encriptación de contraseñas (Hashing)

Autenticación

jsonwebtoken

Generación y verificación de Tokens JWT

Configuración

dotenv

Gestión de variables de entorno

Utilidades

cors

Habilitar peticiones de Orígenes Cruzados

💾 Esquema de la Base de Datos

Entidad

Campo

Tipo

Requisitos

Relación

User

name

String

Requerido

-



email

String

Requerido, Único

-



` password**

String

Requerido, Hasheado

-



` stock**

Number

Requerido, Mín 0

-

🚀 Instrucciones para Correr el Proyecto

1. Clonar el Repositorio

git clone [https://github.com/ABJR2000/tp-utn-jonathan-ruiz.git](https://github.com/ABJR2000/tp-utn-jonathan-ruiz.git)
cd backend


2. Instalar Dependencias

npm install


3. Configurar Variables de Entorno

Crea un archivo llamado .env en la raíz del proyecto y copia el contenido de .env.example, reemplazando los placeholders con tus credenciales.

📝 Nota: Asegúrate de no subir este archivo .env a tu repositorio.

# Ejemplo de .env
MONGO_URI=mongodb+srv://user:pass@cluster/database?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=1d


4. Ejecutar el Servidor

Modo Desarrollo (con nodemon):

npm run dev


Modo Producción:

npm start


El servidor estará corriendo en http://localhost:<PORT>.

🌐 Endpoints Disponibles (Rutas)

Todas las rutas están prefijadas con /api. Las rutas marcadas con 🔒 requieren el header Authorization: Bearer <token> obtenido tras el /login o /register.

Método

Ruta

Descripción

Seguridad

POST

/api/users/register

Crea un nuevo usuario y devuelve un token.

Pública

POST

/api/users/login

Autentica un usuario y devuelve un token JWT.

Pública

POST

/api/categories

🔒 Crea una nueva categoría.

Protegida

GET

/api/categories

Obtiene todas las categorías.

Pública

GET

/api/categories/:id

Obtiene una categoría por ID.

Pública

PUT

/api/categories/:id

🔒 Actualiza una categoría por ID.

Protegida

DELETE

/api/categories/:id

🔒 Elimina una categoría por ID.

Protegida

POST

/api/products

🔒 Crea un nuevo producto (requiere category ObjectId).

Protegida

GET

/api/products

Obtiene todos los productos (soporta ?page= y ?limit=).

Pública

GET

/api/products/:id

Obtiene un producto por ID (con populate de categoría).

Pública

PUT

/api/products/:id

🔒 Actualiza un producto por ID.

Protegida

DELETE

/api/products/:id

🔒 Elimina un producto por ID.

Protegida

Ejemplos de Datos Mock (JSON)

1. Registrar Nuevo Usuario (POST /api/users/register)

{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "password123"
}


2. Crear Categoría (POST /api/categories)

{
  "name": "Electrónica",
  "description": "Dispositivos digitales, gadgets y accesorios."
}


3. Crear Producto (POST /api/products)

Nota: Debes reemplazar [CATEGORY_OBJECT_ID] con el _id de una categoría existente.

{
  "name": "Smartphone X",
  "description": "Teléfono inteligente de última generación con cámara de 108MP.",
  "price": 899.99,
  "stock": 50,
  "category": "[CATEGORY_OBJECT_ID]"
}
