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
  db: 'mongodb://localhost/hackcdmx-dev',
  redis: {
    port: 6379,
    ip: '127.0.0.1'
  },
  seconds: 60 * 60,
  mailer: {
    mandrill: {
      apiKey: '9eYPoKpKFH8a2FiXsCz54A',
      debug: true
    },
    trap: false,
    layout: __dirname + '/../templates/email/layouts/default.jade'
  }
};

/**
 * Configuración de test
 */

env.test = {
  db: 'mongodb://localhost/hackcdmx-test',
  redis: {
    port: 6379,
    ip: '127.0.0.1'
  },
  seconds: 60 * 60,
  mailer: {
    mandrill: {
      apiKey: '9eYPoKpKFH8a2FiXsCz54A',
      debug: true
    },
    trap: true,
    layout: __dirname + '/../templates/email/layouts/default.jade'
  }
}

/**
 * Configuración de producción
 */

env.production = {
  db: 'mongodb://localhost/hackcdmx-prod',
  redis: {
    port: 6379,
    ip: '127.0.0.1'
  },
  seconds: 60 * 60,
  mailer: {
    mandrill: {
      apiKey: '9eYPoKpKFH8a2FiXsCz54A',
      debug: true
    },
    trap: false,
    layout: __dirname + '/../templates/email/layouts/default.jade'
  }
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