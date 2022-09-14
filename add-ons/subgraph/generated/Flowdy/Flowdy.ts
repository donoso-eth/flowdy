// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class ContractInit extends ethereum.Event {
  get params(): ContractInit__Params {
    return new ContractInit__Params(this);
  }
}

export class ContractInit__Params {
  _event: ContractInit;

  constructor(event: ContractInit) {
    this._event = event;
  }

  get init(): boolean {
    return this._event.parameters[0].value.toBoolean();
  }
}

export class MemberCreated extends ethereum.Event {
  get params(): MemberCreated__Params {
    return new MemberCreated__Params(this);
  }
}

export class MemberCreated__Params {
  _event: MemberCreated;

  constructor(event: MemberCreated) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get member(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get timestamp(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class MemberDeposit extends ethereum.Event {
  get params(): MemberDeposit__Params {
    return new MemberDeposit__Params(this);
  }
}

export class MemberDeposit__Params {
  _event: MemberDeposit;

  constructor(event: MemberDeposit) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get timestamp(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get deposit(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Floowdy__membersResult {
  value0: BigInt;
  value1: Address;
  value2: BigInt;
  value3: Bytes;
  value4: BigInt;
  value5: BigInt;
  value6: BigInt;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: BigInt,
    value3: Bytes,
    value4: BigInt,
    value5: BigInt,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromSignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromFixedBytes(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromUnsignedBigInt(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class Floowdy extends ethereum.SmartContract {
  static bind(address: Address): Floowdy {
    return new Floowdy("Floowdy", address);
  }

  ETH(): Address {
    let result = super.call("ETH", "ETH():(address)", []);

    return result[0].toAddress();
  }

  try_ETH(): ethereum.CallResult<Address> {
    let result = super.tryCall("ETH", "ETH():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  afterAgreementCreated(
    _superToken: Address,
    _agreementClass: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): Bytes {
    let result = super.call(
      "afterAgreementCreated",
      "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(_superToken),
        ethereum.Value.fromAddress(_agreementClass),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );

    return result[0].toBytes();
  }

  try_afterAgreementCreated(
    _superToken: Address,
    _agreementClass: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "afterAgreementCreated",
      "afterAgreementCreated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(_superToken),
        ethereum.Value.fromAddress(_agreementClass),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  afterAgreementTerminated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): Bytes {
    let result = super.call(
      "afterAgreementTerminated",
      "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );

    return result[0].toBytes();
  }

  try_afterAgreementTerminated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "afterAgreementTerminated",
      "afterAgreementTerminated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  afterAgreementUpdated(
    _superToken: Address,
    _agreementClass: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): Bytes {
    let result = super.call(
      "afterAgreementUpdated",
      "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(_superToken),
        ethereum.Value.fromAddress(_agreementClass),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );

    return result[0].toBytes();
  }

  try_afterAgreementUpdated(
    _superToken: Address,
    _agreementClass: Address,
    param2: Bytes,
    _agreementData: Bytes,
    param4: Bytes,
    _ctx: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "afterAgreementUpdated",
      "afterAgreementUpdated(address,address,bytes32,bytes,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(_superToken),
        ethereum.Value.fromAddress(_agreementClass),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(_agreementData),
        ethereum.Value.fromBytes(param4),
        ethereum.Value.fromBytes(_ctx)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  beforeAgreementCreated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): Bytes {
    let result = super.call(
      "beforeAgreementCreated",
      "beforeAgreementCreated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toBytes();
  }

  try_beforeAgreementCreated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "beforeAgreementCreated",
      "beforeAgreementCreated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  beforeAgreementTerminated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): Bytes {
    let result = super.call(
      "beforeAgreementTerminated",
      "beforeAgreementTerminated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toBytes();
  }

  try_beforeAgreementTerminated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "beforeAgreementTerminated",
      "beforeAgreementTerminated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  beforeAgreementUpdated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): Bytes {
    let result = super.call(
      "beforeAgreementUpdated",
      "beforeAgreementUpdated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toBytes();
  }

  try_beforeAgreementUpdated(
    param0: Address,
    param1: Address,
    param2: Bytes,
    param3: Bytes,
    param4: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "beforeAgreementUpdated",
      "beforeAgreementUpdated(address,address,bytes32,bytes,bytes):(bytes)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromFixedBytes(param2),
        ethereum.Value.fromBytes(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  cfa(): Address {
    let result = super.call("cfa", "cfa():(address)", []);

    return result[0].toAddress();
  }

  try_cfa(): ethereum.CallResult<Address> {
    let result = super.tryCall("cfa", "cfa():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  gelato(): Address {
    let result = super.call("gelato", "gelato():(address)", []);

    return result[0].toAddress();
  }

  try_gelato(): ethereum.CallResult<Address> {
    let result = super.tryCall("gelato", "gelato():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  host(): Address {
    let result = super.call("host", "host():(address)", []);

    return result[0].toAddress();
  }

  try_host(): ethereum.CallResult<Address> {
    let result = super.tryCall("host", "host():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  members(param0: Address): Floowdy__membersResult {
    let result = super.call(
      "members",
      "members(address):(uint256,address,int96,bytes32,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Floowdy__membersResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBytes(),
      result[4].toBigInt(),
      result[5].toBigInt(),
      result[6].toBigInt()
    );
  }

  try_members(param0: Address): ethereum.CallResult<Floowdy__membersResult> {
    let result = super.tryCall(
      "members",
      "members(address):(uint256,address,int96,bytes32,uint256,uint256,uint256)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Floowdy__membersResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBytes(),
        value[4].toBigInt(),
        value[5].toBigInt(),
        value[6].toBigInt()
      )
    );
  }

  ops(): Address {
    let result = super.call("ops", "ops():(address)", []);

    return result[0].toAddress();
  }

  try_ops(): ethereum.CallResult<Address> {
    let result = super.tryCall("ops", "ops():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  parseLoanData(data: Bytes): BigInt {
    let result = super.call("parseLoanData", "parseLoanData(bytes):(uint256)", [
      ethereum.Value.fromBytes(data)
    ]);

    return result[0].toBigInt();
  }

  try_parseLoanData(data: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "parseLoanData",
      "parseLoanData(bytes):(uint256)",
      [ethereum.Value.fromBytes(data)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _host(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _superToken(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _token(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get _pool(): Address {
    return this._call.inputValues[3].value.toAddress();
  }

  get _aToken(): Address {
    return this._call.inputValues[4].value.toAddress();
  }

  get _ops(): Address {
    return this._call.inputValues[5].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class _calculateYieldCall extends ethereum.Call {
  get inputs(): _calculateYieldCall__Inputs {
    return new _calculateYieldCall__Inputs(this);
  }

  get outputs(): _calculateYieldCall__Outputs {
    return new _calculateYieldCall__Outputs(this);
  }
}

export class _calculateYieldCall__Inputs {
  _call: _calculateYieldCall;

  constructor(call: _calculateYieldCall) {
    this._call = call;
  }
}

export class _calculateYieldCall__Outputs {
  _call: _calculateYieldCall;

  constructor(call: _calculateYieldCall) {
    this._call = call;
  }
}

export class _poolRebalanceCall extends ethereum.Call {
  get inputs(): _poolRebalanceCall__Inputs {
    return new _poolRebalanceCall__Inputs(this);
  }

  get outputs(): _poolRebalanceCall__Outputs {
    return new _poolRebalanceCall__Outputs(this);
  }
}

export class _poolRebalanceCall__Inputs {
  _call: _poolRebalanceCall;

  constructor(call: _poolRebalanceCall) {
    this._call = call;
  }
}

export class _poolRebalanceCall__Outputs {
  _call: _poolRebalanceCall;

  constructor(call: _poolRebalanceCall) {
    this._call = call;
  }
}

export class AaveSupplyCall extends ethereum.Call {
  get inputs(): AaveSupplyCall__Inputs {
    return new AaveSupplyCall__Inputs(this);
  }

  get outputs(): AaveSupplyCall__Outputs {
    return new AaveSupplyCall__Outputs(this);
  }
}

export class AaveSupplyCall__Inputs {
  _call: AaveSupplyCall;

  constructor(call: AaveSupplyCall) {
    this._call = call;
  }
}

export class AaveSupplyCall__Outputs {
  _call: AaveSupplyCall;

  constructor(call: AaveSupplyCall) {
    this._call = call;
  }
}

export class AfterAgreementCreatedCall extends ethereum.Call {
  get inputs(): AfterAgreementCreatedCall__Inputs {
    return new AfterAgreementCreatedCall__Inputs(this);
  }

  get outputs(): AfterAgreementCreatedCall__Outputs {
    return new AfterAgreementCreatedCall__Outputs(this);
  }
}

export class AfterAgreementCreatedCall__Inputs {
  _call: AfterAgreementCreatedCall;

  constructor(call: AfterAgreementCreatedCall) {
    this._call = call;
  }

  get _superToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _agreementClass(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value2(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _agreementData(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get value4(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get _ctx(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class AfterAgreementCreatedCall__Outputs {
  _call: AfterAgreementCreatedCall;

  constructor(call: AfterAgreementCreatedCall) {
    this._call = call;
  }

  get newCtx(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class AfterAgreementTerminatedCall extends ethereum.Call {
  get inputs(): AfterAgreementTerminatedCall__Inputs {
    return new AfterAgreementTerminatedCall__Inputs(this);
  }

  get outputs(): AfterAgreementTerminatedCall__Outputs {
    return new AfterAgreementTerminatedCall__Outputs(this);
  }
}

export class AfterAgreementTerminatedCall__Inputs {
  _call: AfterAgreementTerminatedCall;

  constructor(call: AfterAgreementTerminatedCall) {
    this._call = call;
  }

  get value0(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value1(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value2(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _agreementData(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get value4(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get _ctx(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class AfterAgreementTerminatedCall__Outputs {
  _call: AfterAgreementTerminatedCall;

  constructor(call: AfterAgreementTerminatedCall) {
    this._call = call;
  }

  get newCtx(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class AfterAgreementUpdatedCall extends ethereum.Call {
  get inputs(): AfterAgreementUpdatedCall__Inputs {
    return new AfterAgreementUpdatedCall__Inputs(this);
  }

  get outputs(): AfterAgreementUpdatedCall__Outputs {
    return new AfterAgreementUpdatedCall__Outputs(this);
  }
}

export class AfterAgreementUpdatedCall__Inputs {
  _call: AfterAgreementUpdatedCall;

  constructor(call: AfterAgreementUpdatedCall) {
    this._call = call;
  }

  get _superToken(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _agreementClass(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get value2(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }

  get _agreementData(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }

  get value4(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get _ctx(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class AfterAgreementUpdatedCall__Outputs {
  _call: AfterAgreementUpdatedCall;

  constructor(call: AfterAgreementUpdatedCall) {
    this._call = call;
  }

  get newCtx(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get _ops(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class TokensReceivedCall extends ethereum.Call {
  get inputs(): TokensReceivedCall__Inputs {
    return new TokensReceivedCall__Inputs(this);
  }

  get outputs(): TokensReceivedCall__Outputs {
    return new TokensReceivedCall__Outputs(this);
  }
}

export class TokensReceivedCall__Inputs {
  _call: TokensReceivedCall;

  constructor(call: TokensReceivedCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get userData(): Bytes {
    return this._call.inputValues[4].value.toBytes();
  }

  get operatorData(): Bytes {
    return this._call.inputValues[5].value.toBytes();
  }
}

export class TokensReceivedCall__Outputs {
  _call: TokensReceivedCall;

  constructor(call: TokensReceivedCall) {
    this._call = call;
  }
}
