import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true, 
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body, attachments }: SendMailData) {
    await transport.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: process.env.MAIL_TO_DEFAULT, // ou passe por parâmetro
      subject,
      html: body,
      attachments,
      replyTo: 'no-reply@invalid'
    });
  }
}