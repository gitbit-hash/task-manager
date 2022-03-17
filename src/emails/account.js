const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'brokedeveloperhelp@gmail.com',
		subject: 'Thanks for joining us!',
		text: `Welcome to the app ${name}, let me know how you get along with the app`,
	});
};

const sendCancelationEmail = (email, name) => {
	sgMail.send({
		to: email,
		from: 'brokedeveloperhelp@gmail.com',
		subject: 'We are sorry that you leave us!',
		text: `It's sorry for us to leave ${name}, we hope to hear from you soon`,
	});
};

module.exports = { sendWelcomeEmail, sendCancelationEmail };
