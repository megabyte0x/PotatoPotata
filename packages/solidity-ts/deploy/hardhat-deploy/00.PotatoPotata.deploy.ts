/* eslint-disable @typescript-eslint/no-unsafe-call */
import { DeployFunction } from 'hardhat-deploy/types';
import { THardhatRuntimeEnvironmentExtended } from 'helpers/types/THardhatRuntimeEnvironmentExtended';

const func: DeployFunction = async (hre: THardhatRuntimeEnvironmentExtended) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy('PotatoPotata', {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    // args: ["Hello"],
    log: true,
  });

  const PotatoPotata = await hre.ethers.getContract('PotatoPotata', deployer);

  for (let i = 0; i < 20; i++) {
    await PotatoPotata.registerCamapaign(
      `TEST ${i}`,
      `bafybeiefmulgcdxqv7clqtk6xqjdaurtpihe6r2g4kduxri64tirfwuafa`,
      'bafybeic6aawuejwm5vmk3hvkia5zrq2r7a465sporsfxhvdhaqi37dgaim'
    );
  }

  const campaignAddrs = await PotatoPotata.getCampaignAddress(deployer);

  console.log(`campaings for ${deployer}`, campaignAddrs);

  const Campaign = await hre.ethers.getContractAt('Campaign', campaignAddrs[0] as string);

  const details = await Campaign.getCampaignDetails();

  console.log(details);

  const campaigns = await PotatoPotata.getCampaigns(0, false);

  console.log('campaigns', campaigns);
};
export default func;
func.tags = ['PotatoPotata'];

/*
Tenderly verification
let verification = await tenderly.verify({
  name: contractName,
  address: contractAddress,
  network: targetNetwork,
});
*/
