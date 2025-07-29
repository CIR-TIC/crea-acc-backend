// middlewares/authJwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config'); // Asegúrate de que tu secreto JWT esté aquí

const verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({ message: 'No token provided!' });
    }

    // Si el token viene como "Bearer TOKEN", extraemos solo el TOKEN
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            // Maneja diferentes errores de JWT
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send({ message: 'Unauthorized! Access Token has expired.' });
            }
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).send({ message: 'Unauthorized! Invalid Access Token.' });
            }
            return res.status(401).send({ message: 'Unauthorized!' });
        }

        // Si el token es válido, guarda el ID del usuario en el objeto de solicitud
        req.userId = decoded.id;
        next(); // Pasa al siguiente middleware o a la función de la ruta
    });
};

module.exports = {
    verifyToken,
};