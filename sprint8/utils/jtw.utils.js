import jwt from 'jsonwebtoken';

function createToken(data) {
	const token = jwt.sign(data, process.env.SECRET_JWT, {
		expiresIn: 60 * 60 * 24 * 7,
	});

	return token;
}

function verifyTokenUtils(token) {
	if (token) {
		try {
			const data = jwt.verify(token, process.env.SECRET_JWT);

			return data;
		} catch (err) {}
	}

	const error = new Error('Bad auth token');
	error.statusCode = 401;

	throw error;
}

export { createToken, verifyTokenUtils };
