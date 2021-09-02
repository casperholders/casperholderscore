import {NoStakeBalanceError, NoValidatorBalanceError} from "../errors";
import {CLPublicKey} from "casper-js-sdk";
import {CurrencyUtils} from "../helpers";

/**
 * Balance class
 * Service used to retrieve different balances from the Casper network
 */
export class Balance {

    /** @type {AbstractKeyManager} */
    keyManager
    /** @type {ClientCasper} */
    client
    /** @type {string} */
    validator

    /**
     * Constructor
     *
     * @param {AbstractKeyManager} keyManager - Instance of a KeyManager
     * @param {ClientCasper} client - Instance of CasperClient
     * @param {string} validator - Hash of the main validator
     */
    constructor(keyManager, client, validator) {
        this.keyManager = keyManager;
        this.client = client;
        this.validator = validator
    }

    /**
     * Retrieve current user balance from the network.
     *
     * @return {Promise<number>} - Current balance of the user
     */
    async fetchBalance() {
        return CurrencyUtils.convertMotesToCasper(
            (await this.client.casperClient.balanceOfByPublicKey(CLPublicKey.fromHex(this.keyManager.activeKey))).toNumber()
        );
    }

    /**
     * Retrieve current user stake balance from the network.
     *
     * @return {Promise<number>} - Current stake balance of the user
     */
    async fetchStakeBalance() {
        const validatorsInfo = await this.client.casperRPC.getValidatorsInfo()
        let validator = validatorsInfo.auction_state.bids.filter(validator => {
            return validator.public_key === this.validator
        })[0]

        let stakingBalance = validator.bid.delegators.filter(delegator => {
            return delegator.public_key === this.keyManager.activeKey
        })
        if (stakingBalance.length > 0) {
            return CurrencyUtils.convertMotesToCasper(parseInt(stakingBalance[0].staked_amount))
        }
        throw new NoStakeBalanceError();
    }

    /**
     * Retrieve current validator balance from the network.
     *
     * @return {Promise<Object>} - Current balance of the validator
     */
    async fetchValidatorBalance() {
        const validatorsInfo = await this.client.casperRPC.getValidatorsInfo()
        let validator = validatorsInfo.auction_state.bids.filter(validator => {
            return validator.public_key === this.keyManager.activeKey
        })[0]
        if (validator) {
            return {
                balance: CurrencyUtils.convertMotesToCasper(parseInt(validator.bid.staked_amount)),
                commission: validator.bid.delegation_rate,
            }
        }
        throw new NoValidatorBalanceError()
    }
}