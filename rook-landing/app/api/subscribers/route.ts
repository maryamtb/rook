import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { escapeHtml } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { error } = await getSupabase()
      .from("subscribers")
      .insert({ email: normalizedEmail });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "You're already on the list!" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Something went wrong. Try again?" },
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

    await resend.emails.send({
      from: "Rook <hello@userook.app>",
      replyTo: process.env.NOTIFY_EMAIL!,
      to: process.env.NOTIFY_EMAIL!,
      subject: `New Rook subscriber: ${normalizedEmail}`,
      html: `<p>${escapeHtml(normalizedEmail)} subscribed for updates.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try again?" },
      { status: 500 }
    );
  }
}
