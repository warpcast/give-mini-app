import type { CSSProperties, FC } from "react";

interface ChainLogoProps {
  src?: string;
  alt: string;
  color?: string;
  style?: CSSProperties;
}

const ChainLogo: FC<ChainLogoProps> = ({ src, alt, color = "bg-gray-200", style }) => {
  return (
    <div className={`w-6 h-6 rounded-full ${color} flex items-center justify-center overflow-hidden`} aria-label={alt}>
      {src && <img src={src} alt={alt} className="w-full h-full object-cover" style={style} />}
    </div>
  );
};

const CHAIN_COLORS = {
  ethereum: "bg-[#f6f7f9]",
  usdc: "bg-[#2775CA]",
  optimism: "bg-[#FF0420]",
  arbitrum: "bg-[#203147]",
  base: "bg-[#0052FF]",
  polygon: "bg-[#8247E5]",
};

export function TokensSupported() {
  return (
    <div className="flex items-center justify-center mt-6 mb-12">
      <div className="flex -space-x-2 mr-2">
        <div className="z-60">
          <ChainLogo
            alt="Ethereum"
            color={CHAIN_COLORS.ethereum}
            src="/chains/Ethereum.webp"
            style={{ padding: "3px" }}
          />
        </div>
        <div className="z-50">
          <ChainLogo alt="USDC" color={CHAIN_COLORS.usdc} src="/chains/USDC.webp" />
        </div>
        <div className="z-40">
          <ChainLogo alt="Optimism" color={CHAIN_COLORS.optimism} src="/chains/Optimism.webp" />
        </div>
        <div className="z-30">
          <ChainLogo
            alt="Arbitrum"
            color={CHAIN_COLORS.arbitrum}
            src="/chains/Arbitrum.webp"
            style={{ padding: "2px" }}
          />
        </div>
        <div className="z-20">
          <ChainLogo alt="Base" color={CHAIN_COLORS.base} src="/chains/Base.webp" style={{ padding: "2px" }} />
        </div>
        <div className="z-10">
          <ChainLogo alt="Polygon" color={CHAIN_COLORS.polygon} src="/chains/Polygon.webp" />
        </div>
      </div>
      <span className="text-base text-text-body">1000+ tokens accepted</span>
    </div>
  );
}
