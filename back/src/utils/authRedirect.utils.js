import { verifyTokenUtils } from './jtw.utils.js';

const verifyTokenViews = (req, res) => {
	try {
		verifyTokenUtils(req.headers);

		res.render();
	} catch (error) {
		throw error;
	}
};

export default verifyToken;
