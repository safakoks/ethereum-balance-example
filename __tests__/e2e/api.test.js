/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import EthereumNodeExternalService from '../../src/external-services/ethereum-node';
import CurrencyExternalService from '../../src/external-services/currency';

import app from '../../src/app';

describe('API E2E', () => {
  describe('POST: /eth/balance', () => {

  });
  describe('Case 1 : Empty Response', () => {
    beforeAll(async () => {
      EthereumNodeExternalService.getBalance = jest.fn().mockResolvedValue({});
      CurrencyExternalService.getEthUsdCurrency = jest.fn().mockResolvedValue({});
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return empty arrays', async () => {
      const response = await request(app)
        .post('/eth/balance')
        .send({ })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.sorted_addresses).toStrictEqual([]);
      expect(response.body.wrong_addresses).toStrictEqual([]);
    });
  });

  describe('Case 2 : Wrong Address', () => {
    beforeAll(async () => {
      EthereumNodeExternalService.getBalance = jest.fn().mockResolvedValue({});
      CurrencyExternalService.getEthUsdCurrency = jest.fn().mockResolvedValue({});
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return empty arrays', async () => {
      const response = await request(app)
        .post('/eth/balance')
        .send({ addresses: ['wrong-address'] })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.sorted_addresses).toStrictEqual([]);
      expect(response.body.wrong_addresses).toStrictEqual(['wrong-address']);
    });
  });

  describe('Case 3 : Correct Address', () => {
    const testAddress1 = {
      address: '0x03d30736fcc8f0a1630b58cebbe1553f41d51b05',
      balance: 12,
    };
    const testAddress2 = {
      address: '0x64839271e7713252b7a17e92C4d76fCD8216A22f',
      balance: 53,
    };
    const testAddress3 = {
      address: '0x388c818ca8b9251b393131c08a736a67ccb19297',
      balance: 23,
    };

    const testUsdEthCurrency = 12;

    beforeAll(async () => {
      EthereumNodeExternalService.getBalance = jest.fn().mockImplementation(
        async ({
          address,
        }) => {
          if (address === testAddress1.address) { return testAddress1.balance; }
          if (address === testAddress2.address) { return testAddress2.balance; }
          if (address === testAddress3.address) { return testAddress3.balance; }
          return 0;
        },
      );

      CurrencyExternalService.getEthUsdCurrency = jest.fn().mockResolvedValue({
        data: {
          ethereum: {
            usd: testUsdEthCurrency,
          },
        },
      });
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    it('should return correct formatted response', async () => {
      const response = await request(app)
        .post('/eth/balance')
        .send({
          addresses: [
            testAddress1.address,
            'wrong-address',
            testAddress2.address,
            'another-wrong-address',
            testAddress3.address,
          ],
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.sorted_addresses).toStrictEqual([
        {
          address: testAddress2.address,
          eth_balance: testAddress2.balance,
          usd_balance: testAddress2.balance * testUsdEthCurrency,
        },
        {
          address: testAddress3.address,
          eth_balance: testAddress3.balance,
          usd_balance: testAddress3.balance * testUsdEthCurrency,
        },
        {
          address: testAddress1.address,
          eth_balance: testAddress1.balance,
          usd_balance: testAddress1.balance * testUsdEthCurrency,
        },
      ]);
      expect(response.body.wrong_addresses).toStrictEqual(['wrong-address', 'another-wrong-address']);
    });
  });
});
