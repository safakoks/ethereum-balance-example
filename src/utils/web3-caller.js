/* eslint-disable import/no-extraneous-dependencies */
import Web3 from 'web3';
import Config from '../config';

const web3 = new Web3(new Web3.providers.HttpProvider(Config.ethereumNodeUrl));

export default web3;
