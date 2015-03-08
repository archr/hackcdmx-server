/**
 * Dependencias
 */

import mongoose, {Schema} from 'mongoose';
import Promise from 'bluebird';

/**
 * Definicion del modelo
 */

let HospitalSchema = new Schema({
  LATITUD: Number,
  LONGITUD: Number,
  DOMICILIO: String,
  INSTITUCION: String,
  TIPO: String,
  NOMBRE_CENTRO: String,
  NOMBRE_MUNICPIO: String,
  NOMBRE_ESTADO: String,
  location: {
    type: [Number],
    default: []
  }
}, {
  collection: 'hospitales'
});

HospitalSchema.index({
  location: '2d'
});

/**
 * Se registra Schema
 */

let Hospital = mongoose.model('Hospital', HospitalSchema);

/**
 * Se agregan promesas al Modelo
 */

Promise.promisifyAll(Hospital);
Promise.promisifyAll(Hospital.prototype);

/**
 * Se expone Modelo
 */

export default Hospital;