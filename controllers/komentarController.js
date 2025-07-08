// controllers/komentarController.js
const db = require('../config/database');

exports.getKomentarByLaporan = (req, res) => {
  const laporanId = req.params.id;

  db.query('SELECT * FROM komentar WHERE id_laporan = ?', [laporanId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error mengambil komentar' });
    res.json(results);
  });
};

exports.createKomentar = (req, res) => {
  const { id_pengguna, id_laporan, isi_komentar } = req.body;

  db.query('INSERT INTO komentar (id_pengguna, id_laporan, isi_komentar) VALUES (?, ?, ?)',
    [id_pengguna, id_laporan, isi_komentar],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error menambahkan komentar' });
      res.json({ message: 'Komentar berhasil ditambahkan' });
    });
};
