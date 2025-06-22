import { CAUSES } from "@/lib/causes";
import type { Cause } from "@/types";
import { CauseCard } from "./CauseCard";

interface HomePageProps {
  onCauseSelect: (cause: Cause) => void;
}

export function HomePage({ onCauseSelect }: HomePageProps) {
  const causeList = Object.values(CAUSES);

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <div className="space-y-4">
        {causeList.map((cause) => (
          <CauseCard key={cause.id} cause={cause} onClick={() => onCauseSelect(cause)} />
        ))}
      </div>
    </div>
  );
}
