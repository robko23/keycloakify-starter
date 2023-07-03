import { Button, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {url, client, logoutConfirm} = kcContext

	const {msg, msgStr} = i18n

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} displayMessage={false}
				  headerNode={msg("logoutConfirmTitle")}>
			<Typography variant="subtitle1">{msg("logoutConfirmHeader")}</Typography>

			<form
				className="form-actions"
				action={url.logoutConfirmAction}
				method="POST"
				data-testid="kc-logout-confirm-form">

				<input
					type="hidden"
					name="session_code"
					value={logoutConfirm.code}
					data-testid="session-code"
				/>

				<Button
					variant="contained"
					color="primary"
					name="confirmLogout"
					id="kc-logout"
					type="submit"
					data-testid="kc-logout"
					tabIndex={4}
				>
					{msgStr("doLogout")}
				</Button>

			</form>

			{!logoutConfirm.skipLink && client.baseUrl && (
				<p>
					<Button
						component="a"
						href={client.baseUrl}
						data-testid="kc-logout-link"
					>
						<span
							dangerouslySetInnerHTML={{
								__html:msgStr("backToApplication")
							}}
						/>
					</Button>
				</p>
			)}
		</Template>
	)
}
