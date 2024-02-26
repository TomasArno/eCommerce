import { Users } from "../data/mongo/mongo.manager.js";

export async function checkUserId(req, res, next) {
  try {
    const userId = req.params.userId || req.body.userId;

    const searchedUser = await Users.readOne(userId);

    req._user = searchedUser;

    next();
  } catch (error) {
    res.json({
      statusCode: 404,
      response: "User doesn´t exists",
    });
  }
}
