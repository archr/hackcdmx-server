// ES6
require('babel/register');

/**
 * Dependencias
 */

var koa = require('koa');
var config = require('./config');
var routes = require('./routes');

/**
 * Se expone koa
 */

module.exports = api = koa();

config(api);
routes(api);

/**
 * Se inicia el servidor
 */
if (!module.parent) {
  api.listen(8080);
  console.log('Server running on port 8080');
}