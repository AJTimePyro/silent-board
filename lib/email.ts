import nodemailer from "nodemailer";

interface EmailProps {
	toEmail: string;
	subject: string;
	htmlBody: string;
}

// smtp email service
const transporter = nodemailer.createTransport({
	host: "smtp.zoho.in",
	port: 465,
	secure: true,
	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASSWORD,
	},
});

const sendEmailSMTP = async ({ toEmail, subject, htmlBody }: EmailProps) => {
	return await transporter.sendMail({
		from: `"Silent Board" <${process.env.SMTP_EMAIL}>`,
		to: toEmail,
		subject: subject,
		html: htmlBody,
	});
};

export const sendEmail = async ({ toEmail, subject, htmlBody }: EmailProps) => {
	return await sendEmailSMTP({ toEmail, subject, htmlBody });
};
