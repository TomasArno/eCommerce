import CustomRouter from "../customRouter.js";

import {
  create,
} from "../../controllers/payments.controller.js";


class Router extends CustomRouter {
  init() {
    this.create("/checkout", ["PREMIUM", 'USER'], create);
  }
}

const paymentsRouter = new Router().getRouter();
export default paymentsRouter;
