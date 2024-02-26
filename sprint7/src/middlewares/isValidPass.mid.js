import { Users } from '../data/mongo/mongo.manager.js';

async function isValidPass(req, res, next) {
  try {
    const { password, email } = req.body;

    const userPassword = (await Users.readByEmail(email)).password;

    if (userPassword == password) return next();

    const error = new Error('Invalid credentials');
    error.statusCode = 401;

    throw error;
  } catch (e) {
    next(e);
  }
}

export default isValidPass;
