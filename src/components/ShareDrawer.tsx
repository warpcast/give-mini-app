import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { getShareText, getShareUrl } from "@/lib/share";
import type { Cause } from "@/types";
import { sdk } from "@farcaster/frame-sdk";

interface ShareDrawerProps {
  cause: Cause;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function ShareDrawer({ cause, isOpen, onOpenChange, onComplete }: ShareDrawerProps) {
  const handleShareClick = () => {
    const shareUrl = getShareUrl(cause);
    sdk.actions.openUrl(shareUrl);
    onComplete();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-16">
        <div className="px-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-center mb-2">
              Share with your followers and inspire others to support this cause.
            </p>
            <p className="text-sm text-muted-foreground text-center mb-6 italic">"{getShareText(cause)}"</p>
            <Button
              onClick={handleShareClick}
              className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90"
            >
              Share
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
