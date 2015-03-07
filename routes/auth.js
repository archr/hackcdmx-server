import Router from 'koa-router';

let router = new Router()

export default router;

router.post('/', function *() {
  let body = this.request.body;

  if (!body.username || !body.password) {
    this.status = 400;
    this.message = 'Username and password are required.'
    return;
  }

  this.body = 'Ok';
});