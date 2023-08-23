import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait"
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Tooltip,
	Typography
} from "@mui/material"
import { MessageKey } from "keycloakify/account/i18n/i18n"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import React from "react"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

type Props = PageProps<Extract<KcContext, { pageId: "totp.ftl" }>, I18n>

export default function Totp(props: Props) {
	// NOTE: We don't need to use dialog here, I just didn't know how else should I hide the OTP form.
	// keycloak.v2 theme uses redirect to login page with required action, but hardcoding that url doesn't seem to be
	// the best option. if you decide to remove this dialog and place it right here, you'll need to update the tests.
	// now I am expecting this button to be here and I'm clicking it to open the dialog.
	const [ addTotpOpen, setAddTotpOpen ] = React.useState(false)
	const {kcContext, i18n, Template, classes} = props

	const {url, stateChecker, totp, mode, messagesPerField} = kcContext
	const {msgStr} = i18n

	const handleDialogClose = () => {
		setAddTotpOpen(false)
	}


	return (
		<Template {...{kcContext, i18n, classes}} doUseDefaultCss={false}
				  active="totp">
			<Typography variant="h2">{msgStr("authenticatorTitle")}</Typography>
			<List>
				{totp.otpCredentials.map(credential => (
					<ListItem
						key={credential.id}
						data-testid={`totp-credential-${credential.id}`}
						secondaryAction={
							<form action={url.totpUrl}
								  method="post">
								<input type="hidden"
									   id="stateChecker"
									   name="stateChecker"
									   value={stateChecker}/>
								<input type="hidden"
									   id="submitAction"
									   name="submitAction"
									   value="Delete"/>
								<input type="hidden"
									   id="credentialId"
									   name="credentialId"
									   value={credential.id}/>
								<Tooltip title={msgStr("doRemove")}>
									<IconButton aria-label="delete"
												type="submit">
										<DeleteIcon/>
									</IconButton>
								</Tooltip>
							</form>
						}
					>
						<ListItemIcon>
							<StayCurrentPortraitIcon/>
						</ListItemIcon>
						<ListItemText primary={credential.userLabel}/>
					</ListItem>
				))}
				<ListItemButton
					data-testid="add-totp-credential"
					onClick={() => setAddTotpOpen(true)}
				>
					<ListItemIcon>
						<AddIcon/>
					</ListItemIcon>
					<ListItemText primary={msgStr("doAddTotp")}/>
				</ListItemButton>
			</List>
			<Dialog open={addTotpOpen}
					onClose={handleDialogClose}
					maxWidth="md"
					fullWidth>
				<form
					action={url.totpUrl}
					id="kc-totp-settings-form"
					method="post"
					data-testid="kc-totp-settings-form"
				>
					<DialogTitle>{msgStr("doAddTotp")}</DialogTitle>
					<DialogContent>
						<ol>
							<Typography>{msgStr("totpStep1")}</Typography>

							<ul id="kc-totp-supported-apps">
								{totp.supportedApplications.map(app => (
									<li key={app}>{msgStr(app as MessageKey) ?? app}</li>
								))}
							</ul>

							{mode && mode == "manual" ? (
								<>
									<li>
										<Typography>{msgStr("totpManualStep2")}</Typography>
										<Typography>
											<span
												id="kc-totp-secret-key"
												data-testid="kc-totp-secret-key">
											{totp.totpSecretEncoded}</span>
										</Typography>
										<Typography>
											<Link href={totp.qrUrl}
												  id="mode-barcode">
												{msgStr("totpScanBarcode")}
											</Link>
										</Typography>
									</li>
									<li>
										<Typography>{msgStr("totpManualStep3")}</Typography>
										<ul>
											<li id="kc-totp-type">
												{msgStr("totpType")}: {msgStr(`totp.${totp.policy.type}`)}
											</li>
											<li id="kc-totp-algorithm">
												{msgStr("totpAlgorithm")}: {totp.policy.algorithmKey}
											</li>
											<li id="kc-totp-digits">
												{msgStr("totpDigits")}: {totp.policy.digits}
											</li>
											{totp.policy.type === "totp" ? (
												<li id="kc-totp-period">
													{msgStr("totpInterval")}: {totp.policy.period}
												</li>
											) : (
												<li id="kc-totp-counter">
													{msgStr("totpCounter")}: {totp.policy.initialCounter}
												</li>
											)}
										</ul>
									</li>
								</>
							) : (
								<li>
									<Typography>{msgStr("totpStep2")}</Typography>
									<img
										id="kc-totp-secret-qr-code"
										data-testid="kc-totp-secret-qr-code"
										src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
										alt="Figure: Barcode"/>
									<br/>
									<Typography>
										<Link href={totp.manualUrl}
											  id="mode-manual">
											{msgStr("totpUnableToScan")}
										</Link>
									</Typography>
								</li>
							)}
							<li>
								<Typography>{msgStr("totpStep2")}</Typography>
								<Typography>{msgStr("totpStep3DeviceName")}</Typography>
							</li>
						</ol>


						<input type="hidden"
							   id="stateChecker"
							   name="stateChecker"
							   value={stateChecker}/>
						<input type="hidden"
							   id="totpSecret"
							   name="totpSecret"
							   value={totp.totpSecret}/>

						<TextField
							type="text"
							id="totp"
							name="totp"
							autoComplete="off"
							aria-invalid={messagesPerField.existsError("totp")}
							label={msgStr("authenticatorCode")}
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
							label={msgStr("totpDeviceName")}
							required={totp.otpCredentials.length >= 1}
							error={messagesPerField.existsError("userLabel")}
							helperText={messagesPerField.get("userLabel")}
							data-testid="userLabel"
						/>

					</DialogContent>
					<DialogActions>
						<Button color="secondary"
								data-testid="kc-cancel-button"
								type="reset"
								onClick={handleDialogClose}>
							{msgStr("doCancel")}
						</Button>
						<Button type="submit"
								data-testid="kc-submit-button"
								color="primary">
							{msgStr("doAdd")}
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Template>
	)
}
