import { EthereumProvider } from '@arcana/auth';
import { useState } from 'react';

const useWallet = (provider: EthereumProvider): { chain: string } => {
  const [chain, setChain] = useState<string>('');

  provider.on('connect', (params) => {});
  provider.on('chainChanged', (params) => {
    setChain(params as string);
  });

  return { chain };
};

export default useWallet;
