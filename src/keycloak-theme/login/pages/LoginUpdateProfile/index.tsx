import { Button, TextField } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginUpdateProfile(props: PageProps<Extract<KcContext, {
	pageId: "login-update-profile.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {msg, msgStr} = i18n

	const {url, user, messagesPerField, isAppInitiatedAction} = kcContext

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginProfileTitle")}>
			<form
				id="kc-update-profile-form"
				className={getClassName("kcFormClass")}
				action={url.loginAction}
				method="post"
				data-testid="kc-update-profile-form"
			>
				{user.editUsernameAllowed && (
					<TextField
						type="text"
						id="username"
						name="username"
						data-testid="username"
						defaultValue={user.username ?? ""}
						label={msgStr("username")}
						error={messagesPerField.existsError("username")}
					/>
				)}

				<TextField
					type="text"
					id="email"
					name="email"
					data-testid="email"
					defaultValue={user.email ?? ""}
					label={msgStr("email")}
					error={messagesPerField.existsError("email")}
				/>

				<TextField
					type="text"
					id="firstName"
					name="firstName"
					data-testid="firstName"
					defaultValue={user.firstName ?? ""}
					label={msgStr("firstName")}
					error={messagesPerField.existsError("firstName")}
				/>

				<TextField
					type="text"
					id="lastName"
					name="lastName"
					data-testid="lastName"
					defaultValue={user.lastName ?? ""}
					label={msgStr("lastName")}
					error={messagesPerField.existsError("lastName")}
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
		</Template>
	)
}
