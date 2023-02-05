import EthService from '../../../src/services/eth';
import EthereumNodeExternalService from '../../../src/external-services/ethereum-node';
import CurrencyService from '../../../src/services/currency';

jest.mock('../../../src/external-services/ethereum-node');
jest.mock('../../../src/services/currency');

describe('EthService', () => {
  describe('getEthAddressBalanceList', () => {
    const addresses = ['0xaddress1', '0xaddress2', '0xaddress3'];
    const ethAddressBalanceList = [
      { address: '0xaddress1', balance: 10, usdBalance: 1000 },
      { address: '0xaddress2', balance: 10, usdBalance: 1000 },
      { address: '0xaddress3', balance: 10, usdBalance: 1000 },
    ];

    beforeEach(() => {
      EthereumNodeExternalService.getBalance.mockResolvedValue(10);
      EthereumNodeExternalService.isValidAddress.mockReturnValue(true);
      CurrencyService.getEthUsdCurrency.mockResolvedValue(100);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return ethAddressBalanceList and wrongAddressList', async () => {
      const result = await EthService.getEthAddressBalanceList({ addresses });

      expect(result).toEqual({
        ethAddressBalanceList,
        wrongAddressList: [],
      });
    });

    it('should return wrongAddressList for invalid address', async () => {
      EthereumNodeExternalService.isValidAddress.mockReturnValue(false);

      const result = await EthService.getEthAddressBalanceList({ addresses });

      expect(result).toEqual({
        ethAddressBalanceList: [],
        wrongAddressList: addresses,
      });
    });

    it('should return correct balance and usdBalance', async () => {
      const result = await EthService.getEthAddressBalanceList({ addresses });

      expect(result.ethAddressBalanceList).toEqual(ethAddressBalanceList);
    });

    it('should call getBalance for each address', async () => {
      await EthService.getEthAddressBalanceList({ addresses });

      expect(EthereumNodeExternalService.getBalance).toHaveBeenCalledTimes(3);
      expect(EthereumNodeExternalService.getBalance)
        .toHaveBeenCalledWith({ address: addresses[0] });
      expect(EthereumNodeExternalService.getBalance)
        .toHaveBeenCalledWith({ address: addresses[1] });
      expect(EthereumNodeExternalService.getBalance)
        .toHaveBeenCalledWith({ address: addresses[2] });
    });

    it('should call getEthUsdCurrency', async () => {
      await EthService.getEthAddressBalanceList({ addresses });

      expect(CurrencyService.getEthUsdCurrency).toHaveBeenCalled();
    });
  });
});
