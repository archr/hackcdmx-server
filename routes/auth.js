import Router from 'koa-router';
import Token from '../lib/token';

let router = new Router()
let token = new Token({
  redis: config.redis,
  seconds: config.seconds
});

export default router;

router.post('/', function *() {
  let body = this.request.body;

  if (!body.email || !body.password) {
    this.status = 400;
    this.message = 'Correo electronico y contraseña son necesarios.'
    return;
  }

  var usuario = yield Usuario.findOneAsync({
    email: body.email
  });

  if (!usuario) {
    this.status = 401;
    this.message = 'Correo electronico ó contraseña son incorrectos.'
    return;
  }

  var isValidPassword = yield usuario.validatePasswordAsync(body.password);

  if (!isValidPassword) {
    this.status = 401;
    this.message = 'Correo electronico ó contraseña son incorrectos.';
    return;
  }

  let tid = yield token.generate(usuario);

  this.body = {
    email: usuario.email,
    nombre: usuario.nombre,
    token: tid
  };
});