// controllers/authController.js
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role, grade, semester, career, department, specialization } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Insertar usuario
    const [result] = await pool.execute(
      `INSERT INTO users (name, email, password, role, grade, semester, career, department, specialization) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, role, grade, semester, career, department, specialization]
    );

    // Obtener usuario creado
    const [users] = await pool.execute(
      'SELECT id, name, email, role, grade, semester, career, department, specialization, is_approved FROM users WHERE id = ?',
      [result.insertId]
    );

    // Generar token
    const token = generateToken(result.insertId);

    res.status(201).json({
      success: true,
      token,
      user: users[0]
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    console.log('Datos recibidos en login:', req.body);
    const { email, password } = req.body;

    // Buscar usuario
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ? AND is_active = TRUE',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = users[0];

    // Verificar password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = generateToken(user.id);

    // Remover password de la respuesta
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};