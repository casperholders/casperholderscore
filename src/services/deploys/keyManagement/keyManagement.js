import { CLByteArrayType, CLListType, CLU8Type, CLValueBuilder, RuntimeArgs } from "casper-js-sdk";
import { KeyManagementResult } from "../../results/keyManagementResult";
import { AbstractSmartContractModuleBytesParameters } from "../abstractSmartContractModuleBytesParameters";
import { None, Some } from "ts-results";

/**
 * KeyManagement class
 * Class used to create DeployParameters for a KeyManagement set_all operation
 */
export class KeyManagement extends AbstractSmartContractModuleBytesParameters {
    /**
     * Constructor
     *
     * @param {number} deployThreshold - Deploy threshold
     * @param {number} keyManagementThreshold - Key Management threshold
     * @param {Array} accountWeights - Array of objects with account hashes and weights
     * @param {string} activeKey - Current active key in the public hex format
     * @param {string} network - Current network to execute the deployment
     * @param {Buffer} smartContractBuffer - Current hash of the stored SmartContract
     */
    constructor(deployThreshold, keyManagementThreshold, accountWeights, activeKey, network, smartContractBuffer) {
        let fee = 0;
        let deployThresholdValue = CLValueBuilder.option(None, new CLU8Type());
        let keyManagementThresholdValue = CLValueBuilder.option(None, new CLU8Type());
        let accountsValue = CLValueBuilder.option(None, new CLListType(new CLByteArrayType(32)));
        let weightsValue = CLValueBuilder.option(None, new CLListType(new CLU8Type()));
        if (deployThreshold) {
            deployThresholdValue = CLValueBuilder.option(
                Some(
                    CLValueBuilder.u8(deployThreshold),
                ),
                new CLU8Type(),
            );
            fee += 400000000;
        }
        if (keyManagementThreshold) {
            keyManagementThresholdValue = CLValueBuilder.option(
                Some(
                    CLValueBuilder.u8(keyManagementThreshold),
                ),
                new CLU8Type(),
            );
            fee += 400000000;
        }
        if (accountWeights) {
            accountsValue = CLValueBuilder.option(
                Some(
                    CLValueBuilder.list(
                        accountWeights.map(x => CLValueBuilder.byteArray(x.accountHash)),
                    ),
                ),
                new CLListType(new CLByteArrayType(32)),
            );
            weightsValue = CLValueBuilder.option(
                Some(
                    CLValueBuilder.list(
                        accountWeights.map(x => CLValueBuilder.u8(x.weight)),
                    ),
                ),
                new CLListType(new CLU8Type()),
            );
            fee += 400000000 * accountWeights.length;
        }
        const args = RuntimeArgs.fromMap({
            deployment_threshold: deployThresholdValue,
            key_management_threshold: keyManagementThresholdValue,
            accounts: accountsValue,
            weights: weightsValue,
        });
        super(activeKey, network, smartContractBuffer, args, fee);
    }

    /**
     * Get a DeployResult constructor
     *
     * @return {DeployResult.constructor} - Return the constructor of a given DeployResult
     */
    get deployResult() {
        return KeyManagementResult;
    }
}