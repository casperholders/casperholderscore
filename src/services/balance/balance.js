import { CLPublicKey } from 'casper-js-sdk';
import { BigNumber } from '@ethersproject/bignumber';
import NoActiveKeyError from '../errors/noActiveKeyError';
import NoStakeBalanceError from '../errors/noStakeBalanceError';
import NoValidatorBalanceError from '../errors/noValidatorBalanceError';
import CurrencyUtils from '../helpers/currencyUtils';

/**
 * @typedef {import('casper-js-sdk').CasperServiceByJsonRPC} ValidatorsInfoResult
 */

/**
 * Balance class
 * Service used to retrieve different balances from the Casper network
 */
export default class Balance {
  /** @type {AbstractKeyManager} */
  keyManager;

  /** @type {ClientCasper} */
  client;

  /** @type {ValidatorsInfoResult} */
  validatorsInfo;

  /**
   * Constructor
   *
   * @param {AbstractKeyManager} keyManager - Instance of a KeyManager
   * @param {ClientCasper} client - Instance of CasperClient
   */
  constructor(keyManager, client) {
    this.keyManager = keyManager;
    this.client = client;
  }

  /**
   * Retrieve validator info with cache era based
   * @returns {Promise<*>}
   */
  async getValidatorsInfo() {
    if (this.validatorsInfo === undefined) {
      this.validatorsInfo = await this.client.casperRPC.getValidatorsInfo();
      return this.validatorsInfo;
    }
    const lastBlock = await this.client.casperRPC.getLatestBlockInfo();
    if (lastBlock.block.header.era_id !== this.validatorsInfo.auction_state.era_validators[0].era_id) {
      this.validatorsInfo = await this.client.casperRPC.getValidatorsInfo();
    }
    return this.validatorsInfo;
  }

  /**
   * Retrieve current user balance from the network.
   *
   * @return {Promise<String>} - Current balance of the user in CSPR
   */
  async fetchBalance() {
    if (this.keyManager.activeKey === null) {
      throw new NoActiveKeyError();
    }
    return this.fetchBalanceOfPublicKey(this.keyManager.activeKey);
  }

  /**
   * Retrieve balance of a public key from the network.
   *
   * @return {Promise<String>} - Current balance of the public key in CSPR
   */
  async fetchBalanceOfPublicKey(publicKey) {
    return CurrencyUtils.convertMotesToCasper(
      BigNumber.from((await this.client.casperClient.balanceOfByPublicKey(CLPublicKey.fromHex(publicKey))).toString()),
    );
  }

  /**
   * Retrieve current user stake balance from the network for a given validator.
   *
   * @return {Promise<BigNumber>} - Current stake balance of the user
   * @param {string} validatorPublicKey - Public key of the validator
   */
  async fetchStakeBalance(validatorPublicKey) {
    if (this.keyManager.activeKey === null) {
      throw new NoActiveKeyError();
    }
    const validatorsInfo = await this.getValidatorsInfo();
    const validator = validatorsInfo.auction_state.bids.filter(
      (validatorItem) => validatorItem.public_key.toLowerCase() === validatorPublicKey.toLowerCase(),
    )[0];

    const stakingBalance = validator.bid.delegators.filter(
      (delegator) => delegator.public_key.toLowerCase() === this.keyManager.activeKey.toLowerCase(),
    );
    if (stakingBalance.length > 0) {
      return CurrencyUtils.convertMotesToCasper(BigNumber.from(stakingBalance[0].staked_amount));
    }
    throw new NoStakeBalanceError();
  }

  /**
   * Retrieve current user stake balance from the network from all validators.
   *
   * @return {Promise<*[]>} - Current stake balance of the user
   */
  async fetchAllStakeBalance() {
    if (this.keyManager.activeKey === null) {
      throw new NoActiveKeyError();
    }
    const validatorsInfo = await this.getValidatorsInfo();
    const validators = validatorsInfo.auction_state.bids.filter(
      (validator) => validator.bid.delegators.some(
        (delegator) => delegator.public_key.toLowerCase() === this.keyManager.activeKey.toLowerCase(),
      ),
    );
    if (validators.length > 0) {
      const stakeBalances = [];
      validators.forEach((validator) => {
        const delegator = validator.bid.delegators.filter(
          (delegation) => delegation.public_key.toLowerCase() === this.keyManager.activeKey.toLowerCase(),
        )[0];
        stakeBalances.push({
          validator: validator.public_key,
          stakedTokens: CurrencyUtils.convertMotesToCasper(BigNumber.from(delegator.staked_amount)),
        });
      });
      return stakeBalances;
    }
    throw new NoStakeBalanceError();
  }

  /**
   * Retrieve current validator balance from the network.
   *
   * @return {Promise<Object>} - Current balance of the validator
   */
  async fetchValidatorBalance() {
    if (this.keyManager.activeKey === null) {
      throw new NoActiveKeyError();
    }
    const validatorsInfo = await this.getValidatorsInfo();
    const validator = validatorsInfo.auction_state.bids.filter(
      (validatorItem) => validatorItem.public_key.toLowerCase() === this.keyManager.activeKey.toLowerCase(),
    )[0];
    if (validator) {
      return {
        balance: CurrencyUtils.convertMotesToCasper(BigNumber.from(validator.bid.staked_amount)),
        commission: validator.bid.delegation_rate,
      };
    }
    throw new NoValidatorBalanceError();
  }
}
