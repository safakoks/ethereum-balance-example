import Web3Caller from '../utils/web3-caller';

export default class EthereumNodeExternalService {
  static async getBalance({
    address,
  }) {
    const balance = await Web3Caller.eth.getBalance(address);

    return Number(Web3Caller.utils.fromWei(balance, 'ether'));
  }

  static isValidAddress({ address }) {
    return Web3Caller.utils.isAddress(address);
  }
}
