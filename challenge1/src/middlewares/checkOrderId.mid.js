import OrdersManager from "../data/fs/orders.fs.js";

export async function checkOrderId(req, res, next) {
  const oId = req.params.oId || req.body.oId;

  const orderSearched = await OrdersManager.readOne(oId);

  if (!orderSearched) {
    res.json({ statusCode: 404, message: "Order not found" });
  } else {
    next();
  }
}
