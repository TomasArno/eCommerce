import { Router } from "express";

import usersRouter from "./users.router.view.js";

import productsRouter from "./products.router.view.js";

import { Products } from "../../data/mongo/mongo.manager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const data = {
      filter: {},
      sortAndPaginate: {},
    };

    const { docs } = await Products.read(data);

    return res.render("index", {
      products: docs,
    });
  } catch (e) {
    next(e);
  }
});

viewsRouter.use("/users", usersRouter);
viewsRouter.use("/products", productsRouter);

export default viewsRouter;
