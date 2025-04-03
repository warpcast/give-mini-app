import type { Cause } from "@/types";

interface OrganizationHeaderProps {
  cause: Cause;
  onInfoClick: () => void;
}

export function OrganizationHeader({ cause, onInfoClick }: OrganizationHeaderProps) {
  return (
    <button
      type="button"
      className="w-full border-b border-border py-4 px-0 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      onClick={onInfoClick}
      aria-label={`View more information about ${cause.name}`}
    >
      <div className="flex items-center gap-2">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{cause.name}</h2>
          <p className="text-base text-muted-foreground">{cause.shortDescription}</p>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-muted-foreground"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
    </button>
  );
}
