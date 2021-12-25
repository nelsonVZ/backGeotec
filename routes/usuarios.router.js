const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios, crearUsuario } = require('../controllers/usuarios.controller');
const router = Router();

router.get('/', validarJWT, getUsuarios);


router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('usuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('contrasenia', 'La contraseña es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    crearUsuario
);

module.exports = router;