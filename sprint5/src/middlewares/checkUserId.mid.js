import { Users } from "../data/mongo/mongo.manager.js";

export async function checkUserId(req, res, next) {
  const userId = req.params.userId || req.body.userId;

  const userSearched = await Users.readOne(userId);

  if (!userSearched) {
    res.json({ statusCode: 404, response: "User not found" });
  } else {
    next();
  }
}
