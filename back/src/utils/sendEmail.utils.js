import { createTransport } from 'nodemailer';
import CustomError from './errors/customError.utils.js';
import errors from './errors/errorsLibrary.utils.js';

async function sendEmailCode(email, verifyCode) {
	try {
		const transport = createTransport({
			service: 'gmail',
			port: process.env.PORT,
			auth: { user: process.env.G_EMAIL, pass: process.env.G_PASSWORD },
		});

		try {
			await transport.sendMail({
				from: `Tomas <${process.env.G_EMAI}>`,
				to: email,
				subject: `E-COMMERCE REGISTER`,
				html: `
			<h1>USER REGISTERED</h1>
			<h3>Verification code: ${verifyCode}</h3>`,
			});
		} catch (error) {
			throw new CustomError.new(errors.wrongEmail)
		}

	} catch (error) {
		throw error;
	}
}

export default sendEmailCode;
