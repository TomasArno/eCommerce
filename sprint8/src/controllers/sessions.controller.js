class SessionsController {
  async read(req, res, next) {
    try {
      const { email, role } = req.user;

      return res.json({
        statusCode: 200,
        message: { email, role },
      });
    } catch (error) {
      return next(error);
    }
  }

  async register(req, res, next) {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
        });
    } catch (error) {
      next(error);
    }
  }

  async signout(req, res, next) {
    try {
      if (req.cookies.token) {
        res.clearCookie("token");

        return res.json({
          statusCode: 200,
          message: "Signed out!",
        });
      }

      const error = new Error("No Auth");
      error.statusCode = 400;

      throw error;
    } catch (error) {
      return next(error);
    }
  }

  async googleCb(req, res, next) {
    try {
      res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in with google",
        });
    } catch (error) {
      return next(error);
    }
  }

  async badauth(req, res, next) {
    try {
      return res.json({
        statusCode: 401,
        message: "Bad auth",
      });
    } catch (error) {
      return next(error);
    }
  }
}

const sessionsController = new SessionsController();

const { register, read, login, googleCb, badauth, signout } =
  sessionsController;

export { register, read, login, googleCb, badauth, signout };
