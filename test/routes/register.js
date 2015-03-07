var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../');

describe('/register', function () {
  var usuario = {
    email: 'berser.ar@gmail.com',
    password: 'test',
    fecha_nacimiento: new Date(),
    sexo_persona: 'Masculino',
    altura_persona: 1.68,
    peso_persona: 80,
    nombre: 'Jorge Antonio',
    ap_paterno: 'Sandoval',
    ap_materno: 'Garcia',
    telefono: 5552522177
  }

  before(function (done) {
    Usuario.removeAsync({}).then(function () {
      done();
    });
  });

  it('Campos incompletos.', function (done) {
    request(app.listen())
      .post('/register')
      .send({})
      .expect(400, 'Campos incompletos: email, password, fecha_nacimiento, sexo_persona, altura_persona, peso_persona, nombre, ap_paterno, ap_materno, telefono.')
      .end(done);
  });

  it('Nuevo usuario.', function (done) {
    request(app.listen())
      .post('/register')
      .send(usuario)
      .expect(200, 'Ok.')
      .end(done);
  });

  it('Usuario existente.', function (done) {
    request(app.listen())
      .post('/register')
      .send(usuario)
      .expect(400, 'Existe un usuario registrado anteriormente.')
      .end(done);
  });

});