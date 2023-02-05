import EthService from '../services/eth';
import EthFormatter from '../formatters/eth';

export default class EthController {
  static async getBalance(req, res, next) {
    try {
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
    } catch (error) {
      next(error);
    }
  }
}
