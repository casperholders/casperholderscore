import {CasperClient, CasperServiceByJsonRPC} from "casper-js-sdk";

/**
 * ClientCasper class
 * Contains the casper client and the casper rpc client
 */
export class ClientCasper {

    /** @type {CasperClient} */
    casperClient
    /** @type {CasperServiceByJsonRPC} */
    casperRPC

    /**
     * Constructor
     * @param {string} rpc - Url of the node rpc endpoint
     */
    constructor(rpc) {
        this.casperClient = new CasperClient(rpc)
        this.casperRPC = new CasperServiceByJsonRPC(rpc)
    }
}