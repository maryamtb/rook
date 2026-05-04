export function SignupOutageBanner() {
  return (
    <div role="status" className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-2 text-[12px] sm:text-[13px] leading-snug text-amber-200 text-center">
        <span aria-hidden className="mr-1">⚠️</span>
        Signups are temporarily unavailable due to a third-party outage. Try again in a few hours, or email{" "}
        <a
          href="mailto:hello@userook.app"
          className="underline decoration-amber-200/40 underline-offset-2 hover:decoration-amber-200 transition-colors"
        >
          hello@userook.app
        </a>{" "}
        to be added manually.
      </div>
    </div>
  );
}
