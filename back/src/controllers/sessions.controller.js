import users from "../services/users.service.js";

import CustomError from "../utils/errors/customError.utils.js";
import errors from "../utils/errors/errorsLibrary.utils.js";

import addLog from "../utils/logs/addLog.utils.js";

class SessionsController {
  async read(req, res, next) {
    try {
      res.json({
        statusCode: 200,
        response: req._user,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyCode(req, res, next) {
    try {
      const { email, verifyCode } = req.body;

      const user = await users.readByEmail(email);

      if (user.verifyCode !== verifyCode) CustomError.new(errors.token);

      await users.update(user._id, { isVerified: true });

      addLog(user._id, "Verificacion satisfactoria");

      res.json({
        statusCode: 200,
        response: "Verified user",
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req, res, next) {
    try {
      res.json({
        statusCode: 201,
        response: "Registered user",
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .json({
          statusCode: 200,
          response: req._user,
        });
    } catch (error) {
      next(error);
    }
  }

  async signout(req, res, next) {
    try {
      if (!req.cookies.token) CustomError.new(errors.token);

      res.clearCookie("token");
      res.json({
        statusCode: 200,
        response: "Signed out!",
      });
    } catch (error) {
      next(error);
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
          response: "Logged in with google",
        });
    } catch (error) {
      next(error);
    }
  }

  async badauth(req, res, next) {
    try {
      res.json({
        statusCode: 401,
        response: "Bad auth",
      });
    } catch (error) {
      next(error);
    }
  }
}

const sessionsController = new SessionsController();

const { register, read, login, verifyCode, googleCb, badauth, signout } =
  sessionsController;

export { register, read, login, verifyCode, googleCb, badauth, signout };
