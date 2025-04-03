import { getDefaultConfig } from "@daimo/pay";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    appName: "Give",
    connectors: [farcasterFrame()],
    transports: {
      [base.id]: http(import.meta.env.VITE_BASE_RPC_URL ?? "https://mainnet.base.org"),
    },
  }),
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
