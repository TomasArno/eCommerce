import CustomRouter from "../customRouter.js";

import ordersService from "../../services/orders.service.js";

import passportCb from "../../middlewares/passportCb.mid.js";

class Router extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], passportCb("jwt"), async (req, res, next) => {
      try {
        const { email } = req.user;

        const userOrders = await ordersService.read({ filter: { email } });

        res.render("orders", {
          orders: userOrders,
        });
      } catch (e) {
        next(e);
      }
    });
  }
}

const ordersRouter = new Router().getRouter();
export default ordersRouter;
