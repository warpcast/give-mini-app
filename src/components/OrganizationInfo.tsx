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
      <DrawerContent className="px-0 pb-16 px-4">
        <DrawerHeader className="px-6 text-left mb-4">
          <DrawerTitle className="text-left text-2xl font-semibold tracking-tight">About This Cause</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 space-y-6">
          <div>
            <h3 className="font-medium text-lg mb-2 text-text-subtitle">Mission</h3>
            <p className="text-lg text-text-body">{cause.mission}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 text-text-subtitle">Impact</h3>
            <p className="text-lg text-text-body">{cause.impact}</p>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2 text-text-subtitle">How Your Donation Helps</h3>
            <p className="text-lg text-text-body">{cause.use}</p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => cause.website && sdk.actions.openUrl(cause.website)}
              className="inline-flex items-center text-xl text-primary font-medium bg-secondary px-4 py-2 rounded-full hover:bg-secondary/80 cursor-pointer"
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
