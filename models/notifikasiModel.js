const db = require('../config/database');

const Notifikasi = {
    // Kirim notifikasi
    create: (data, callback) => {
        db.query('INSERT INTO notifikasi SET ?', [data], callback);
    },

    // Ambil semua notifikasi
    findAll: (callback) => {
        db.query('SELECT * FROM notifikasi', callback);
    },

    // Ambil notifikasi by ID
    findById: (id, callback) => {
        db.query('SELECT * FROM notifikasi WHERE id = ?', [id], callback);
    },

    // Hapus notifikasi by ID
    deleteById: (id, callback) => {
        db.query('DELETE FROM notifikasi WHERE id = ?', [id], callback);
    }
};

module.exports = Notifikasi;
