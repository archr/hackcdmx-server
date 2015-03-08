import Router from 'koa-router';
import Token from '../lib/token';

let token = new Token({
  redis: config.redis,
  seconds: config.seconds
});


let router = new Router();

export default router;

router.post('/', function *() {
  let data = yield token.get(this.headers.token);
  let usuario = yield Usuario.findOneAsync({email: data.email});
  usuario = usuario.toJSON();
  delete usuario.password
  this.body = usuario;
});