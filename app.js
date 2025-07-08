const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Untuk akses gambar

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pengguna', require('./routes/penggunaRoutes'));
app.use('/api/laporan', require('./routes/laporanRoutes'));
app.use('/api/sos', require('./routes/sosRoutes'));
app.use('/api/notifikasi', require('./routes/notifikasiRoutes'));
app.use('/api/kategori', require('./routes/kategoriRoutes'));
app.use('/api/komentar', require('./routes/komentarRoutes'));


module.exports = app;
