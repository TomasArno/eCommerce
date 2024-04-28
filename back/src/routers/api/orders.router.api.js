import CustomRouter from "../customRouter.js";

import {
  create,
  report,
  read,
  readOne,
  destroy,
  update,
} from "../../controllers/orders.controller.js";


class Router extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:userId", ["PUBLIC"], readOne);
    this.read("/total/:userId", ["PUBLIC"], report);
    this.update("/:orderId", ["PUBLIC"], update);
    this.destroy("/:orderId", ["PUBLIC"], destroy);
  }
}

const ordersRouter = new Router().getRouter();
export default ordersRouter;
