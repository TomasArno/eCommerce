import { Router } from "express";

const authRouter = Router();

authRouter.get("/register", (req, res, next) => {
  try {
    return res.render("register");
  } catch (e) {
    next(e);
  }
});

authRouter.get("/login", (req, res, next) => {
  try {
    return res.render("login");
  } catch (e) {
    next(e);
  }
});

export default authRouter;
