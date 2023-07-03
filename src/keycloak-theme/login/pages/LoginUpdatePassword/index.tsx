import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, {
	pageId: "login-update-password.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {msg, msgStr} = i18n

	const {url, messagesPerField, isAppInitiatedAction, username} = kcContext

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("updatePasswordTitle")}>
			<form
				id="kc-passwd-update-form"
				className={getClassName("kcFormClass")}
				action={url.loginAction}
				method="post"
				data-testid="kc-passwd-update-form"
			>
				<input
					type="text"
					id="username"
					name="username"
					value={username}
					readOnly={true}
					autoComplete="username"
					style={{display: "none"}}
					data-testid="username"
				/>
				<input
					type="password"
					id="password"
					name="password"
					autoComplete="current-password"
					data-testid="current-password"
					style={{display: "none"}}
				/>

				<TextField
					type="password"
					id="password-new"
					name="password-new"
					autoComplete="new-password"
					autoFocus
					inputProps={{
						"data-testid": "new-password"
					}}
					label={msg("passwordNew")}
					error={messagesPerField.existsError("password-new")}
					/>

				<TextField
					type="password"
                    id="password-confirm"
                    name="password-confirm"
                    autoComplete="new-password"
                    autoFocus
					inputProps={{
                        "data-testid": "password-confirm"
                    }}
                    label={msg("passwordConfirm")}
                    error={messagesPerField.existsError("password-confirm")}
                    />

				<div className={getClassName("kcFormGroupClass")}>
					{isAppInitiatedAction && (
						<FormControlLabel
							control={
								<Checkbox
									defaultChecked
									id="logout-sessions" name="logout-sessions"
									data-testid="logout-sessions"
								/>
							}
							label={msgStr("logoutOtherSessions")}
						/>
					)}

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

				</div>
			</form>
		</Template>
	)
}
