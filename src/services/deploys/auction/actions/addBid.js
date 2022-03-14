import {CLPublicKey, CLU512, CLU8, RuntimeArgs} from "casper-js-sdk";
import {CurrencyUtils} from "../../../helpers";
import {AddBidResult} from "../../../results";
import {AbstractSmartContractStoredByHashDeployParameters} from "../../abstractSmartContractStoredByHashDeployParameters";


/**
 * @constant
 * @type {string}
 */
const entrypoint = 'add_bid'
/**
 * @constant
 * @type {number}
 */
const fee = 2500010000

/**
 * AddBid class
 * Class used to create DeployParameters for a AddBid operation
 */
export class AddBid extends AbstractSmartContractStoredByHashDeployParameters {

    /**
     * Constructor
     *
     * @param {string} amount - Amount of casper to add to the bid
     * @param {string} activeKey - Current active key in the public hex format
     * @param {number} commission - Set the commission of the validator to the given percentage
     * @param {string} network - Current network to execute the deployment
     * @param {string} hash - Current hash of the stored SmartContract
     * @param {number} ttl - Deploy time to live  in hours
     */
    constructor(amount, activeKey, commission, network, hash, ttl = 1) {
        const args = RuntimeArgs.fromMap({
            public_key: CLPublicKey.fromHex(activeKey),
            amount: new CLU512(CurrencyUtils.convertCasperToMotes(amount)),
            delegation_rate: new CLU8(commission)
        })
        super(activeKey, network, hash, entrypoint, args, fee, ttl);
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return AddBidResult
    }
}