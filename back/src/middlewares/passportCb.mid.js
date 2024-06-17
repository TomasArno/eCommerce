import passport from './passport.mid.js';
import addLog from "../utils/logs/addLog.utils.js"

export default (strategy) => {
	return async (req, res, next) => {
		passport.authenticate(strategy, (error, user, info) => {
			if (error) {
				addLog("", "passportCb error: " + error, "error")
				return next(error);
			}

			if (!user) {
				return res.json({
					statusCode: info.statusCode || 401,
					response: info.message || info.toString(),
				});
			}

			next();
		})(req, res, next);
	};
};
