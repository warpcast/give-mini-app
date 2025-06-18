import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { AmountPicker } from "./components/AmountPicker";
import { DonateButton } from "./components/DonateButton";
import { OrganizationHeader } from "./components/OrganizationHeader";
import { OrganizationInfo } from "./components/OrganizationInfo";
import { ShareDrawer } from "./components/ShareDrawer";
import { CAUSES } from "./lib/causes";

const DEFAULT_CAUSE_ID = "myanmar-relief";

// Get cause from data attribute
const getCauseFromDataAttribute = () => {
  const rootElement = document.getElementById("root");
  const causeId = rootElement?.getAttribute("data-cause");

  // Validate that the cause exists
  if (causeId && CAUSES[causeId]) {
    return CAUSES[causeId];
  }

  // Default to Myanmar relief if no valid cause specified
  return CAUSES[DEFAULT_CAUSE_ID];
};

function App() {
  const [activeCause] = useState(getCauseFromDataAttribute());
  const [amount, setAmount] = useState<string>("5");
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
  };

  return (
    <div className="w-full max-w-md mx-auto px-0 flex flex-col h-[100vh] relative">
      <div className="flex flex-col w-full justify-between overflow-hidden" style={{ height: "calc(100% - 140px)" }}>
        <div className="w-full flex-shrink-1 z-10 max-h-[45vh]">
          <OrganizationHeader cause={activeCause} onInfoClick={openInfoDrawer} />
        </div>

        <div className="px-4 flex-shrink-0 flex-grow-1 flex items-center">
          <div className="flex items-start justify-center w-full">
            <AmountPicker onChange={handleAmountChange} defaultAmount="5" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full bg-background pt-2 pb-8">
        <div className="w-full px-4 mb-2 max-w-md mx-auto">
          <DonateButton
            amount={amount}
            walletAddress={activeCause.wallet}
            onPaymentComplete={handlePaymentComplete}
            disabled={donationComplete || isContextLoading}
            metadata={{
              ...userData,
              causeId: activeCause.id,
              causeName: activeCause.name,
            }}
            isLoading={isContextLoading}
          />
        </div>

        <div className="text-center pt-2 max-w-md mx-auto">{activeCause.donationNote}</div>
      </div>

      <OrganizationInfo cause={activeCause} isOpen={infoDrawerOpen} onOpenChange={setInfoDrawerOpen} />

      <ShareDrawer
        cause={activeCause}
        isOpen={shareDrawerOpen}
        onOpenChange={setShareDrawerOpen}
        onComplete={handleShareComplete}
      />
    </div>
  );
}

export default App;
