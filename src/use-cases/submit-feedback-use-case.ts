import { MailAdapter } from "../adapters/mail-adapter";

interface SubmitFeedbackUseCaseRequest {
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackUseCase {
  constructor(
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;
    const cid = `screenshot-${Date.now()}@feedget`;
    const attachments = [];

    if(!type) {
      throw new Error('Type is required.')
    }

    if(!comment) {
      throw new Error('Comment is required.')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid screenshot format.')
    }

    if( screenshot) {
      const base64 = screenshot.replace(/^data:image\/\w+;base64,/, '');
      attachments.push({
        filename: 'screenshot.png',
        content: base64,
        encoding: 'base64',
        cid, // <- ID para usar no HTML
        contentType: 'image/png',
      });
    }

    this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
        `<p style="color:#555;font-size:12px">Este é um e-mail automático. Respostas não são monitoradas.</p>`,
        `<p>Tipo de feedback ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot ? `<img alt="screenshot" src="cid:${cid}" style="max-width:100%;height:auto;display:block;margin-top:8px;" />` : ``,
    `</div>`
      ].join('\n'),
      attachments
    })
  }
}