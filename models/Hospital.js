/**
 * Dependencias
 */

import mongoose, {Schema} from 'mongoose';
import Promise from 'bluebird';

/**
 * Definicion del modelo
 */

let HospitalSchema = new Schema({
}, {
  collection: 'hospitales'
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