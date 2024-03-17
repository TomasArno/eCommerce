import usersService from '../services/users.service.js';

class UsersController {
  constructor() {
    this.service = usersService;
  }

  async read(req, res, next) {
    try {
      const { name, email, page, limit } = req.query;

      const filter = {};

      if (name) filter.name = name;
      if (email) filter.email = email;

      const sortAndPaginate = { page, limit };

      if (!page) sortAndPaginate.page = 1;
      if (!limit) sortAndPaginate.limit = 20;

      const users = await this.service.read({ filter, sortAndPaginate });

      res.json({
        statusCode: 200,
        response: users,
      });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const newUser = await this.service.create(req.body);

      res.json({
        statusCode: 201,
        response: newUser,
      });
    } catch (e) {
      next(e);
    }
  }

  async readOne(req, res, next) {
    async (req, res, next) => {
      try {
        res.json({
          statusCode: 200,
          response: req.user,
        });
      } catch (e) {
        next(e);
      }
    };
  }

  async update(req, res, next) {
    try {
      const { userId } = req.params;

      const modifiedUser = await this.service.update(userId, req.body);

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

      const deletedUser = await this.service.destroy(userId);

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
