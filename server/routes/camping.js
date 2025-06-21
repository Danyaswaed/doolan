const express = require("express");
const router = express.Router();
const campingController = require('../controllers/campingController');

// @route   GET /api/camping/tables
// @desc    List all database tables
// @access  Public
router.get('/tables', campingController.listTables);

// @route   GET /api/camping/spots
// @desc    Get all camping spots
// @access  Public
router.get('/spots', campingController.getCampingSpots);


// @route   GET /api/camping/spots/:id
// @desc    Get single camping spot by ID
// @access  Public
router.get('/spots/:id', campingController.getCampingSpotById);
router.get('/uploads/camping/:filename', campingController.getCampingImages);
module.exports = router;
