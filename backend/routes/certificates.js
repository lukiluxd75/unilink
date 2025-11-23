// routes/certificates.js - VERSIÓN CORREGIDA
const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { uploadCertificate, getMyCertificates } = require('../controllers/certificateController');
const router = express.Router();

// Rutas corregidas
router.get('/', authenticate, getMyCertificates);
router.post('/', authenticate, authorize('teacher'), uploadCertificate);

module.exports = router;