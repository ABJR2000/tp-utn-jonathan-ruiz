import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoute.js';
import categoryRoutes from './src/routes/categoryRoute.js';
import userRoutes from './src/routes/userRoute.js';

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Habilitar CORS para todas las rutas
app.use(express.json()); // Habilitar body-parser para JSON

// Rutas principales
app.get('/', (req, res) => {
  res.send('API RESTful en funcionamiento. Visita /api/products o /api/users.');
});

// Definición de las rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Manejador de ruta no encontrada (404)
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Ruta no encontrada: ${req.originalUrl}` });
});

// Middleware de manejo de errores (opcional pero recomendado)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Algo salió mal en el servidor.' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));