import { ethers } from 'ethers';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';

import Campaign from '../../../../solidity-ts/generated/hardhat/artifacts/contracts/Campaign.sol/Campaign.json';
import PotatoPotata from '../../../../solidity-ts/generated/hardhat/deployments/localhost/PotatoPotata.json';

import Footer from '~~/components/shared/Footer';
import Navbar from '~~/components/shared/Navbar/Navbar';

interface CampaignNextPageContext extends NextPageContext {
  params: {
    address: string;
  };
}

interface Props {
  props: {
    address: string;
    name: string;
    descriptionCID: string;
    imageCID: string;
  };
}

interface Campaign {
  address: string;
  name: string;
  descriptionCID: string;
  imageCID: string;
}

export const getStaticPaths = async (): Promise<{ paths: string[]; fallback: boolean }> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const potatoPotata = new ethers.Contract(PotatoPotata.address, PotatoPotata.abi, provider);

  const campaignAddrs = await potatoPotata.getCampaigns(0);

  const paths = campaignAddrs.map((addr) => {
    return {
      params: { address: addr },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: CampaignNextPageContext): Promise<Props> => {
  const provider = new ethers.providers.JsonRpcProvider();
  const address = context.params.address;

  const campaign = new ethers.Contract(address, Campaign.abi, provider);
  const details = (await campaign.getCampaignDetails()) as Campaign;

  return {
    props: { ...details, address },
  };
};

const Campaigns: FC<Campaign> = ({ address, name, descriptionCID, imageCID }): JSX.Element => {
  return (
    <>
      <div className="App w-full">
        <Head>
          <title>Potato Potata</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="flex flex-col h-screen justify-between">
          <div className="mb-auto">
            <div className="flex justify-center flex-col lg:mx-48 md:mx-36 mx-16">
              <div>{imageCID}</div>
              <div>{name}</div>
              <div>{descriptionCID}</div>
              <div>{address}</div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Campaigns;
