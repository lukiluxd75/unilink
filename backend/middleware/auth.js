const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
    }

    // Para desarrollo, aceptar tokens mock
    if (token.startsWith('mock-jwt-token')) {
      const userId = token.split('-')[3];
      req.user = { 
        id: parseInt(userId), 
        role: 'admin',
        name: 'Usuario Mock',
        email: 'mock@example.com'
      };
      return next();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      
      const [users] = await pool.execute(
        'SELECT id, name, email, role, grade, semester, career, department, specialization, is_approved, is_active FROM users WHERE id = ? AND is_active = TRUE',
        [decoded.userId]
      );
      
      if (users.length === 0) {
        return res.status(401).json({ error: 'Token inválido.' });
      }

      req.user = users[0];
      next();
    } catch (jwtError) {
      return res.status(401).json({ error: 'Token inválido.' });
    }
  } catch (error) {
    res.status(401).json({ error: 'Error de autenticación.' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción' 
      });
    }
    next();
  };
};