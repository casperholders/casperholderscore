import {AbstractSmartContractDeployParameters} from "../abstractSmartContractDeployParameters";
import {CLPublicKey, DeployUtil} from "casper-js-sdk";
import {CurrencyUtils} from "../../helpers";
import {TransferResult} from "../../results";


/**
 * @constant
 * @type {number}
 */
const fee = 10000

/**
 * TransferDeployParameters class
 * Class used to create DeployParameters for a Transfer operation
 */
export class TransferDeployParameters extends AbstractSmartContractDeployParameters {
    /** @type {string} */
    activeKey;
    /** @type {string} */
    network;
    /** @type {string} */
    amount;
    /** @type {string} */
    target;
    /** @type {string} */
    transferID;

    /**
     * Constructor
     *
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} network - Current network to execute the deployment
     * @param {string} amount - Amount to transfer in casper
     * @param {string} target - Public key in the hex format of the receiver
     * @param {string} transferID - TransferID of the transfer operation
     */
    constructor(activeKey, network, amount, target, transferID) {
        super()
        this.activeKey = activeKey;
        this.network = network;
        this.amount = amount;
        this.target = target;
        this.transferID = transferID;
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
        return DeployUtil.ExecutableDeployItem.newTransfer(
            CurrencyUtils.convertCasperToMotes(this.amount),
            CLPublicKey.fromHex(this.target),
            undefined,
            this.transferID
        );
    }

    /**
     * Get the payment deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
     */
    get payment() {
        return DeployUtil.standardPayment(fee);
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {TransferResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return TransferResult
    }
}