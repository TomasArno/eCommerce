import { Router } from "express";

import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.api.js";
import productsRouter from "./products.router.api.js";
import ordersRouter from "./orders.router.api.js";

const apiRouter = Router();

apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);

export default apiRouter;
