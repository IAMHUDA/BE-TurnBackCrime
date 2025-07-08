const bcrypt = require('bcryptjs');
const Pengguna = require('../models/penggunaModel');

// Ambil semua pengguna
exports.getAllPengguna = (req, res) => {
    Pengguna.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan pengguna' });
        res.json(results);
    });
};

// Ambil pengguna by ID
exports.getPenggunaById = (req, res) => {
    const { id } = req.params;
    Pengguna.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan pengguna' });
        if (results.length === 0) return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        res.json(results[0]);
    });
};

// Tambah pengguna
exports.createPengguna = (req, res) => {
    const { nama, email, nomer_handphone, password, role } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).json({ message: 'Error hashing password' });

        const newUser = { nama, email, nomer_handphone, password: hash, role: role || 'user' };

        Pengguna.create(newUser, (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal menambahkan pengguna' });
            res.json({ message: 'Pengguna berhasil ditambahkan' });
        });
    });
};

// Update semua data pengguna (admin)
exports.updatePengguna = (req, res) => {
    const { id } = req.params;
    const { nama, email, nomer_handphone, password, role } = req.body;

    if (password) {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            const updatedUser = { nama, email, nomer_handphone, password: hash, role };

            Pengguna.updateById(id, updatedUser, (err, result) => {
                if (err) return res.status(500).json({ message: 'Gagal mengupdate pengguna' });

                if (result.affectedRows === 0) {
                    return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
                }

                res.json({ message: 'Pengguna berhasil diupdate' });
            });
        });
    } else {
        const updatedUser = { nama, email, nomer_handphone, role };

        Pengguna.updateById(id, updatedUser, (err, result) => {
            if (err) return res.status(500).json({ message: 'Gagal mengupdate pengguna' });

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
            }

            res.json({ message: 'Pengguna berhasil diupdate' });
        });
    }
};

// Update profil saja (khusus user)
exports.updateProfil = (req, res) => {
  const { id } = req.params;
  console.log('>> UpdateProfil - id:', id, ', body:', req.body); // Log data yang diterima

  Pengguna.updateProfilById(id, req.body, (err, result) => {
    if (err) {
      console.error('>> DB ERROR:', err);
      return res.status(500).json({ message: 'Gagal mengupdate profil pengguna', error: err });
    }
    if (result.affectedRows === 0) {
      console.warn('>> Tidak ada baris yang diupdate');
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }
    res.json({ message: 'Profil pengguna berhasil diperbarui' });
  });
};

// Hapus pengguna
exports.deletePengguna = (req, res) => {
    const { id } = req.params;
    Pengguna.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus pengguna' });
        res.json({ message: 'Pengguna berhasil dihapus' });
    });
};
