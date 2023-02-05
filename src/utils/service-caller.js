import axios from 'axios';
import Path from 'path';
import Logger from './logger.js';

import Config from '../config/index.js';

const retryCall = (fn, retriesLeft = Config.retryAttemps) => new Promise((resolve, reject) => {
  fn()
    .then(resolve)
    .catch((error) => {
      setTimeout(() => {
        if (retriesLeft === 1) return reject(error);
        if (error.response.status !== 500) {
          Logger.error(`Http Status ${error.response.status} - ${error.message}`);
          return reject(error);
        }
        Logger.error(`Http Status 500 - Retry Left ${retriesLeft - 1}`);
        return retryCall(fn, retriesLeft - 1).then(resolve, reject);
      }, Config.retryInterval);
    });
});

export default function ServiceCaller({
  method,
  url,
  data,
  params,
}) {
  return retryCall(() => (axios({
    method: String(method).toLowerCase(),
    headers: {
      accept: 'application/json',
    },
    url: new URL(Path.join(Config.ethereumCurrencyServiceUrl, url)),
    data,
    params,
  })));
}
