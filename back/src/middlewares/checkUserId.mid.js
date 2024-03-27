import users from '../services/users.service.js';

export async function checkUserId(req, res, next) {
  try {
    const userId = req.params.userId || req.body.userId;

    const searchedUser = await users.readOne(userId);

    req._user = searchedUser;

    next();
  } catch (error) {
    res.json({
      statusCode: 404,
      message: 'User doesn´t exists',
    });
  }
}
