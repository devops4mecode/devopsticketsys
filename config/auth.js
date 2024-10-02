const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'devops4meglobalthebest2024';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        console.log('No token found in request');
        return res.sendStatus(401); // If no token, return Unauthorized
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.sendStatus(403); // If token is invalid, return Forbidden
        }
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };
