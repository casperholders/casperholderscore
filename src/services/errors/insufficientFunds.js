import {ExtendableError} from "./extendableError";

/**
 * InsufficientFunds class
 * Error thrown when the user as insufficient funds in his balance
 */
export class InsufficientFunds extends ExtendableError {
    /**
     * Constructor
     *
     * @param min - Minimum casper needed
     */
    constructor(min) {
        super("Insufficient funds. You must have more than " + min + " CSPR on your wallet.");
    }
}