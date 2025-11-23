// controllers/opportunityController.js
const { pool } = require('../config/database');

// Crear oportunidad (solo admin)
exports.createOpportunity = async (req, res) => {
  try {
    const { title, type, description, deadline, vacancies, min_grade, min_semester, allowed_careers } = req.body;

    await pool.execute(
      `INSERT INTO opportunities 
       (title, type, description, deadline, vacancies, min_grade, min_semester, allowed_careers, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, type, description, deadline, vacancies, min_grade, min_semester, JSON.stringify(allowed_careers || []), req.user.id]
    );

    res.json({ success: true, message: 'Oportunidad creada correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//  Obtener oportunidades (cualquier usuario autenticado)
exports.getOpportunities = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, title, type, description, deadline, vacancies, min_grade, min_semester
       FROM opportunities
       WHERE is_active = TRUE
       ORDER BY created_at DESC`
    );
    res.json({ success: true, opportunities: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Aplicar a una oportunidad (solo student)
exports.applyToOpportunity = async (req, res) => {
  try {
    const opportunityId = req.params.id;

    // Verificar que exista la oportunidad
    const [oppRows] = await pool.execute('SELECT * FROM opportunities WHERE id = ?', [opportunityId]);
    if (oppRows.length === 0)
      return res.status(404).json({ success: false, message: 'Oportunidad no encontrada' });

    // Insertar aplicación
    await pool.execute(
      `INSERT INTO applications (student_id, opportunity_id) VALUES (?, ?)`,
      [req.user.id, opportunityId]
    );

    res.json({ success: true, message: 'Aplicación enviada correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: 'Ya aplicaste a esta oportunidad' });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
