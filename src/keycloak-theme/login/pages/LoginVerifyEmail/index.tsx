import { Link, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, {
	pageId: "login-verify-email.ftl"
}>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {msg, msgStr} = i18n

	const {url, user} = kcContext

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} displayMessage={false}
				  headerNode={<span data-testid="verify-email-header">{msgStr("emailVerifyTitle")}</span>}
		>
			<Typography variant="subtitle1">
				{msg("emailVerifyInstruction1", user?.email ?? "")}
			</Typography>
			<br/>
			<Typography variant={"subtitle1"}>
				{msg("emailVerifyInstruction2")}
				<br/>
				<Link href={url.loginAction} underline={"hover"}>
					{msg("doClickHere")}
				</Link>
				&nbsp;
				{msg("emailVerifyInstruction3")}
			</Typography>
		</Template>
	)
}
