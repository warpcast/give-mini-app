import type { CSSProperties, FC } from "react";

interface ChainLogoProps {
  src?: string;
  alt: string;
  color?: string;
  style?: CSSProperties;
}

const ChainLogo: FC<ChainLogoProps> = ({ src, alt, color = "bg-gray-200", style }) => {
  const sizeClasses = style?.width ? "" : "w-6 h-6";
  return (
    <div
      className={`${sizeClasses} rounded-full ${color} flex items-center justify-center overflow-hidden`}
      style={style}
      aria-label={alt}
    >
      {src && <img src={src} alt={alt} className="w-full h-full object-cover" />}
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
    <div className="flex items-center justify-center mt-2 mb-5">
      <div className="flex -space-x-1 mr-2">
        <div className="z-60">
          <ChainLogo
            alt="Ethereum"
            color={CHAIN_COLORS.ethereum}
            src="/chains/Ethereum.webp"
            style={{ padding: "2px", width: "20px", height: "20px" }}
          />
        </div>
        <div className="z-50">
          <ChainLogo
            alt="USDC"
            color={CHAIN_COLORS.usdc}
            src="/chains/USDC.webp"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="z-40">
          <ChainLogo
            alt="Optimism"
            color={CHAIN_COLORS.optimism}
            src="/chains/Optimism.webp"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
        <div className="z-30">
          <ChainLogo
            alt="Arbitrum"
            color={CHAIN_COLORS.arbitrum}
            src="/chains/Arbitrum.webp"
            style={{ padding: "2px", width: "20px", height: "20px" }}
          />
        </div>
        <div className="z-20">
          <ChainLogo
            alt="Base"
            color={CHAIN_COLORS.base}
            src="/chains/Base.webp"
            style={{ padding: "2px", width: "20px", height: "20px" }}
          />
        </div>
        <div className="z-10">
          <ChainLogo
            alt="Polygon"
            color={CHAIN_COLORS.polygon}
            src="/chains/Polygon.webp"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      </div>
      <span className="text-sm text-text-body">1000+ tokens accepted</span>
    </div>
  );
}
