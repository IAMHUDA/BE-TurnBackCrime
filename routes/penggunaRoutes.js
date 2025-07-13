const express = require('express');
const router = express.Router();
const penggunaController = require('../controllers/penggunaController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { penggunaOwnerOnly } = require('../middlewares/ownerMiddleware');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder uploads
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, 'foto_' + Date.now() + ext);
  },
});

const upload = multer({ storage });


// Ambil semua pengguna (hanya admin)
router.get('/', verifyToken, adminOnly, penggunaController.getAllPengguna);

// Ambil pengguna by ID (hanya owner)
router.get('/:id', verifyToken, penggunaOwnerOnly, penggunaController.getPenggunaById);

// Update semua data pengguna (hanya owner)
router.put('/:id', verifyToken, penggunaOwnerOnly, penggunaController.updatePengguna);

router.get('/:id', penggunaController.getProfilById);

// Update profil pengguna (khusus profil)
router.put('/:id/profile', upload.single('foto'), penggunaController.updateProfil);

// Hapus pengguna by ID (hanya admin)
router.delete('/:id', verifyToken, adminOnly, penggunaController.deletePengguna);

module.exports = router;
