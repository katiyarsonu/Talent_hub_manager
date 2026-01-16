const express = require('express');
const { body } = require('express-validator');
const {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
} = require('../controllers/candidateController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const candidateValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage('Please provide a valid phone number'),
  body('skills').trim().notEmpty().withMessage('Skills are required'),
  body('experience')
    .isInt({ min: 0 })
    .withMessage('Experience must be a positive number'),
  body('department').trim().notEmpty().withMessage('Department is required')
];

// All routes are protected
router.use(protect);

// Routes
router.route('/')
  .get(getCandidates)
  .post(candidateValidation, createCandidate);

router.route('/:id')
  .put(candidateValidation, updateCandidate)
  .delete(deleteCandidate);

module.exports = router;