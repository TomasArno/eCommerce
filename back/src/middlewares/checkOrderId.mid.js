import orders from '../services/orders.service.js';


export async function checkOrderId(req, res, next) {
  try {
    const orderId = req.params.orderId || req.body.orderId;

    await orders.readOne(orderId);

    req._order = searchedOrder;

    next();
  } catch (error) {
    res.json({
      statusCode: 404,
      message: 'Order doesn´t exists',
    });
  }
}
