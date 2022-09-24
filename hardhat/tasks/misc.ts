import { readFileSync } from 'fs-extra';
import { task } from 'hardhat/config';
import { initEnv, waitForTx } from '../helpers/utils';
import { join } from 'path';
import { constants } from 'ethers';
import { Floowdy, Floowdy__factory, IERC20, IPool } from '../typechain-types';
import { abi_erc20mint } from '../helpers/abis/ERC20Mint';
import { abi_pool } from '../helpers/abis/pool';
import { abi_aerc20 } from '../helpers/abis/aERC20';
import { INETWORK_CONFIG } from 'hardhat/helpers/models';

const contract_path_relative = '../src/assets/contracts/';
const processDir = process.cwd();
const contract_path = join(processDir, contract_path_relative);
const contract_config = JSON.parse(
  readFileSync(join(processDir, 'contract.config.json'), 'utf-8')
) as { [key: string]: any };

task('misc', 'mint usdc aave').setAction(async ({}, hre) => {
  const  [deployer, user1, user2, user3, user4, user5, user6, user7, user8, user9, user10]= await initEnv(hre); console.log(user1.address);


  let deployContract = 'floowdy';
  let toDeployContract = contract_config[deployContract];
  const floodyJson = JSON.parse(
    readFileSync(
      `${contract_path}/${toDeployContract.jsonName}_metadata.json`,
      'utf-8'
    )
  );
 
  let floowdyAddress = floodyJson.address
 
  let floowdy:Floowdy = Floowdy__factory.connect(floowdyAddress, user1);
 
  let networks_config = JSON.parse(readFileSync( join(processDir,'networks.config.json'),'utf-8')) as INETWORK_CONFIG;
 
 let network_params = networks_config["goerli"]

 let result =   await floowdy.getAaveData()  
    console.log(result)

    console.log(+result.depositAPR.toString()/10**8);
    console.log(+result.stableBorrowAPR.toString()/10**8);
    let RAY = 10**27 // 10 to the power 27
    let SECONDS_PER_YEAR = 31536000

    let depositAPY = (1 + ((+result.depositAPR.toString()/10**27 / SECONDS_PER_YEAR)) ** SECONDS_PER_YEAR) - 1
    let stableBorrowAPY = (1 + ((+result.stableBorrowAPR.toString()/10**27/ SECONDS_PER_YEAR)) ** SECONDS_PER_YEAR) - 1

console.log(depositAPY);
console.log(stableBorrowAPY)



});