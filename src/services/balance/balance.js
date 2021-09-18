import { NoStakeBalanceError, NoValidatorBalanceError } from '../errors';
import { CLPublicKey } from 'casper-js-sdk';
import { CurrencyUtils } from '../helpers';
import { BigNumber } from 'ethers';


/**
 * Balance class
 * Service used to retrieve different balances from the Casper network
 */
export class Balance {

  /** @type {AbstractKeyManager} */
  keyManager;

  /** @type {ClientCasper} */
  client;

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
   * Retrieve current user balance from the network.
   *
   * @return {Promise<BigNumber>} - Current balance of the user
   */
  async fetchBalance() {
    return CurrencyUtils.convertMotesToCasper(BigNumber.from((await this.client.casperClient.balanceOfByPublicKey(CLPublicKey.fromHex(this.keyManager.activeKey))).toString()));
  }

  /**
   * Retrieve current user stake balance from the network for a given validator.
   *
   * @return {Promise<BigNumber>} - Current stake balance of the user
   * @param {string} validatorPublicKey - Public key of the validator
   */
  async fetchStakeBalance(validatorPublicKey) {
    const validatorsInfo = await this.client.casperRPC.getValidatorsInfo();
    let validator = validatorsInfo.auction_state.bids.filter(validator => {
      return validator.public_key === validatorPublicKey;
    })[0];

    let stakingBalance = validator.bid.delegators.filter(delegator => {
      return delegator.public_key === this.keyManager.activeKey;
    });
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
    const validatorsInfo = await this.client.casperRPC.getValidatorsInfo();
    let validators = validatorsInfo.auction_state.bids.filter(validator => {
      return validator.bid.delegators.some((delegator) => delegator.public_key === this.keyManager.activeKey);
    });
    if (validators.length > 0) {
      let stakeBalances = [];
      validators.forEach((validator) => {
        const delegator = validator.bid.delegators.filter((delegation) => {
          return delegation.public_key === this.keyManager.activeKey
        })[0]
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
    const validatorsInfo = await this.client.casperRPC.getValidatorsInfo();
    let validator = validatorsInfo.auction_state.bids.filter(validator => {
      return validator.public_key === this.keyManager.activeKey;
    })[0];
    if (validator) {
      return {
        balance: CurrencyUtils.convertMotesToCasper(BigNumber.from(validator.bid.staked_amount)),
        commission: validator.bid.delegation_rate,
      };
    }
    throw new NoValidatorBalanceError();
  }
}