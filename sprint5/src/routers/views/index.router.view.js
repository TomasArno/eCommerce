import { Router } from "express";

import usersRouter from "./users.router.view.js";

import productsRouter from "./products.router.view.js";
import ProductManager from "../../data/fs/products.fs.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductManager.read();

    return res.render("index", {
      products,
    });
  } catch (e) {
    next(e);
  }
});

viewsRouter.use("/users", usersRouter);
viewsRouter.use("/products", productsRouter);

export default viewsRouter;
