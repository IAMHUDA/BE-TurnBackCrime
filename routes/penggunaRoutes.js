const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { penggunaOwnerOnly } = require('../middlewares/ownerMiddleware');

// Ambil semua pengguna (hanya admin)
router.get('/', verifyToken, adminOnly, penggunaController.getAllPengguna);

// Ambil pengguna by ID (hanya owner)
router.get('/:id', verifyToken, penggunaOwnerOnly, penggunaController.getPenggunaById);

// Update semua data pengguna (hanya owner)
router.put('/:id', verifyToken, penggunaOwnerOnly, penggunaController.updatePengguna);

// Update profil pengguna (khusus profil)
router.put('/:id/profil', verifyToken, penggunaOwnerOnly, penggunaController.updateProfil);

// Hapus pengguna by ID (hanya admin)
router.delete('/:id', verifyToken, adminOnly, penggunaController.deletePengguna);

module.exports = router;
