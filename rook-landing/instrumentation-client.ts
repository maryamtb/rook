import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: "2026-01-30",
  capture_exceptions: true,
  capture_pageview: "history_change",
  person_profiles: "identified_only",
  persistence: "memory",
  disable_session_recording: true,
  debug: process.env.NODE_ENV === "development",
});
