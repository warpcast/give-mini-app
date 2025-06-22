import type { Cause } from "@/types";

interface CauseCardProps {
  cause: Cause;
  onClick: () => void;
}

export function CauseCard({ cause, onClick }: CauseCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left overflow-hidden rounded-2xl bg-card hover:bg-accent/5 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
    >
      <div className="relative w-full h-[200px] overflow-hidden">
        {cause.image && (
          <img src={cause.image} alt={`${cause.name} banner`} className="w-full h-full object-cover object-center" />
        )}

        <div
          className="absolute bottom-0 left-0 right-0 w-full h-[140px]"
          style={{
            background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))",
            maskImage: "linear-gradient(to top, black 30%, transparent 90%)",
            WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 90%)",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-start gap-3">
            {cause.logo && (
              <img src={cause.logo} alt={`${cause.name} logo`} className="w-10 h-10 object-contain flex-shrink-0" />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold tracking-tight text-white">{cause.name}</h3>
              <p className="text-sm text-white/80 mt-0.5">{cause.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
