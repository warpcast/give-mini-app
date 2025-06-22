import { Button } from "@/components/ui/button";
import { useOFACCheck } from "@/hooks/useOFACCheck";
import { baseUSDC } from "@daimo/contract";
import { DaimoPayButton } from "@daimo/pay";
import { useEffect, useRef } from "react";
import { getAddress } from "viem";
import { useAccount, useConnect } from "wagmi";

interface DonateButtonProps {
  amount: string;
  walletAddress: `0x${string}`;
  onPaymentComplete?: () => void;
  onBeforePayment?: () => boolean;
  disabled?: boolean;
  metadata?: Record<string, string>;
  isLoading?: boolean;
  shouldOpenModal?: boolean;
  onModalOpened?: () => void;
}

export function DonateButton({
  amount,
  walletAddress,
  onPaymentComplete,
  onBeforePayment,
  disabled,
  metadata = {},
  isLoading = false,
  shouldOpenModal = false,
  onModalOpened,
}: DonateButtonProps) {
  const { address: connectedAddress, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { isBlocked, isChecking } = useOFACCheck(connectedAddress);
  const hideModalRef = useRef<(() => void) | null>(null);
  const showModalRef = useRef<(() => void) | null>(null);
  const previousAddressRef = useRef<string | undefined>(connectedAddress);

  useEffect(() => {
    if (previousAddressRef.current && previousAddressRef.current !== connectedAddress) {
      if (hideModalRef.current) {
        hideModalRef.current();
      }
    }
    previousAddressRef.current = connectedAddress;
  }, [connectedAddress]);

  useEffect(() => {
    if (shouldOpenModal && !isBlocked && !isChecking && showModalRef.current) {
      showModalRef.current();
      if (onModalOpened) {
        onModalOpened();
      }
    }
  }, [shouldOpenModal, isBlocked, isChecking, onModalOpened]);

  const handlePaymentCompleted = (e: unknown) => {
    console.log(e);
    if (onPaymentComplete) {
      onPaymentComplete();
    }
  };

  const getButtonText = () => {
    if (isLoading || isChecking) return "Loading...";
    if (isBlocked) return "Unable to process donation";
    return "Give";
  };

  const buttonText = getButtonText();

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
      closeOnSuccess
    >
      {({ show, hide }) => {
        // Store function references
        hideModalRef.current = hide;
        showModalRef.current = show;

        const amountNumber = Number(amount);
        const isAmountZero = amountNumber === 0;
        const isDisabled = isAmountZero || disabled || isBlocked || isChecking;

        const handleClick = async () => {
          // Check if we should proceed with payment (e.g., TOS check)
          if (onBeforePayment && !onBeforePayment()) {
            return;
          }

          if (!isConnected && connectors.length > 0) {
            try {
              connect({ connector: connectors[0] });
            } catch (error) {
              console.error("Failed to connect wallet:", error);
              return;
            }
          }
          show();
        };

        return (
          <Button
            onClick={handleClick}
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
