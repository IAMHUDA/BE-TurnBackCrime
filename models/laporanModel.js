const db = require('../config/database');

const Laporan = {
    // Tambah laporan
    create: (data, callback) => {
        db.query('INSERT INTO laporan SET ?', [data], callback);
    },

    // Ambil semua laporan dengan filter dan pencarian
    // Perubahan utama di sini: tambahkan `filters` sebagai argumen pertama
    findAll: (filters, callback) => { // <--- Perhatikan perubahan di sini!
        let sql = `
            SELECT l.*, 
            (SELECT COUNT(*) FROM komentar k WHERE k.id_laporan = l.id) AS total_komentar
            FROM laporan l
        `;
        const params = [];
        const conditions = [];

        // Logika untuk menambahkan kondisi filter
        if (filters.q) {
            // Asumsi kolom judul dan deskripsi ada di tabel 'laporan'
            conditions.push('(l.judul LIKE ? OR l.deskripsi LIKE ?)');
            params.push(`%${filters.q}%`);
            params.push(`%${filters.q}%`);
        }

        if (filters.status) {
            conditions.push('l.status = ?');
            params.push(filters.status);
        }

        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        sql += ' ORDER BY l.created_at DESC'; // Selalu tambahkan order by di akhir

        console.log('Executing DB query (laporanModel):', sql, params); // DEBUGGING PENTING

        // Eksekusi query dengan parameter yang sudah dibangun
        db.query(sql, params, callback); // <--- Pastikan db.query menerima params di sini
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