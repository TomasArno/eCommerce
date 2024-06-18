function isAdmin(req, res, next) {
  try {
    const { role } = req._user;

    if (role == 1) return next();

    const error = new Error('Forbidden');
    error.statusCode = 403;

    throw error;
  } catch (e) {
    next(e);
  }
}

export default isAdmin;
