import express from 'express';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();



routes.post('/feedbacks', async (req,res) => {
  const {type, comment, screenshot} = req.body;

  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    nodemailerMailAdapter
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send();
});