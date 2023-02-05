import ServiceCaller from '../../../src/utils/service-caller';
import CurrencyExternalService from '../../../src/external-services/currency';

jest.mock('../../../src/utils/service-caller', () => jest.fn());

describe('CurrencyExternalService', () => {
  describe('getEthUsdCurrency', () => {
    it('should call ServiceCaller with the correct parameters', async () => {
      ServiceCaller.mockResolvedValue({
        data: {
          ethereum: {
            usd: 123.45,
          },
        },
      });

      await CurrencyExternalService.getEthUsdCurrency();

      expect(ServiceCaller).toHaveBeenCalledWith({
        method: 'get',
        url: '/price',
        params: {
          ids: 'ethereum',
          vs_currencies: 'usd',
        },
      });
    });

    it('should return the response from ServiceCaller', async () => {
      const expectedResponse = {
        data: {
          ethereum: {
            usd: 123.45,
          },
        },
      };
      ServiceCaller.mockResolvedValue(expectedResponse);

      const result = await CurrencyExternalService.getEthUsdCurrency();

      expect(result).toEqual(expectedResponse);
    });
  });
});
