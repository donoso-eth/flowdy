import { Injectable } from '@angular/core';
import {
  Framework,
  SuperToken,
  ConstantFlowAgreementV1,
  InstantDistributionAgreementV1,
  Host,
} from '@superfluid-finance/sdk-core';
import Operation from '@superfluid-finance/sdk-core/dist/module/Operation';
import { ethers, Signer, utils } from 'ethers';
import { settings } from '../../constants';
import { DappInjector } from '../../dapp-injector.service';



@Injectable({
  providedIn: 'root',
})
export class SuperFluidService {
  sf!: Framework;
  flow!: ConstantFlowAgreementV1;
  operations: Array<Operation> = [];
  constructor(private dapp: DappInjector) {}

  async getContracts() {}

  async initializeFramework() {

    console.log(this.dapp.DAPP_STATE.connectedNetwork);
    this.sf = await Framework.create({
      networkName: settings[this.dapp.dappConfig.defaultNetwork!].sfNetwork,
      provider: this.dapp.DAPP_STATE.defaultProvider!,
      customSubgraphQueriesEndpoint:
        settings[this.dapp.dappConfig.defaultNetwork].subgraph,
      resolverAddress: settings[this.dapp.dappConfig.defaultNetwork].resolver,
    });

    this.flow = this.sf.cfaV1;


  }


///// ---------  ---------  Money Streaming ---------  ---------  ////
// #region Money Streaming
  async startStream(streamConfig: {
    flowRate: string;
    receiver: string;
    superToken:string;
    data: string;
  }) {
    this.operations = [];
    console.log(streamConfig)

    await this.createStream(streamConfig);
    const result = await this.operations[0].exec(this.dapp.DAPP_STATE.signer!);
    const result2 = await result.wait();
  }

  async createStream(streamConfig: {
    flowRate: string;
    receiver: string;
    superToken:string;
    data: string;
  }) {
    if (this.sf == undefined){
      await this.initializeFramework()
    }

    const createFlowOperation = this.flow.createFlow({
      flowRate: streamConfig.flowRate,
      receiver: streamConfig.receiver,
      superToken: streamConfig.superToken,//  '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f', //environment.mumbaiDAIx,
      userData: streamConfig.data,
      overrides: {
        gasPrice: utils.parseUnits('100', 'gwei'),
        gasLimit: 2000000,
      },
    });

    this.operations.push(createFlowOperation);
  }


  async stopStream(streamConfig: {
    receiver: string;
    superToken: string;
    data: string;
  }) {
    if (this.sf == undefined){
      await this.initializeFramework()
    }

    const deleteFlowOperation = this.sf.cfaV1.deleteFlow({
      sender: this.dapp.signerAddress!,
      receiver: streamConfig.receiver,
      superToken: streamConfig.superToken, //environment.mumbaiDAIx,
      userData: streamConfig.data,
      overrides: {
        gasPrice: utils.parseUnits('100', 'gwei'),
        gasLimit: 2000000,
      },
    });
    const result = await deleteFlowOperation.exec(this.dapp.DAPP_STATE.signer!);
    const result2 = await result.wait();

  }

  calculateFlowRate(amount: any) {
    if (typeof Number(amount) !== 'number' || isNaN(Number(amount)) === true) {
      alert('You can only calculate a flowRate based on a number');
      return;
    } else if (typeof Number(amount) === 'number') {
      if (Number(amount) === 0) {
        return 0;
      }
      const amountInWei = ethers.BigNumber.from(amount);
      const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
      const calculatedFlowRate = +monthlyAmount * 3600 * 24 * 30;
      return calculatedFlowRate;
    }
    return;
  }

  //// VIEW READ FUNCITONS
  async getFlow(options:{sender:string, receiver:string,superToken:string}) {
    if (this.sf == undefined){
      await this.initializeFramework()
    }

  const result = await this.flow.getFlow({
    superToken: options.superToken,
    sender: options.sender,
    receiver: options.receiver,
    providerOrSigner: this.dapp.signer!
  });
  return result
}

// async getAccountFlowInfo(){
//   await this.flow.getAccountFlowInfo({
//     superToken: string,
//     account: string,
//     providerOrSigner: ethers.providers.Provider | ethers.Signer
//   });
// }

// async getNetFlow(){
//   await this.flow.getNetFlow({
//     superToken: string,
//     account: string,
//     providerOrSigner: Signer
//   });
//}

 // #endregion Money Streaming  

  async createIndex() {
    try {
      let id = '';
      let DAIx = '';
      let address = '';
      let shares = '2';
      let amount = '2';

      const createIndexOperation = this.sf.idaV1.createIndex({
        indexId: 'id',
        superToken: 'DAIx',
        // userData?: string
      });

      const updateSubscriptionOperation = this.sf.idaV1.updateSubscriptionUnits(
        {
          indexId: id,
          superToken: DAIx,
          subscriber: address,
          units: shares,
          // userData?: string
        }
      );
      const distributeOperation = this.sf.idaV1.distribute({
        indexId: id,
        superToken: DAIx,
        amount: amount,
        // userData?: string
      });
    } catch (error) {}
  }

  async bathcall() {
    const DAI = new ethers.Contract(
      '0xb64845d53a373d35160b72492818f0d2f51292c0',
      'daiABI',
      this.dapp.signer!
    );
    let approveAmount = 3;
    await DAI['approve'](
      '0xe3cb950cb164a31c66e32c320a800d477019dcff',
      ethers.utils.parseEther(approveAmount.toString())
    );
  }
  async executeBatchCall(upgradeAmt: any, recipient: any, flowRate: any) {
    const DAIx = await this.sf.loadSuperToken(
      '0xe3cb950cb164a31c66e32c320a800d477019dcff'
    );

    try {
      const amtToUpgrade = ethers.utils.parseEther(upgradeAmt.toString());
      const upgradeOperation = DAIx.upgrade({
        amount: amtToUpgrade.toString(),
      });
      //upgrade and create stream at once
      const createFlowOperation = DAIx.createFlow({
        sender: '0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721',
        receiver: recipient,
        flowRate: flowRate,
      });

      console.log('Upgrading tokens and creating stream...');

      await this.sf
        .batchCall([upgradeOperation, createFlowOperation])
        .exec(this.dapp.signer!)
        .then(function (tx) {
          console.log(
            `Congrats - you've just successfully executed a batch call!
              You have completed 2 operations in a single tx 🤯
              View the tx here:  https://kovan.etherscan.io/tx/${tx.hash}
              View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
              Network: Kovan
              Super Token: DAIx
              Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
              Receiver: ${recipient},
              FlowRate: ${flowRate}
              `
          );
        });
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }



  async isSuperToken() {
    const p = this.sf.loadSuperToken('sda');
  }
}
