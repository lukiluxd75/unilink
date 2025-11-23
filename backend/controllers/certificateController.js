// controllers/certificateController.js
const { pool } = require('../config/database');

// Subir certificado (solo teacher)
exports.uploadCertificate = async (req, res) => {
  try {
    const { title, institution, issue_date, type } = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : null;

    if (!file) return res.status(400).json({ success: false, message: 'Archivo requerido' });

    await pool.execute(
      `INSERT INTO certificates (teacher_id, title, institution, issue_date, type, file_url)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, institution, issue_date, type, file]
    );

    res.json({ success: true, message: 'Certificado subido correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener mis certificados (teacher)
exports.getMyCertificates = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT id, title, institution, issue_date, type, status, file_url
       FROM certificates
       WHERE teacher_id = ?`,
      [req.user.id]
    );
    res.json({ success: true, certificates: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
