export interface SendMailData {
  subject: string;
  body: string;
  attachments: any[];
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => void;
}