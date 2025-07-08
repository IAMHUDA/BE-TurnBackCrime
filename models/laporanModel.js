const db = require('../config/database');

const Laporan = {
    // Tambah laporan
    create: (data, callback) => {
        db.query('INSERT INTO laporan SET ?', [data], callback);
    },

    // Ambil semua laporan
    findAll: (callback) => {
    const sql = `
      SELECT l.*, 
        (SELECT COUNT(*) FROM komentar k WHERE k.id_laporan = l.id) AS total_komentar
      FROM laporan l
      ORDER BY l.created_at DESC
    `;
    db.query(sql, callback);
},


    // Ambil laporan by ID
    findById: (id, callback) => {
        db.query('SELECT * FROM laporan WHERE id = ?', [id], callback);
    },

    // Update semua data laporan by ID
    updateById: (id, data, callback) => {
        db.query('UPDATE laporan SET ? WHERE id = ?', [data, id], callback);
    },

    // Update status laporan saja
    updateStatus: (id, status, callback) => {
        db.query('UPDATE laporan SET status = ? WHERE id = ?', [status, id], callback);
    },

    // Hapus laporan by ID
    deleteById: (id, callback) => {
        db.query('DELETE FROM laporan WHERE id = ?', [id], callback);
    }
};

module.exports = Laporan;
