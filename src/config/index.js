import dotenv from 'dotenv';

dotenv.config();

export default {
  serverPort: Number(process.env.SERVER_PORT) || 8000,
  ethereumNodeUrl: process.env.ETHEREUM_NODE_URL,
  ethereumCurrencyServiceUrl: process.env.ETHEREUM_CURRENCY_SERVICE_URL,
  retryAttemps: Number(process.env.ETHEREUM_CURRENCY_SERVICE_RETRY_COUNT) || 3,
};
