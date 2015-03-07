/**
 * Dependencias
 */
import path from 'path';

var env = {};
var NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Configuración de desarrollo
 */

env.development = {
  db: 'mongodb://localhost/hackcdmx-dev'
};

/**
 * Configuración de test
 */

env.test = {
  db: 'mongodb://localhost/hackcdmx-test'
}

/**
 * Configuración de producción
 */

env.production = {
  db: 'mongodb://localhost/hackcdmx-prod'
}

/**
 * Connfiguración
 */

var config = env[NODE_ENV];
config.env = NODE_ENV;
config.root = path.resolve(__dirname, '../');

/**
 * Configuración GLOBAL
 */
GLOBAL.config = config;

/**
 * Se expone la configuración
 */

export default config;