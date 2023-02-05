export default class EthFormatter {
  static BalanceListFormatter({
    ethAddressBalanceList,
    wrongAddressList,
  }) {
    const sortedEthAddressBalanceList = ethAddressBalanceList
      .sort(
        (ethAddress1, ethAddress2) => (ethAddress2.balance - ethAddress1.balance),
      );

    const formattedBalances = sortedEthAddressBalanceList.map((ethAddress) => ({
      address: ethAddress.address,
      eth_balance: ethAddress.balance,
      usd_balance: ethAddress.usdBalance,
    }));

    return {
      sorted_addresses: formattedBalances,
      wrong_addresses: wrongAddressList,
    };
  }
}
