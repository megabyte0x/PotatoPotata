import { EthereumProvider } from '@arcana/auth';

const addMantle = async (provider: EthereumProvider): Promise<void> => {
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '5001' }],
    });
  } catch (error) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '5001',
            chainName: 'Mantle Testnet',
            nativeCurrency: {
              name: 'BIT',
              symbol: 'BIT',
              decimals: 18,
            },
            rpcUrls: ['https://rpc.testnet.mantle.xyz'],
          },
        ],
      });
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '5001' }],
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default addMantle;