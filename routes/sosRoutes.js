const express = require('express');
const router = express.Router();
const { createSOS, getAllSOS, getSOSById, updateSOS, deleteSOS } = require('../controllers/sosController');
const verifyToken = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminMiddleware');
const { sosOwnerOnly } = require('../middlewares/ownerMiddleware');

router.post('/', verifyToken, createSOS);
router.get('/', verifyToken, adminOnly, getAllSOS);
router.get('/:id', verifyToken, getSOSById);
router.put('/:id', verifyToken, sosOwnerOnly, updateSOS);
router.delete('/:id', verifyToken, sosOwnerOnly, deleteSOS);

module.exports = router;
