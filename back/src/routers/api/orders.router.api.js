import CustomRouter from "../customRouter.js";

import {
  create,
  read,
  destroy,
  update,
  readOne,
} from "../../controllers/orders.controller.js";

import addUser from "../../middlewares/addUser.mid.js"

class Router extends CustomRouter {
  init() {
    this.create("/", ["PREMIUM", 'USER'], addUser, create);
    this.read("/", ["PREMIUM", 'USER'], read);
    this.read("/:orderId", ["PREMIUM", 'USER'], readOne);
    this.update("/:orderId", ["PREMIUM", 'USER'], update);
    this.destroy("/:orderId", ["PREMIUM", 'USER'], destroy);
  }
}

const ordersRouter = new Router().getRouter();
export default ordersRouter;
