import CustomRouter from "../customRouter.js";

import passportCb from "../../middlewares/passportCb.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";

class Router extends CustomRouter {
  init() {
    this.read(
      "/form",
      ["PUBLIC"],
      passportCb("jwt"),
      isAdmin,
      (req, res, next) => {
        try {
          res.render("form");
        } catch (e) {
          next(e);
        }
      }
    );
  }
}

const productsRouter = new Router().getRouter();
export default productsRouter;
