const Laporan = require('../models/laporanModel'); // Pastikan path ini benar
const { Sequelize, Op } = require('sequelize'); // Asumsi Anda menggunakan Sequelize, tambahkan Op untuk operator query

// Buat laporan
exports.createLaporan = (req, res) => {
    const { id_pengguna, judul, id_kategori, deskripsi, lokasi_lat, lokasi_long } = req.body;
    const foto = req.file ? req.file.filename : null;

    const newLaporan = { id_pengguna, judul, id_kategori, deskripsi, foto, lokasi_lat, lokasi_long };

    Laporan.create(newLaporan, (err, result) => {
        if (err) {
            console.error('Error creating report:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal membuat laporan' });
        }
        res.status(201).json({ message: 'Laporan berhasil dibuat', id: result.insertId }); // 201 Created
    });
};

// Ambil semua laporan dengan filter dan pencarian
exports.getAllLaporan = (req, res) => {
    const { q, status } = req.query; // Ambil parameter q (search) dan status dari query string

    console.log('Received query for getAllLaporan:', { q, status }); // Log untuk debugging

    // Bangun kondisi filter
    const filters = {};
    if (q) {
        // Jika ada query pencarian, cari di judul atau deskripsi
        // Asumsi model Anda mendukung pencarian LIKE atau operator serupa
        filters[Op.or] = [
            { judul: { [Op.like]: `%${q}%` } },
            { deskripsi: { [Op.like]: `%${q}%` } }
        ];
    }

    if (status) {
        // Jika ada filter status
        filters.status = status;
    }

    // Laporan.findAll sekarang harus menerima filters sebagai parameter pertama
    // Asumsi model Anda memiliki metode findAll yang dapat menerima filter
    Laporan.findAll(filters, (err, results) => {
        if (err) {
            console.error('Error fetching all reports:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal mendapatkan laporan' });
        }
        // Jika Anda ingin mengembalikan objek dengan kunci 'data', seperti yang kita bahas sebelumnya
        // res.json({ data: results });
        res.json(results); // Mengembalikan langsung array laporan (sesuai respons Flutter Anda)
    });
};

// Ambil laporan by ID
exports.getLaporanById = (req, res) => {
    const { id } = req.params;

    Laporan.findById(id, (err, results) => {
        if (err) {
            console.error('Error getting report by ID:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal mendapatkan laporan' });
        }
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
        if (err) {
            console.error('Error updating report:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal mengupdate laporan' });
        }
        res.json({ message: 'Laporan berhasil diupdate' });
    });
};

// Update status laporan saja
exports.updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Ambil status dari body

    console.log(`Updating status for report ID ${id} to: ${status}`); // Log untuk debugging

    Laporan.updateStatus(id, status, (err, result) => {
        if (err) {
            console.error('Error updating status:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal mengupdate status' });
        }
        res.json({ message: 'Status berhasil diupdate' });
    });
};

// Hapus laporan
exports.deleteLaporan = (req, res) => {
    const { id } = req.params;

    Laporan.deleteById(id, (err, result) => {
        if (err) {
            console.error('Error deleting report:', err); // Tambahkan logging
            return res.status(500).json({ message: 'Gagal menghapus laporan' });
        }
        res.json({ message: 'Laporan berhasil dihapus' });
    });
};