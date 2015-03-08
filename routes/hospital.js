import Router from 'koa-router';
import Token from '../lib/token';
import {Schema} from 'mongoose';

let router = new Router();

export default router;

router.post('/', function *() {
  let body = this.request.body;
  let hospital = yield Hospital.findOneAsync({_id: body.id});
  this.body = hospital;
});