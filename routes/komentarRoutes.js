// routes/komentarRoutes.js
const express = require('express');
const router = express.Router();
const komentarController = require('../controllers/komentarController');

router.get('/laporan/:id', komentarController.getKomentarByLaporan);
router.post('/', komentarController.createKomentar);

module.exports = router;
