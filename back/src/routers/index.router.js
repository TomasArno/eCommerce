import CustomRouter from "./customRouter.js";

import apiRouter from "./api/index.router.api.js";

class Router extends CustomRouter {
  init() {
    this.use("/api", apiRouter);
  }
}

const indexRouter = new Router().getRouter();

export default indexRouter;
