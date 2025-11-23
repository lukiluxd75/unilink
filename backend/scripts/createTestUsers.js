// scripts/createTestUsers.js
const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');

async function createTestUsers() {
  try {
    console.log('Creando usuarios de prueba...');

    // Hash de contraseñas
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Usuario estudiante
    await pool.execute(
      `INSERT IGNORE INTO users (name, email, password, role, grade, semester, career, is_approved) 
       VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
      ['Ana García', 'ana@estudiante.edu', hashedPassword, 'student', 4.5, 5, 'Ingeniería']
    );

    // Usuario profesor
    await pool.execute(
      `INSERT IGNORE INTO users (name, email, password, role, department, specialization, is_approved) 
       VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
      ['Carlos López', 'carlos@profesor.edu', hashedPassword, 'teacher', 'Matemáticas', 'Cálculo']
    );

    console.log('✅ Usuarios de prueba creados:');
    console.log('   Estudiante: ana@estudiante.edu / password123');
    console.log('   Profesor: carlos@profesor.edu / password123');

  } catch (error) {
    console.error('❌ Error creando usuarios de prueba:', error.message);
  } finally {
    process.exit();
  }
}

createTestUsers();