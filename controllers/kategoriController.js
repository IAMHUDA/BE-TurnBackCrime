const Kategori = require('../models/kategoriModel');

// Tambah kategori
exports.createKategori = (req, res) => {
    const { nama_kategori } = req.body;

    Kategori.create({ nama_kategori }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menambahkan kategori' });
        res.json({ message: 'Kategori berhasil ditambahkan' });
    });
};

// Ambil semua kategori
exports.getAllKategori = (req, res) => {
    Kategori.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan kategori' });
        res.json(results);
    });
};

// Ambil kategori by ID
exports.getKategoriById = (req, res) => {
    const { id } = req.params;

    Kategori.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan kategori' });
        if (results.length === 0) return res.status(404).json({ message: 'Kategori tidak ditemukan' });
        res.json(results[0]);
    });
};

// Update kategori
exports.updateKategori = (req, res) => {
    const { id } = req.params;
    const { nama_kategori } = req.body;

    Kategori.updateById(id, { nama_kategori }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengupdate kategori' });
        res.json({ message: 'Kategori berhasil diupdate' });
    });
};

// Hapus kategori
exports.deleteKategori = (req, res) => {
    const { id } = req.params;

    Kategori.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus kategori' });
        res.json({ message: 'Kategori berhasil dihapus' });
    });
};
