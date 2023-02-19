import React, { ChangeEvent } from 'react';
import storeFiles from '../Web3StorageProvider';
import storeImage from '../Web3StorageProvider';
import PotatoPotata from '../../../../solidity-ts/generated/hardhat/deployments/localhost/PotatoPotata.json';

import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import { Transaction, ethers } from 'ethers';

const CampaignModal = (): JSX.Element => {
  const [file, setFile] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const createCampaign = async (e: { preventDefault: () => void }): Promise<void> => {
    e.preventDefault();
    console.log(file, name, description);
    const cid = storeFiles(name, description);
    const cidImage = storeImage(file);
    const provider = new ethers.providers.JsonRpcProvider();
    const potatoPotata = new ethers.Contract(PotatoPotata.address, PotatoPotata.abi, provider);

    await potatoPotata.registerCampaign(name, cid, cidImage).then((tx: Transaction) => {
      console.log(tx);
    });
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
