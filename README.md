
# Ethereum Balance Example :chart:
[![Node.js CI](https://github.com/safakoks/ethereum-balance-example/actions/workflows/node.js.yml/badge.svg)](https://github.com/safakoks/ethereum-balance-example/actions/workflows/node.js.yml)
![Known Vulnerabilities](https://snyk.io/test/github/safakoks/ethereum-balance-example/badge.svg)
[![codecov](https://codecov.io/github/safakoks/ethereum-balance-example/branch/main/graph/badge.svg?token=D187V4SU8E)](https://codecov.io/github/safakoks/ethereum-balance-example)
## Introduction :scroll:

TBE

### Requirements :spiral_notepad:
  - Node Version : v14.x
  - npm Version : 6.14.x
  - yarn Version : 1.22.x
#### Installing Dependencies
 
With `npm`
```bash
npm install
```
---
With `yarn`

```bash
yarn
```
  

#### Running Tests :pencil2:
***For all tests***
```bash
npm run test
```
or
```bash
yarn test
```
***
***For unit tests***
```bash
npm run test:unit
```
or
```bash
yarn test:unit
```
***
***For  E2E tests***
```bash
npm run test:e2e
```
or
```bash
yarn test:e2e
```
### How To Run :computer:

  TBE

#### Environment Variables
| Variable | Type  | Decription   |
|--|--|--|
| SERVER_PORT | Number  | |
| ETHEREUM_NODE_URL | String | Ethereum Node URL for connection via Web3  |
| ETHEREUM_CURRENCY_SERVICE_URL | String | Ethereum Price API URL to get USD/ETH Exchange  |
| ETHEREUM_CURRENCY_SERVICE_RETRY_COUNT | Number | Ethereum Price API URL to get USD/ETH Exchange  |

**Example .env File**
```
SERVER_PORT=8000
ETHEREUM_NODE_URL=www.test-node.com/
ETHEREUM_CURRENCY_SERVICE_URL=www.eth-usd.com/api
ETHEREUM_CURRENCY_SERVICE_RETRY_COUNT=3
```
#### Run

```bash
npm run start
```
or
```bash
yarn run start
```
  
