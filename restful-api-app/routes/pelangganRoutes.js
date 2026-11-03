
const express = require('express');
const router = express.Router();

const {
    getAllPesanan,
    getPesananById,
    createPesanan
} = require('../controllers/pelangganController');

// GET /pesanan-galon
router.get('/', getAllPesanan);

// GET /pesanan-galon/:id
router.get('/:id', getPesananById);

// POST /pesanan-galon
router.post('/', createPesanan);

module.exports = router;
