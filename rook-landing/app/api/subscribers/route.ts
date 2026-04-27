import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getPostHogClient } from "@/lib/posthog-server";
import { isSameOrigin } from "@/lib/csrf";
import { escapeHtml } from "@/lib/utils";
import { SIGNUPS_DISABLED } from "@/lib/constants";

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
        html: `<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	</head>
	<body
		style="
			margin: 0;
			padding: 0;
			background-color: #111111;
			font-family:
				-apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto,
				sans-serif;
		"
	>
		<div
			style="
				display: none;
				max-height: 0;
				overflow: hidden;
				mso-hide: all;
				font-size: 1px;
				line-height: 1px;
				color: #111111;
				opacity: 0;
			"
		>
			Quick hello from the developer.
		</div>
		<table
			width="100%"
			cellpadding="0"
			cellspacing="0"
			style="background-color: #111111; padding: 40px 20px"
		>
			<tr>
				<td align="center">
					<table
						width="480"
						cellpadding="0"
						cellspacing="0"
						style="
							background-color: #1a1a1a;
							border-radius: 12px;
							overflow: hidden;
						"
					>
						<tr>
							<td style="padding: 40px 36px 32px; text-align: center">
								<img
									src="https://userook.app/icon-128.png"
									alt="Rook"
									width="48"
									height="48"
									style="border-radius: 12px"
								/>
							</td>
						</tr>
						<tr>
							<td
								style="
									padding: 0 36px 32px;
									color: #cccccc;
									font-size: 15px;
									line-height: 1.6;
								"
							>
								<p style="margin: 0 0 16px">
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
								</p>
							</td>
						</tr>
						<tr>
							<td
								style="
									padding: 4px 36px 24px;
									color: #888888;
									font-size: 12px;
									line-height: 1.6;
								"
							>
								<table
									cellpadding="0"
									cellspacing="0"
									border="0"
									style="margin-bottom: 18px"
								>
									<tr>
										<td style="padding-right: 16px">
											<a
												href="https://x.com/userookapp"
												style="
													text-decoration: none;
													color: #cccccc;
													font-size: 13px;
													display: inline-block;
												"
											>
												<img
													src="https://cdn.simpleicons.org/x/888888"
													width="14"
													height="14"
													alt="X"
													style="
														vertical-align: middle;
														margin-right: 6px;
														border: 0;
													"
												/>@userookapp
											</a>
										</td>
										<td>
											<a
												href="https://github.com/maryamtb/rook"
												style="
													text-decoration: none;
													color: #cccccc;
													font-size: 13px;
													display: inline-block;
												"
											>
												<img
													src="https://cdn.simpleicons.org/github/888888"
													width="14"
													height="14"
													alt="GitHub"
													style="
														vertical-align: middle;
														margin-right: 6px;
														border: 0;
													"
												/>maryamtb/rook
											</a>
										</td>
									</tr>
								</table>
								<p style="margin: 0">
									We have
									<a
										href="https://github.com/maryamtb/rook/tree/main/community-notes"
										style="color: #e8962e; text-decoration: none"
										>community cheatsheets</a
									>
									on GitHub for kubectl, git, DSA patterns, and more.
									Contributions welcome.
								</p>
							</td>
						</tr>
						<tr>
							<td
								style="
									padding: 24px 36px;
									border-top: 1px solid #2a2a2a;
									color: #666666;
									font-size: 11px;
									line-height: 1.6;
								"
							>
								<p style="margin: 0 0 12px">
									You are receiving this email because you opted in via our
									site.
								</p>
								<p style="margin: 0 0 12px">
									Want to change how you receive these emails?<br /><a
										href="mailto:hello@userook.app?subject=unsubscribe"
										style="color: #888888; text-decoration: underline"
										>You can unsubscribe from this list.</a
									>
									To delete your data, email
									<a
										href="mailto:hello@userook.app?subject=delete%20my%20data"
										style="color: #888888; text-decoration: underline"
										>hello@userook.app</a
									>.
								</p>
								<p style="margin: 0">
									Rook<br />
									<a
										href="https://userook.app"
										style="color: #888888; text-decoration: none"
										>https://userook.app</a
									>
								</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
`,
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
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong. Please try again in a few moments." },
      { status: 500 }
    );
  }
}
