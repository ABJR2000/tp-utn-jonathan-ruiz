import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// Función auxiliar para generar JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// REGISTER
export const registerUser = async (userData) => {
  const { email, password, name } = userData;
  
  // 1. Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('El usuario con este email ya existe.');
  }

  // 2. Crear y guardar el usuario (el hook 'pre-save' se encarga del hasheo)
  const user = await User.create({ name, email, password });

  // 3. Generar token y devolver datos básicos
  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Datos de usuario inválidos.');
  }
};

// LOGIN
export const authUser = async (email, password) => {
  // 1. Buscar usuario
  const user = await User.findOne({ email });

  // 2. Verificar usuario y contraseña
  if (user && (await user.matchPassword(password))) {
    // 3. Generar token y devolver
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    throw new Error('Credenciales inválidas (email o contraseña incorrectos).');
  }
};