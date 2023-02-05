import Web3Caller from '../../../src/utils/web3-caller';
import EthereumNodeExternalService from '../../../src/external-services/ethereum-node';

jest.mock('../../../src/utils/web3-caller', () => ({
  eth: {
    getBalance: jest.fn(),
  },
  utils: {
    fromWei: jest.fn(),
    isAddress: jest.fn(),
  },
}));

describe('EthereumNodeExternalService', () => {
  describe('getBalance', () => {
    it('should call Web3Caller.eth.getBalance with the correct address', async () => {
      const address = '0xabc123';
      const balance = '1000000000000000000';
      Web3Caller.eth.getBalance.mockResolvedValue(balance);
      Web3Caller.utils.fromWei.mockReturnValue(1);

      await EthereumNodeExternalService.getBalance({ address });

      expect(Web3Caller.eth.getBalance).toHaveBeenCalledWith(address);
    });

    it('should call Web3Caller.utils.fromWei with the correct balance and unit', async () => {
      const address = '0xabc123';
      const balance = '1000000000000000000';
      Web3Caller.eth.getBalance.mockResolvedValue(balance);
      Web3Caller.utils.fromWei.mockReturnValue(1);

      await EthereumNodeExternalService.getBalance({ address });

      expect(Web3Caller.utils.fromWei).toHaveBeenCalledWith(balance, 'ether');
    });

    it('should return the result of Web3Caller.utils.fromWei', async () => {
      const address = '0xabc123';
      const balance = '1000000000000000000';
      const expectedResult = 1;
      Web3Caller.eth.getBalance.mockResolvedValue(balance);
      Web3Caller.utils.fromWei.mockReturnValue(expectedResult);

      const result = await EthereumNodeExternalService.getBalance({ address });

      expect(result).toEqual(expectedResult);
    });
  });

  describe('isValidAddress', () => {
    it('should call Web3Caller.utils.isAddress with the correct address', () => {
      const address = '0xabc123';
      EthereumNodeExternalService.isValidAddress({ address });

      expect(Web3Caller.utils.isAddress).toHaveBeenCalledWith(address);
    });

    it('should return the result of Web3Caller.utils.isAddress', () => {
      const address = '0xabc123';
      const expectedResult = true;
      Web3Caller.utils.isAddress.mockReturnValue(expectedResult);

      const result = EthereumNodeExternalService.isValidAddress({ address });

      expect(result).toEqual(expectedResult);
    });
  });
});
