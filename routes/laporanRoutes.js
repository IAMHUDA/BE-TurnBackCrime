const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createLaporan, getAllLaporan, getLaporanById, updateLaporan, updateStatus, deleteLaporan } = require('../controllers/laporanController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { laporanOwnerOnly } = require('../middlewares/ownerMiddleware');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Tambah laporan
router.post('/', verifyToken, upload.single('foto'), createLaporan);

// Ambil semua laporan (hanya admin)
router.get('/', verifyToken, getAllLaporan);

// Ambil laporan by ID (hanya owner)
router.get('/:id', verifyToken, getLaporanById);

// Update laporan by ID (hanya owner)
router.put('/:id', verifyToken, upload.single('foto'), updateLaporan);

// Update status laporan (hanya admin)
router.patch('/:id/status', verifyToken, updateStatus);

// Hapus laporan by ID (hanya owner)
router.delete('/:id', verifyToken, deleteLaporan);

module.exports = router;
