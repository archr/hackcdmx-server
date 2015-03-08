import Router from 'koa-router';

let router = new Router();

export default router;

router.post('/', function *() {
  let body = this.request.body;

  let query = {
    location: {
      $near: [+body.latitude, +body.longitude],
      $maxDistance: 5 / 111.2
    }
  }

  let hospitales = yield Hospital.find({}).exec();

  this.body = hospitales;
});