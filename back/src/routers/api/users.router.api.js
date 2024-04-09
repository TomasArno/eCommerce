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
    this.create("/", ["PUBLIC"], isAdmin, create);

    this.read(
      "/",
      ["PUBLIC"],
      //   isAdmin,
      read
    );

    this.read(
      "/:userId",
      ["PUBLIC"],

      isAdmin,
      checkUserId,
      readOne
    );

    this.update(
      "/:userId",
      ["PUBLIC"],

      isAdmin,
      checkUserId,
      update
    );

    this.destroy(
      "/:userId",
      ["PUBLIC"],

      isAdmin,
      checkUserId,
      destroy
    );
  }
}

const usersRouter = new Router().getRouter();
export default usersRouter;
