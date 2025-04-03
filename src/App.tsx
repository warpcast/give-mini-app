import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { AddDrawer } from "./components/AddDrawer";
import { AmountPicker } from "./components/AmountPicker";
import { DonateButton } from "./components/DonateButton";
import { OrganizationHeader } from "./components/OrganizationHeader";
import { OrganizationInfo } from "./components/OrganizationInfo";
import { ShareDrawer } from "./components/ShareDrawer";
import { Button } from "./components/ui/button";
import { CAUSES } from "./lib/causes";

const ACTIVE_CAUSE = CAUSES["myanmar-relief"];

function App() {
  const [amount, setAmount] = useState<string>("1");
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [shareDrawerOpen, setShareDrawerOpen] = useState(false);
  const [donationComplete, setDonationComplete] = useState(false);
  const [testMode, setTestMode] = useState(false);

  useEffect(() => {
    sdk.actions.ready({ disableNativeGestures: true });
  }, []);

  // Test mode effect - simulates payment completion after a short delay
  useEffect(() => {
    let timer: number | undefined;

    if (testMode) {
      timer = window.setTimeout(() => {
        handlePaymentComplete();
      }, 1500);
    }

    return () => {
      if (timer) {
        window.clearTimeout(timer);
      }
    };
  }, [testMode]);

  const handleAmountChange = (value: string) => {
    setAmount(value || "0");
  };

  const openInfoDrawer = () => setInfoDrawerOpen(true);

  const handlePaymentComplete = () => {
    setDonationComplete(true);
    setAddDrawerOpen(true);
  };

  const handleAddComplete = () => {
    setAddDrawerOpen(false);
    setShareDrawerOpen(true);
  };

  const handleShareComplete = () => {
    setShareDrawerOpen(false);
    setDonationComplete(false);
    setTestMode(false); // Reset test mode when flow completes
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
          disabled={donationComplete}
        />
      </div>

      {/* Test button - only for development testing */}
      <div className="w-full mb-2">
        <Button
          onClick={() => setTestMode(true)}
          variant="outline"
          size="sm"
          className="w-full text-xs"
          disabled={testMode || donationComplete}
        >
          Test donation flow
        </Button>
      </div>

      <OrganizationInfo cause={ACTIVE_CAUSE} isOpen={infoDrawerOpen} onOpenChange={setInfoDrawerOpen} />

      <AddDrawer isOpen={addDrawerOpen} onOpenChange={setAddDrawerOpen} onContinue={handleAddComplete} />

      <ShareDrawer
        cause={ACTIVE_CAUSE}
        amount={amount}
        isOpen={shareDrawerOpen}
        onOpenChange={setShareDrawerOpen}
        onComplete={handleShareComplete}
      />
    </div>
  );
}

export default App;
