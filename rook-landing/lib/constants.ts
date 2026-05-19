export const APP_VERSION = "1.3.2";
export const APP_ITEM_ID = "6766067055";
export const DMG_URL = `https://lfubd2pcrenetvqi.public.blob.vercel-storage.com/releases/Rook-${APP_VERSION}.dmg`;
// Official Apple "Embed Badge" snippet — link uses apps_box_badge attribution,
// badge artwork is Apple's official SVG vendored to /public (white variant).
export const MAS_URL = `https://apps.apple.com/us/app/rook-code-notes/id${APP_ITEM_ID}?mt=12&itscg=30200&itsct=apps_box_badge&mttnsubad=${APP_ITEM_ID}`;
export const MAS_BADGE_URL = "/download-on-the-app-store-en-us/white.svg";

export const PRODUCT_HUNT_URL =
  "https://www.producthunt.com/products/rook-4?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-rook-5";

export const SIGNUPS_DISABLED = process.env.NEXT_PUBLIC_SIGNUP_MODE === "disabled";
