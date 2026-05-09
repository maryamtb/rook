type EmailShellOptions = {
  preheader: string;
  bodyHtml: string;
  extraBlurbHtml?: string;
  unsubscribeReason: string;
};

export function renderEmailShell({
  preheader,
  bodyHtml,
  extraBlurbHtml = "",
  unsubscribeReason,
}: EmailShellOptions): string {
  return `<!DOCTYPE html>
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
			${preheader}
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
								${bodyHtml}
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
								${extraBlurbHtml}
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
									${unsubscribeReason}
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
`;
}
