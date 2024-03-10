import { Router } from 'express';

import { users } from '../../data/mongo/mongo.manager.js';

import passportCb from '../../middlewares/passportCb.mid.js';
import isAdmin from '../../middlewares/isAdmin.mid.js';
import { checkUserId } from '../../middlewares/checkUserId.mid.js';

const usersRouter = Router();

usersRouter.post('/', passportCb('jwt'), isAdmin, async (req, res, next) => {
  try {
    const newUser = await users.create(req.body);

    res.json({
      statusCode: 201,
      response: newUser,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.get('/', passportCb('jwt'), isAdmin, async (req, res, next) => {
  try {
    const { name, email, page, limit } = req.query;

    const filter = {};

    if (name) filter.name = name;
    if (email) filter.email = email;

    const sortAndPaginate = { page, limit };

    if (!page) sortAndPaginate.page = 1;
    if (!limit) sortAndPaginate.limit = 20;

    const users = await users.read({ filter, sortAndPaginate });

    res.json({
      statusCode: 200,
      response: users,
    });
  } catch (e) {
    next(e);
  }
});

usersRouter.get(
  '/:userId',
  passportCb('jwt'),
  isAdmin,
  checkUserId,
  async (req, res, next) => {
    try {
      res.json({
        statusCode: 200,
        response: req.user,
      });
    } catch (e) {
      next(e);
    }
  }
);

usersRouter.put(
  '/:userId',
  passportCb('jwt'),
  isAdmin,
  checkUserId,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const modifiedUser = await users.update(userId, req.body);

      res.json({
        statusCode: 200,
        response: modifiedUser,
      });
    } catch (e) {
      next(e);
    }
  }
);

usersRouter.delete(
  '/:userId',
  passportCb('jwt'),
  isAdmin,
  checkUserId,
  async (req, res, next) => {
    try {
      const { userId } = req.params;

      const deletedUser = await Products.destroy(userId);

      res.json({
        statusCode: 200,
        response: deletedUser,
      });
    } catch (e) {
      next(e);
    }
  }
);

export default usersRouter;
