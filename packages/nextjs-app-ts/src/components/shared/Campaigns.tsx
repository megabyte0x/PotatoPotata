import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import Campaign from '../../../../solidity-ts/generated/hardhat/artifacts/contracts/Campaign.sol/Campaign.json';
import PotatoPotata from '../../../../solidity-ts/generated/hardhat/deployments/localhost/PotatoPotata.json';

import Button from './Button';
import CampaignCard from './CampaignCard';

interface Campaign {
  name: string;
  descriptionCID: string;
  imageCID: string;
}

const Campaigns = (): JSX.Element => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const provider = new ethers.providers.JsonRpcProvider();
  const potatoPotata = new ethers.Contract(PotatoPotata.address, PotatoPotata.abi, provider);

  const fetchCampaigns = async (): Promise<void> => {
    try {
      const campaignAddrs = await potatoPotata.getCampaigns(campaigns.length);
      const campaignsDetail: Campaign[] = [];

      for (const addr of campaignAddrs) {
        const campaign = new ethers.Contract(addr as string, Campaign.abi, provider);
        const details = (await campaign.getCampaignDetails()) as Campaign;
        campaignsDetail.push({ ...details });
      }

      setCampaigns((prev) => [...prev, ...campaignsDetail]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCampaigns([]);
    void fetchCampaigns();
  }, []);

  return (
    <>
      <div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
        <h1 className="font-signika font-bold text-4xl text-primary">Active Campaigns</h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center gap-y-12 mx-8 gap-x-8">
          {campaigns.map((campaign, index) => (
            <CampaignCard
              key={index}
              campaign={{
                title: campaign.name,
                description: campaign.descriptionCID,
                image: campaign.imageCID,
                participants: 12,
                time: campaign.descriptionCID,
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-16 mt-12">
        <Button size="md" onClick={fetchCampaigns}>
          LOAD MORE CAMPAIGNS
        </Button>
      </div>
    </>
  );
};

export default Campaigns;
