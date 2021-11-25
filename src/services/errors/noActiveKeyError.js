import {ExtendableError} from "./extendableError";

/**
 * NoActiveKeyError class
 * Error thrown when the user is not connected
 */
export class NoActiveKeyError extends ExtendableError {
    /**
     * Constructor
     */
    constructor() {
        super("Not connected.");
    }
}
