import CurrencyExternalService from '../external-services/currency';

export default class CurrencyService {
  static async getEthUsdCurrency() {
    const result = await CurrencyExternalService.getEthUsdCurrency();

    return Number(result?.data?.ethereum?.usd);
  }
}
