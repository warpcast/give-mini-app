import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { getShareUrl } from "@/lib/utils";
import type { Cause } from "@/types";
import { sdk } from "@farcaster/frame-sdk";

interface ShareDrawerProps {
  cause: Cause;
  amount: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function ShareDrawer({ cause, amount, isOpen, onOpenChange, onComplete }: ShareDrawerProps) {
  const handleShareClick = () => {
    const shareUrl = getShareUrl(cause, amount);
    sdk.actions.openUrl(shareUrl);
    onComplete();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-16">
        <DrawerHeader className="border-b border-border px-6 text-left mb-4">
          <DrawerTitle className="text-left text-2xl font-semibold tracking-tight">Share Your Donation</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-center mb-6">
              Share your donation with your followers and inspire others to support this cause.
            </p>
            <Button
              onClick={handleShareClick}
              className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90"
            >
              Share on Warpcast
            </Button>
            <button
              type="button"
              onClick={onComplete}
              className="mt-4 text-lg text-muted-foreground hover:underline cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
