import type { Cause } from "@/types";
import { sdk } from "@farcaster/frame-sdk";

interface OrganizationHeaderProps {
  cause: Cause;
  onInfoClick: () => void;
}

export function OrganizationHeader({ cause, onInfoClick }: OrganizationHeaderProps) {
  const handleProfileClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (cause.userFid) {
      try {
        await sdk.actions.viewProfile({ fid: cause.userFid });
      } catch (error) {
        console.error("Error opening profile:", error);
      }
    }
  };
  return (
    <div className="w-full mb-2">
      <div className="relative w-full min-h-[140px] max-h-[40vh] overflow-hidden">
        {cause.image && (
          <img src={cause.image} alt={`${cause.name} banner`} className="w-full h-full object-cover object-bottom" />
        )}

        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[140px]"
          style={{
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
            maskImage: "linear-gradient(to top, black 20%, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 85%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        />

        <button
          type="button"
          className="absolute bottom-0 left-0 right-0 w-full px-4 pb-7 pt-4 text-left focus:outline-none cursor-pointer z-10"
          onClick={onInfoClick}
          aria-label={`View more information about ${cause.name}`}
        >
          <div className="flex items-start relative z-10">
            {cause.logo && (
              <img src={cause.logo} alt={`${cause.name} logo`} className="w-[34px] h-[34px] object-contain" />
            )}
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">{cause.name}</h2>
              <div className="flex items-center gap-1">
                <p className="text-base text-white/75 font-light">{cause.shortDescription}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/60 ml-1"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </div>
              {cause.userName && (
                <div className="flex flex-row items-center gap-1 mt-1">
                  <span className="text-sm text-white/60 font-light">shared by</span>
                  {cause.userPfp && (
                    <button
                      type="button"
                      onClick={handleProfileClick}
                      className="flex items-center justify-center p-0 bg-transparent border-0"
                      aria-label={`View ${cause.userName}'s profile`}
                    >
                      <img src={cause.userPfp} alt="" className="h-4 w-4 rounded-full object-cover hover:opacity-80" />
                    </button>
                  )}
                  <button
                    type="button"
                    className="text-sm text-white/90 hover:underline p-0 bg-transparent border-0"
                    onClick={handleProfileClick}
                  >
                    {cause.userName}
                  </button>
                </div>
              )}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
