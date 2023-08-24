import { Button, TextField, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {url, realm, messagesPerField, stateChecker, account, referrer} = kcContext

	const {msg} = i18n

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} active="account">
			<Typography variant="h2">
				{msg("editAccountHtmlTitle")}
			</Typography>
			<Typography variant="subtitle2">* {msg("requiredFields")}</Typography>

			<form action={url.accountUrl}
				className="form-horizontal"
				data-testid={"kc-account-form"}
				method="post">
				<input type="hidden"
					id="stateChecker"
					name="stateChecker"
					value={stateChecker}/>

				{!realm.registrationEmailAsUsername && (
					<TextField
						type="text"
						id="username"
						name="username"
						disabled={!realm.editUsernameAllowed}
						value={account.username ?? ""}
						label={msg("username")}
						required={realm.editUsernameAllowed}
						error={messagesPerField.existsError("username")}
						helperText={messagesPerField.get("disabled")}
						fullWidth
					/>
				)}

				<TextField
					type="text"
					id="email"
					name="email"
					autoFocus
					value={account.email ?? ""}
					label={msg("email")}
					required
					error={messagesPerField.existsError("email")}
					helperText={messagesPerField.get("email")}
					fullWidth
				/>

				<TextField
					type="text"
					id="firstName"
					name="firstName"
					value={account.firstName ?? ""}
					label={msg("firstName")}
					required
					error={messagesPerField.existsError("firstName")}
					helperText={messagesPerField.get("firstName")}
					fullWidth
				/>

				<TextField
					type="text"
					id="lastName"
					name="lastName"
					value={account.lastName ?? ""}
					label={msg("lastName")}
					required
					error={messagesPerField.existsError("lastName")}
					helperText={messagesPerField.get("lastName")}
					fullWidth
				/>

				{referrer !== undefined &&
					referrer.url !== undefined &&
					referrer.url !== "" &&
					<Button component="a"
					href={referrer?.url}>{msg("backToApplication")}</Button>}
				<Button
					type="submit"
					name="submitAction"
					value="Save"
					variant="contained"
					color="primary"
					>
					{msg("doSave")}
				</Button>
				<Button
					type="submit"
					name="submitAction"
					value="Cancel"
					color="secondary"
					>
				{msg("doCancel")}
				</Button>
			</form>
		</Template>
	)
}
