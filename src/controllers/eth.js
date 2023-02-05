import EthService from '../services/eth';
import EthFormatter from '../formatters/eth';

export default class EthController {
  static async getBalance(req, res) {
    const { addresses } = req.body;

    const {
      ethAddressBalanceList,
      wrongAddressList,
    } = await EthService.getEthAddressBalanceList({ addresses });

    res.send(
      EthFormatter.BalanceListFormatter({
        ethAddressBalanceList,
        wrongAddressList,
      }),
    );
  }
}
