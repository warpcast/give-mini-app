import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import type { Cause } from "@/types";
import { sdk } from "@farcaster/frame-sdk";

interface OrganizationInfoProps {
  cause: Cause;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrganizationInfo({ cause, isOpen, onOpenChange }: OrganizationInfoProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-16">
        <DrawerHeader className="border-b border-border px-6 text-left mb-4">
          <DrawerTitle className="text-left text-2xl font-semibold tracking-tight">About This Cause</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 space-y-6">
          <div>
            <h3 className="font-medium text-lg text-muted-foreground mb-2">Mission</h3>
            <p className="text-xl">{cause.mission}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg text-muted-foreground mb-2">Impact</h3>
            <p className="text-xl">{cause.impact}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg text-muted-foreground mb-2">How Your Donation Helps</h3>
            <p className="text-xl">{cause.use}</p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => cause.website && sdk.actions.openUrl(cause.website)}
              className="inline-flex items-center text-xl text-primary font-medium hover:underline cursor-pointer"
            >
              Visit Website
              <span className="ml-2">↗</span>
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
