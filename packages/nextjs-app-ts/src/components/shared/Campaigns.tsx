import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import Campaign from '../../../../solidity-ts/generated/hardhat/artifacts/contracts/Campaign.sol/Campaign.json';
import PotatoPotata from '../../../../solidity-ts/generated/hardhat/deployments/localhost/PotatoPotata.json';

import Button from './Button';
import CampaignCard from './CampaignCard';

import getDescription from '~~/lib/getDescription';
import CampaignModal from './CampaignModal';

interface Campaign {
  address: string;
  name: string;
  totalArtists: number;
  descriptionCID: string;
  imageCID: string;
}

const Campaigns = (): JSX.Element => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const provider = new ethers.providers.JsonRpcProvider();
  const potatoPotata = new ethers.Contract(PotatoPotata.address, PotatoPotata.abi, provider);

  const fetchCampaigns = async (): Promise<void> => {
    try {
      const campaignAddrs = await potatoPotata.getCampaigns(campaigns.length, false);
      const campaignsDetail: Campaign[] = [];

      for (const addr of campaignAddrs) {
        const campaign = new ethers.Contract(addr as string, Campaign.abi, provider);
        const details = (await campaign.getCampaignDetails()) as Campaign;

        const description = await getDescription(details.descriptionCID);

        campaignsDetail.push({
          ...details,
          descriptionCID: description.slice(0, 100) + '...',
          totalArtists: Number(ethers.utils.formatEther(details.totalArtists)),
          address: addr,
        });
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
      <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center gap-y-12 mx-8 gap-x-8">
        {campaigns.map((campaign, index) => (
          <CampaignCard
            key={index}
            campaign={{
              address: campaign.address,
              title: campaign.name,
              description: campaign.descriptionCID,
              image: campaign.imageCID,
              participants: campaign.totalArtists,
              time: '∞ days',
            }}
          />
        ))}
      </div>
      <div className="flex justify-center gap-4 mb-16">
        <Button size="md" onClick={fetchCampaigns}>
          LOAD MORE CAMPAIGNS
        </Button>
        <CampaignModal />
      </div>
    </>
  );
};

export default Campaigns;
