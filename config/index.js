/**
 * Dependencias
 */

import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import config from './config';

export default function (api){
  if (api.env !== 'test'){
    api.use(logger());
  }

  api.use(bodyParser());

  api.on('error', function (err, ctx) {
    console.log(err.stack);
  });
}
