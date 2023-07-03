import { Button, TextField } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginResetPassword(props: PageProps<Extract<KcContext, {
	pageId: "login-reset-password.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {url, realm, auth} = kcContext

	const {msg, msgStr} = i18n

    let usernameLabel: "email" | "usernameOrEmail" | "username"
    if ( realm.loginWithEmailAllowed ) {
        if ( realm.registrationEmailAsUsername ) {
            usernameLabel ="email"
        } else {
            usernameLabel = "usernameOrEmail"
        }
    } else {
        usernameLabel = "username"
    }

    return (
		<Template
			{...{kcContext, i18n, doUseDefaultCss, classes}}
			displayMessage={false}
			headerNode={<span data-testid="kc-email-forgot-title">{msg("emailForgotTitle")}</span>}
			infoNode={<span data-testid="kc-email-instruction">{msgStr("emailInstruction")}</span>}
			displayInfo
		>
			<form id="kc-reset-password-form" action={url.loginAction}
				  method="post" data-testid="kc-reset-password-form">
				<TextField
					type="text"
					id="username"
					name="username"
					data-testid={usernameLabel}
					autoFocus
					defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
					label={msgStr(usernameLabel)}
				/>
				<Button
					variant="outlined"
					color="secondary"
					component="a"
					href={url.loginUrl}
					data-testid="kc-back-to-login-button"
					id="kc-back-to-login-button"
				>
					{msg("backToLogin")}
				</Button>

				<Button
					variant="contained"
					data-testid="kc-submit-button"
					id="kc-submit-button"
					type="submit"
				>
					{msgStr("doSubmit")}
				</Button>
			</form>
		</Template>
	)
}
