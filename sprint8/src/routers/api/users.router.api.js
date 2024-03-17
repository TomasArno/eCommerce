import CustomRouter from '../customRouter.js';

import {
  create,
  read,
  readOne,
  update,
  destroy,
} from '../../controllers/users.controller.js';
// import passportCb from '../../middlewares/passportCb.mid.js';
// import isAdmin from '../../middlewares/isAdmin.mid.js';
// import { checkUserId } from '../../middlewares/checkUserId.mid.js';

class Router extends CustomRouter {
  init() {
    this.create(
      '/',
      ['PUBLIC'],
      // passportCb('jwt'), isAdmin,
      create
    );

    this.read(
      '/',
      ['PUBLIC'],
      //  passportCb('jwt'), isAdmin,
      read
    );

    this.read(
      '/:userId',
      ['PUBLIC'],
      // passportCb('jwt'),
      // isAdmin,
      // checkUserId,
      readOne
    );

    this.update(
      '/:userId',
      ['PUBLIC'],
      // passportCb('jwt'),
      // isAdmin,
      // checkUserId,
      update
    );

    this.destroy(
      '/:userId',
      ['PUBLIC'],
      // passportCb('jwt'),
      // isAdmin,
      // checkUserId,
      destroy
    );
  }
}

const usersRouter = new Router().getRouter();
export default usersRouter;
