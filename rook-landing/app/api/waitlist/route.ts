import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { Resend } from "resend";
import { getSupabase, getSupabaseAdmin } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { DISCOUNT_ROUND_START, computeSignupState, getDiscountCount } from "@/lib/signups";
import { PRODUCT_HUNT_URL, SIGNUPS_DISABLED } from "@/lib/constants";
import { isSameOrigin } from "@/lib/csrf";
import { escapeHtml } from "@/lib/utils";
import { renderEmailShell } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_SIGNUPS_PER_IP = 2;

function hashClientIp(request: Request): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  }

  if (SIGNUPS_DISABLED) {
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Email hello@userook.app to be added manually." },
      { status: 503 }
    );
  }

  const notifyEmail = process.env.NOTIFY_EMAIL;
  if (!notifyEmail) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a few moments." },
      { status: 500 }
    );
  }

  try {
    const { email } = await request.json();

    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const ipHash = hashClientIp(request);

    const currentCount = await getDiscountCount();
    const state = computeSignupState(currentCount);
    if (state === "prelaunch") {
      return NextResponse.json(
        { error: "The discount is not open yet." },
        { status: 410 }
      );
    }
    if (state === "closed") {
      return NextResponse.json(
        { error: "The first 100 spots are filled." },
        { status: 410 }
      );
    }
    if (state !== "discount") {
      return NextResponse.json(
        { error: "The discount is not currently available." },
        { status: 410 }
      );
    }

    const { count: ipCount } = await getSupabaseAdmin()
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .gte("created_at", DISCOUNT_ROUND_START);

    if ((ipCount ?? 0) >= MAX_SIGNUPS_PER_IP) {
      return NextResponse.json(
        { error: "Too many signups from this network. Try again later." },
        { status: 429 }
      );
    }

    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email: normalizedEmail, ip_hash: ipHash });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the list!" },
          { status: 409 }
        );
      }
      if (error.code === "P0001" && error.message === "discount_round_full") {
        return NextResponse.json(
          { error: "The first 100 spots are filled." },
          { status: 410 }
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Please try again in a few moments." },
        { status: 500 }
      );
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: normalizedEmail,
      event: "pro_discount_insert",
      properties: { email: normalizedEmail },
    });
    posthog.identify({
      distinctId: normalizedEmail,
      properties: { email: normalizedEmail },
    });
    await posthog.shutdown();

    await Promise.all([
      resend.emails.send({
        from: "Maryam from Rook <hello@userook.app>",
        replyTo: notifyEmail,
        to: normalizedEmail,
        subject: "Your Rook lifetime Pro discount",
        headers: {
          "List-Unsubscribe": "<mailto:hello@userook.app?subject=unsubscribe>",
        },
        html: renderEmailShell({
          preheader: "Hello from the developer.",
          unsubscribeReason: "You are receiving this email because you opted in via our site.",
          bodyHtml: `<p style="margin: 0 0 16px">Hey,</p>
								<p style="margin: 0 0 16px">
									You've claimed your
									<strong style="color: #ffffff"
										>lifetime discount for Rook Pro</strong
									>! Pro is under development. If you have any specific feature requests, don't hesitate to send them over.
								</p>
								<p style="margin: 0 0 16px">
									This discount celebrates Rook's Product Hunt launch, happening right now! An upvote would make my day 🙌
								</p>
								<p style="margin: 0 0 20px">
									<a
										href="${PRODUCT_HUNT_URL}"
										style="display: inline-block; padding: 10px 18px; background: #FF6154; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px"
										>Upvote on Product Hunt →</a
									>
								</p>
								<p style="margin: 0 0 16px">
									If you're curious about the origin story, I wrote about it
									<a
										href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p"
										style="color: #e8962e; text-decoration: underline"
										>on Dev.to</a
									>.
								</p>
								<p style="margin: 0 0 16px">
									Feel free to reach me by just replying to this email. Any feedback, questions, and hellos welcome.
								</p>
								<p style="margin: 0">
									Happy note-taking,<br />Maryam TB<br /><a
										href="https://x.com/mimobenjo"
										style="color: #e8962e; text-decoration: none"
										>@mimobenjo</a
									>
								</p>`,
          extraBlurbHtml: `<p style="margin: 0 0 12px">
									Encountered a bug? Open an issue <a href="https://github.com/maryamtb/rook/issues" style="color: #e8962e; text-decoration: none">here</a>!
								</p>
								<p style="margin: 0">
									We have
									<a
										href="https://github.com/maryamtb/rook/tree/main/community-notes"
										style="color: #e8962e; text-decoration: none"
										>community cheatsheets</a
									>
									on GitHub for kubectl, git, DSA patterns, and more. Feel free
									to contribute in the repo and add your own!
								</p>`,
        }),
      }),
      resend.emails.send({
        from: "Rook <hello@userook.app>",
        replyTo: notifyEmail,
        to: notifyEmail,
        subject: `New Rook signup: ${normalizedEmail}`,
        html: `<p>${escapeHtml(normalizedEmail)} is part of the first 100.</p>`,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a few moments." },
      { status: 500 }
    );
  }
}
