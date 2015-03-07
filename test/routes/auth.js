var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../');

describe('/auth', function () {
  var usuario = {
    email: 'arche3r@gmail.com',
    password: 'qwerty',
    nombre: 'Antonio Sandoval'
  }

  before(function (done) {
    Usuario.removeAsync({}).then(function () {
      return Usuario.createAsync([usuario]);
    }).then(function () {
      done();
    });
  });

  it('Correo electronico y contraseña son necesarios.', function (done) {
    request(app.listen())
      .post('/auth')
      .send({})
      .expect(400, 'Correo electronico y contraseña son necesarios.')
      .end(done);
  });

  it('Correo electronico ó contraseña son incorrectos.', function (done) {
    request(app.listen())
      .post('/auth')
      .send({email: 'foo', password: 'bar'})
      .expect(401, 'Correo electronico ó contraseña son incorrectos.')
      .end(done);
  });

  it('Correo electronico ó contraseña son incorrectos.', function (done) {
    request(app.listen())
      .post('/auth')
      .send({email: 'archr', password: 'bar'})
      .expect(401, 'Correo electronico ó contraseña son incorrectos.')
      .end(done);
  });

  it('Ok.', function (done) {
    request(app.listen())
      .post('/auth')
      .send({email: usuario.email, password: usuario.password})
      .expect(200, {
        email: usuario.email,
        nombre: usuario.nombre
      })
      .end(done);
  });
});