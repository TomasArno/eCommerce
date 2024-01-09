import UsersManager from "../data/fs/users.fs.js";

export async function checkUserId(req, res, next) {
  const uId = req.params.uId || req.body.uId;

  const userSearched = await UsersManager.readOne(uId);

  if (!userSearched) {
    res.json({ statusCode: 404, message: "User not found" });
  } else {
    next();
  }
}
