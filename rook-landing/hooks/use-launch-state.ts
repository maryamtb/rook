import { SHOW_DISCOUNT_COUNTER } from "@/lib/constants";

export type LaunchState = {
  showDiscount: boolean;
};

export function useLaunchState(): LaunchState {
  return {
    showDiscount: SHOW_DISCOUNT_COUNTER,
  };
}
