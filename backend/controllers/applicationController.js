import { pool } from "../config/database.js";

// Obtener mis aplicaciones (solo estudiante)
export const getMyApplications = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT a.id, o.title, o.type, a.status, a.application_date, o.deadline
       FROM applications a
       JOIN opportunities o ON a.opportunity_id = o.id
       WHERE a.student_id = ?`,
      [req.user.id]
    );
    res.json({ success: true, applications: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener todas las aplicaciones (solo admin)
export const getAllApplications = async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT a.id, u.name AS student_name, u.career, o.title AS opportunity_title,
              a.status, a.application_date
       FROM applications a
       JOIN users u ON a.student_id = u.id
       JOIN opportunities o ON a.opportunity_id = o.id
       ORDER BY a.application_date DESC`
    );
    res.json({ success: true, applications: rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Revisar aplicación (solo admin)
export const reviewApplication = async (req, res) => {
  try {
    const { status, review_comments } = req.body;
    const [result] = await pool.execute(
      `UPDATE applications
       SET status = ?, reviewed_by = ?, review_comments = ?, review_date = NOW()
       WHERE id = ?`,
      [status, req.user.id, review_comments || null, req.params.id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ success: false, message: "Aplicación no encontrada" });

    res.json({ success: true, message: "Aplicación revisada correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
