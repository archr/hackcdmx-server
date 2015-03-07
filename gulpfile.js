// ES6
require('babel/register');

/**
 * Dependencias
 */
var gulp = require('gulp');
var minimist = require('minimist');

/**
 * Envia correo de registro
 */

gulp.task('register-email', function (cb) {
  var config = require('./config/config');
  var queue = require('./lib/queue');

  var options = minimist(process.argv.slice(2), {});

  if (!options.email) {
    console.log('email es requerido');
    return cb();
  }

  queue.create('email-register', {email: options.email})
  .save(function (err) {
    if (err) {
      console.log(err);
    }

    return cb();
  });
});