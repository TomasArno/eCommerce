import CustomRouter from '../customRouter.js';

import passportCb from '../../middlewares/passportCb.mid.js';

import {
	read,
	register,
	login,
	signout,
	googleCb,
	badauth,
	verifyCode,
} from '../../controllers/sessions.controller.js';

class Router extends CustomRouter {
	init() {
		const opt = {
			session: false,
			failureRedirect: '/api/sessions/badauth',
		};

		this.read('/', ['USER', 'PREMIUM', 'ADMIN'], read);

		this.create('/', ['PUBLIC'], verifyCode);

		this.create('/register', ['PUBLIC'], passportCb('register'), register);

		this.create('/login', ['PUBLIC'], passportCb('login'), login);

		// this.create(
		//   "/google",
		//   ["PUBLIC"],
		//   passport.authenticate("google", { scope: ["email", "profile"] })
		// );

		// this.create(
		//   "/google/callback",
		//   ["PUBLIC"],
		//   passport.authenticate("google", opt),
		//   googleCb
		// );

		this.create('/signout', ['USER', 'PREMIUM', 'ADMIN'], signout);

		this.read('/badauth', ['PUBLIC'], badauth);
	}
}

const sessionsRouter = new Router().getRouter();

export default sessionsRouter;
