import { Router } from "express";

import { Users } from "../../data/mongo/mongo.manager.js";

import has8Char from "../../middlewares/has8Char.mid.js";
import isValidPass from "../../middlewares/isValidPass.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", has8Char, async (req, res, next) => {
  try {
    const { password, ...data } = req.body;

    await Users.create(data);

    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/login", isValidPass, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email && password === "hola1234") {
      req.session.email = email;
      req.session.role = "user";

      return res.json({
        statusCode: 200,
        message: "Logged in!",
        session: req.session,
      });
    }

    const error = new Error("Bad Auth");
    error.statusCode = 401;

    throw error;
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/signout", async (req, res, next) => {
  try {
    if (req.session.email) {
      req.session.destroy();

      return res.json({
        statusCode: 200,
        message: "Signed out!",
      });
    }
    const error = new Error("No Auth");
    error.statusCode = 400;

    throw error;
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
