const Notifikasi = require('../models/notifikasiModel');

// Kirim notifikasi
exports.createNotifikasi = (req, res) => {
    const { id_pengguna, pesan } = req.body;
    const newNotif = { id_pengguna, pesan };

    Notifikasi.create(newNotif, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengirim notifikasi' });
        res.json({ message: 'Notifikasi berhasil dikirim' });
    });
};

// Ambil semua notifikasi
exports.getAllNotifikasi = (req, res) => {
    Notifikasi.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan notifikasi' });
        res.json(results);
    });
};

// Ambil notifikasi by ID
exports.getNotifikasiById = (req, res) => {
    const { id } = req.params;
    Notifikasi.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan notifikasi' });
        if (results.length === 0) return res.status(404).json({ message: 'Notifikasi tidak ditemukan' });
        res.json(results[0]);
    });
};

// Hapus notifikasi
exports.deleteNotifikasi = (req, res) => {
    const { id } = req.params;
    Notifikasi.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus notifikasi' });
        res.json({ message: 'Notifikasi berhasil dihapus' });
    });
};
