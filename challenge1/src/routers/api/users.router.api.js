import { Router } from "express";

import UsersManager from "../../data/fs/users.fs.js";

import { checkUserId } from "../../middlewares/checkUserId.mid.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const userCreated = await UsersManager.create(req.body);

    res.json({
      statusCode: 201,
      response: userCreated,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UsersManager.read();

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

usersRouter.get("/:uId", checkUserId, async (req, res, next) => {
  try {
    const { uId } = req.params;

    const user = await UsersManager.readOne(uId);

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
