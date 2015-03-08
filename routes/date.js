import Router from 'koa-router';
import Token from '../lib/token';
import {Schema} from 'mongoose';

let router = new Router();

export default router;

router.post('/', function *() {
  let body = this.request.body;

  let cita = new Cita({data:body});
  yield cita.saveAsync();

  this.body = 'Ok';
});