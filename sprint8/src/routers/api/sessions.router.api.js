import CustomRouter from '../customRouter.js';

import passport from '../../middlewares/passport.mid.js';
import passportCb from '../../middlewares/passportCb.mid.js';

class Router extends CustomRouter {
  init() {
    const opt = { session: false, failureRedirect: '/api/sessions/badauth' };

    this.read('/', passportCb('jwt'), async (req, res, next) => {
      try {
        const { email, role } = req.user;

        return res.json({
          statusCode: 200,
          message: { email, role },
        });
      } catch (error) {
        return next(error);
      }
    });

    this.create('/register', passportCb('register'), async (req, res, next) => {
      try {
        return res.json({
          statusCode: 201,
          message: 'Registered!',
        });
      } catch (error) {
        return next(error);
      }
    });

    this.create('/login', passportCb('login'), async (req, res, next) => {
      try {
        res
          .cookie('token', req.token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          })
          .json({
            statusCode: 200,
            message: 'Logged in!',
          });
      } catch (error) {
        return next(error);
      }
    });

    this.create(
      '/google',
      passport.authenticate('google', { scope: ['email', 'profile'] })
    );

    this.create(
      '/google/callback',
      passport.authenticate('google', opt),
      async (req, res, next) => {
        try {
          res
            .cookie('token', req.token, {
              maxAge: 7 * 24 * 60 * 60 * 1000,
              httpOnly: true,
            })
            .json({
              statusCode: 200,
              message: 'Logged in with google',
            });
        } catch (error) {
          return next(error);
        }
      }
    );

    this.create('/signout', async (req, res, next) => {
      try {
        if (req.cookies.token) {
          res.clearCookie('token');

          return res.json({
            statusCode: 200,
            message: 'Signed out!',
          });
        }

        const error = new Error('No Auth');
        error.statusCode = 400;

        throw error;
      } catch (error) {
        return next(error);
      }
    });

    this.read('/badauth', async (req, res, next) => {
      try {
        return res.json({
          statusCode: 401,
          message: 'Bad auth',
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

const sessionsRouter = new Router().getRouter();

export default sessionsRouter;
