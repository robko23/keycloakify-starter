import { Button, IconButton, Tooltip, Typography } from "@mui/material"
import { clsx } from "keycloakify/tools/clsx"
import { Internalization } from "./Internalization"
import { CommonProps } from "./types"
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export const Header = ({templateProps: props, getClassName}: CommonProps) => {
	const {
		displayRequiredFields,
		i18n: {
			msg,
			msgStr
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
		<div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")} data-testid="kc-header-display-required-fields">
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
		</div>
	) : null

	const attemptedUsernameElement = (
		<div id="kc-username">
			<Typography
				id={"kc-attempted-username"}
				data-testid="kc-attempted-username"
				textAlign="center"
				variant="h2"
			>{auth?.attemptedUsername}</Typography>
			<Tooltip
				title={msgStr("restartLoginTooltip")}
				describeChild
			>
				<IconButton
					id="reset-login"
					component="a"
					data-testid="reset-login"
					href={url.loginRestartFlowUrl}
				>
					<RestartAltIcon />
				</IconButton>
			</Tooltip>
		</div>
	)

	let headerElement: JSX.Element
	if ( auth === undefined || !auth.showUsername || auth.showResetCredentials ) {
		headerElement = <>
			<Typography textAlign="center" variant={"h2"} id={"kc-page-title"}
						data-testid={"kc-page-title"}>{headerNode}</Typography>
		</>
	} else {
		headerElement = <>
			{showUsernameNode}
			{attemptedUsernameElement}
		</>
	}

	return <header className={getClassName("kcFormHeaderClass")}>
		<Internalization templateProps={props} getClassName={getClassName}/>
		{displayRequiredFieldsElement}
		{headerElement}
	</header>
}