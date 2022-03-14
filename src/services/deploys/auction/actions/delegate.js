import {CLPublicKey, CLU512, RuntimeArgs} from "casper-js-sdk";
import {CurrencyUtils} from "../../../helpers";
import {DelegateResult} from "../../../results";
import {AbstractSmartContractStoredByHashDeployParameters} from "../../abstractSmartContractStoredByHashDeployParameters";


/**
 * @constant
 * @type {string}
 */
const entrypoint = 'delegate'
/**
 * @constant
 * @type {number}
 */
const fee = 2500000000

/**
 * Delegate class
 * Class used to create DeployParameters for a Delegate operation
 */
export class Delegate extends AbstractSmartContractStoredByHashDeployParameters {

    /**
     * Constructor
     *
     * @param {string} amount - Amount of casper to add to delegate
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} validator - Public key in the hex format of the validator
     * @param {string} network - Current network to execute the deployment
     * @param {string} hash - Current hash of the stored SmartContract
     * @param {number} ttl - Deploy time to live  in hours
     */
    constructor(amount, activeKey, validator, network, hash, ttl = 1) {
        const args = RuntimeArgs.fromMap({
            delegator: CLPublicKey.fromHex(activeKey),
            validator: CLPublicKey.fromHex(validator),
            amount: new CLU512(CurrencyUtils.convertCasperToMotes(amount))
        })
        super(activeKey, network, hash, entrypoint, args, fee, ttl);
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return DelegateResult
    }
}
