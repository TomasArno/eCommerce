import CustomRouter from "../customRouter.js";

import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controller.js";

import isAdmin from "../../middlewares/isAdmin.mid.js";
import { checkUserId } from "../../middlewares/checkUserId.mid.js";

class Router extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);

    this.read(
      "/",
      ["PUBLIC"],
      read
    );

    this.read(
      "/:userId",
      ["PUBLIC"],
      readOne
    );

    this.update(
      "/:userId",
      ["PUBLIC"],
      isAdmin,
      update
    );

    this.destroy(
      "/:userId",
      ["PUBLIC"],
      isAdmin,
      destroy
    );
  }
}

const usersRouter = new Router().getRouter();
export default usersRouter;
