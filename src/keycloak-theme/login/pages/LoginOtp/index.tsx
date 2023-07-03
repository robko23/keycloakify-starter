import { Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useState } from "react"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {otpLogin, url} = kcContext

	const {msgStr} = i18n

	const [ selectedOtpId, setSelectedOtpId ] = useState<string>(otpLogin.userOtpCredentials[0]?.id)

	let toggleButtons: JSX.Element
	if ( otpLogin.userOtpCredentials.length > 1 ) {
		toggleButtons = (
			<ToggleButtonGroup
				color={"primary"}
				exclusive
				value={selectedOtpId}
				onChange={(_, newValue) => setSelectedOtpId(newValue)}
			>
				{otpLogin.userOtpCredentials.map(({userLabel, id}) => (
					<ToggleButton
						value={id}
						data-testid={`user-otp-button-${id}`}
						key={id}>
						{userLabel}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		)
	} else {
		toggleButtons = <></>
	}

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}}
				  headerNode={<span data-testid="do-login-header">{msgStr("doLogIn")}</span>}
		>
			<form id="kc-otp-login-form" action={url.loginAction} method="post" data-testid="kc-otp-login-form">
				<input type="hidden" value={selectedOtpId} name="selectedCredentialId" data-testid="selectedCredentialId"/>
				{toggleButtons}

				<TextField
					variant={"outlined"}
					name="otp"
					id="otp"
					autoComplete="off"
					type="text"
					autoFocus
					label={msgStr("loginOtpOneTime")}
					data-testid="otp"
				/>

				<Button
					variant={"contained"}
					name="login"
					id="kc-login"
					type="submit"
					data-testid="kc-login"
				>
					{msgStr("doLogIn")}
				</Button>

			</form>
		</Template>
	)
}
