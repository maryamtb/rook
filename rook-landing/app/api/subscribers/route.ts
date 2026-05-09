import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { isSameOrigin } from "@/lib/csrf";
import { escapeHtml } from "@/lib/utils";
import { SIGNUPS_DISABLED } from "@/lib/constants";
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

  const notifyEmail = process.env.NOTIFY_EMAIL;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  if (!notifyEmail || !segmentId) {
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

    const { data: waitlistRow } = await getSupabaseAdmin()
      .from("waitlist")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (waitlistRow) {
      return NextResponse.json(
        { error: "You're already in! Lifetime discount claimed 🚀" },
        { status: 409 }
      );
    }

    const { data: existing } = await resend.contacts.get({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json(
        { error: "You're already on the list!" },
        { status: 409 }
      );
    }

    const { error } = await resend.contacts.create({
      email: normalizedEmail,
      segments: [{ id: segmentId }],
      unsubscribed: false,
    });

    if (error) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again in a few moments." },
        { status: 500 }
      );
    }

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: normalizedEmail,
      event: "subscriber_insert",
      properties: { email: normalizedEmail },
    });
    posthog.identify({
      distinctId: normalizedEmail,
      properties: { email: normalizedEmail },
    });
    await posthog.shutdown();

    await Promise.all([
      resend.emails.send({
        from: "Maryam from Rook 👋 <hello@userook.app>",
        replyTo: notifyEmail,
        to: normalizedEmail,
        subject: "Welcome to Rook! ✏️",
        headers: {
          "List-Unsubscribe": "<mailto:hello@userook.app?subject=unsubscribe>",
        },
        html: renderEmailShell({
          preheader: "Quick hello from the developer.",
          unsubscribeReason: "You are receiving this email because you opted in via our site.",
          bodyHtml: `<p style="margin: 0 0 16px">
									Welcome to Rook updates 🧡 You're joining 100+ early
									supporters.
								</p>
								<p style="margin: 0 0 16px">
									If you haven't already, you can download the free version of
									Rook for Mac at
									<a
										href="https://userook.app?utm_source=email&amp;utm_medium=welcome&amp;utm_campaign=signup"
										style="color: #e8962e; text-decoration: underline"
										>userook.app</a
									>.
								</p>
								<p style="margin: 0 0 16px">
									What's next: Rook is launching on Product Hunt on
									<strong style="color: #ffffff">May 19</strong>. I'll send a
									reminder before launch.
								</p>
								<p style="margin: 0 0 16px">
									Got feedback or a feature request? I'd love to hear it. Just
									reply to this email.
								</p>
								<p style="margin: 0 0 16px">
									Curious about how Rook came to be? I wrote the origin story
									here:
									<a
										href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p"
										style="color: #e8962e; text-decoration: underline"
										>Dev.to</a
									>.
								</p>
								<p style="margin: 0">
									Happy note-taking,<br />Maryam<br /><a
										href="https://x.com/mimobenjo"
										style="color: #e8962e; text-decoration: none"
										>@mimobenjo</a
									>
								</p>`,
          extraBlurbHtml: `<p style="margin: 0">
									We have
									<a
										href="https://github.com/maryamtb/rook/tree/main/community-notes"
										style="color: #e8962e; text-decoration: none"
										>community cheatsheets</a
									>
									on GitHub for kubectl, git, DSA patterns, and more.
									Contributions welcome.
								</p>`,
        }),
      }),
      resend.emails.send({
        from: "Rook <hello@userook.app>",
        replyTo: notifyEmail,
        to: notifyEmail,
        subject: `New Rook subscriber: ${normalizedEmail}`,
        html: `<p>${escapeHtml(normalizedEmail)} subscribed for updates.</p>`,
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
