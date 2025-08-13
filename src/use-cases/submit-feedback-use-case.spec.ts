import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sakjdhfaksdhfksadhf',
    })).resolves.not.toThrow();

    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit a feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,sakjdhfaksdhfksadhf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,sakjdhfaksdhfksadhf',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: '123.jpg',
    })).rejects.toThrow();
  });
});