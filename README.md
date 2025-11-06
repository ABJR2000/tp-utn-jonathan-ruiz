## 🚀 Proyecto CRUD MongoDB: API RESTful Modular

---

### 🎯 Descripción del Proyecto

Este proyecto es una **API RESTful** desarrollada con **Node.js**, **Express** y **Mongoose** que implementa las operaciones **CRUD** (Crear, Leer, Actualizar, Eliminar) para las entidades **Productos** y **Categorías**.

La arquitectura sigue el patrón de **separación de responsabilidades**, con una **Capa de Servicios** que maneja la lógica de negocio y las interacciones directas con MongoDB, manteniendo los Controladores ligeros y centrados en la gestión HTTP.

También incluye un sistema de **autenticación básico** para la entidad **Usuarios** utilizando `bcrypt` para el hasheo de contraseñas y **JSON Web Tokens (JWT)** para proteger las rutas sensibles (`POST`, `PUT`, `DELETE`).

---

### 🛠️ Tecnologías Utilizadas

| Categoría | Tecnología | Uso Principal |
| :--- | :--- | :--- |
| **Lenguaje** | `Node.js` | Entorno de ejecución de JavaScript |
| **Framework** | `Express.js` | Servidor web y enrutamiento |
| **Base de Datos** | `MongoDB` | Base de datos NoSQL |
| **ORM/ODM** | `Mongoose` | Modelado de datos y gestión de MongoDB |
| **Seguridad** | `bcryptjs` | Encriptación de contraseñas (Hashing) |
| **Autenticación** | `jsonwebtoken` | Generación y verificación de Tokens JWT |
| **Configuración** | `dotenv` | Gestión de variables de entorno |
| **Utilidades** | `cors` | Habilitar peticiones de Orígenes Cruzados |

---

### 💾 Esquema de la Base de Datos

| Entidad | Campo | Tipo | Requisitos | Relación |
| :--- | :--- | :--- | :--- | :--- |
| **User** | `name` | `String` | Requerido | - |
| | `email` | `String` | **Requerido**, **Único** | - |
| | `password` | `String` | Requerido, Hasheado | - |
| **Category** | `name` | `String` | **Requerido**, **Único** | - |
| | `description` | `String` | Opcional | - |
| **Product** | `name` | `String` | Requerido | - |
| | `description` | `String` | Opcional | - |
| | `price` | `Number` | Requerido, Mín **0** | - |
| | `stock` | `Number` | Requerido, Mín **0** | - |
| | `category` | `ObjectId` | Requerido | `ref: 'Category'` |

---

### 🚀 Instrucciones para Correr el Proyecto

#### 1. Clonar el Repositorio

```bash
git clone [https://github.com/ABJR2000/tp-utn-jonathan-ruiz.git](https://github.com/ABJR2000/tp-utn-jonathan-ruiz.git)
cd backend
2. Instalar DependenciasBashnpm install
3. Configurar Variables de EntornoCrea un archivo llamado .env en la raíz del proyecto y copia el contenido de .env.example, reemplazando los placeholders con tus credenciales.📝 Nota: Asegúrate de no subir este archivo .env a tu repositorio.Ini, TOML# Ejemplo de .env
MONGO_URI=mongodb+srv://user:pass@cluster/database?retryWrites=true&w=majority
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRES_IN=1d
4. Ejecutar el ServidorModo Desarrollo (con nodemon):Bashnpm run dev
Modo Producción:Bashnpm start
El servidor estará corriendo en http://localhost:<PORT>.🌐 Endpoints Disponibles (Rutas)Todas las rutas están prefijadas con /api. Las rutas marcadas con 🔒 requieren el header Authorization: Bearer <token> obtenido tras el /login o /register.MétodoRutaDescripciónSeguridadPOST/api/users/registerCrea un nuevo usuario y devuelve un token.PúblicaPOST/api/users/loginAutentica un usuario y devuelve un token JWT.PúblicaPOST/api/categories🔒 Crea una nueva categoría.ProtegidaGET/api/categoriesObtiene todas las categorías.PúblicaGET/api/categories/:idObtiene una categoría por ID.PúblicaPUT/api/categories/:id🔒 Actualiza una categoría por ID.ProtegidaDELETE/api/categories/:id🔒 Elimina una categoría por ID.ProtegidaPOST/api/products🔒 Crea un nuevo producto (requiere category ObjectId).ProtegidaGET/api/productsObtiene todos los productos (soporta ?page= y ?limit=).PúblicaGET/api/products/:idObtiene un producto por ID (con populate de categoría).PúblicaPUT/api/products/:id🔒 Actualiza un producto por ID.ProtegidaDELETE/api/products/:id🔒 Elimina un producto por ID.ProtegidaEjemplos de Datos Mock (JSON)1. Registrar Nuevo Usuario (POST /api/users/register)JSON{
  "name": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "password123"
}
2. Crear Categoría (POST /api/categories)JSON{
  "name": "Electrónica",
  "description": "Dispositivos digitales, gadgets y accesorios."
}
3. Crear Producto (POST /api/products)Nota: Debes reemplazar [CATEGORY_OBJECT_ID] con el _id de una categoría existente.JSON{
  "name": "Smartphone X",
  "description": "Teléfono inteligente de última generación con cámara de 108MP.",
  "price": 899.99,
  "stock": 50,
  "category": "[CATEGORY_OBJECT_ID]"
}
