import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { DISCOUNT_CAP, getDiscountCount } from "@/lib/signups";
import { SHOW_DISCOUNT_COUNTER, SIGNUPS_DISABLED } from "@/lib/constants";
import { isSameOrigin } from "@/lib/csrf";
import { escapeHtml } from "@/lib/utils";
import { renderEmailShell } from "@/lib/email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

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

  if (!SHOW_DISCOUNT_COUNTER) {
    return NextResponse.json(
      { error: "The discount is not currently available." },
      { status: 410 }
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

    if ((await getDiscountCount()) >= DISCOUNT_CAP) {
      return NextResponse.json(
        { error: "The first 100 spots are filled." },
        { status: 410 }
      );
    }

    const { error } = await getSupabase()
      .from("waitlist")
      .insert({ email: normalizedEmail });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the list!" },
          { status: 409 }
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
        subject: "Your Rook lifetime Pro discount 👋",
        headers: {
          "List-Unsubscribe": "<mailto:hello@userook.app?subject=unsubscribe>",
        },
        html: renderEmailShell({
          preheader: "You're one of the first 100. Here's what you unlocked.",
          unsubscribeReason: "You are receiving this email because you opted in via our site.",
          bodyHtml: `<p style="margin: 0 0 16px">Hey!</p>
								<p style="margin: 0 0 16px">
									Thank you for being part of the first 100 to sign up for Rook.
									You've unlocked
									<strong style="color: #ffffff"
										>a lifetime discount on Rook Pro</strong
									>.
								</p>
								<p style="margin: 0 0 16px">
									Rook is launching on Product Hunt on
									<strong style="color: #ffffff">May 19</strong>. Would looove
									to see you there.
								</p>
								<p style="margin: 0 0 16px">
									Curious about rook's origin story? I wrote about it here:
									<a
										href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p"
										style="color: #e8962e; text-decoration: underline"
										>Dev.to</a
									>.
								</p>
								<p style="margin: 0 0 16px">
									Any feedback and feature requests very welcome!
								</p>
								<p style="margin: 0 0 16px">
									Don't forget to share with your friends!
								</p>
								<p style="margin: 0">
									Happy note-taking,<br />Maryam<br /><a
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
