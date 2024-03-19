import { verifyTokenUtils } from '../../utils/jtw.utils.js';

const verifyToken = (req, res, next) => {
	try {
		req._user = verifyTokenUtils(req.cookies.token);

		next();
	} catch (error) {
		next(error);
	}
};

export default verifyToken;
