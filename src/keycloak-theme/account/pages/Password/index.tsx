import { Button, TextField, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Password(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
	const {kcContext, i18n, Template, classes} = props

	const {url, password, account, stateChecker} = kcContext
	const {msg} = i18n

	return (
		<Template {...{kcContext, i18n, classes}} doUseDefaultCss={false}
				  active="password">
			<Typography variant={"h2"}>
				{msg("changePasswordHtmlTitle")}
			</Typography>
			<Typography variant={"subtitle1"}>
				{msg("allFieldsRequired")}
			</Typography>

			<form action={url.passwordUrl}
				  method="post"
				  data-testid="kc-password-form">
				<input
					type="text"
					id="username"
					name="username"
					value={account.username ?? ""}
					autoComplete="username"
					readOnly
					style={{"display": "none"}}
					data-testid="kc-username"
				/>

				{password.passwordSet && (
					<TextField
						tabIndex={1}
						type="password"
						id="password"
						name="password"
						data-testid={"password"}
						autoFocus
						fullWidth
						autoComplete="current-password"
						label={msg("password")}
					/>
				)}

				<input type="hidden"
					   id="stateChecker"
					   name="stateChecker"
					   data-testid="stateChecker"
					   value={stateChecker}/>

				<TextField
					tabIndex={2}
					type="password"
					id="password-new"
					name="password-new"
					data-testid={"password-new"}
					fullWidth
					autoComplete="new-password"
					label={msg("passwordNew")}
				/>

				<TextField
					tabIndex={3}
					type="password"
					id="password-confirm"
					name="password-confirm"
					data-testid={"password-confirm"}
					fullWidth
					autoComplete="new-password"
					label={msg("passwordConfirm")}
				/>

				<Button
					type={"submit"}
					name={"submitAction"}
					data-testid={"submitAction"}
					variant={"contained"}
					value={"Save"}
				>{msg("doSave")}</Button>

			</form>
		</Template>
	)
}
