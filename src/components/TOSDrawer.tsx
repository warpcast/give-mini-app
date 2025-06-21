import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useEffect, useRef, useState } from "react";

interface TOSDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
}

export function TOSDrawer({ isOpen, onOpenChange, onAccept }: TOSDrawerProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      // Reset scroll position and state when drawer opens
      scrollRef.current.scrollTop = 0;
      setHasScrolledToBottom(false);

      // Check if content is already fully visible (no scroll needed)
      const element = scrollRef.current;
      const isScrollable = element.scrollHeight > element.clientHeight;

      if (!isScrollable) {
        setHasScrolledToBottom(true);
      }
    }
  }, [isOpen]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const threshold = 50; // Allow some margin for scroll detection
      const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + threshold;
      if (isAtBottom && !hasScrolledToBottom) {
        setHasScrolledToBottom(true);
      }
    }
  };

  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="px-0 pb-6">
        <DrawerHeader className="px-6 pb-0">
          <DrawerTitle className="text-xl font-semibold">Notice from Defend Roman Storm</DrawerTitle>
        </DrawerHeader>

        <div ref={scrollRef} className="px-6 py-4 overflow-y-auto max-h-[120px]" onScroll={handleScroll}>
          <div className="text-sm text-muted-foreground">
            <p>
              By proceeding with your donation, you agree to the following terms and conditions: Your donation will be
              used to pay attorneys' fees, expert witness and consulting fees, and costs associated with Roman Storm's
              defense fund. All donations received in this fund will be the property of Justice DAO immediately upon
              receipt; donations are not refundable. Justice DAO will have sole discretion to disburse donations for the
              payment of attorneys' fees and costs. Any funds remaining after the payment of all attorneys' fees and
              costs will be used to support other privacy initiatives on the blockchain. While donations are much
              appreciated, they do not entitle donors to any access to or control over the legal defense efforts. All
              attorney-client privileges and other confidential information will be maintained in accordance with
              applicable legal ethics rules and will not be shared with any donors. By making a contribution, you
              represent and warrant that (i) you are not a specially designated national (SDN), (ii) all donations come
              from lawful sources, (iii) such donations are not the proceeds of any criminal activity, (iv) such
              donations are not subject to any sanctions imposed by the U.S. government. You further represent and
              warrant that all donations are free and clear of any creditor claims or other similar interests or
              encumbrances. Justice DAO reserves the right to conduct appropriate screening of proposed donations to
              ensure compliance with U.S. laws.
            </p>
          </div>
        </div>

        <DrawerFooter className="px-6 pt-4">
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 h-14 text-lg font-semibold tracking-tight rounded-2xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAccept}
              disabled={!hasScrolledToBottom}
              className="flex-1 h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90 disabled:opacity-50"
            >
              {hasScrolledToBottom ? "Accept" : "Scroll to Accept"}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
