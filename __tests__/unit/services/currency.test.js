import CurrencyService from '../../../src/services/currency';
import CurrencyExternalService from '../../../src/external-services/currency';

jest.mock('../../../src/external-services/currency', () => ({
  getEthUsdCurrency: jest.fn(),
}));

describe('CurrencyService', () => {
  describe('getEthUsdCurrency', () => {
    it('should return the USD value of Ethereum', async () => {
      const expectedValue = 123.45;
      CurrencyExternalService.getEthUsdCurrency.mockResolvedValue({
        data: {
          ethereum: {
            usd: expectedValue,
          },
        },
      });

      const result = await CurrencyService.getEthUsdCurrency();

      expect(CurrencyExternalService.getEthUsdCurrency).toHaveBeenCalled();
      expect(result).toEqual(expectedValue);
    });

    it('should return null when the external service fails to retrieve the data', async () => {
      CurrencyExternalService.getEthUsdCurrency.mockRejectedValue(new Error('Failed to retrieve data'));

      await expect(CurrencyService.getEthUsdCurrency())
        .rejects
        .toEqual(new Error('Failed to retrieve data'));
      expect(CurrencyExternalService.getEthUsdCurrency).toHaveBeenCalled();
    });
  });
});
