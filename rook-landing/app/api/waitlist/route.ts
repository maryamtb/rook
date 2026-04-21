import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";

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
        { error: "Something went wrong. Try again?" },
        { status: 500 }
      );
    }

    await Promise.all([
      resend.emails.send({
        from: "Rook <hi@userook.app>",
        replyTo: process.env.NOTIFY_EMAIL!,
        to: normalizedEmail,
        subject: "Rook got your request",
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:40px 36px 32px;text-align:center;">
          <img src="https://userook.app/icon-128.png" alt="Rook" width="48" height="48" style="border-radius:12px;" />
        </td></tr>
        <tr><td style="padding:0 36px 32px;color:#cccccc;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px;">Hey!</p>
          <p style="margin:0 0 16px;">This is Rook. We got your request to download. We'll send you another email as soon as the app is live.</p>
          <p style="margin:0;">Thanks for the interest!</p>
        </td></tr>
        <tr><td style="padding:0 36px 36px;text-align:center;">
          <a href="https://userook.app" style="display:inline-block;background-color:#E8962E;color:#111111;font-weight:600;font-size:14px;padding:10px 24px;border-radius:8px;text-decoration:none;">Visit userook.app</a>
        </td></tr>
        <tr><td style="padding:20px 36px;border-top:1px solid #2a2a2a;text-align:center;">
          <span style="color:#666666;font-size:12px;">Rook</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
      resend.emails.send({
        from: "Rook <hi@userook.app>",
        replyTo: process.env.NOTIFY_EMAIL!,
        to: process.env.NOTIFY_EMAIL!,
        subject: `New Rook signup: ${normalizedEmail}`,
        html: `<p>${normalizedEmail} just signed up for the Rook waitlist.</p>`,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Try again?" },
      { status: 500 }
    );
  }
}
