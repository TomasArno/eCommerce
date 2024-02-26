import { verifyToken } from '../../utils/jtw.utils.js';

function isAdmin(req, res, next) {
  try {
    const data = verifyToken(req.headers);

    const { role } = data;

    if (role == 1) return next();

    const error = new Error('Forbidden');
    error.statusCode = 403;

    throw error;
  } catch (e) {
    next(e);
  }
}

export default isAdmin;
