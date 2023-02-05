import Web3 from 'web3';
import Config from '../../../src/config';
import web3 from '../../../src/utils/web3-caller';

describe('web3', () => {
  it('creates a new instance of Web3', () => {
    expect(web3).toBeInstanceOf(Web3);
  });

  it('uses the correct provider URL', () => {
    expect(web3.currentProvider.host).toBe(Config.ethereumNodeUrl);
  });
});
