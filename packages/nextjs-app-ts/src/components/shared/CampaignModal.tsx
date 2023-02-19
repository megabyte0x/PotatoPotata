import { useAuth } from '@arcana/auth-react';
import { Transaction, ethers } from 'ethers';
import React, { ChangeEvent } from 'react';

import PotatoPotata from '../../../../solidity-ts/generated/hardhat/deployments/localhost/PotatoPotata.json';
import { storeFiles, storeImage } from '../Web3StorageProvider';

import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

const CampaignModal = (): JSX.Element => {
  const [file, setFile] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const { provider } = useAuth();

  const createCampaign = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    if (file && name && description) {
      console.log(file, name, description);
      const cid = storeFiles(name, description);
      const cidURL = `https://${cid}.ipfs.w3s.link/${name}.json`;

      const cidImage = storeImage(file);
      const cidImageURL = `https://${cidImage}.ipfs.w3s.link/${file.name}`;
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();

      const potatoPotata = new ethers.Contract(PotatoPotata.address, PotatoPotata.abi, signer);

      await potatoPotata.registerCamapaign(name, cidURL, cidImageURL).then((tx: Transaction) => {
        console.log(tx);
      });
    }
  };

  return (
    <>
      <label htmlFor="my-modal-camp" className="btn btn-primary">
        open campaign modal
      </label>
      <input type="checkbox" id="my-modal-camp" className="modal-toggle" />
      <label htmlFor="my-modal-camp" className="modal">
        <label className="modal-box relative" htmlFor="">
          <h3 className="font-signika text-4xl text-primary font-bold">Create Campaign</h3>
          <form>
            <div className="flex flex-row gap-4">
              <div>
                <input
                  type="file"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col w-84">
                <Input
                  type="text"
                  size="md"
                  placeholder="Please enter the name of the campaign"
                  label="Name"
                  onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                    if (e.target.value) {
                      setName(e.target.value);
                    }
                  }}
                />
                <TextArea
                  placeholder="Tell us more about your campaign"
                  label="Description"
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
                    if (e.target.value) {
                      setDescription(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="md" onClick={createCampaign}>
                Create campaign
              </Button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default CampaignModal;
