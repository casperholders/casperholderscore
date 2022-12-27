import { BigNumber } from '@ethersproject/bignumber';
import { concat } from '@ethersproject/bytes';
import Big from 'big.js';
import * as blake from 'blakejs';
import {
  CLByteArray,
  CLKey,
  CLOptionType,
  CLPublicKey,
  CLU256Type,
  CLValueParsers,
  decodeBase16,
} from 'casper-js-sdk';
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

  async fetchAllowanceOfErc20(contractHash, spender) {
    try {
      const key = new CLKey(CLPublicKey.fromHex(this.keyManager.activeKey));
      const keyBytes = CLValueParsers.toBytes(key)
        .unwrap();
      const spenderKey = new CLKey(new CLByteArray(decodeBase16(spender)));
      const spenderKeyBytes = CLValueParsers.toBytes(spenderKey)
        .unwrap();
      const finalBytes = concat([keyBytes, spenderKeyBytes]);
      const blaked = blake.blake2b(finalBytes, undefined, 32);
      const encodedBytes = Buffer.from(blaked)
        .toString('hex');
      const { block } = await this.client.casperRPC.getLatestBlockInfo();
      let stateRootHash = '';
      if (block) {
        stateRootHash = block.header.state_root_hash;
      } else {
        return '0';
      }

      const contractData = await this.client.casperRPC.getBlockState(
        stateRootHash,
        `hash-${contractHash}`,
        [],
      );

      const { namedKeys } = contractData.Contract;
      const listOfNamedKeys = [
        'allowances',
      ];

      const namedKeysParsed = namedKeys.reduce((acc, val) => {
        if (listOfNamedKeys.includes(val.name)) {
          const camelCased = val.name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
          return {
            ...acc,
            [camelCased]: val.key,
          };
        }
        return acc;
      }, {});

      const allowance = await this.client.casperRPC.getDictionaryItemByURef(
        stateRootHash,
        encodedBytes,
        namedKeysParsed.allowances,
      );

      if (
        allowance.CLValue.clType()
          .toString()
        === new CLOptionType(new CLU256Type()).toString()) {
        return allowance.CLValue.value().some ? allowance.CLValue.value()
          .val
          .value()
          .toString() : '0';
      }

      return allowance.CLValue.value()
        .toString();
    } catch (e) {
      console.log(e);
    }
    return '0';
  }

  async fetchBalanceOfErc20(contractHash) {
    try {
      const key = new CLKey(CLPublicKey.fromHex(this.keyManager.activeKey));
      const keyBytes = CLValueParsers.toBytes(key)
        .unwrap();
      const itemKey = Buffer.from(keyBytes)
        .toString('base64');
      const itemKeyUniswap = Buffer.from(CLPublicKey.fromHex(this.keyManager.activeKey)
        .toAccountHash())
        .toString('hex');
      const { block } = await this.client.casperRPC.getLatestBlockInfo();
      let stateRootHash = '';
      if (block) {
        stateRootHash = block.header.state_root_hash;
      } else {
        return '0';
      }

      const contractData = await this.client.casperRPC.getBlockState(
        stateRootHash,
        `hash-${contractHash}`,
        [],
      );

      const { namedKeys } = contractData.Contract;
      const listOfNamedKeys = [
        'decimals',
        'balances',
        'allowances',
      ];

      const namedKeysParsed = namedKeys.reduce((acc, val) => {
        if (listOfNamedKeys.includes(val.name)) {
          const camelCased = val.name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
          return {
            ...acc,
            [camelCased]: val.key,
          };
        }
        return acc;
      }, {});

      let storedValueBalance;
      try {
        storedValueBalance = await this.client.casperRPC.getDictionaryItemByURef(
          stateRootHash,
          itemKey,
          namedKeysParsed.balances,
        );
      } catch (e) {
        storedValueBalance = await this.client.casperRPC.getDictionaryItemByURef(
          stateRootHash,
          itemKeyUniswap,
          namedKeysParsed.balances,
        );
      }

      const storedValueDecimals = await this.client.casperRPC.getBlockState(
        stateRootHash,
        namedKeysParsed.decimals,
        [],
      );

      if (storedValueBalance && storedValueBalance.CLValue.isCLValue) {
        let rawValue;
        if (storedValueBalance.CLValue.clType()
          .toString() === new CLOptionType(new CLU256Type()).toString()
          && storedValueBalance.CLValue.value().some) {
          rawValue = Big(storedValueBalance.CLValue.value()
            .val
            .value());
        } else {
          rawValue = Big(storedValueBalance.CLValue.value()
            .toString());
        }
        const rawDecimals = storedValueDecimals.CLValue.value();
        return (rawDecimals ? rawValue.div(Big(10)
          .pow(rawDecimals.toNumber())) : rawValue).toString();
      }
    } catch (e) {
      console.log(e);
      return '0';
    }
    return '0';
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
