const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const { getMyApplications, getAllApplications, reviewApplication } = require('../controllers/applicationController');

const router = express.Router();

router.get('/my-applications', authenticate, authorize('student'), getMyApplications);
router.get('/', authenticate, authorize('admin'), getAllApplications);
router.patch('/:id/review', authenticate, authorize('admin'), reviewApplication);

module.exports = router;
