/**
 * Dependencias
 */

import mongoose, {Schema} from 'mongoose';
import Promise from 'bluebird';

/**
 * Definicion del modelo
 */

let CitaSchema = new Schema({
  data: Schema.Types.Mixed
}, {
  collection: 'citas'
});

/**
 * Se registra Schema
 */

let Cita = mongoose.model('Cita', CitaSchema);

/**
 * Se agregan promesas al Modelo
 */

Promise.promisifyAll(Cita);
Promise.promisifyAll(Cita.prototype);

/**
 * Se expone Modelo
 */

export default Cita;