import type { Cause } from "@/types";
import { sdk } from "@farcaster/frame-sdk";

export function getShareText(cause: Cause): string {
  if (cause.shareText) {
    return cause.shareText;
  }

  return `I just supported ${cause.name}. Join me in making a difference!`;
}

export async function shareCast(cause: Cause): Promise<boolean> {
  try {
    const text = getShareText(cause);
    const url = window.location.href;

    const result = await sdk.actions.composeCast({
      text: text,
      embeds: [url],
    });

    return result !== null;
  } catch (error) {
    console.error("Failed to compose cast:", error);
    return false;
  }
}
