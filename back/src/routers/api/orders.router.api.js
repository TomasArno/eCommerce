import CustomRouter from "../customRouter.js";

import {
  create,
  report,
  read,
  readOne,
  destroy,
  update,
} from "../../controllers/orders.controller.js";

import addUser from "../../middlewares/addUser.mid.js"

class Router extends CustomRouter {
  init() {
    this.create("/", ['ADMIN', "PREMIUM", 'USER'], addUser, create);
    this.read("/", ['ADMIN', "PREMIUM", 'USER'], read);
    this.read("/:userId", ['ADMIN', "PREMIUM", 'USER'], readOne);
    this.read("/total/:userId", ['ADMIN', "PREMIUM", 'USER'], report);
    this.update("/:orderId", ['ADMIN', "PREMIUM", 'USER'], update);
    this.destroy("/:orderId", ['ADMIN', "PREMIUM", 'USER'], destroy);
  }
}

const ordersRouter = new Router().getRouter();
export default ordersRouter;
