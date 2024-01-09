import { Router } from "express";

import OrdersManager from "../../data/fs/orders.fs.js";

const ordersRouter = Router();

ordersRouter.post("/", async (req, res, next) => {
  try {
    const data = await OrdersManager.create(req.body);

    if (typeof data === "string")
      return res.json({
        statusCode: 400,
        response: data,
      });

    res.json({
      statusCode: 200,
      response: data,
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.get("/:uId", async (req, res, next) => {
  try {
    const { uId } = req.params;

    const user = await OrdersManager.readByUser(uId);

    if (!user)
      return res.json({
        statusCode: 404,
        response: "User not found",
      });

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    next(e);
  }
});

ordersRouter.delete("/:oId", async (req, res, next) => {
  try {
    const users = await OrdersManager.read();

    if (!users.length)
      return res.json({
        statusCode: 404,
        response: "Users not found",
      });

    res.json({
      statusCode: 200,
      response: users,
    });
  } catch (e) {
    next(e);
  }
});

export default ordersRouter;
