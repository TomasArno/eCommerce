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
    const { name, email, page, limit } = req.query;

    const filter = {};

    if (name) filter.name = name;
    if (email) filter.email = email;

    const sortAndPaginate = { page, limit };

    if (!page) sortAndPaginate.page = 1;
    if (!limit) sortAndPaginate.limit = 20;

    const users = await Users.read({ filter, sortAndPaginate });

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
    res.json({
      statusCode: 200,
      response: req._user,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.put("/:userId", checkUserId, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const modifiedUser = await Users.update(userId, req.body);

    res.json({
      statusCode: 200,
      response: modifiedUser,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.delete("/:userId", checkUserId, async (req, res, next) => {
  try {
    const { userId } = req.params;

    const deletedUser = await Products.destroy(userId);

    res.json({
      statusCode: 200,
      response: deletedUser,
    });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
