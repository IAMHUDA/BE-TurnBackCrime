const adminOnly = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang diizinkan.' });
    }
    next();
};


module.exports = adminOnly;