import Head from 'next/head';
import Image from 'next/image';

import CampaignModal from '~~/components/shared/CampaignModal';
import Campaigns from '~~/components/shared/Campaigns';
import Footer from '~~/components/shared/Footer';
import Navbar from '~~/components/shared/Navbar/Navbar';
import ProposalModal from '~~/components/shared/ProposalModal';

import Title from '/public/assets/title.svg';

const Page = (): JSX.Element => {
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
            <div className="flex justify-center lg:mx-48 md:mx-36 mx-16">
              <Image src={Title} />
            </div>
            <div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
              <h1 className="font-signika font-bold text-4xl text-primary">Active Campaigns</h1>
              <Campaigns />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
