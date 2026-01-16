const Candidate = require('../models/Candidate');
const { validationResult } = require('express-validator');

// @desc    Get all candidates
// @route   GET /api/candidates
// @access  Private
const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.findAll(req.user.id);

    res.status(200).json({
      status: 'success',
      count: candidates.length,
      data: {
        candidates
      }
    });
  } catch (error) {
    console.error('Get candidates error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error fetching candidates'
    });
  }
};

// @desc    Create new candidate
// @route   POST /api/candidates
// @access  Private
const createCandidate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const candidate = await Candidate.create(req.body, req.user.id);

    res.status(201).json({
      status: 'success',
      data: {
        candidate
      }
    });
  } catch (error) {
    console.error('Create candidate error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        status: 'error',
        message: 'Candidate with this email already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error creating candidate'
    });
  }
};

// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Private
const updateCandidate = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }

    const candidate = await Candidate.update(
      req.params.id,
      req.body,
      req.user.id
    );

    if (!candidate) {
      return res.status(404).json({
        status: 'error',
        message: 'Candidate not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        candidate
      }
    });
  } catch (error) {
    console.error('Update candidate error:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        status: 'error',
        message: 'Candidate with this email already exists'
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Error updating candidate'
    });
  }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private
const deleteCandidate = async (req, res) => {
  try {
    const deleted = await Candidate.delete(req.params.id, req.user.id);

    if (!deleted) {
      return res.status(404).json({
        status: 'error',
        message: 'Candidate not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Candidate deleted successfully'
    });
  } catch (error) {
    console.error('Delete candidate error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting candidate'
    });
  }
};

module.exports = {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate
};