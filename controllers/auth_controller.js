const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { correo, contrasenia } = req.body;
    try {
        // Verificar al usuario por su email
        const usuarioDB = await Usuario.findOne({ correo });
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Email no encontrado'
                    //considerar la utilizacion de este mensaje
            });
        }

        // Verificar contraseña
        const validaPassword = bcrypt.compareSync(contrasenia, usuarioDB.contrasenia);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña no valida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}