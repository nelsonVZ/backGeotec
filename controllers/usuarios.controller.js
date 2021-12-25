const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');

const getUsuarios = async(req, res) => {
    //const usuarios = await Usuario.find();
    const usuarios = await Usuario.find({}, 'nombre correo tipo google');
    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {
    //console.log(req.body); --> para saber si esta resiviendo los datos
    const { correo, contrasenia, nombre } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ correo });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email ya ha sido reguistrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.contrasenia = bcrypt.hashSync(contrasenia, salt);

        //indicamos a mongoose que registre al usuario en la bd
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario
}