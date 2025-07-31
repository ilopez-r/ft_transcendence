//src/utils/nodemailer.ts

import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'tobianselmo04@gmail.com',
			pass: 'jghv preo uxwg lbug',
		},
	});

	const mailOptions = {
		from: '"Tobi" <tobianselmo04@gmail.com>',
		to: `${to}`,
		subject: `${subject}`,
		text: `${text}`,
	};

	const info = await transporter.sendMail(mailOptions);
	console.log('Correo enviado %s', info.messageId);
}
