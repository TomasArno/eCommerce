import { Router } from "express";

const usersRouter = Router();

usersRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register");
  } catch (e) {
    next(e);
  }
});

export default usersRouter;
