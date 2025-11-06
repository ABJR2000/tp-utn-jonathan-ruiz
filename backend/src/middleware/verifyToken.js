import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req, res, next) => {
  // El token se espera en el header de autorización como "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      message: 'Acceso denegado. No se proporcionó token o formato incorrecto.' 
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verificar y decodificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adjuntar la información del usuario (ej. id) al objeto de solicitud
    req.user = decoded.id; 
    
    next(); // Continuar con el siguiente middleware o controlador
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false, 
        message: 'Token expirado. Por favor, vuelve a iniciar sesión.' 
      });
    }
    return res.status(401).json({ 
      success: false, 
      message: 'Token inválido.' 
    });
  }
};

export default verifyToken;