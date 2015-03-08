import Router from 'koa-router';
import Token from '../lib/token';
import {Schema} from 'mongoose';
import queue from '../lib/queue';

let token = new Token({
  redis: config.redis,
  seconds: config.seconds
});

let router = new Router();

export default router;

router.post('/', function *() {
  let body = this.request.body;
  console.log(this.headers);

  let cita = new Cita({data:body});
  yield cita.saveAsync();

  let data = yield token.get(this.headers.token);
  let usuario = yield Usuario.findOneAsync({email: data.email});
  queue.create('email-date', usuario.toJSON()).priority('high').attempts(5).save();

  this.body = 'Ok';
});