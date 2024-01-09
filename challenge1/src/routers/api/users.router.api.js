import { Router } from "express";

import UsersManager from "../../data/fs/users.fs.js";

const usersRouter = Router();

usersRouter.post("/", async (req, res, next) => {
  try {
    const data = await UsersManager.create(req.body);

    if (typeof data === "string")
      return res.json({
        statusCode: 400,
        response: data,
      });

    res.json({
      statusCode: 200,
      response: data,
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

usersRouter.get("/:uId", async (req, res, next) => {
  try {
    const { uId } = req.params;

    const user = await UsersManager.readOne(uId);

    if (!user)
      return res.json({
        statusCode: 404,
        response: "User not found",
      });

    res.json({
      statusCode: 200,
      response: user,
    });
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
