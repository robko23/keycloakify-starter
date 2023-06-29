// ejected using 'npx eject-keycloak-page'
import { Button, TextField } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey} = kcContext

	const {msg, msgStr} = i18n

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("registerTitle")}>
			<form id="kc-register-form" action={url.registrationAction}
				  data-testid="kc-register-form"
				  method="post">

				<TextField
					label={msg("firstName")}
					type="text"
					id="firstName"
					fullWidth
					variant={"outlined"}
					name="firstName"
					defaultValue={register.formData.firstName ?? ""}
					error={messagesPerField.existsError("firstName")}
					data-testid="kc-firstName"
				/>

				<TextField
					label={msg("lastName")}
					type="text"
					id="lastName"
					fullWidth
					variant={"outlined"}
					name="lastName"
					defaultValue={register.formData.lastName ?? ""}
					error={messagesPerField.existsError("lastName")}
					data-testid="kc-lastName"
				/>

				<TextField
					label={msg("email")}
					type="email"
					id="email"
					fullWidth
					variant={"outlined"}
					name="email"
					defaultValue={register.formData.email ?? ""}
					error={messagesPerField.existsError("email")}
					data-testid="kc-email"
				/>


				{!realm.registrationEmailAsUsername && (
					<TextField
						label={msg("username")}
						fullWidth
						type="text"
						id="usernam"
						variant={"outlined"}
						name="username"
						autoComplete={"username"}
						defaultValue={register.formData.lastName ?? ""}
						error={messagesPerField.existsError("username")}
						data-testid="kc-username"
					/>
				)}

				{passwordRequired && (
					<>

						<TextField
							type="password"
							fullWidth
							id={"password"}
							name={"password"}
							autoComplete={"new-password"}
							label={msg("password")}
							variant={"outlined"}
							error={messagesPerField.existsError("password")}
							data-testid="kc-password"
						/>

						<TextField
							type="password"
							fullWidth
							id={"password-confirm"}
							name={"password-confirm"}
							autoComplete={"new-password"}
							label={msg("passwordConfirm")}
							variant={"outlined"}
							error={messagesPerField.existsError("password-confirm")}
							data-testid="kc-password-confirm"
						/>
					</>
				)}
				{recaptchaRequired && (
					<div className="form-group">
						<div className={getClassName("kcInputWrapperClass")}>
							<div
								className="g-recaptcha"
								data-size="compact"
								data-sitekey={recaptchaSiteKey}
								data-testid="google-recaptcha"
							></div>
						</div>
					</div>
				)}
				<div id="kc-form-options">
					<Button
						variant="outlined"
						color="secondary"
						component="a"
						href={url.loginUrl}
						data-testid="kc-login-button"
					>
						{msg("backToLogin")}
					</Button>
				</div>

				<div id="kc-form-buttons">
					<Button
						type="submit"
						variant="contained"
						id="kc-register"
						data-testid="kc-register-button"
					>
						{msgStr("doRegister")}
					</Button>
				</div>
			</form>
		</Template>
	)
}
