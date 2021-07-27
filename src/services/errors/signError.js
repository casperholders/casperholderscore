import {ExtendableError} from "./extendableError";

/**
 * SignError class
 * Error thrown when there's a error with the deploy signature process
 */
export class SignError extends ExtendableError {
    /**
     * Constructor
     */
    constructor() {
        super("Failed to sign the contract. Please retry if you canceled the operation.");
    }
}