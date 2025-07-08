const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) return res.status(403).json({ message: 'Token tidak tersedia.' });

    const token = authHeader.split(' ')[1]; // Pisahkan "Bearer" dan token-nya

    if (!token) return res.status(403).json({ message: 'Token tidak tersedia.' });

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token tidak valid.' });
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    });
};

module.exports = verifyToken;
