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
  image?: string; // Path to the cause's main header image
  logo?: string; // Path to the cause's logo image
  donationNote?: string; // Note about donations (e.g., "100% of donations go to...")
}

export type CauseCollection = Record<string, Cause>;
