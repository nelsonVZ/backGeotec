const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true,
        unique: true
    },
    telefono: {
        type: Number,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    contrasenia: {
        type: String,
        require: true
    },
    imagen: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },
    tipo: {
        type: String,
        require: true,
        default: 'FREE'
    }

});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, contrasenia, ...object } = this.toObject();
    object.UID = _id;
    return object
});

module.exports = model('Usuario', UsuarioSchema);