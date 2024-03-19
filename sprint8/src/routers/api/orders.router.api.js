import CustomRouter from "../customRouter.js";

import {
  create,
  read,
  readOne,
  destroy,
  update,
} from "../../controllers/orders.controller.js";

import passportCb from "../../middlewares/passportCb.mid.js";
import { checkUserId } from "../../middlewares/checkUserId.mid.js";
import { checkOrderId } from "../../middlewares/checkOrderId.mid.js";
import { checkProductId } from "../../middlewares/checkProductId.mid.js";

class Router extends CustomRouter {
  init() {
    this.create(
      "/",
      ["PUBLIC"],
      passportCb("jwt"),
      checkUserId,
      checkProductId,
      create
    );

    this.read("/", ["PUBLIC"], passportCb("jwt"), read);

    this.read("/:userId", ["PUBLIC"], passportCb("jwt"), checkUserId, readOne);

    this.read(
      "/total/:userId",
      passportCb("jwt"),
      checkUserId,
      async (req, res, next) => {
        try {
          const { userId } = req.params;

          const user = await orders.report(userId);

          res.json({
            statusCode: 200,
            response: user,
          });
        } catch (e) {
          next(e);
        }
      }
    );

    this.update(
      "/:orderId",
      ["PUBLIC"],
      passportCb("jwt"),
      checkOrderId,
      update
    );

    this.destroy(
      "/:orderId",
      ["PUBLIC"],
      passportCb("jwt"),
      checkOrderId,
      destroy
    );
  }
}

const ordersRouter = new Router().getRouter();

export default ordersRouter;
