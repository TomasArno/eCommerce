import CustomRouter from './customRouter.js';

import apiRouter from './api/index.router.api.js';
// import viewsRouter from './views/index.router.view.js';

class Router extends CustomRouter {
  init() {
    this.router.use('/api', apiRouter);
    // this.use('/', viewsRouter);
  }
}

const indexRouter = new Router().getRouter();

export default indexRouter;
