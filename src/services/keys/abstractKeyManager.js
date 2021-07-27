/**
 * AbstractKeyManager class
 * Used to define multiple key managers
 */
export class AbstractKeyManager {
    /**
     * Retrieve the current active key
     *
     * @return string - Must return a public key hex
     */
    get activeKey() {
        throw new Error('You must implement this function');
    }
}