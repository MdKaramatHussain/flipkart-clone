import nodemailer from 'nodemailer';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendEmailOptions): Promise<void> {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.PASS,
    },
  });

  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}
