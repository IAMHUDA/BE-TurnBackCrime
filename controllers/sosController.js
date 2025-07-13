const SOS = require('../models/sosModel');
const Pengguna = require('../models/penggunaModel');
const nodemailer = require('nodemailer');

// Setup transporter
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c46921ef999f2e",
    pass: "92ab2fc199620f"
  }
});

// Kirim SOS
exports.createSOS = (req, res) => {
  const { id_pengguna, lokasi_lat, lokasi_long } = req.body;

  // Step 1: Ambil data pengguna
  Pengguna.findById(id_pengguna, (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(500).json({ message: 'Gagal mengambil data pengguna' });
    }

    const pengguna = userResults[0];
    const emailDarurat = pengguna.email_darurat;

    if (!emailDarurat) {
      return res.status(400).json({ message: 'Email darurat belum disetel oleh pengguna' });
    }

    // Step 2: Simpan ke database
    const newSOS = { id_pengguna, lokasi_lat, lokasi_long };
    SOS.create(newSOS, (err, result) => {
      if (err) return res.status(500).json({ message: 'Gagal mengirim SOS ke database' });

      // Step 3: Kirim email darurat
      const mailOptions = {
        from: '"TurnBackCrime SOS" <sos@turnbackcrime.test>',
        to: emailDarurat,
        subject: 'SOS Darurat dari TurnBackCrime',
        text: `Pengguna ${pengguna.nama} mengirimkan sinyal SOS!\n\nLokasi:\nLatitude: ${lokasi_lat}\nLongitude: ${lokasi_long}\n\nSegera bantu!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Gagal mengirim email:', error);
          return res.status(500).json({ message: 'SOS berhasil dikirim ke database, tapi gagal mengirim email' });
        }

        res.json({ message: 'SOS berhasil dikirim dan email terkirim' });
      });
    });
  });
};


exports.getAllSOS = (req, res) => {
    SOS.findAll((err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan log SOS' });
        res.json(results);
    });
};

exports.getSOSById = (req, res) => {
    const { id } = req.params;
    SOS.findById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Gagal mendapatkan data SOS' });
        if (results.length === 0) return res.status(404).json({ message: 'Data SOS tidak ditemukan' });
        res.json(results[0]);
    });
};

exports.updateSOS = (req, res) => {
    const { id } = req.params;
    const { id_pengguna, lokasi_lat, lokasi_long } = req.body;
    const updatedSOS = { id_pengguna, lokasi_lat, lokasi_long };

    SOS.updateById(id, updatedSOS, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal mengupdate data SOS' });
        res.json({ message: 'Data SOS berhasil diupdate' });
    });
};

exports.deleteSOS = (req, res) => {
    const { id } = req.params;
    SOS.deleteById(id, (err, result) => {
        if (err) return res.status(500).json({ message: 'Gagal menghapus data SOS' });
        res.json({ message: 'Data SOS berhasil dihapus' });
    });
};
