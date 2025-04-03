import type { Cause } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getShareText(cause: Cause, amount: string): string {
  return `I just donated ${amount} USDC to ${cause.name}`;
}

export function getShareUrl(cause: Cause, amount: string): string {
  const text = encodeURIComponent(getShareText(cause, amount));
  const url = encodeURIComponent(window.location.origin);
  return `https://warpcast.com/~/compose?text=${text}&embeds[]=${url}`;
}
