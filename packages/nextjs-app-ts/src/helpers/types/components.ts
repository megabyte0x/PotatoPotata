type CompConfig = {
  [key: string]: string;
};

interface Campaign {
  campaign: {
    address: string;
    image: string;
    title: string;
    description: string;
    time: string;
    participants: number;
  };
}

export type { CompConfig, Campaign };
