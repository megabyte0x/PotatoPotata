import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';

import Web3Provider from '../components/Web3Provider';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
};

export default App;
