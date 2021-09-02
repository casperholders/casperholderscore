/**
 * CurrencyUtils class
 * Used to convert from/to casper/motes
 */
import {BigNumber} from "ethers";


export class CurrencyUtils {

    /**
     * Convert motes to casper
     *
     * @param {BigNumber} motesAmount - Amount in motes
     * @return {BigNumber}
     */
    static convertMotesToCasper(motesAmount) {
        return BigNumber.from(motesAmount).div(1000000000);
    }

    /**
     * Convert casper to motes
     *
     * @param {BigNumber} casperAmount - Amount in casper
     * @return {BigNumber}
     */
    static convertCasperToMotes(casperAmount) {
        return BigNumber.from(casperAmount).mul(1000000000);
    }
}