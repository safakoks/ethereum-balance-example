  

# Ethereum Balance Example :chart:
[![Node.js CI](https://github.com/safakoks/ethereum-balance-example/actions/workflows/node.js.yml/badge.svg)](https://github.com/safakoks/ethereum-balance-example/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/github/safakoks/ethereum-balance-example/branch/main/graph/badge.svg?token=D187V4SU8E)](https://codecov.io/github/safakoks/ethereum-balance-example)

## Introduction :scroll:

  

This repo includes an example API to get Ethereum Balance by using Addresses. The API also checks if the given addresses are valid Ethereum addresses.

  
  
  

## Demo :link:

[Swagger Documentation](https://etehereum-balance-example.cyclic.app/swagger/#/Eth/post_eth_balance)
  

### Example :bookmark:

***POST : /eth/balance***

Request Body
```json
{
	"addresses": [
		"wrong-address",
		"0x03d30736fcc8f0a1630b58cebbe1553f41d51b05",
		"another-wron-address",
		"0x64839271e7713252b7a17e92C4d76fCD8216A22f"
	]
}
```

Response Body

```json
{
	"sorted_addresses": [
		{
			"address":  "0x03d30736fcc8f0a1630b58cebbe1553f41d51b05",
			"eth_balance":  0.0719578297526391,
			"usd_balance":  120.03789285845998
		},
		{
			"address":  "0x64839271e7713252b7a17e92C4d76fCD8216A22f",
			"eth_balance":  0.060331436489413214,
			"usd_balance":  100.64309240854445
		}
	],

	"wrong_addresses": [
		"wrong-address",
		"another-wron-address"
	]
}
```

  

### Requirements :spiral_notepad:

 - [ ]  Node Version : v14.x
 - [ ]  NPM Version : 6.14.x


#### Installing Dependencies

With `npm`
```bash
npm install
```


#### Running Tests :pencil2:

***For all tests***

```bash
npm run  test
```

***

***For unit tests***

```bash
npm run  test:unit
```

***

***For E2E tests***

```bash
npm run  test:e2e
```

### How To Run :computer:

  

```bash
npm run  start
```

#### Environment Variables

| Variable | Type | Decription |
|--|--|--|
| SERVER_PORT | Number | |
| ETHEREUM_NODE_URL | String | Ethereum Node URL for connection via Web3 |
| ETHEREUM_CURRENCY_SERVICE_URL | String | Ethereum Price API URL to get USD/ETH Exchange |
| ETHEREUM_CURRENCY_SERVICE_RETRY_COUNT | Number | Ethereum Price API URL to get USD/ETH Exchange |


**Example .env File**
```
SERVER_PORT=8000
ETHEREUM_NODE_URL=www.test-node.com/
ETHEREUM_CURRENCY_SERVICE_URL=www.eth-usd.com/api
ETHEREUM_CURRENCY_SERVICE_RETRY_COUNT=3
```

#### Run

 After setting environment variables
```bash
npm run  start
```

***Console***

```bash
info: Listening to port SERVER_PORT
```
