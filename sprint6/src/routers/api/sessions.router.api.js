import { Router } from "express";

import { Users } from "../../data/mongo/mongo.manager.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res, next) => {
  try {
    const data = req.body;

    await Users.create(data);

    return res.json({
      statusCode: 201,
      message: "Registered!",
    });
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.post("/login", async (req, res, next) => {
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
