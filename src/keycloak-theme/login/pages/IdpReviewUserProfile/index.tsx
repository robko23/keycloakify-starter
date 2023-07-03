import { Button } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import { UserAttributes } from "../../components/Register/UserAttributes"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function IdpReviewUserProfile(props: PageProps<Extract<KcContext, {
	pageId: "idp-review-user-profile.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {msg, msgStr} = i18n

	const {url} = kcContext

	const [ isFomSubmittable, setIsFomSubmittable ] = useState(false)

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginIdpReviewProfileTitle")}>
			<form
				id="kc-idp-review-profile-form"
				action={url.loginAction}
				method="post"
				data-testid="kc-idp-review-profile-form"
			>
				<UserAttributes
					kcContext={kcContext}
					onIsFormSubmittableValueChange={setIsFomSubmittable}
					i18n={i18n}
				/>

				<Button
					variant="contained"
					color="primary"
					type={"submit"}
					data-testid="kc-submit-button"
					disabled={!isFomSubmittable}
				>
					{msgStr("doSubmit")}
				</Button>

			</form>
		</Template>
	)
}
