import {ExtendableError} from "./extendableError";

/**
 * NoStakeBalanceError class
 * Error thrown when the user doesn't have a staking balance
 */
export class NoStakeBalanceError extends ExtendableError {
    /**
     * Constructor
     */
    constructor() {
        super("No staking funds.");
    }
}