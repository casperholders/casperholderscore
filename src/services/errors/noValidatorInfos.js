import {ExtendableError} from "./extendableError";

/**
 * NoValidatorInfos class
 * Error thrown when we can't retrieve validator metadata
 */
export class NoValidatorInfos extends ExtendableError {
    /**
     * Constructor
     */
    constructor() {
        super("Unable to retrieve the validator metadata.");
    }
}