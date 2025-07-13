const db = require('../config/database');

const SOS = {
    create: (data, callback) => {
        db.query('INSERT INTO tombol_sos SET ?', [data], callback);
    },

    findAll: (callback) => {
        db.query('SELECT * FROM tombol_sos', callback);
    },

    findById: (id, callback) => {
        db.query('SELECT * FROM tombol_sos WHERE id = ?', [id], callback);
    },

    updateById: (id, data, callback) => {
        db.query('UPDATE tombol_sos SET ? WHERE id = ?', [data, id], callback);
    },

    deleteById: (id, callback) => {
        db.query('DELETE FROM tombol_sos WHERE id = ?', [id], callback);
    }
};

module.exports = SOS;