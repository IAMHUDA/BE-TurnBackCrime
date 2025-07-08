const db = require('../config/database');

// Proteksi untuk tabel tombol_sos
const sosOwnerOnly = (req, res, next) => {
    const sosId = req.params.id;
    const userId = req.userId;

    db.query('SELECT * FROM tombol_sos WHERE id = ?', [sosId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Data SOS tidak ditemukan.' });
        }

        const sos = results[0];
        if (sos.id_pengguna !== userId) {
            return res.status(403).json({ message: 'Akses ditolak. Ini bukan data Anda.' });
        }

        next();
    });
};

// Proteksi untuk tabel laporan
const laporanOwnerOnly = (req, res, next) => {
    const laporanId = req.params.id;
    const userId = req.userId;

    db.query('SELECT * FROM laporan WHERE id = ?', [laporanId], (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ message: 'Data laporan tidak ditemukan.' });
        }

        const laporan = results[0];
        if (laporan.id_pengguna !== userId) {
            return res.status(403).json({ message: 'Akses ditolak. Ini bukan data Anda.' });
        }

        next();
    });
};

// Proteksi untuk pengguna (user hanya bisa edit dirinya sendiri)
const penggunaOwnerOnly = (req, res, next) => {
    const userIdParam = parseInt(req.params.id);
    const userIdToken = req.userId;

    if (userIdParam !== userIdToken) {
        return res.status(403).json({ message: 'Akses ditolak. Anda hanya bisa mengelola akun Anda sendiri.' });
    }

    next();
};

module.exports = { sosOwnerOnly, laporanOwnerOnly, penggunaOwnerOnly };
