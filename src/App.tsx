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

  const handlePaymentComplete = async () => {
    setDonationComplete(true);
    try {
      await sdk.actions.addFrame();
      setShareDrawerOpen(true);
    } catch (error) {
      console.error("Error adding frame:", error);
      setShareDrawerOpen(true);
    }
  };

  const handleShareComplete = () => {
    setShareDrawerOpen(false);
    setDonationComplete(false);
  };

  return (
    <div className="w-full max-w-md mx-auto px-0 flex flex-col h-[100vh] relative">
      {/* Main content area with auto height adjustment */}
      <div className="flex flex-col w-full overflow-hidden" style={{ height: "calc(100% - 130px)" }}>
        {/* Header with adjustable height */}
        <div className="w-full overflow-hidden">
          <OrganizationHeader cause={ACTIVE_CAUSE} onInfoClick={openInfoDrawer} />
        </div>

        {/* Amount picker - will maintain its size */}
        <div className="px-4 flex-shrink-0">
          <div className="flex items-start justify-center">
            <AmountPicker onChange={handleAmountChange} defaultAmount="1" />
          </div>
        </div>
      </div>

      {/* Fixed bottom area for CTA and note */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-background pt-2 pb-8">
        <div className="w-full px-4 mb-2 max-w-md mx-auto">
          <DonateButton
            amount={amount}
            walletAddress={ACTIVE_CAUSE.wallet}
            onPaymentComplete={handlePaymentComplete}
            disabled={donationComplete || isContextLoading}
            metadata={userData}
            isLoading={isContextLoading}
          />
        </div>

        <div className="text-center text-xs pt-2 text-text-caption max-w-md mx-auto">{ACTIVE_CAUSE.donationNote}</div>
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
