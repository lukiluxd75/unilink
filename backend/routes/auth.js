const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // importa el controlador

// Usar los métodos reales del controlador
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
