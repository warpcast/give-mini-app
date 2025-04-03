import { Button } from "@/components/ui/button";
import { baseUSDC } from "@daimo/contract";
import { DaimoPayButton } from "@daimo/pay";
import { getAddress } from "viem";

interface DonateButtonProps {
  amount: string;
  walletAddress: `0x${string}`;
}

export function DonateButton({ amount, walletAddress }: DonateButtonProps) {
  return (
    <DaimoPayButton.Custom
      appId="pay-demo"
      intent="Give"
      toChain={baseUSDC.chainId}
      toUnits={amount}
      toToken={getAddress(baseUSDC.token)}
      toAddress={walletAddress}
      onPaymentStarted={(e) => console.log(e)}
      onPaymentCompleted={(e) => console.log(e)}
      paymentOptions={[]}
    >
      {({ show }) => {
        const amountNumber = Number(amount);
        const isAmountZero = amountNumber === 0;

        return (
          <Button
            onClick={show}
            className="w-full h-14 text-lg font-semibold tracking-tight rounded-2xl bg-primary hover:bg-primary/90 cursor-pointer"
            disabled={isAmountZero}
          >
            Give
          </Button>
        );
      }}
    </DaimoPayButton.Custom>
  );
}
