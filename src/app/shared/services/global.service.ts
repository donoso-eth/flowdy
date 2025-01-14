import { Injectable } from '@angular/core';
import { DappInjector, Web3Actions } from 'angular-web3';
import { constants, Contract, ethers, Signer, utils } from 'ethers';
import { doSignerTransaction } from 'src/app/dapp-injector/classes/transactor';
import {
  createERC20Instance,
  createSupertokenInstance,
} from '../helpers/helpers';
import { ISuperToken } from 'src/assets/contracts/interfaces/ISuperToken';
import { Floowdy } from 'src/assets/contracts/interfaces/Floowdy';
import { IPOOL_STATE, IPOOL_TOKEN } from '../models/models';
import { SuperFluidService } from 'src/app/dapp-injector/services/super-fluid/super-fluid-service.service';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  erc20?: ethers.Contract;
  supertoken?: ISuperToken;
  public poolState!: IPOOL_STATE;
  public poolToken: IPOOL_TOKEN = {
    name: 'USDC',
    superTokenName: 'USDCx',
    id: 1,
    image: 'usdc',
    superToken: '0xbCE2198f789f3AC1Af76D3835BEe8A61830aAd34',
    superTokenBalance: '0',
    token: '0xA2025B15a1757311bfD68cb14eaeFCc237AF5b43',
    tokenBalance: '0',
  };

  constructor(
    public dapp: DappInjector,
    public superfluid: SuperFluidService,
    public store:Store
  ) {}

  async getPoolToken(): Promise<{poolToken:IPOOL_TOKEN, poolState:IPOOL_STATE}> {
    await this.getBalances();
    return  { poolToken:this.poolToken,poolState:this.poolState};
  }

  getTokenInstance() {
    if (this.erc20 == undefined) {
      this.erc20 = createERC20Instance(
        this.poolToken.token,
        this.dapp.signer as Signer
      );
    }
  }

  getSuperTokenInstance() {
    if (this.supertoken == undefined) {
      this.supertoken = createSupertokenInstance(
        this.poolToken.superToken,
        this.dapp.signer as Signer
      ) as ISuperToken;
    }
  }

  async getBalances() {
    this.getTokenInstance();
    this.getSuperTokenInstance();



    let balance = this.erc20?.balanceOf(this.dapp.signerAddress);
    let superbalance = (this.supertoken as ISuperToken).realtimeBalanceOfNow(
      this.dapp.signerAddress as string
    );

    let result = await Promise.all([balance, superbalance]);

    let poolbalance = await this.supertoken?.balanceOf(
      this.dapp.defaultContract?.address!
    );
    console.log(poolbalance?.toString());

    // console.log(result[1].availableBalance)

    // console.log(result[1].availableBalance.div(10**6));

    // console.log(await this.supertoken?.decimals())

    this.poolToken.superTokenBalance = (+utils.formatEther(
      result[1].availableBalance
    )).toFixed(4);
    this.poolToken.tokenBalance = result[0].div(10 ** 6).toString();

    console.log(this.poolToken.tokenBalance);


    await this.getPoolState()

  }

  prepareNumbers(balance: number) {
    const niceTwo = (balance / 10 ** 18).toFixed(2);
    let twoDec = niceTwo;

    const niceFour = (balance / 10 ** 18).toFixed(6);

    let fourDec = niceFour.substring(niceFour.length - 4, niceFour.length);
    return { twoDec, fourDec };
  }

  async mint() {
    // this.getBalances()

    // let signer = this.dapp.signer as Signer;

    console.log(this.dapp.signerAddress);

    // let balance = await this.erc20?.balanceOf(this.dapp.defaultContract?.address);

    //  console.log(balance.toString());
    let amount = 1000000 * 10 ** 6;
    let amountSuper = 1000 * 10 ** 18;
    await doSignerTransaction(
      (this.erc20 as Contract).connect(this.dapp.signer!)['mint(uint256)'](amount)
    );
    this.store.dispatch(Web3Actions.chainBusyWithMessage({message: {body:'Approving the supertoken contract', header:'Un momento'}}))

    await doSignerTransaction(
      (this.erc20 as Contract).connect(this.dapp.signer!).approve(
        this.supertoken?.address,
        constants.MaxUint256
      )
    );
    this.store.dispatch(Web3Actions.chainBusyWithMessage({message: {body:'Upgrading the usdc tokens to supertokens', header:'Un momento más'}}))

    const value = utils.parseEther('1000000').toString();
    await doSignerTransaction((this.supertoken as ISuperToken).connect(this.dapp.signer!).upgrade(value));

    // console.log(this.dapp.defaultContract?.address)

    // balance =await  this.erc20?.balanceOf(this.dapp.defaultContract?.address);
    // console.log(balance.toString())
    // await doSignerTransaction( (this.erc20 as Contract).transfer(this.dapp.defaultContract?.address,amount))

    // balance =await  this.erc20?.balanceOf(this.dapp.defaultContract?.address);
    // console.log(balance.toString())

    //await doSignerTransaction((this.dapp.defaultContract?.instance as Floowdy).deposit())
  }

  // #region  ====================== pool state ========================

  async getPoolState(): Promise<IPOOL_STATE> {

    let resultFlow = await this.superfluid.getFlow({
      sender: this.dapp.signerAddress!,
      receiver: this.dapp.defaultContract?.address!,
      superToken: this.poolToken.superToken,
    });

    this.poolState = { inFlow: +resultFlow.flowRate, deposit: +resultFlow.deposit, yieldAccrued:0, timestamp:+resultFlow.timestamp};


    return this.poolState; 
  
  }

  // #endregion  ====================== pool state ========================
}
