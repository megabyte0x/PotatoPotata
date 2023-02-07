import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { FC } from 'react';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, localhost } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

interface IWeb3Provider {
  children: React.ReactNode;
}

const { chains, provider } = configureChains(
  [mainnet, goerli, localhost],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_KEY_INFURA }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'Potato Potata',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider: FC<IWeb3Provider> = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
