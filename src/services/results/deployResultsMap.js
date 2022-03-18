import {
  AccountInfoResult,
  AddBidResult,
  DelegateResult,
  KeyManagementResult,
  SmartContractResult,
  TransferResult,
  UndelegateResult,
  WithdrawBidResult,
} from './index';

export default new Map(
  [
    [AccountInfoResult.getName(), AccountInfoResult],
    [AddBidResult.getName(), AddBidResult],
    [DelegateResult.getName(), DelegateResult],
    [KeyManagementResult.getName(), KeyManagementResult],
    [SmartContractResult.getName(), SmartContractResult],
    [TransferResult.getName(), TransferResult],
    [UndelegateResult.getName(), UndelegateResult],
    [WithdrawBidResult.getName(), WithdrawBidResult],
  ],
);
