const db = require('../config/database');

const Kategori = {
    // Tambah kategori
    create: (data, callback) => {
        db.query('INSERT INTO kategori_kejahatan SET ?', [data], callback);
    },

    // Ambil semua kategori
    findAll: (callback) => {
        db.query('SELECT * FROM kategori_kejahatan', callback);
    },

    // Ambil kategori by ID
    findById: (id, callback) => {
        db.query('SELECT * FROM kategori_kejahatan WHERE id = ?', [id], callback);
    },

    // Update kategori by ID
    updateById: (id, data, callback) => {
        db.query('UPDATE kategori_kejahatan SET ? WHERE id = ?', [data, id], callback);
    },

    // Hapus kategori by ID
    deleteById: (id, callback) => {
        db.query('DELETE FROM kategori_kejahatan WHERE id = ?', [id], callback);
    }
};

module.exports = Kategori;
