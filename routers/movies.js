const express = require("express");

// Import del controller
const movieController = require("../controllers/movieController");

// Set del Router
const router = express.Router();

// Rotta INDEX
router.get('/', movieController.index);

// Rotta SHOW
router.get('/:id', movieController.show);

module.exports = router;