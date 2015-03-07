import mount from 'koa-mount';

export default function (api) {
  api.use(mount('/auth', require('./auth').middleware()));

  api.use(function *(){
    this.body = 'Ok';
  });
};