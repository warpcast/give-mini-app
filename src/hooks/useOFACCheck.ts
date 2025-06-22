import { useEffect, useState } from "react";

interface OFACResponse {
  isGoodAddress: boolean;
}

export function useOFACCheck(address: string | undefined) {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (!address) {
      setIsBlocked(false);
      return;
    }

    const checkAddress = async () => {
      setIsChecking(true);
      try {
        const response = await fetch(`https://api.wewantjusticedao.org/donation/validate?address=${address}`, {
          method: "GET",
        });

        if (!response.ok) {
          setIsBlocked(true);
          return;
        }

        const data: OFACResponse = await response.json();
        setIsBlocked(!data.isGoodAddress);
      } catch (error) {
        console.error("OFAC check failed:", error);
        setIsBlocked(true);
      } finally {
        setIsChecking(false);
      }
    };

    checkAddress();
  }, [address]);

  return { isBlocked, isChecking };
}
