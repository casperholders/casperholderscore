import {CLPublicKey, CLU512, RuntimeArgs} from "casper-js-sdk";
import {CurrencyUtils} from "../../../helpers/currencyUtils";
import {WithdrawBidResult} from "../../../results/withdrawBidResult";
import {AbstractSmartContractStoredByHashDeployParameters} from "../../abstractSmartContractStoredByHashDeployParameters";

/**
 * @constant
 * @type {string}
 */
const entrypoint = 'withdraw_bid'
/**
 * @constant
 * @type {number}
 */
const fee = 220000000

/**
 * WithdrawBid
 * Class used to create DeployParameters for a WithdrawBid operation
 */
export class WithdrawBid extends AbstractSmartContractStoredByHashDeployParameters {

    /**
     * Constructor
     *
     * @param {number} amount - Amount of casper to withdraw to the bid
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} network - Current network to execute the deployment
     * @param {string} hash - Current hash of the stored SmartContract
     */
    constructor(amount, activeKey, network, hash) {
        const args = RuntimeArgs.fromMap({
            public_key: CLPublicKey.fromHex(activeKey),
            amount: new CLU512(CurrencyUtils.convertCasperToMotes(amount)),
        })
        super(activeKey, network, hash, entrypoint, args, fee);
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return WithdrawBidResult
    }
}