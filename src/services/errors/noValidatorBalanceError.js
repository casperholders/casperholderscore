import {ExtendableError} from "./extendableError";

/**
 * NoValidatorBalanceError class
 * Error thrown when the current user doesn't have a validator balance
 */
export class NoValidatorBalanceError extends ExtendableError {
    /**
     * Constructor
     */
    constructor() {
        super("Unable to retrieve your Validator balance. Make sure that you are correctly bonded to the network.");
    }
}