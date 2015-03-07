// ES6
require('babel/register');

var expect = require('chai').expect;
var Promise = require('bluebird');
var redis = Promise.promisifyAll(require('redis'));
var config = require('../../config/config');
var Token = require('../../lib/token');

var token = new Token({
  redis: config.redis,
  seconds: 5
});

describe('Token', function (){
  it('instance', function (){
    expect(token.prefix).to.equal('hackcdmx:token:');
    expect(token.seconds).to.equal(5);
  });

  it('generate', function (done){
    token.generate({email: 'arche3r@gmail.com'}).then(function (tid) {
      expect(tid.length).to.equal(16);
      done();
    });
  });

  it('get', function (done) {
    token.generate({foo: 'bar'}).then(function (tid) {
      token.get(tid).then(function (data) {
        expect(data.foo).to.equal('bar');
        done();
      });
    });
  });

  it('no token', function (done) {
    token.get('notoken').then(function (data) {
    }, function (err) {
      expect(err.message).to.equal('Not found token');
      done();
    });
  });

  it('destroy', function (done) {
    token.generate({email: 'arche3r@gmail.com'}).then(function (tid) {
      token.destroy(tid).then(function (msg){
        expect(msg).to.equal(1);
        token.get(tid).then(function (tid) {
        }, function (err) {
          expect(err.message).to.equal('Not found token');
          done();
        });
      });
    });
  });

  it('set', function (done) {
    var tid = "";
    token.generate({email: 'arche3r@gmail.com'}).then(function (_tid) {
      var info = {
        'foo': 'bar'
      };

      tid = _tid;
      token.set(tid, info).then(function (isOk) {
        token.get(tid).then(function (data) {
          expect(data.foo).to.equal(info.foo);
          expect(data.email).to.equal('arche3r@gmail.com');
          done();
        });
      });
    });
  });
});