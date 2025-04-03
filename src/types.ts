export interface Cause {
  id: string;
  name: string;
  shortDescription: string;
  donationDescription: string;
  mission: string;
  impact: string;
  use: string;
  website?: string;
  wallet: `0x${string}`;
}

export type CauseCollection = Record<string, Cause>;
