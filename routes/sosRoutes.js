const express = require('express');
const router = express.Router();
const { createSOS, getAllSOS, getSOSById, updateSOS, deleteSOS } = require('../controllers/sosController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { sosOwnerOnly } = require('../middlewares/ownerMiddleware');

// Tambah log SOS
router.post('/', verifyToken, createSOS);

// Ambil semua log SOS (hanya admin)
router.get('/', verifyToken, adminOnly, getAllSOS);

// Ambil log SOS berdasarkan ID (hanya owner)
router.get('/:id', verifyToken, sosOwnerOnly, getSOSById);

// Update log SOS by ID (hanya owner)
router.put('/:id', verifyToken, sosOwnerOnly, updateSOS);

// Hapus log SOS by ID (hanya owner)
router.delete('/:id', verifyToken, sosOwnerOnly, deleteSOS);

module.exports = router;
