/* 
  Exemplos simples de teste unitário:
    test('sum 2 + 2', () => {
      expect(2 + 2).toBe(4)
    })

    it('sum 2 + 2', () => {
      expect(2 + 2).toBe(4)
    })

    describe('Compilado de testes', () => {
      test('sum 2 + 2', () => {
        expect(2 + 2).toBe(4)
      })

      it('sum 2 + 2', () => {
        expect(2 + 2).toBe(4)
      })
    })
*/

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

// spies = espiões => garante que todas as funções estão sendo chamadas (no teste abaixo, as funções create e sendMail são fake e não são testadas)

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  // { create: async () => {} },
  // { sendMail: async () => {} }
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,76tyery673467546735ertfewsfg',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
      screenshot: 'data:image/png;base64,76tyery673467546735ertfewsfg',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,76tyery673467546735ertfewsfg',
    })).rejects.toThrow();
  });

  it('should not be able to submit feedback with an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});
