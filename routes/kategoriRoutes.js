const express = require('express');
const router = express.Router();
const { createKategori, getAllKategori, getKategoriById, updateKategori, deleteKategori } = require('../controllers/kategoriController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');

// Semua endpoint kategori hanya untuk admin
router.post('/', verifyToken, createKategori);
router.get('/', verifyToken, getAllKategori);
router.get('/:id', verifyToken, getKategoriById);
router.put('/:id', verifyToken, adminOnly, updateKategori);
router.delete('/:id', verifyToken,adminOnly, deleteKategori);

module.exports = router;
