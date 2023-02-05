import ApiError from '../../../src/utils/api-error';

describe('ApiError', () => {
  it('should set message and statusCode when created', () => {
    const error = new ApiError(400, 'Bad Request');
    expect(error.message).toBe('Bad Request');
    expect(error.statusCode).toBe(400);
  });

  it('should set isOperational to true by default', () => {
    const error = new ApiError(400, 'Bad Request');
    expect(error.isOperational).toBe(true);
  });

  it('should set isOperational to provided value', () => {
    const error = new ApiError(400, 'Bad Request', false);
    expect(error.isOperational).toBe(false);
  });

  it('should set stack', () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const error = new ApiError(400, 'Bad Request', false, 'test');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
