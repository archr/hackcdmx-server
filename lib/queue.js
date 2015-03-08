import kue from 'kue';
import Debug from 'debug';
import Mailer from './mailer';
import Token from './token';

let debug = Debug('hackcdmx:queue');
let jobs = kue.createQueue();
let mailer = new Mailer(config.mailer);
let token = new Token({
  redis: config.redis,
  seconds: 60 * 60
});

export default jobs;

jobs.on('job complete', function(id,result){
  kue.Job.get(id, function(err, job){
    if (err) {
      return debug(`job completed: error ${err.message}`)
    }
    job.remove(function(err){
      if (err) {
        return debug(`job completed remove: error ${err.message}`)
      }
    });
  });
});

jobs.process('email-register', function(job, done){
  debug(`email-register: new job ${JSON.stringify(job.data)}`);

  let template = `${config.root}/templates/email/register.jade`
  let data = {
    email: job.data.email
  };

  token.generate(data)
  .then(function (tid) {
    let linkActiveUser = 'https://hackcdmx-site.ngrok.com/#/active-user/' + tid

    debug(`email-register: generate token ${tid}`);
    return mailer.send(template, {
      to: job.data.email,
      subject: 'Bienvenido a Citas SEDESA',
      social: {},
      linkActiveUser: linkActiveUser,
      mandrill: {},
    });
  })
  .then(function (data) {
    debug(`email-register: email sent`);
    done();
  })
  .catch(function (err) {
    debug(`email-register:error ${err.message}`);
    done();
  });
});

jobs.process('email-date', function(job, done){
  debug(`email-date: new job ${JSON.stringify(job.data)}`);

  let template = `${config.root}/templates/email/date.jade`
  let data = {
    email: job.data.email
  };

  token.generate(data)
  .then(function (tid) {
    debug(`email-date: generate token ${tid}`);

    return mailer.send(template, {
      to: job.data.email,
      subject: 'Tu cita a sido registrada.',
      social: {},
      mandrill: {},
    });
  })
  .then(function (data) {
    debug(`email-date: email sent`);
    done();
  })
  .catch(function (err) {
    debug(`email-date:error ${err.message}`);
    done();
  });
});