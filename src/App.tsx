import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { AmountPicker } from "./components/AmountPicker";
import { DonateButton } from "./components/DonateButton";
import { HomePage } from "./components/HomePage";
import { OrganizationHeader } from "./components/OrganizationHeader";
import { OrganizationInfo } from "./components/OrganizationInfo";
import { ShareDrawer } from "./components/ShareDrawer";
import { TOSDrawer } from "./components/TOSDrawer";
import { useTOSAcceptance } from "./hooks/useTOSAcceptance";
import { CAUSES } from "./lib/causes";
import type { Cause } from "./types";

const getCauseFromDataAttribute = (): Cause | null => {
  const rootElement = document.getElementById("root");
  const causeId = rootElement?.getAttribute("data-cause");

  if (causeId && CAUSES[causeId]) {
    return CAUSES[causeId];
  }

  return null;
};

function App() {
  const [activeCause, setActiveCause] = useState<Cause | null>(getCauseFromDataAttribute());
  const [amount, setAmount] = useState<string>("5");
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const [tosDrawerOpen, setTosDrawerOpen] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [isContextLoading, setIsContextLoading] = useState(true);
  const [userData, setUserData] = useState<{ fid?: string; username?: string }>({});
  const { hasAccepted, saveAcceptance } = useTOSAcceptance(userData.fid);

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

  const [pendingDonation, setPendingDonation] = useState(false);

  const handleTOSAccept = () => {
    saveAcceptance();
    setTosDrawerOpen(false);
    setPendingDonation(true);
  };

  const handleDonateClick = () => {
    if (activeCause?.id === "myanmar-relief") {
      return true;
    }

    if (!hasAccepted) {
      setTosDrawerOpen(true);
      return false;
    }
    return true;
  };

  const handleCauseSelect = (cause: Cause) => {
    setActiveCause(cause);
    if (window.history.pushState) {
      window.history.pushState(null, "", `/${cause.id}`);
    }
  };

  if (!activeCause) {
    return (
      <div className="w-full min-h-[100vh] bg-background">
        <HomePage onCauseSelect={handleCauseSelect} />
      </div>
    );
  }

  // Show cause page
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
            onBeforePayment={handleDonateClick}
            disabled={donationComplete || isContextLoading}
            metadata={{
              ...userData,
              causeId: activeCause.id,
              causeName: activeCause.name,
            }}
            isLoading={isContextLoading}
            shouldOpenModal={pendingDonation}
            onModalOpened={() => setPendingDonation(false)}
          />
        </div>

        <div className="text-center pt-2 text-sm max-w-md mx-auto">{activeCause.donationNote}</div>
      </div>

      <OrganizationInfo cause={activeCause} isOpen={infoDrawerOpen} onOpenChange={setInfoDrawerOpen} />

      <ShareDrawer
        cause={activeCause}
        isOpen={shareDrawerOpen}
        onOpenChange={setShareDrawerOpen}
        onComplete={handleShareComplete}
      />

      <TOSDrawer isOpen={tosDrawerOpen} onOpenChange={setTosDrawerOpen} onAccept={handleTOSAccept} />
    </div>
  );
}

export default App;
