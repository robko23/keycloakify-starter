// ejected using 'npx eject-keycloak-page'
import { Button } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import { UserAttributes } from "../../components/Register/UserAttributes"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function RegisterUserProfile(props: PageProps<Extract<KcContext, {
	pageId: "register-user-profile.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {url, messagesPerField, recaptchaRequired, recaptchaSiteKey} = kcContext

	const {msg} = i18n

	const [ isFormSubmittable, setIsFormSubmittable ] = useState(false)

	return (
		<Template
			{...{kcContext, i18n, doUseDefaultCss, classes}}
			displayMessage={messagesPerField.exists("global")}
			displayRequiredFields={true}
			headerNode={msg("registerTitle")}
		>
			<form id="kc-register-form" action={url.registrationAction} method="post" data-testid="kc-register-form">

				<UserAttributes
					kcContext={kcContext}
					i18n={i18n}
					onIsFormSubmittableValueChange={setIsFormSubmittable}/>

				{recaptchaRequired && (
					<div className="form-group">
						<div className={getClassName("kcInputWrapperClass")}>
							<div
								className="g-recaptcha"
								data-size="compact"
								data-sitekey={recaptchaSiteKey}
								data-testid="google-recaptcha"
							/>
						</div>
					</div>
				)}

				<div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
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
						type={"submit"}
						variant={"contained"}
						disabled={!isFormSubmittable}
						id={"kc-register"}
						data-testid="kc-register-button"
					>
						{msg("doRegister")}
					</Button>
				</div>
			</form>
		</Template>
	)
}
