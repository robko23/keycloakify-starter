import { Button, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { assert } from "keycloakify/tools/assert"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {msgStr, msg} = i18n

	assert(kcContext.message !== undefined)

	const {messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client} = kcContext

	let element: JSX.Element
	if ( skipLink || pageRedirectUri === undefined ) {
		if ( actionUri !== undefined ) {
			element = <Button
				variant={"contained"}
				component={"a"}
				href={actionUri}
				data-testid={"kc-info-action-url"}
			>
				{msg("proceedWithAction")}
			</Button>
		} else {
			if ( client.baseUrl === undefined ) {
				element = <></>
			} else {
				element = <Button
					variant={"contained"}
					component={"a"}
					href={client.baseUrl}
					data-testid={"kc-info-client-url"}
				>
					{msg("backToApplication")}
				</Button>
			}
		}
	} else {
		element = <Button
			variant={"contained"}
			component={"a"}
			href={pageRedirectUri}
			data-testid={"kc-info-redirect-url"}
		>
			{msg("backToApplication")}
		</Button>
	}

	return (
		<Template
			{...{kcContext, i18n, doUseDefaultCss, classes}}
			displayMessage={false}
			headerNode={messageHeader !== undefined ? <>{messageHeader}</> : <>{message.summary}</>}
		>
			<div id="kc-info-message">
				<Typography variant={"subtitle1"}>
					{message.summary}
					<span data-testid={"kc-info-required-actions"}>
					{requiredActions !== undefined &&
						requiredActions.map(
							requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(",")
					}
					</span>
				</Typography>
				{element}
			</div>
		</Template>
	)
}
