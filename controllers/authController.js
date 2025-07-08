const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Pengguna = require("../models/penggunaModel");

// REGISTER
exports.register = (req, res) => {
    const { nama, email, nomer_handphone, password, role } = req.body;

    // Cek apakah email, nama, atau nomor sudah digunakan
    Pengguna.findDuplicate(email, nama, nomer_handphone, (err, results) => {
        if (err) return res.status(500).json({ message: "Terjadi kesalahan server" });

        if (results.length > 0) {
            const duplicateFields = [];
            results.forEach(user => {
                if (user.email === email) duplicateFields.push("Email sudah digunakan");
                if (user.nama === nama) duplicateFields.push("Nama sudah digunakan");
                if (user.nomer_handphone === nomer_handphone) duplicateFields.push("Nomor handphone sudah digunakan");
            });

            return res.status(400).json({ message: duplicateFields });
        }

        // Jika tidak ada yang sama, lanjutkan proses register
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ message: "Error hashing password" });

            const newUser = {
                nama,
                email,
                nomer_handphone,
                password: hash,
                role: role || "user",
            };

            Pengguna.create(newUser, (err, result) => {
                if (err) {
                    console.error("ERROR REGISTER:", err);
                    return res.status(500).json({ message: "Error registering user", error: err });
                }
                res.json({ message: "Registrasi berhasil" });
            });
        });
    });
};

// LOGIN
exports.login = (req, res) => {
    const { email, password } = req.body;

    Pengguna.findByEmail(email, (err, results) => {
        if (err || results.length === 0) return res.status(404).json({ message: "Email tidak ditemukan" });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "24h" });
                res.json({
                    token,
                    user: {
                        id: user.id,
                        nama: user.nama,
                        email: user.email,
                        nomer_handphone: user.nomer_handphone,
                        role: user.role,
                        kontak_darurat: user.kontak_darurat,
                        alamat: user.alamat,
                        tanggal_lahir: user.tanggal_lahir,
                        foto_profile: user.foto_profile
                    }
                });
            } else {
                res.status(401).json({ message: "Password salah" });
            }
        });
    });
};
