export const EVENT = {
  ChangelogClick: "changelog_click",
  GithubClick: "github_click",
  InstallClick: "install_click",
  InstallClickMas: "install_click_mas",
  InstallClickMobileRedirect: "install_click_mobile_redirect",
  ProDiscountSignup: "pro_discount_signup",
  ProDiscountSignupDuplicate: "pro_discount_signup_duplicate",
  ProductHuntClick: "product_hunt_click",
  SubscribeClick: "subscribe_click",
  SubscriberSignup: "subscriber_signup",
  SubscriberSignupDuplicate: "subscriber_signup_duplicate",
  PlatformWaitlistOpen: "platform_waitlist_open",
  PlatformWaitlistSignup: "platform_waitlist_signup",
  PlatformWaitlistDuplicate: "platform_waitlist_duplicate",
} as const;

export type EventName = typeof EVENT[keyof typeof EVENT];
