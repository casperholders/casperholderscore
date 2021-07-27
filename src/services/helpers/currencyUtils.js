/**
 * CurrencyUtils class
 * Used to convert from/to casper/motes
 */
export class CurrencyUtils {

    /**
     * Convert motes to casper
     *
     * @param {number} motesAmount - Amount in motes
     * @return {number}
     */
    static convertMotesToCasper(motesAmount) {
        return motesAmount / 1000000000;
    }

    /**
     * Convert casper to motes
     *
     * @param {number} casperAmount - Amount in casper
     * @return {number}
     */
    static convertCasperToMotes(casperAmount) {
        return casperAmount * 1000000000;
    }
}