import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { getShareText, shareCast } from "@/lib/share";
import type { Cause } from "@/types";
import { useState } from "react";

interface ShareDrawerProps {
  cause: Cause;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function ShareDrawer({ cause, isOpen, onOpenChange, onComplete }: ShareDrawerProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShareClick = async () => {
    setIsSharing(true);
    try {
      const success = await shareCast(cause);
      if (success) {
        // Cast was posted successfully
        onComplete();
      }
      // If the user cancelled, just reset the sharing state
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-8 px-4">
        <DrawerHeader className="px-6 text-left">
          <DrawerTitle className="text-left text-2xl font-semibold tracking-tight">
            Inspire others to support!
          </DrawerTitle>
        </DrawerHeader>
        <div className="px-6 space-y-6">
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm bg-[#F7F7F7] text-[#6E7375] mb-6 italic px-4 py-3 rounded-lg w-full">
              "{getShareText(cause)}"
            </p>
            <Button
              onClick={handleShareClick}
              disabled={isSharing}
              className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90 cursor-pointer"
            >
              {isSharing ? "Opening composer..." : "Share"}
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
