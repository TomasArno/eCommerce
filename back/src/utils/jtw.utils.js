import jwt from 'jsonwebtoken';

function createToken(data) {
	const token = jwt.sign(data, process.env.SECRET_JWT, {
		expiresIn: 60 * 60 * 24 * 7,
	});

	return token;
}

export { createToken };
