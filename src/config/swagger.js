import { createRequire } from 'node:module';
import Config from './index';

const require = createRequire(import.meta.url);

const Package = require('../../package.json');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Ethereum Balance Example',
    version: Package.version,
    license: {
      name: 'MIT',
      url: 'https://github.com/safakoks/ethereum-balance-example/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `http://localhost:${Config.serverPort}`,
    },
  ],
};

export default swaggerDef;
