import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { AmountPicker } from "./components/AmountPicker";
import { DonateButton } from "./components/DonateButton";
import { OrganizationHeader } from "./components/OrganizationHeader";
import { OrganizationInfo } from "./components/OrganizationInfo";
import { ShareDrawer } from "./components/ShareDrawer";
import { CAUSES } from "./lib/causes";

const ACTIVE_CAUSE = CAUSES["myanmar-relief"];

function App() {
  const [amount, setAmount] = useState<string>("1");
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [isContextLoading, setIsContextLoading] = useState(true);
  const [userData, setUserData] = useState<{ fid?: string; username?: string }>({});

  useEffect(() => {
    async function initializeContext() {
      try {
        const context = await sdk.context;
        const user = context?.user;
        if (user) {
          setUserData({
            fid: user.fid ? String(user.fid) : undefined,
            username: user.username || undefined,
          });
        }

        sdk.actions.ready({ disableNativeGestures: true });
      } catch (error) {
        console.error("Error initializing Farcaster context:", error);
      } finally {
        setIsContextLoading(false);
      }
    }

    initializeContext();
  }, []);
  const openInfoDrawer = () => setInfoDrawerOpen(true);
  const handleAmountChange = (value: string) => {
    setAmount(value || "0");
  };

  // Define handler for completing payment and starting add/share flow
  const handlePaymentComplete = async () => {
    setDonationComplete(true);
    try {
      // Prompt user to add frame, which triggers native drawer
      await sdk.actions.addFrame();
      // After add drawer is dismissed, show share drawer
      setShareDrawerOpen(true);
    } catch (error) {
      console.error("Error adding frame:", error);
      // Show share drawer even if add frame fails
      setShareDrawerOpen(true);
    }
  };

  const handleShareComplete = () => {
    setShareDrawerOpen(false);
    setDonationComplete(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6 flex flex-col min-h-[100vh]">
      <div className="mb-6 w-full">
        <OrganizationHeader cause={ACTIVE_CAUSE} onInfoClick={openInfoDrawer} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-center">
          <AmountPicker onChange={handleAmountChange} defaultAmount="1" />
        </div>
        <div className="text-center text-muted-foreground text-base py-4 border-t border-border">
          {ACTIVE_CAUSE.donationDescription}
        </div>
      </div>

      <div className="w-full mb-4">
        <DonateButton
          amount={amount}
          walletAddress={ACTIVE_CAUSE.wallet}
          onPaymentComplete={handlePaymentComplete}
          disabled={donationComplete || isContextLoading}
          metadata={userData}
          isLoading={isContextLoading}
        />
      </div>

      <OrganizationInfo cause={ACTIVE_CAUSE} isOpen={infoDrawerOpen} onOpenChange={setInfoDrawerOpen} />

      <ShareDrawer
        cause={ACTIVE_CAUSE}
        isOpen={shareDrawerOpen}
        onOpenChange={setShareDrawerOpen}
        onComplete={handleShareComplete}
      />
    </div>
  );
}

export default App;
