import CustomRouter from "../customRouter.js";

import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";

class Router extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/orders", ordersRouter);
  }
}

const apiRouter = new Router().getRouter();
export default apiRouter;
