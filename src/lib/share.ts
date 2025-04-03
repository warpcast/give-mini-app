import type { Cause } from "@/types";

export function getShareText(cause: Cause): string {
  if (cause.shareText) {
    return cause.shareText;
  }

  return `I just supported ${cause.name}. Join me in making a difference!`;
}

export function getShareUrl(cause: Cause): string {
  const text = encodeURIComponent(getShareText(cause));
  const url = encodeURIComponent(window.location.origin);
  return `https://warpcast.com/~/compose?text=${text}&embeds[]=${url}`;
}
