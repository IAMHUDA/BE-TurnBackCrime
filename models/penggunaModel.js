const db = require('../config/database');

const Pengguna = {
    // Cari pengguna berdasarkan email
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM pengguna WHERE email = ?', [email], callback);
    },

    // Tambah pengguna
    create: (data, callback) => {
        db.query('INSERT INTO pengguna SET ?', [data], callback);
    },

    // Ambil pengguna by ID
    findById: (id, callback) => {
        db.query('SELECT * FROM pengguna WHERE id = ?', [id], callback);
    },

    // Ambil semua pengguna
    findAll: (callback) => {
        db.query('SELECT * FROM pengguna', callback);
    },

    // Update pengguna by ID
    updateById: (id, data, callback) => {
        db.query('UPDATE pengguna SET ? WHERE id = ?', [data, id], callback);
    },

    // Update profil pengguna by ID (khusus profil)
    updateProfilById: (id, data, result) => {
  let sql = 'UPDATE pengguna SET ? WHERE id = ?';
  db.query(sql, [data, id], (err, res) => {
    result(err, res);
  });
},



    // Hapus pengguna by ID
    deleteById: (id, callback) => {
        db.query('DELETE FROM pengguna WHERE id = ?', [id], callback);
    },

    // Cek pengguna duplikat
    findDuplicate: (email, nama, nomer_handphone, callback) => {
        db.query(
            'SELECT * FROM pengguna WHERE email = ? OR nama = ? OR nomer_handphone = ?',
            [email, nama, nomer_handphone],
            callback
        );
    },
};

module.exports = Pengguna;
