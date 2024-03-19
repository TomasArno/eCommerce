import CustomRouter from "../customRouter.js";

import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

import {
  read,
  register,
  login,
  signout,
  googleCb,
  badauth,
} from "../../controllers/sessions.controller.js";

class Router extends CustomRouter {
  init() {
    const opt = { session: false, failureRedirect: "/api/sessions/badauth" };

    this.read("/", ["PUBLIC"], passportCb("jwt"), read);

    this.create("/register", ["PUBLIC"], passportCb("register"), register);

    this.create("/login", ["PUBLIC"], passportCb("login"), login);

    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );

    this.create(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", opt),
      googleCb
    );

    this.create("/signout", ["PUBLIC"], signout);

    this.read("/badauth", ["PUBLIC"], badauth);
  }
}

const sessionsRouter = new Router().getRouter();

export default sessionsRouter;
