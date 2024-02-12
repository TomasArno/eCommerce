import { Router } from "express";

import { Users } from "../../data/mongo/mongo.manager.js";

import { checkUserId } from "../../middlewares/checkUserId.mid.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = await Users.create(req.body);

    res.json({
      statusCode: 201,
      response: newUser,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const { name, email } = req.query;

    const filter = {};
    const order = { name: req.query.order || 1 };

    if (name) filter.name = name;
    if (email) filter.email = email;

    const users = await Users.read({ filter, order });

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

usersRouter.get("/:userId", checkUserId, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await Users.readOne(userId);

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
