import { Router } from "express";

const productsRouter = Router();

productsRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real");
  } catch (e) {
    next(e);
  }
});

productsRouter.get("/form", (req, res, next) => {
  try {
    return res.render("form");
  } catch (e) {
    next(e);
  }
});

export default productsRouter;
