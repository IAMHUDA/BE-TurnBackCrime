const SOS = require('../models/sosModel');

// Kirim SOS
exports.createSOS = (req, res) => {
    const { id_pengguna, lokasi_lat, lokasi_long } = req.body;
    const newSOS = { id_pengguna, lokasi_lat, lokasi_long };

    SOS.create(newSOS, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengirim SOS' });
        res.json({ message: 'SOS berhasil dikirim' });
    });
};

// Ambil semua data SOS
exports.getAllSOS = (req, res) => {
    SOS.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan log SOS' });
        res.json(results);
    });
};

// Ambil data SOS by ID
exports.getSOSById = (req, res) => {
    const { id } = req.params;
    SOS.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan data SOS' });
        if (results.length === 0) return res.status(404).json({ message: 'Data SOS tidak ditemukan' });
        res.json(results[0]);
    });
};

// Update data SOS
exports.updateSOS = (req, res) => {
    const { id } = req.params;
    const { id_pengguna, lokasi_lat, lokasi_long } = req.body;

    const updatedSOS = { id_pengguna, lokasi_lat, lokasi_long };

    SOS.updateById(id, updatedSOS, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengupdate data SOS' });
        res.json({ message: 'Data SOS berhasil diupdate' });
    });
};

// Hapus data SOS
exports.deleteSOS = (req, res) => {
    const { id } = req.params;
    SOS.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus data SOS' });
        res.json({ message: 'Data SOS berhasil dihapus' });
    });
};
