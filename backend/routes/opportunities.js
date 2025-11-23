const express = require('express');
const { authenticate, authorize } = require('../middleware/auth');
const {
  createOpportunity,
  getOpportunities,
  applyToOpportunity
} = require('../controllers/opportunityController');

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createOpportunity);
router.get('/', authenticate, getOpportunities);
router.post('/:id/apply', authenticate, authorize('student'), applyToOpportunity);

module.exports = router;