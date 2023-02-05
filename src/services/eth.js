import EthereumNodeExternalService from '../external-services/ethereum-node';
import CurrencyService from './currency';

export default class EthService {
  static async getEthAddressBalanceList({
    addresses,
  }) {
    const getBalancePromiseList = [];
    const ethAddressBalanceList = [];
    const wrongAddressList = [];

    const EthUsdCurrency = await CurrencyService.getEthUsdCurrency();

    addresses?.forEach((address) => {
      if (!EthereumNodeExternalService.isValidAddress({ address })) {
        wrongAddressList.push(address);
        return;
      }

      getBalancePromiseList.push(EthereumNodeExternalService
        .getBalance({ address })
        .then((balance) => {
          ethAddressBalanceList.push({
            address,
            balance,
            usdBalance: balance * EthUsdCurrency,
          });
        }));
    });

    await Promise.all(getBalancePromiseList);

    return {
      ethAddressBalanceList,
      wrongAddressList,
    };
  }
}
