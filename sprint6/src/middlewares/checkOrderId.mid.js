import { Orders } from "../data/mongo/mongo.manager.js";

export async function checkOrderId(req, res, next) {
  try {
    const orderId = req.params.orderId || req.body.orderId;

    await Orders.readOne(orderId);

    req._order = searchedOrder;

    next();
  } catch (error) {
    res.json({
      statusCode: 404,
      response: "Order doesn´t exists",
    });
  }
}
