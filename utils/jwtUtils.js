// middlewares/authorization.js
const { verifyToken } = require('../utils/jwtUtils');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assuming the token is sent as Bearer <token>

    if (!token) {
        return res.status(401).send({ message: 'No token provided' });
    }

    try {
        const decoded = verifyToken(token);
        req.userId = decoded.id; // Store user ID in request for later use
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).send({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = { verifyToken };
