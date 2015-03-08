/**
 * Dependencias
 */

import mount from 'koa-mount';
import cors from 'koa-cors';

/**
 * Enrutador
 */

export default function (api) {
  api.use(cors());

  api.use(mount('/auth', require('./auth').middleware()));
  api.use(mount('/register', require('./register').middleware()));
  api.use(mount('/active-user', require('./active-user').middleware()));
  api.use(mount('/hospitals', require('./hospitals').middleware()));
  api.use(mount('/profile', require('./profile').middleware()));
  api.use(mount('/hospital', require('./hospital').middleware()));
};