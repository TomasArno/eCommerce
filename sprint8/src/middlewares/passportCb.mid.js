import passport from './passport.mid.js';

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      console.log('prueba');
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.json({
          statusCode: info.statusCode || 401,
          message: info.message || info.toString(),
        });
      }

      req.user = user;

      next();
    })(req, res, next);
  };
};
