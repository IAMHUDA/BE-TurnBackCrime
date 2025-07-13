// routes/komentarRoutes.js
const express = require('express');
const router = express.Router();
const komentarController = require('../controllers/komentarController');

router.get('/laporan/:id', komentarController.getByLaporan);
router.post('/', komentarController.create);
router.delete('/:id', komentarController.delete);



module.exports = router;