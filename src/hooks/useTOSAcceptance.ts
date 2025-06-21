import { useCallback, useEffect, useState } from "react";

const TOS_STORAGE_PREFIX = "tos_accepted_";

interface TOSAcceptanceData {
  accepted: boolean;
  timestamp: number;
}

export function useTOSAcceptance(userFid?: string) {
  const [hasAccepted, setHasAccepted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStorageKey = useCallback(() => {
    // If we have a user FID, use it. Otherwise use "anonymous"
    const identifier = userFid || "anonymous";
    return `${TOS_STORAGE_PREFIX}${identifier}`;
  }, [userFid]);

  const checkAcceptance = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const data: TOSAcceptanceData = JSON.parse(stored);
        setHasAccepted(data.accepted === true);
      } else {
        setHasAccepted(false);
      }
    } catch (error) {
      console.error("Error checking TOS acceptance:", error);
      setHasAccepted(false);
    } finally {
      setIsLoading(false);
    }
  }, [getStorageKey]);

  useEffect(() => {
    checkAcceptance();
  }, [checkAcceptance]);

  const saveAcceptance = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      const data: TOSAcceptanceData = {
        accepted: true,
        timestamp: Date.now(),
      };
      localStorage.setItem(storageKey, JSON.stringify(data));
      setHasAccepted(true);
      return true;
    } catch (error) {
      console.error("Error saving TOS acceptance:", error);
      return false;
    }
  }, [getStorageKey]);

  const clearAcceptance = useCallback(() => {
    try {
      const storageKey = getStorageKey();
      localStorage.removeItem(storageKey);
      setHasAccepted(false);
    } catch (error) {
      console.error("Error clearing TOS acceptance:", error);
    }
  }, [getStorageKey]);

  return {
    hasAccepted,
    isLoading,
    checkAcceptance,
    saveAcceptance,
    clearAcceptance,
  };
}
