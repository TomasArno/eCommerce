import { Router } from 'express';

import passport from '../../middlewares/passport.mid.js';

const opt = { session: false, failureRedirect: '/api/sessions/badauth' };
const sessionsRouter = Router();

sessionsRouter.post(
	'/register',
	passport.authenticate('register', opt),
	async (req, res, next) => {
		try {
			return res.json({
				statusCode: 201,
				message: 'Registered!',
			});
		} catch (error) {
			return next(error);
		}
	}
);

sessionsRouter.post(
	'/login',
	passport.authenticate('login', opt),
	async (req, res, next) => {
		try {
			res.cookie('token', req.token, {
				maxAge: 7 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			}).json({
				statusCode: 200,
				message: 'Logged in!',
			});
		} catch (error) {
			return next(error);
		}
	}
);

sessionsRouter.post(
	'/google',
	passport.authenticate('google', { scope: ['email', 'profile'] })
);

sessionsRouter.post(
	'/google/callback',
	passport.authenticate('google', opt),
	async (req, res, next) => {
		try {
			res.json({
				statusCode: 200,
				message: 'Logged in with google',
				session: req.session,
			});
		} catch (error) {
			return next(error);
		}
	}
);

sessionsRouter.post('/signout', async (req, res, next) => {
	try {
		if (req.session.email) {
			req.session.destroy();

			return res.json({
				statusCode: 200,
				message: 'Signed out!',
			});
		}
		const error = new Error('No Auth');
		error.statusCode = 400;

		throw error;
	} catch (error) {
		return next(error);
	}
});

sessionsRouter.get('/badauth', async (req, res, next) => {
	try {
		return res.json({
			statusCode: 401,
			message: 'Bad auth',
		});
	} catch (error) {
		return next(error);
	}
});

export default sessionsRouter;
