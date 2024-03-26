function has8Char(req, res, next) {
  try {
    const { password } = req.body;

    if (password && password.length >= 8) return next();

    const error = new Error("Password must have at least 8 characters");
    error.statusCode = 400;

    throw error;
  } catch (e) {
    next(e);
  }
}

export default has8Char;
