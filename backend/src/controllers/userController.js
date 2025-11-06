import * as userService from '../services/userService.js';

// Registrar nuevo usuario (POST /api/users/register)
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Por favor, proporciona nombre, email y contraseña.' 
    });
  }
  
  try {
    const userData = await userService.registerUser({ name, email, password });
    res.status(201).json({ 
      success: true, 
      data: userData,
      message: 'Registro exitoso. Token generado.'
    });
  } catch (error) {
    // Manejo de errores de validación, email duplicado, etc.
    res.status(400).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Autenticar usuario y obtener token (POST /api/users/login)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Por favor, proporciona email y contraseña.' 
    });
  }
  
  try {
    const userData = await userService.authUser(email, password);
    res.status(200).json({ 
      success: true, 
      data: userData,
      message: 'Inicio de sesión exitoso. Token generado.' 
    });
  } catch (error) {
    // 401 Unauthorized si las credenciales son incorrectas
    res.status(401).json({ 
      success: false, 
      message: error.message 
    });
  }
};