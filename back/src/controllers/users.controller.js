import usersService from "../services/users.service.js";
import CustomError from "../utils/errors/customError.utils.js"
import errors from "../utils/errors/errorsLibrary.utils.js"

class UsersController {
  constructor() {
    this.service = usersService;
  }

  async create(req, res, next) {
    try {
      const newUser = await usersService.create(req.body);

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

      const users = await usersService.read({ filter, options });
      if (!users.docs.length) CustomError.new(errors.notFound)


      res.json({
        statusCode: 200,
        response: users,
      });
    } catch (e) {
      next(e);
    }
  }


  async readOne(req, res, next) {
    try {
      const { userId } = req.params;

      const user = await usersService.readOne(userId);
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

      const modifiedUser = await usersService.update(userId, req.body);
      if (!modifiedUser) CustomError.new(errors.notFound)

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

      const deletedUser = await usersService.destroy(userId);
      if (!deletedUser) CustomError.new(errors.notFound)


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

const { create, read, readOne, update, destroy } = usersController;

export { create, read, readOne, update, destroy };
