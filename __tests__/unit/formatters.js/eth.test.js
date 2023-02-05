import EthFormatter from '../../../src/formatters/eth';

describe('EthFormatter', () => {
  it('should return formatted balance list and wrong address list when address balance list is empty', () => {
    const ethAddressBalanceList = [];

    const wrongAddressList = ['0xaddress1', '0xaddress2'];

    const result = EthFormatter.BalanceListFormatter({
      ethAddressBalanceList,
      wrongAddressList,
    });

    expect(result).toEqual({
      sorted_addresses: [],
      wrong_addresses: ['0xaddress1', '0xaddress2'],
    });
  });

  it('should return formatted balance list and wrong address list', () => {
    const ethAddressBalanceList = [
      { address: '0xaddress1', balance: 1, usdBalance: 1000 },
      { address: '0xaddress2', balance: 2, usdBalance: 2000 },
    ];

    const wrongAddressList = ['0xaddress3'];

    const result = EthFormatter.BalanceListFormatter({
      ethAddressBalanceList,
      wrongAddressList,
    });

    expect(result).toEqual({
      sorted_addresses: [
        { address: '0xaddress2', eth_balance: 2, usd_balance: 2000 },
        { address: '0xaddress1', eth_balance: 1, usd_balance: 1000 },
      ],
      wrong_addresses: ['0xaddress3'],
    });
  });
});
