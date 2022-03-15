/**
 * ExtendableError class
 * Generic error class used as a wrapper to define specific errors
 */
export default class ExtendableError extends Error {
  /** @type {string} */
  name;

  /** @type {string} */
  stack;

  /**
     * Constructor
     *
     * @param {string} message - Error message
     */
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}
