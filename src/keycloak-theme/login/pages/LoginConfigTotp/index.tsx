import { Button, Link, TextField, Typography } from "@mui/material"
import { MessageKey } from "keycloakify/login/i18n/i18n"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, {
	pageId: "login-config-totp.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {url, isAppInitiatedAction, totp, mode, messagesPerField} = kcContext

	const {msg, msgStr} = i18n

	const algToKeyUriAlg: Record<(typeof kcContext)["totp"]["policy"]["algorithm"], string> = {
		"HmacSHA1": "SHA1",
		"HmacSHA256": "SHA256",
		"HmacSHA512": "SHA512"
	}

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginTotpTitle")}>
			<>
				<ol id="kc-totp-settings">
					<li>
						<Typography>{msg("loginTotpStep1")}</Typography>

						<ul id="kc-totp-supported-apps">
							{totp.supportedApplications.map(app => (
								<li key={app}>{msgStr(app as MessageKey) ?? app}</li>
							))}
						</ul>
					</li>

					{mode && mode == "manual" ? (
						<>
							<li>
								<Typography>{msg("loginTotpManualStep2")}</Typography>
								<Typography>
									<span
										id="kc-totp-secret-key"
										data-testid="kc-totp-secret-key">
										{totp.totpSecretEncoded}</span>
								</Typography>
								<Typography>
									<Link href={totp.qrUrl} id="mode-barcode">
										{msg("loginTotpScanBarcode")}
									</Link>
								</Typography>
							</li>
							<li>
								<Typography>{msg("loginTotpManualStep3")}</Typography>
									<ul>
										<li id="kc-totp-type">
											{msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
										</li>
										<li id="kc-totp-algorithm">
											{msg(
												"loginTotpAlgorithm")}: {algToKeyUriAlg?.[totp.policy.algorithm] ?? totp.policy.algorithm}
										</li>
										<li id="kc-totp-digits">
											{msg("loginTotpDigits")}: {totp.policy.digits}
										</li>
										{totp.policy.type === "totp" ? (
											<li id="kc-totp-period">
												{msg("loginTotpInterval")}: {totp.policy.period}
											</li>
										) : (
											<li id="kc-totp-counter">
												{msg("loginTotpCounter")}: {totp.policy.initialCounter}
											</li>
										)}
									</ul>
							</li>
						</>
					) : (
						<li>
							<Typography>{msg("loginTotpStep2")}</Typography>
							<img
								id="kc-totp-secret-qr-code"
								data-testid="kc-totp-secret-qr-code"
								src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
								alt="Figure: Barcode"/>
							<br/>
							<Typography>
								<Link href={totp.manualUrl} id="mode-manual">
									{msg("loginTotpUnableToScan")}
								</Link>
							</Typography>
						</li>
					)}
					<li>
						<Typography>{msg("loginTotpStep3")}</Typography>
						<Typography>{msg("loginTotpStep3DeviceName")}</Typography>
					</li>
				</ol>

				<form
					action={url.loginAction}
					className={getClassName("kcFormClass")}
					id="kc-totp-settings-form"
					method="post"
					data-testid="kc-totp-settings-form"
				>
					<input
						type="hidden"
						id="totpSecret"
						name="totpSecret"
						value={totp.totpSecret}
						data-testid="totpSecret"
					/>
					{mode && <input type="hidden" id="mode" value={mode}/>}

					<TextField
						type="text"
						id="totp"
						name="totp"
						autoComplete="off"
						aria-invalid={messagesPerField.existsError("totp")}
						label={msg("authenticatorCode")}
						error={messagesPerField.existsError("totp")}
						helperText={messagesPerField.get("totp")}
						data-testid="totp"
					/>


					<TextField
						type="text"
						id="userLabel"
						name="userLabel"
						autoComplete="off"
						aria-invalid={messagesPerField.existsError("userLabel")}
						label={msg("loginTotpDeviceName")}
						required={totp.otpCredentials.length >= 1}
						error={messagesPerField.existsError("userLabel")}
						helperText={messagesPerField.get("userLabel")}
						data-testid="userLabel"
					/>

					<Button
						variant="contained"
						color="primary"
						type={"submit"}
						data-testid="kc-submit-button"
					>
						{msgStr("doSubmit")}
					</Button>

					{isAppInitiatedAction && (
						<Button
							variant="contained"
							color="secondary"
							data-testid="kc-cancel-button"
							type="submit"
							name="cancel-aia"
							value="true"
						>
							{msg("doCancel")}
						</Button>
					)}
				</form>
			</>
		</Template>
	)
}
