import { sdk } from "@farcaster/frame-sdk";
import { useEffect, useState } from "react";
import { AmountPicker } from "./components/AmountPicker";
import { DonateButton } from "./components/DonateButton";
import { OrganizationHeader } from "./components/OrganizationHeader";
import { OrganizationInfo } from "./components/OrganizationInfo";
import { CAUSES } from "./lib/causes";

const ACTIVE_CAUSE = CAUSES["myanmar-relief"];

function App() {
  const [amount, setAmount] = useState<string>("1");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    sdk.actions.ready({ disableNativeGestures: true });
  }, []);

  const handleAmountChange = (value: string) => {
    setAmount(value || "0");
  };

  const openDrawer = () => setDrawerOpen(true);

  return (
    <div className="w-full max-w-sm mx-auto px-4 py-6 flex flex-col min-h-[100vh]">
      <div className="mb-6 w-full">
        <OrganizationHeader cause={ACTIVE_CAUSE} onInfoClick={openDrawer} />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-startCan justify-center">
          <AmountPicker onChange={handleAmountChange} defaultAmount="1" />
        </div>
      </div>

      <div className="w-full mt-auto mb-4">
        <DonateButton amount={amount} walletAddress={ACTIVE_CAUSE.wallet} />
      </div>

      <OrganizationInfo cause={ACTIVE_CAUSE} isOpen={drawerOpen} onOpenChange={setDrawerOpen} />
    </div>
  );
}

export default App;
