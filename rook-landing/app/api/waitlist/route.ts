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
        from: "Maryam from Rook <hello@userook.app>",
        replyTo: process.env.NOTIFY_EMAIL!,
        to: normalizedEmail,
        subject: "Rook early access",
        headers: {
          "List-Unsubscribe": "<mailto:hello@userook.app?subject=unsubscribe>",
        },
        html: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#111111;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#111111;opacity:0;">You're one of the first 100. Here's what you unlocked.</div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#111111;padding:40px 20px;">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" style="background-color:#1a1a1a;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:40px 36px 32px;text-align:center;">
          <img src="https://userook.app/icon-128.png" alt="Rook" width="48" height="48" style="border-radius:12px;" />
        </td></tr>
        <tr><td style="padding:0 36px 32px;color:#cccccc;font-size:15px;line-height:1.6;">
          <p style="margin:0 0 16px;">Hey!</p>
          <p style="margin:0 0 16px;">Thank you for being one of the first 100 on the waitlist. You've unlocked <strong style="color:#ffffff;">a lifetime discount on Rook Pro</strong>, and you get <strong style="color:#ffffff;">early access</strong> to Rook starting today: <a href="https://userook.app/early" style="color:#E8962E;text-decoration:underline;">userook.app/early</a>.</p>
          <p style="margin:0 0 16px;">Rook is launching on Product Hunt on <strong style="color:#ffffff;">May 19</strong>. Would looove to see you there.</p>
          <p style="margin:0 0 16px;">Curious about rook's origin story? I wrote about it here: <a href="https://dev.to/mimobenjo/why-i-stopped-using-apple-notes-for-my-code-notes-110p" style="color:#E8962E;text-decoration:underline;">Dev.to</a>.</p>
          <p style="margin:0 0 16px;">Any feedback and feature requests very welcome! I read every reply.</p>
          <p style="margin:0 0 16px;">Don't forget to share with your friends!</p>
          <p style="margin:0;">Happy note-taking,<br/>Maryam<br/><a href="https://x.com/mimobenjo" style="color:#E8962E;text-decoration:none;">@mimobenjo</a></p>
        </td></tr>
        <tr><td style="padding:4px 36px 24px;color:#888888;font-size:12px;line-height:1.6;">
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
            <tr>
              <td style="padding-right:16px;">
                <a href="https://x.com/userookapp" style="text-decoration:none;color:#cccccc;font-size:13px;display:inline-block;">
                  <img src="https://cdn.simpleicons.org/x/888888" width="14" height="14" alt="X" style="vertical-align:middle;margin-right:6px;border:0;" />@userookapp
                </a>
              </td>
              <td>
                <a href="https://github.com/maryamtb/rook" style="text-decoration:none;color:#cccccc;font-size:13px;display:inline-block;">
                  <img src="https://cdn.simpleicons.org/github/888888" width="14" height="14" alt="GitHub" style="vertical-align:middle;margin-right:6px;border:0;" />maryamtb/rook
                </a>
              </td>
            </tr>
          </table>
          <p style="margin:0;">
            We have <a href="https://github.com/maryamtb/rook/tree/main/community-notes" style="color:#E8962E;text-decoration:none;">community cheatsheets</a> on GitHub for kubectl, git, DSA patterns, and more. Feel free to contribute in the repo and add your own!
          </p>
        </td></tr>
        <tr><td style="padding:24px 36px;border-top:1px solid #2a2a2a;color:#666666;font-size:11px;line-height:1.6;">
          <p style="margin:0 0 12px;">You are receiving this email because you opted in via our site.</p>
          <p style="margin:0 0 12px;">Want to change how you receive these emails?<br/><a href="mailto:hello@userook.app?subject=unsubscribe" style="color:#888888;text-decoration:underline;">You can unsubscribe from this list.</a></p>
          <p style="margin:0;">Rook<br/><a href="https://userook.app" style="color:#888888;text-decoration:none;">https://userook.app</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
      }),
      resend.emails.send({
        from: "Rook <hello@userook.app>",
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
