import {AbstractSmartContractDeployParameters} from "../abstractSmartContractDeployParameters";
import {CLPublicKey, DeployUtil, RuntimeArgs} from "casper-js-sdk";
import {SmartContractResult} from "../../results";
import {CurrencyUtils} from "../../helpers";


/**
 * SmartContractDeployParameters class
 * Class used to define the parameters of a deployment to send a smart contract on the network
 */
export class SmartContractDeployParameters extends AbstractSmartContractDeployParameters {
    /** @type {string} */
    activeKey;
    /** @type {string} */
    network;
    /** @type {Buffer} */
    smartContractBuffer;
    /** @type {string} */
    fee;

    /**
     * Constructor
     *
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} network - Current network to execute the deployment
     * @param {Buffer} smartContractBuffer - Buffer of the SmartContract previously read
     * @param {string} fee - Runtime fee for the given SmartContract operation
     */
    constructor(activeKey, network, smartContractBuffer, fee) {
        super()
        this.activeKey = activeKey;
        this.network = network;
        this.smartContractBuffer = smartContractBuffer;
        this.fee = fee;
    }

    /**
     * Get the deployParams deploy argument
     *
     * @return {DeployUtil.DeployParams} - Return a DeployParams
     */
    get deployParams() {
        return new DeployUtil.DeployParams(
            CLPublicKey.fromHex(this.activeKey),
            this.network
        );
    }

    /**
     * Get the session deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a session with a SmartContract stored by hash on the network
     */
    get session() {
        return DeployUtil.ExecutableDeployItem.newModuleBytes(new Uint8Array(this.smartContractBuffer), RuntimeArgs.fromMap({}));
    }

    /**
     * Get the payment deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
     */
    get payment() {
        return DeployUtil.standardPayment(CurrencyUtils.convertCasperToMotes(this.fee));
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return SmartContractResult
    }
}