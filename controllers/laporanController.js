const Laporan = require('../models/laporanModel');
const { Sequelize } = require('sequelize');

// Buat laporan
exports.createLaporan = (req, res) => {
    const { id_pengguna, judul, id_kategori, deskripsi, lokasi_lat, lokasi_long } = req.body;
    const foto = req.file ? req.file.filename : null;

    const newLaporan = { id_pengguna, judul, id_kategori, deskripsi, foto, lokasi_lat, lokasi_long };

    Laporan.create(newLaporan, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal membuat laporan' });
        res.json({ message: 'Laporan berhasil dibuat' });
    });
};

// Ambil semua laporan
exports.getAllLaporan = (req, res) => {
    Laporan.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan laporan' });
        res.json(results);
    });
};

// Ambil laporan by ID
exports.getLaporanById = (req, res) => {
    const { id } = req.params;

    Laporan.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan laporan' });
        if (results.length === 0) return res.status(404).json({ message: 'Laporan tidak ditemukan' });
        res.json(results[0]);
    });
};

// Update laporan (seluruh data)
exports.updateLaporan = (req, res) => {
    const { id } = req.params;
    const { judul, id_kategori, deskripsi, lokasi_lat, lokasi_long, status } = req.body;
    const foto = req.file ? req.file.filename : null;

    const updatedLaporan = { judul, id_kategori, deskripsi, lokasi_lat, lokasi_long, status, foto };

    Laporan.updateById(id, updatedLaporan, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengupdate laporan' });
        res.json({ message: 'Laporan berhasil diupdate' });
    });
};

// Update status laporan saja
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    Laporan.updateStatus(id, status, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengupdate status' });
        res.json({ message: 'Status berhasil diupdate' });
    });
};

// Hapus laporan
exports.deleteLaporan = (req, res) => {
    const { id } = req.params;

    Laporan.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus laporan' });
        res.json({ message: 'Laporan berhasil dihapus' });
    });
};
