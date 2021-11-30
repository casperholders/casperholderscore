import { BigNumber } from '@ethersproject/bignumber';

/**
 * @constant
 * @type {string}
 */
export const STATUS_UNKNOWN = "Unknown";
/**
 * @constant
 * @type {string}
 */
export const STATUS_OK = "Success";
/**
 * @constant
 * @type {string}
 */
export const STATUS_KO = "Failure";

/**
 * DeployResult class
 * Object used to keep the track of a deploy result.
 */
export class DeployResult {
    /** @type {string} */
    hash;
    /** @type {BigNumber} */
    cost;
    /** @type {string} */
    status;
    /** @type {string} */
    message;
    /** @type {BigNumber} */
    amount;
    /** @type {string} */
    name;

    /**
     * Constructor
     *
     * @param {string} hash - DeployHash of the deployment
     * @param {string} name - Name of the operation
     */
    constructor(hash, name) {
        this.hash = hash;
        this.cost = BigNumber.from(0);
        this.status = STATUS_UNKNOWN;
        this.message = "";
        this.amount = BigNumber.from(0);
        this.name = name;
    }

    /**
     * Retrieve the name of the operation behind the deployment
     * Must return the name of the operation behind the deployment
     */
    static getName() {
        throw "You must implement this method"
    }
}
