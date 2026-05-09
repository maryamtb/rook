import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { isSameOrigin } from "@/lib/csrf";
import { escapeHtml } from "@/lib/utils";
import { SIGNUPS_DISABLED } from "@/lib/constants";
import {
  isPlatform,
  joinPlatformLabels,
  type Platform,
} from "@/lib/platforms";
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
  if (!notifyEmail) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a few moments." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const email = body?.email;
    const rawPlatforms: unknown[] = Array.isArray(body?.platforms)
      ? body.platforms
      : [];
    const platforms: Platform[] = Array.from(
      new Set(rawPlatforms.filter(isPlatform))
    );

    if (platforms.length === 0) {
      return NextResponse.json(
        { error: "Please pick at least one platform." },
        { status: 400 }
      );
    }

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
    const supabase = getSupabaseAdmin();

    const { data: existing, error: fetchError } = await supabase
      .from("platform_waitlist")
      .select("platforms")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (fetchError) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again in a few moments." },
        { status: 500 }
      );
    }

    const existingPlatforms: Platform[] = (existing?.platforms ?? []).filter(
      isPlatform,
    );
    const newPlatforms = platforms.filter((p) => !existingPlatforms.includes(p));
    const mergedPlatforms: Platform[] = Array.from(
      new Set([...existingPlatforms, ...platforms]),
    );

    if (existing && newPlatforms.length === 0) {
      return NextResponse.json(
        {
          error: `You're already on the list for ${joinPlatformLabels(existingPlatforms)}.`,
        },
        { status: 409 }
      );
    }

    const { error: upsertError } = await supabase
      .from("platform_waitlist")
      .upsert(
        {
          email: normalizedEmail,
          platforms: mergedPlatforms,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (upsertError) {
      return NextResponse.json(
        { error: "Something went wrong. Please try again in a few moments." },
        { status: 500 }
      );
    }

    const isFirstSignup = !existing;
    const emailedPlatforms = isFirstSignup ? platforms : newPlatforms;
    const emailedJoined = joinPlatformLabels(emailedPlatforms);
    const mergedJoined = joinPlatformLabels(mergedPlatforms);

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: normalizedEmail,
      event: "platform_waitlist_insert",
      properties: {
        email: normalizedEmail,
        platforms,
        new_platforms: newPlatforms,
        merged_platforms: mergedPlatforms,
        is_first_signup: isFirstSignup,
      },
    });
    posthog.identify({
      distinctId: normalizedEmail,
      properties: { email: normalizedEmail, platform_waitlist: mergedPlatforms },
    });
    await posthog.shutdown();

    const userSubject = isFirstSignup
      ? `You're on the Rook ${emailedJoined} waitlist ✏️`
      : `${emailedJoined} added to your Rook waitlist ✏️`;

    const userBodyOpening = isFirstSignup
      ? `Thank you for expressing interest in Rook for <strong style="color: #ffffff">${escapeHtml(emailedJoined)}</strong>.`
      : `Thanks, we've added <strong style="color: #ffffff">${escapeHtml(emailedJoined)}</strong> to your Rook waitlist. You're now on the list for <strong style="color: #ffffff">${escapeHtml(mergedJoined)}</strong>.`;

    await Promise.all([
      resend.emails.send({
        from: "Maryam from Rook 👋 <hello@userook.app>",
        replyTo: notifyEmail,
        to: normalizedEmail,
        subject: userSubject,
        headers: {
          "List-Unsubscribe": "<mailto:hello@userook.app?subject=unsubscribe>",
        },
        html: renderEmailShell({
          preheader: "You're on the Rook waitlist.",
          unsubscribeReason: "You are receiving this email because you joined the Rook waitlist on our site.",
          bodyHtml: `<p style="margin: 0 0 16px">
										${userBodyOpening}
									</p>
									<p style="margin: 0 0 16px">
										If support becomes available, we'll send you an email.
									</p>
									<p style="margin: 0">
										Maryam<br /><a
											href="https://x.com/mimobenjo"
											style="color: #e8962e; text-decoration: none"
											>@mimobenjo</a
										>
									</p>`,
        }),
      }),
      resend.emails.send({
        from: "Rook <hello@userook.app>",
        replyTo: notifyEmail,
        to: notifyEmail,
        subject: isFirstSignup
          ? `New Rook ${emailedJoined} waitlist signup: ${normalizedEmail}`
          : `Rook waitlist update: ${normalizedEmail} added ${emailedJoined}`,
        html: `<p>${escapeHtml(normalizedEmail)} ${isFirstSignup ? "joined" : "updated"} the platform waitlist. ${isFirstSignup ? "Platforms" : "Added"}: ${escapeHtml(emailedJoined)}. Now on file: ${escapeHtml(mergedJoined)}.</p>`,
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
