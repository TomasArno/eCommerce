import { createTransport } from "nodemailer";

function sendEmailCode(email, verifyCode) {
  try {
    const transport = createTransport({
      service: "gmail",
      port: process.env.PORT,
      auth: { user: process.env.G_EMAIL, pass: process.env.G_PASSWORD },
    });

    transport
      .sendMail({
        from: `Tomas <${process.env.G_EMAI}>`,
        to: email,
        subject: `E-COMMERCE REGISTER`,
        html: `
        <h1>USER REGISTERED</h1>
        <h3>Verification code: ${verifyCode}</h3>
        `,
      })
      .then(() => {
        console.log("Mail Enviado!");
      });
  } catch (error) {
    throw error;
  }
}

export default sendEmailCode;
