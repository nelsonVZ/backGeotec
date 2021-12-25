const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la peticion'
        });
    }

    try {
        const { UID } = jwt.verify(token, process.env.JWT_SECRET);
        req.UID = UID;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}