import Head from 'next/head';
import Image from 'next/image';

import CampaignModal from '~~/components/shared/CampaignModal';
import Campaigns from '~~/components/shared/Campaigns';
import Footer from '~~/components/shared/Footer';
import Navbar from '~~/components/shared/Navbar/Navbar';

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
          <label htmlFor="my-modal-4" className="btn btn-primary">
            open modal
          </label>
          <CampaignModal />
          <div className="flex justify-center lg:mx-48 md:mx-36 mx-16">
            <Image src={Title} />
          </div>
          <Campaigns />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
