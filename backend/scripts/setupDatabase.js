// scripts/setupDatabase.js
const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  try {
    // Conectar a MySQL sin especificar base de datos
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root', 
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true // Permitir múltiples declaraciones
    });

    console.log('Conectado a MySQL');

    // Crear base de datos si no existe (usando query en lugar de execute)
    await connection.query(`CREATE DATABASE IF NOT EXISTS oportunidades_academicas`);
    console.log('Base de datos creada/verificada');

    // Usar la base de datos
    await connection.query(`USE oportunidades_academicas`);

    // Crear tabla de usuarios
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'teacher', 'admin') NOT NULL,
        grade DECIMAL(3,2) DEFAULT NULL,
        semester INT DEFAULT NULL,
        career VARCHAR(255) DEFAULT NULL,
        department VARCHAR(255) DEFAULT NULL,
        specialization VARCHAR(255) DEFAULT NULL,
        is_approved BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Tabla users creada');

    // Crear tabla de certificados
    await connection.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INT PRIMARY KEY AUTO_INCREMENT,
        teacher_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        institution VARCHAR(255) NOT NULL,
        issue_date DATE NOT NULL,
        type ENUM('course', 'diploma', 'certification', 'workshop') NOT NULL,
        file_url VARCHAR(500) NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        reviewed_by INT DEFAULT NULL,
        review_date TIMESTAMP NULL,
        review_comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users(id),
        FOREIGN KEY (reviewed_by) REFERENCES users(id)
      )
    `);
    console.log('Tabla certificates creada');

    // Crear tabla de oportunidades
    await connection.query(`
      CREATE TABLE IF NOT EXISTS opportunities (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        type ENUM('Ayudantía', 'Pasantía', 'Beca') NOT NULL,
        description TEXT NOT NULL,
        deadline DATE NOT NULL,
        vacancies INT NOT NULL,
        min_grade DECIMAL(3,2) DEFAULT NULL,
        min_semester INT DEFAULT NULL,
        allowed_careers JSON,
        needs_approval BOOLEAN DEFAULT TRUE,
        created_by INT NOT NULL,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )
    `);
    console.log('Tabla opportunities creada');

    // Crear tabla de aplicaciones
    await connection.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id INT PRIMARY KEY AUTO_INCREMENT,
        student_id INT NOT NULL,
        opportunity_id INT NOT NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_by INT DEFAULT NULL,
        review_date TIMESTAMP NULL,
        review_comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (opportunity_id) REFERENCES opportunities(id),
        FOREIGN KEY (reviewed_by) REFERENCES users(id),
        UNIQUE KEY unique_application (student_id, opportunity_id)
      )
    `);
    console.log('Tabla applications creada');

    // Insertar usuario administrador por defecto
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 12);
    
    await connection.query(
      `INSERT IGNORE INTO users (name, email, password, role, is_approved, is_active) 
       VALUES (?, ?, ?, ?, TRUE, TRUE)`,
      ['Administrador', 'admin@universidad.edu', hashedPassword, 'admin']
    );
    console.log(' Usuario administrador creado');
    console.log(' Email: admin@universidad.edu');
    console.log(' Password: admin123');

    console.log('\n Base de datos configurada correctamente!');

  } catch (error) {
    console.error('Error configurando la base de datos:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  setupDatabase().then(() => process.exit());
}

module.exports = setupDatabase;