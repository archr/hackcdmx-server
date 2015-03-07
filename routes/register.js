import Router from 'koa-router';
import _ from 'underscore';
import queue from '../lib/queue';

let router = new Router()

export default router;

let fields = ['email', 'password', 'fecha_nacimiento', 'sexo_persona', 'altura_persona', 'peso_persona',
  'nombre', 'ap_paterno', 'ap_materno', 'telefono']

router.post('/', function *() {
  let body = this.request.body;

  let missingParams = [];
  fields.forEach(field => {
    if(!body[field]) {
      missingParams.push(field);
    }
  });

  if (missingParams.length) {
    this.status = 400;
    this.message = `Campos incompletos: ${missingParams.join(', ')}.`
    return;
  }

  let usuario = yield Usuario.findOneAsync({
    email: body.email
  });

  if (usuario) {
    this.status = 400;
    this.message = 'Existe un usuario registrado anteriormente.';
    return;
  }

  usuario = new Usuario(body);

  try {
    yield usuario.saveAsync()
    if (config.env !== 'test') {
      queue.create('email-register', usuario.toJSON()).priority('high').attempts(5).save();
    }

    this.body = 'Ok.';
  } catch (err) {
    this.status = 500;
    this.message = err.message;
  }

});