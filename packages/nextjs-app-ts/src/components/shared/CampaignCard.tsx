import { FC } from 'react';

import Button from './Button';

interface Props {
  image: string;
  title: string;
  description: string;
  time: string;
  participants: number;
  border?: boolean;
}

const CampaignCard: FC<Props> = ({ image, title, description, time, participants, border }): JSX.Element => {
  return (
    <>
      <div className={`card ${border ? 'border-primary border-3' : ''} w-80 bg-base-100 shadow-xl`}>
        <figure className="rounded-xl">
          <img className="" src={image} alt={title} />
        </figure>
        <div className="card-body p-4 font-signika">
          <h2 className="card-title font-bold text-primary">{title}</h2>
          <p className="text-primary-200 text-sm">{description}</p>
          <hr className="bg-primary-50 my-1" />
          <div className="flex flex-row justify-around mb-1">
            <div className="flex flex-col">
              <h3 className="font-bold self-center text-xl leading-tight text-primary">in {time}</h3>
              <p className="text-primary-200 leading-tight text-sm">Campaign ends</p>
            </div>
            <div className="flex flex-col">
              <h3 className="font-bold leading-tight self-center text-xl text-primary">{participants} artists</h3>
              <p className="text-primary-200 leading-tight self-center text-sm">Participating</p>
            </div>
          </div>
          <Button onClick={(): void => {}} type="primary" size="md">
            Participate
          </Button>
        </div>
      </div>
    </>
  );
};

export default CampaignCard;
