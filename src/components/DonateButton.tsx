import { Button } from "@/components/ui/button";
import { baseUSDC } from "@daimo/contract";
import { DaimoPayButton } from "@daimo/pay";
import { getAddress } from "viem";

interface DonateButtonProps {
  amount: string;
  walletAddress: `0x${string}`;
  onPaymentComplete?: () => void;
  disabled?: boolean;
}

export function DonateButton({ amount, walletAddress, onPaymentComplete, disabled }: DonateButtonProps) {
  const handlePaymentCompleted = (e: unknown) => {
    console.log(e);
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  return (
    <DaimoPayButton.Custom
      appId="pay-demo"
      intent="Give"
      toChain={baseUSDC.chainId}
      toUnits={amount}
      toToken={getAddress(baseUSDC.token)}
      toAddress={walletAddress}
      onPaymentBounced={(e) => console.log(e)}
      onPaymentCompleted={handlePaymentCompleted}
      paymentOptions={[]}
    >
      {({ show }) => {
        const amountNumber = Number(amount);
        const isAmountZero = amountNumber === 0;
        const isDisabled = isAmountZero || disabled;

        return (
          <Button
            onClick={show}
            className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90 cursor-pointer"
            disabled={isDisabled}
          >
            Give
          </Button>
        );
      }}
    </DaimoPayButton.Custom>
  );
}
