import Head from 'next/head';
import Image from 'next/image';

import Button from '~~/components/shared/Button';
import CampaignCard from '~~/components/shared/CampaignCard';
import Footer from '~~/components/shared/Footer';
import Navbar from '~~/components/shared/Navbar/Navbar';
import { CAMPAIGNS } from '~~/constants';

import Title from '/public/assets/title.svg';

const Page = (): JSX.Element => {
  return (
    <>
      <div className="App w-full">
        <Head>
          <title>Potato Potata</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          <Navbar />
          <div className="flex justify-center mx-48">
            <Image src={Title} />
          </div>
          <div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
            <h1 className="font-signika font-bold text-4xl text-primary">Active Campaigns</h1>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center gap-y-12 mx-8 gap-x-8">
              {CAMPAIGNS.map((campaign, index) => (
                <CampaignCard key={index} campaign={campaign} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mb-16 mt-12">
            <Button
              size="md"
              onClick={(): void => {
                console.log('loading...');
              }}>
              LOAD MORE CAMPAIGNS
            </Button>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
