const PromiseRouter = require('express-router-wrapper');
const router = new PromiseRouter();
const Controller = require('./controller');

router
  .get('/', () => Controller.get());

router
  .delete('/', () => Controller.delete());

router
  .post('/', ({body}) => Controller.create(body));

router
  .get('/:id', ({params}) => Controller.get(params.id));

router
  .put('/:id', ({params, body}) => Controller.update(params.id, body));

router
  .delete('/:id', ({params}) => Controller.delete(params.id));


module.exports = router.getOriginal();
