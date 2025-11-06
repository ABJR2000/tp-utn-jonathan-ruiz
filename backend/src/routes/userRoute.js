import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

// Rutas de autenticación (son públicas)
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Nota: No hay CRUD completo para el usuario, solo Login/Register

export default router;