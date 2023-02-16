type CompConfig = {
  [key: string]: string;
};

interface Campaign {
  campaign: {
    image: string;
    title: string;
    description: string;
    time: string;
    participants: number;
  };
}

export type { CompConfig, Campaign };
