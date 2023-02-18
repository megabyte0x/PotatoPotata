import React, { ChangeEvent } from 'react';

import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';

const CampaignModal = (): JSX.Element => {
  const [file, setFile] = React.useState<File | null>(null);
  const [name, setName] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');

  const createCampaign = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    console.log(file, name, description);
  };
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal">
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
