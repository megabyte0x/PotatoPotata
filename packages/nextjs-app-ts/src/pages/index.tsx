import Head from 'next/head';

const Page = (): JSX.Element => {
  return (
    <div className="App">
      <Head>
        <title>Potato Potata</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="text-4xl text-primary-500 font-bold">Welcome to Potato Potata</h1>
      </div>
    </div>
  );
};

export default Page;
