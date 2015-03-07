/**
 * Dependencias
 */

import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';

let SALT_WORK_FACTOR = 10;

/**
 * Definicion del modelo
 */

let UsuarioSchema = new Schema({
  email: {
    type: String,
    trim: true,
    required: 'El correo es requerido.',
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'El correo no es valido.'
    ]
  },
  password: {
    type: String,
    required: 'La contraseña es requerida.'
  },
  fecha_nacimiento: {
    type: Date
  },
  sexo_persona: {
    type: String
  },
  altura_persona: {
    type: Number
  },
  peso_persona: {
    type: Number
  },
  nombre: {
    type: String
  },
  ap_paterno: {
    type: String
  },
  ap_materno: {
    type: String
  },
  telefono: {
    type: Number
  },
  status: {
    type: Number,
    default: 1 //1: pendiente, 2: activo, 3: bloqueado
  }
}, {
  collection: 'hospitales'
});

/**
 * Encripta la contraseña si esta se actualiza
 */

 UsuarioSchema.pre('save', function (next) {
  if (!this.password || !this.isModified('password')) {
    return next();
  }

  try {
    var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    this.password =  bcrypt.hashSync(this.password, salt);
  } catch (err) {
    return next(err);
  }

  return next();
});

/**
 * Valida password
 */

 UsuarioSchema.methods.validatePassword = function (passport, done) {
  bcrypt.compare(passport, this.password, done);
};

/**
 * Se registra Schema
 */

let Usuario = mongoose.model('Usuario', UsuarioSchema);

/**
 * Se agregan promesas al Modelo
 */

Promise.promisifyAll(Usuario);
Promise.promisifyAll(Usuario.prototype);

/**
 * Se expone Modelo
 */

export default Usuario;


