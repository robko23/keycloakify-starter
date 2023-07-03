import { Button } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import { UserAttributes } from "../../components/Register/UserAttributes"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function UpdateUserProfile(props: PageProps<Extract<KcContext, {
	pageId: "update-user-profile.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {msg, msgStr} = i18n

	const {url, isAppInitiatedAction} = kcContext

	const [ isFomSubmittable, setIsFomSubmittable ] = useState(false)

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginProfileTitle")}>
			<form
				id="kc-update-profile-form"
				action={url.loginAction}
				method="post"
				data-testid="kc-update-profile-form"
			>
				<UserAttributes
					kcContext={kcContext}
					i18n={i18n}
					onIsFormSubmittableValueChange={setIsFomSubmittable}
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
