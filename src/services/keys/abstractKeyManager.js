/**
 * AbstractKeyManager class
 * Used to define multiple key managers
 */
export default class AbstractKeyManager {
  /**
   * Retrieve the current active key
   *
   * @return string - Must return a public key hex
   */
  // eslint-disable-next-line class-methods-use-this
  get activeKey() {
    throw new Error('You must implement this function');
  }
}
