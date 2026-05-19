"use client";

import type { SignupMeta } from "./use-signup-meta";

export type LaunchState = {
  showDiscount: boolean;
};

export function useLaunchState(meta: SignupMeta | null): LaunchState {
  return {
    showDiscount: meta?.state === "discount",
  };
}
