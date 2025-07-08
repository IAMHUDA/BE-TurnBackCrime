const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');

const { 
    createNotifikasi, 
    getAllNotifikasi, 
    getNotifikasiById, 
    deleteNotifikasi 
} = require('../controllers/notifikasiController');

// 🔐 Semua endpoint notifikasi harus login

// Tambah notifikasi
router.post('/', verifyToken, createNotifikasi);

// Ambil semua notifikasi
router.get('/', verifyToken, getAllNotifikasi);

// Ambil notifikasi berdasarkan ID
router.get('/:id', verifyToken, getNotifikasiById);

// Hapus notifikasi
router.delete('/:id', verifyToken, deleteNotifikasi);

module.exports = router;
