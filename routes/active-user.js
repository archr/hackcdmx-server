import Router from 'koa-router';
import Token from '../lib/token';

let router = new Router()
let token = new Token({
  redis: config.redis,
  seconds: config.seconds
});

export default router;

router.post('/', function *() {
  try {
    let data = yield token.get(this.request.body.token);
    if (!data) {
      this.status = 400;
      this.message = 'Token invalido';
    }

    let usuario = yield Usuario.findOneAsync({email: data.email});

    usuario.status = 2;
    yield usuario.saveAsync();
    token.destroy(this.request.body.token);

    this.body = 'Ok';

  } catch (err)  {
    this.status = 500;
    this.message = err.message;
  }
});