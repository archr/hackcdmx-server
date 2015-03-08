/**
 * Dependencias
 */

import _ from 'underscore';
import Promise from 'bluebird';
import redis from 'redis';

/**
 * Diccionario
 */

const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

/**
 * PromisifyAll redis
 */
redis = Promise.promisifyAll(redis);

/**
 * Creación de tokens
 */

class Token {
  /**
   * Contructor
   * @param  {Object} options Opciónes
   */
  constructor(options) {
    this.options = options || {};
    this.prefix = this.options.prefix || 'hackcdmx:token:';
    this.seconds = this.options.seconds || 60 * 60;
    this.client = redis.createClient(options.redis);
  }
  /**
   * Obtiene información token
   * @param  {String} tid Token id
   * @return {Object}     Información del token
   */
  get (tid) {
    let self = this;
    let ptid = self.prefix + tid;

    return self.client.getAsync(ptid).then(function (data) {
      if (!data) {
        let err = new Error('El token no es valido.');
        throw err;
      }

      return JSON.parse(data);
    });
  }
  /**
   * Guarda información al token
   * @param {String} tid    Token id
   * @param {Object} params Parametros
   */
  set (tid, params) {
    let self = this;
    let ptid = this.prefix + tid;

    return self.get(tid).then(function (data) {
      data = data || {};

      for(let key in params) {
        data[key] = params[key];
      }

      data = JSON.stringify(data);
      return self.client.setAsync(ptid , data);
    });
  }
  /**
   * Elimina token
   * @param  {String} tid Token id
   * @return {Boolean}
   */
  destroy (tid) {
    tid = this.prefix + tid;

    return this.client.delAsync(tid);
  }
  /**
   * Genera un token
   * @param  {Object} options Opciones
   * @return {String}         Token id
   */
  generate (options) {
    let self = this;
    let tid = _.shuffle(chars).slice(0,16).join('');
    let ptid = self.prefix + tid;

    let data = JSON.stringify(options);

    return self.client.getAsync(ptid).then(function (token) {
      if (token) {
        return this.generate(options);
      } else {
        return self.client.setAsync(ptid , data).then(function () {
          return self.client.setexAsync(ptid, self.seconds, data).then(function (){
            return tid;
          });
        });
      }
    });
  }
}

/**
 * Se expone Token
 */
export default Token;