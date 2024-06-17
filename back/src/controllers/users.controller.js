import users from "../services/users.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

import addLog from "../utils/logs/addLog.utils.js"

class UsersController {
  constructor() {
    this.service = users;
  }

  async create(req, res, next) {
    try {
      const newUser = await users.create(req.body);

      addLog(req.user._id, "Usuario creado")

      res.json({
        statusCode: 201,
        response: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async read(req, res, next) {
    try {
      const { name, email, page, limit } = req.query;

      const filter = {};

      if (name) filter.name = name;
      if (email) filter.email = email;

      const options = { page, limit };

      if (!page) options.page = 1;
      if (!limit) options.limit = 20;

      const all = await users.read({ filter, options });
      if (!all.docs.length) CustomError.new(errors.notFound)


      res.json({
        statusCode: 200,
        response: all,
      });
    } catch (e) {
      next(e);
    }
  }


  async readOne(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await users.readOne(userId);
      if (!user) CustomError.new(errors.notFound)

      res.json({
        statusCode: 200,
        response: user,
      });
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const { userId } = req.params;

      if (userId != req.user.id) CustomError.new(errors.forbidden)

      const modifiedUser = await users.update(userId, req.body);
      if (!modifiedUser) CustomError.new(errors.notFound)

      addLog(req.user._id, "Usuario modificado: " + req.body)

      res.json({
        statusCode: 200,
        response: modifiedUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async updateRole(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await users.readOne(userId)
      if (!user) CustomError.new(errors.notFound)

      const { role } = user
      let newRole

      if (role == 1) {
        newRole = 2
      } else if (role == 2) {
        newRole = 1
      } else {
        CustomError.new(errors.error)
      }

      const modifiedUser = await users.update(userId, { role: newRole });
      if (!modifiedUser) CustomError.new(errors.error)

      addLog(req.user._id, `Nuevo rol (${userId}): ${newRole}`)

      res.json({
        statusCode: 200,
        response: modifiedUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async destroy(req, res, next) {
    try {
      const { userId } = req.params;

      const deletedUser = await users.destroy(userId);
      if (!deletedUser) CustomError.new(errors.notFound)

      addLog(req.user._id, "Usuario eliminado: " + userId)

      res.json({
        statusCode: 200,
        response: deletedUser,
      });
    } catch (e) {
      next(e);
    }
  }
}

const usersController = new UsersController();

const { create, read, readOne, update, updateRole, destroy } = usersController;

export { create, read, readOne, update, updateRole, destroy };
