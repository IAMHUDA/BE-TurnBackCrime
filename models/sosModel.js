const db = require('../config/database');

const SOS = {
    // Tambah data SOS
    create: (data, callback) => {
        db.query('INSERT INTO tombol_sos SET ?', [data], callback);
    },

    // Ambil semua data SOS
    findAll: (callback) => {
        db.query('SELECT * FROM tombol_sos', callback);
    },

    // Ambil data SOS by ID
    findById: (id, callback) => {
        db.query('SELECT * FROM tombol_sos WHERE id = ?', [id], callback);
    },

    // Update data SOS by ID
    updateById: (id, data, callback) => {
        db.query('UPDATE tombol_sos SET ? WHERE id = ?', [data, id], callback);
    },

    // Hapus data SOS by ID
    deleteById: (id, callback) => {
        db.query('DELETE FROM tombol_sos WHERE id = ?', [id], callback);
    }
};

module.exports = SOS;
