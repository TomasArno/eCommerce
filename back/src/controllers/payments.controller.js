import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"
import payments from "../services/payments.service.js"

import addLog from "../utils/logs/addLog.utils.js"


class PaymentsController {
  constructor() {
  }

  async create(req, res, next) {
    try {
      const { _id } = req.user
      const response = await payments.create(_id)

      addLog(req.user._id, "Intento pago creado")

      res.json({
        statusCode: 201,
        response,
      });
    } catch (e) {
      next(e);
    }
  }
}

const paymentController = new PaymentsController();

const { create } = paymentController;

export { create };
