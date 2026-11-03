
const express = require('express');
const router = express.Router();

const {
    getAllDepot,
    createDepot
} = require('../controllers/depotController');

// GET /depot
router.get('/', getAllDepot);

// POST /depot
router.post('/', createDepot);

module.exports = router;
