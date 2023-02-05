import EthController from '../../../src/controllers/eth';
import EthService from '../../../src/services/eth';
import EthFormatter from '../../../src/formatters/eth';

jest.mock('../../../src/services/eth');
jest.mock('../../../src/formatters/eth');

describe('EthController', () => {
  it('should return formatted balance list and wrong address list', async () => {
    const req = {
      body: {
        addresses: ['0xaddress1', '0xaddress2'],
      },
    };

    const res = {
      send: jest.fn(),
    };

    const ethAddressBalanceList = [
      { address: '0xaddress1', balance: 1 },
      { address: '0xaddress2', balance: 2 },
    ];

    const wrongAddressList = ['0xaddress3'];

    EthService.getEthAddressBalanceList.mockResolvedValue({
      ethAddressBalanceList,
      wrongAddressList,
    });

    EthFormatter.BalanceListFormatter.mockReturnValue({
      ethAddressBalanceList,
      wrongAddressList,
    });

    await EthController.getBalance(req, res);

    expect(EthService.getEthAddressBalanceList).toHaveBeenCalledWith({
      addresses: ['0xaddress1', '0xaddress2'],
    });

    expect(EthFormatter.BalanceListFormatter).toHaveBeenCalledWith({
      ethAddressBalanceList,
      wrongAddressList,
    });

    expect(res.send).toHaveBeenCalledWith({
      ethAddressBalanceList,
      wrongAddressList,
    });
  });
});
