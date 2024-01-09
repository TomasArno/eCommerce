import { Router } from "express";

import OrdersManager from "../../data/fs/orders.fs.js";

import { checkUserId } from "../../middlewares/checkUserId.mid.js";
import { checkOrderId } from "../../middlewares/checkOrderId.mid.js";
import { checkProductId } from "../../middlewares/checkProductId.mid.js";

const ordersRouter = Router();

ordersRouter.post("/", checkUserId, checkProductId, async (req, res, next) => {
  try {
    const data = await OrdersManager.create(req.body);

    res.json({
      statusCode: 200,
      response: data,
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.get("/:uId", checkUserId, async (req, res, next) => {
  try {
    const { uId } = req.params;

    const user = await OrdersManager.readByUser(uId);

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.delete("/:oId", checkOrderId, async (req, res, next) => {
  try {
    const { oId } = req.params;

    await OrdersManager.destroy(oId);

    res.json({
      statusCode: 200,
      response: "Order successfully deleted",
    });
  } catch (e) {
    next(e);
  }
});

export default ordersRouter;
