import CustomRouter from "../customRouter.js";

import {
  create,
  read,
  readOne,
  update,
  updateRole,
  destroy,
} from "../../controllers/users.controller.js";

class Router extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], create);

    this.read("/", ["ADMIN"], read);

    this.update("/premium/:userId", ["ADMIN"], updateRole);

    this.read("/:userId", ["ADMIN"], readOne);

    this.update("/:userId", ["ADMIN"], update);

    this.destroy("/:userId", ["ADMIN"], destroy);
  }
}

const usersRouter = new Router().getRouter();
export default usersRouter;
