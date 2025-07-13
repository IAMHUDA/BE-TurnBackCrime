const Komentar = require('../models/komentarModel');

exports.getByLaporan = async (req, res) => {
  try {
    const idLaporan = parseInt(req.params.id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    if (isNaN(idLaporan)) {
      return res.status(400).json({
        success: false,
        message: 'ID laporan tidak valid'
      });
    }

    const result = await Komentar.getByLaporan(idLaporan, page, limit);
    
    res.json({
      success: true,
      data: result.data,
      meta: result.meta
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { id_pengguna, id_laporan, isi_komentar } = req.body;
    
    if (!isi_komentar || isi_komentar.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Komentar harus diisi (maks 500 karakter)'
      });
    }

    const newKomentar = await Komentar.create({
      id_pengguna,
      id_laporan,
      isi_komentar
    });

    res.status(201).json({
      success: true,
      data: newKomentar
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    console.log('ID komentar:', id);

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID komentar tidak valid',
      });
    }

    const isDeleted = await Komentar.deleteById(id);

    if (!isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Komentar tidak ditemukan',
      });
    }

    res.json({
      success: true,
      message: 'Komentar berhasil dihapus',
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


