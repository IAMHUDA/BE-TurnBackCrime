const db = require('../config/database');
const { formatTimeAgo } = require('../utils/helpers');

class Komentar {
  constructor() {
    this.tableName = 'komentar';
  }

  static query(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static async getByLaporan(idLaporan, page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;

      const rows = await this.query(
        `SELECT k.*, u.nama as nama_pengguna 
         FROM komentar k
         JOIN pengguna u ON k.id_pengguna = u.id
         WHERE k.id_laporan = ?
         ORDER BY k.created_at DESC
         LIMIT ? OFFSET ?`,
        [idLaporan, limit, offset]
      );

      const totalResult = await this.query(
        `SELECT COUNT(*) as total 
         FROM komentar 
         WHERE id_laporan = ?`,
        [idLaporan]
      );

      const formattedData = rows.map(komentar => ({
        ...komentar,
        waktu_lalu: formatTimeAgo(komentar.created_at)
      }));

      return {
        data: formattedData,
        meta: {
          total: totalResult[0].total,
          page,
          limit,
          total_pages: Math.ceil(totalResult[0].total / limit)
        }
      };
    } catch (error) {
      console.error('Error in getByLaporan:', error);
      throw error;
    }
  }

  static async create(komentarData) {
    try {
      if (!komentarData.id_pengguna || !komentarData.id_laporan || !komentarData.isi_komentar) {
        throw new Error('Data komentar tidak lengkap');
      }

      if (komentarData.isi_komentar.length > 500) {
        throw new Error('Komentar maksimal 500 karakter');
      }

      const result = await this.query(
        `INSERT INTO komentar SET ?`,
        komentarData
      );

      const newKomentar = await this.query(
        `SELECT k.*, u.nama as nama_pengguna 
         FROM komentar k
         JOIN pengguna u ON k.id_pengguna = u.id
         WHERE k.id = ?`,
        [result.insertId]
      );

      if (newKomentar.length === 0) {
        throw new Error('Gagal membuat komentar');
      }

      return {
        ...newKomentar[0],
        waktu_lalu: formatTimeAgo(newKomentar[0].created_at)
      };
    } catch (error) {
      console.error('Error in create:', error);
      throw error;
    }
  }

  static async deleteById(id) {
    try {
      const result = await this.query(
        `DELETE FROM komentar 
         WHERE id = ?`,
        [id]
      );

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    }
  }
}

module.exports = Komentar;
