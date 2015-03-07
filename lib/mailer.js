/**
 * Dependencias
 */

import campaign from 'campaign';
import nodemailer from 'nodemailer';
import jade from 'campaign-jade';
import Promise from 'bluebird';

/**
 * Constructor
 */

class Mailer {
  /**
   * Contructor
   * @param  {Object} options Opciones
   */
  constructor (options) {
    this.options = {};
    this.options.mandrill = options.mandrill || {};
    this.options.from = options.from || 'arche3r@gmail.com';
    this.options.templateEngine = jade;
    this.options.layout = options.layout || false;
    this.options.trap = options.trap || false;

    this.client = campaign(this.options);
  }
  /**
   * Envia email
   * @param  {String}   template template
   * @param  {Object}   options  Opciones
   * @param  {Function} done     callback
   */
  send (template, options, done) {
    let self = this;

    return new Promise(function (resolve, reject){
      self.client.send(template, options, function (err, data){
          if (err) {
            return reject(err);
          }else {
            return resolve(data);
          }
      });
    });
  }
}

/**
 * Se expone ApparelMailer
 */

export default Mailer;