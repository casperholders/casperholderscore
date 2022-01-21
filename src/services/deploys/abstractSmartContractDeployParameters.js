import {DeployUtil} from "casper-js-sdk";

/**
 * AbstractSmartContractDeployParameters class
 * Abstract class used to define specifics DeployParameters
 */
export class AbstractSmartContractDeployParameters {
    /**
     * Get the deployParams deploy argument
     *
     * @return {DeployUtil.DeployParams} - Return a DeployParams
     */
    get deployParams() {
        throw new Error("You must implement this method");
    }

    /**
     * Get the session deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a session with a SmartContract stored by hash on the network
     */
    get session() {
        throw new Error("You must implement this method");
    }

    /**
     * Get the payment deploy argument
     *
     * @return {DeployUtil.ExecutableDeployItem} - Return a standard payment
     */
    get payment() {
        throw new Error("You must implement this method");
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        throw new Error("You must implement this method");
    }

    /**
     * Create a unsigned Deploy object
     *
     * @return {Deploy} - Return a deploy object
     */
    get makeDeploy() {
        return DeployUtil.makeDeploy(this.deployParams, this.session, this.payment)
    }
}