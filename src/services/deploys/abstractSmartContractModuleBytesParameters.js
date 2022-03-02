import { AbstractSmartContractDeployParameters } from "./abstractSmartContractDeployParameters";
import { CLPublicKey, DeployUtil } from "casper-js-sdk";

/**
 * AbstractSmartContractStoredByHashDeployParameters class
 * Abstract class used to defined specific DeployParameters for SmartContracts stored by hash on the network
 */
export class AbstractSmartContractModuleBytesParameters extends AbstractSmartContractDeployParameters {
    /** @type {string} */
    activeKey;
    /** @type {string} */
    network;
    /** @type {string} */
    hash;
    /** @type {string} */
    entrypoint;
    /** @type {DeployUtil.RuntimeArgs} */
    args;
    /** @type {number} */
    fee;

    /**
     * Constructor
     *
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} network - Current network to execute the deployment
     * @param {Buffer} smartContractBuffer - Buffer of the SmartContract previously read
     * @param {DeployUtil.RuntimeArgs} args - Arguments of the SmartContract
     * @param {number} fee - Runtime fee for the given SmartContract operation
     */
    constructor(activeKey, network, smartContractBuffer, args, fee) {
        super();
        this.activeKey = activeKey;
        this.network = network;
        this.smartContractBuffer = smartContractBuffer;
        this.args = args;
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
            this.network,
        );
    }

    /**
     * Get the session deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a session with a SmartContract stored by hash on the network
     */
    get session() {
        return DeployUtil.ExecutableDeployItem.newModuleBytes(
            new Uint8Array(this.smartContractBuffer),
            this.args,
        );
    }

    /**
     * Get the payment deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
     */
    get payment() {
        return DeployUtil.standardPayment(this.fee);
    }
}