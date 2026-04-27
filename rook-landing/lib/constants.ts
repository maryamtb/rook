export const DMG_URL = "https://lfubd2pcrenetvqi.public.blob.vercel-storage.com/releases/Rook-1.2.0.dmg";

export const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5";

export type SignupMode = "disabled" | "discount" | "subscribers";

const RAW_SIGNUP_MODE = process.env.NEXT_PUBLIC_SIGNUP_MODE;
export const SIGNUP_MODE: SignupMode =
  RAW_SIGNUP_MODE === "disabled" || RAW_SIGNUP_MODE === "discount"
    ? RAW_SIGNUP_MODE
    : "subscribers";

export const SIGNUPS_DISABLED = SIGNUP_MODE === "disabled";
export const SHOW_DISCOUNT_COUNTER = SIGNUP_MODE === "discount";
