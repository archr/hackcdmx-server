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
};

/**
 * Configuración de test
 */

env.test = {
}

/**
 * Configuración de producción
 */

env.production = {
}

/**
 * Connfiguración
 */

var config = env[NODE_ENV];
config.env = NODE_ENV;
config.root = path.resolve(__dirname, '../');

GLOBAL.config = config;

/**
 * Se expone la configuración
 */

export default config;