import ServiceCaller from '../utils/service-caller';

export default class CurrencyExternalService {
  static async getEthUsdCurrency() {
    return ServiceCaller({
      method: 'get',
      url: '/price',
      params: {
        ids: 'ethereum',
        vs_currencies: 'usd',
      },
    });
  }
}
