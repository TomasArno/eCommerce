import CustomRouter from "../customRouter.js";

class Router extends CustomRouter {
  init() {
    this.read("/register", ["PUBLIC"], (req, res, next) => {
      try {
        res.render("register");
      } catch (e) {
        next(e);
      }
    });

    this.read("/login", ["PUBLIC"], (req, res, next) => {
      try {
        res.render("login");
      } catch (e) {
        next(e);
      }
    });
  }
}

const authRouter = new Router().getRouter();

export default authRouter;
