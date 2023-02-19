import Head from 'next/head';

import Campaigns from '~~/components/shared/Campaigns';
import Footer from '~~/components/shared/Footer';
import Navbar from '~~/components/shared/Navbar/Navbar';

const Index = (): JSX.Element => {
  return (
    <>
      <div className="App w-full">
        <Head>
          <title>Campaigns</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <div className="flex flex-col h-screen justify-between">
          <div className="mb-auto">
            <div className="mt-16 flex w-full flex-col gap-12 items-center justify-center">
              <h1 className="font-signika font-bold text-5xl text-primary">Active Campaigns</h1>
              <Campaigns />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Index;
