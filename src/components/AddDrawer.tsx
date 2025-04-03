import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { sdk } from "@farcaster/frame-sdk";

interface AddDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: () => void;
}

export function AddDrawer({ isOpen, onOpenChange, onContinue }: AddDrawerProps) {
  const handleAddClick = () => {
    sdk.actions.addFrame();
    onContinue();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-16">
        <DrawerHeader className="border-b border-border px-6 text-left mb-4">
          <DrawerTitle className="text-left text-2xl font-semibold tracking-tight">Add This Mini App</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 space-y-6">
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-lg text-center mb-6">
              Add this Mini App to your Warpcast profile to easily donate again in the future.
            </p>
            <Button
              onClick={handleAddClick}
              className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90"
            >
              Add to Warpcast
            </Button>
            <button
              type="button"
              onClick={onContinue}
              className="mt-4 text-lg text-muted-foreground hover:underline cursor-pointer"
            >
              Skip
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
