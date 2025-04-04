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
  shareText?: string;
  image?: string;
  logo?: string;
  donationNote?: string;
  userName?: string;
  userPfp?: string;
  userFid?: number;
}

export type CauseCollection = Record<string, Cause>;
