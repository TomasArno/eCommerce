import { Orders } from "../data/mongo/mongo.manager.js";

export async function checkOrderId(req, res, next) {
  const orderId = req.params.orderId || req.body.orderId;

  const searchedOrder = await Orders.readOne(orderId);

  if (!searchedOrder) {
    res.json({ statusCode: 404, response: "Order not found" });
  } else {
    next();
  }
}
