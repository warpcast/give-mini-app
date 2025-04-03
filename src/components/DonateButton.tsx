import { Button } from "@/components/ui/button";
import { baseUSDC } from "@daimo/contract";
import { DaimoPayButton } from "@daimo/pay";
import { getAddress } from "viem";

interface DonateButtonProps {
  amount: string;
  walletAddress: `0x${string}`;
  onPaymentComplete?: () => void;
  disabled?: boolean;
  metadata?: Record<string, string>;
  isLoading?: boolean;
}

export function DonateButton({
  amount,
  walletAddress,
  onPaymentComplete,
  disabled,
  metadata = {},
  isLoading = false,
}: DonateButtonProps) {
  const handlePaymentCompleted = (e: unknown) => {
    console.log(e);
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  const buttonText = isLoading ? "Loading..." : "Give";

  return (
    <DaimoPayButton.Custom
      appId="pay-merkle-EfzUe9g9k32MWgNzdWzYZW"
      intent="Give"
      toChain={baseUSDC.chainId}
      toUnits={amount}
      toToken={getAddress(baseUSDC.token)}
      toAddress={walletAddress}
      onPaymentCompleted={handlePaymentCompleted}
      paymentOptions={[]}
      metadata={metadata}
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
            {buttonText}
          </Button>
        );
      }}
    </DaimoPayButton.Custom>
  );
}
