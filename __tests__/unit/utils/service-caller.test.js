import axios from 'axios';
import serviceCaller from '../../../src/utils/service-caller';

// Dependecies
import logger from '../../../src/utils/logger';
import Config from '../../../src/config';

// Dependency Mocks
jest.mock('axios');
jest.mock('../../../src/utils/logger', () => ({
  error: jest.fn(),
}));

describe('serviceCaller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call axios with the correct method, url, data, and headers', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const params = { };
    const expectedUrl = new URL(`${Config.ethereumCurrencyServiceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };

    axios.mockResolvedValueOnce({ data: 'success' });

    await serviceCaller({
      method,
      url,
      data,
      params,
    });

    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      params,
    });
  });

  it('should not retry the call if axios returns a 400 status', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const params = { };
    const expectedUrl = new URL(`${Config.ethereumCurrencyServiceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };
    const expectedErrorData = { response: { status: 400 } };

    axios
      .mockRejectedValue(expectedErrorData);

    await expect(serviceCaller({
      method, url, data, params,
    })).rejects.toEqual(expectedErrorData);

    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      params,
    });
    expect(axios).toHaveBeenCalledTimes(1);
  });

  it('should retry the call if axios returns a 500 status', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const params = { };
    const expectedUrl = new URL(`${Config.ethereumCurrencyServiceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };

    axios
      .mockRejectedValueOnce({ response: { status: 500 } })
      .mockResolvedValueOnce({ data: 'success' });

    await serviceCaller({
      method, url, data, params,
    });

    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      params,
    });
    expect(axios).toHaveBeenCalledTimes(2);
  });

  it('should reject with an error if all retries fail', async () => {
    const method = 'POST';
    const url = '/example';
    const data = { test: 'data' };
    const params = { test: 'params' };
    const expectedUrl = new URL(`${Config.ethereumCurrencyServiceUrl}/example`);
    const expectedHeaders = {
      accept: 'application/json',
      'x-api-key': Config.apiKey,
    };
    const expectedError = { response: { status: 500 } };

    axios.mockRejectedValue(expectedError);

    await expect(serviceCaller({
      method, url, data, params,
    })).rejects.toEqual(expectedError);
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      headers: expectedHeaders,
      url: expectedUrl,
      data,
      params,
    });
    expect(axios).toHaveBeenCalledTimes(Config.retryAttemps);
    expect(logger.error).toHaveBeenCalledTimes(Config.retryAttemps - 1);
  });
});
