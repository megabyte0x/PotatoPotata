import { ConnectButton as RConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import { ReactElement } from 'react';

import Button from '../Button';

import Wallet from '/public/assets/wallet.svg';

import WalletMenu from './WalletMenu';

const ConnectButton = (): JSX.Element => {
  return (
    <RConnectButton.Custom>
      {({ account, chain, openChainModal, openConnectModal, authenticationStatus, mounted }): ReactElement => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}>
            {((): JSX.Element => {
              if (!connected) {
                return (
                  <Button onClick={openConnectModal} size="sm" className="normal-case text-base" type="secondary">
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button size="sm" onClick={openChainModal} className="normal-case text-base" type="secondary">
                    Wrong network
                  </Button>
                );
              }

              return (
                <div className="dropdown dropdown-end font-signika">
                  <div tabIndex={0} className="btn flex gap-2 btn-secondary btn-sm text-base">
                    <Image src={Wallet} height={24} width={24} alt="Wallet" />
                    <label className="cursor-pointer normal-case">{account.displayName}</label>
                  </div>
                  <WalletMenu />
                </div>
              );
            })()}
          </div>
        );
      }}
    </RConnectButton.Custom>
  );
};

export default ConnectButton;
