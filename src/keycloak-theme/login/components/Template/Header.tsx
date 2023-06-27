import { Typography } from "@mui/material"
import { clsx } from "keycloakify/tools/clsx"
import { Internalization } from "./Internalization"
import { CommonProps } from "./types"

export const Header = ({templateProps: props, getClassName}: CommonProps) => {
	const {
		displayRequiredFields,
		i18n: {
			msg
		},
		kcContext: {
			auth,
			url
		},
		headerNode,
		showUsernameNode,
	} = props

	// todo display required fields
	const displayRequiredFieldsElement = displayRequiredFields ? (
		<div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
		</div>
	) : null

	const attemptedUsernameElement = (
		<div className={getClassName("kcFormGroupClass")}>
			<div id="kc-username">
				<label id="kc-attempted-username">{auth?.attemptedUsername}</label>
				<a id="reset-login" href={url.loginRestartFlowUrl}>
					<div className="kc-login-tooltip">
						<i className={getClassName("kcResetFlowIcon")}></i>
						<span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
					</div>
				</a>
			</div>
		</div>
	)

	const headerElement = auth !== undefined && auth.showUsername && !auth.showResetCredentials ? <>
			{showUsernameNode}
			{attemptedUsernameElement}
		</>
		: <>
			<Typography textAlign="center" variant={"h2"} id={"kc-page-title"}>{headerNode}</Typography>
		</>

	return <header className={getClassName("kcFormHeaderClass")}>
		<Internalization templateProps={props} getClassName={getClassName}/>
		{displayRequiredFieldsElement}
		{headerElement}
	</header>
}