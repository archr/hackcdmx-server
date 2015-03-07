// ES6
require('babel/register');

var expect = require('chai').expect;
var Mailer = require('../../lib/mailer');

var mailer = new Mailer({
  mandrill: {
    apiKey: '9eYPoKpKFH8a2FiXsCz54A',
    debug: true
  },
  trap: false,
  layout: __dirname + '/../../templates/email/layouts/default.jade'
});

describe('mailer', function () {
  it('instance', function () {
    expect(mailer.options.mandrill.apiKey).equal('9eYPoKpKFH8a2FiXsCz54A');
  });
});