import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "31f8e71e0b305b",
    pass: "647bef24457ab3"
  }
});

export class NodemailerMailAdaptaer implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Bruno Alves <brunonnalves@gmail.com>',
      subject,
      html: body
    });
  }
}