import { Button, TextField } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function UpdateEmail(props: PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {msg, msgStr} = i18n

	const {url, messagesPerField, isAppInitiatedAction, email} = kcContext

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("updateEmailTitle")}>
			<form
				id="kc-update-email-form"
				action={url.loginAction}
				method="post"
				data-testid="kc-update-email-form"
			>

				<TextField
					type="text"
					id="email"
					name="email"
					defaultValue={email.value ?? ""}
					aria-invalid={messagesPerField.existsError("email")}
					label={msg("email")}
					error={messagesPerField.existsError("email")}
					helperText={messagesPerField.get("email")}
					data-testid="kc-email"
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
