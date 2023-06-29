import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	TextField,
	Tooltip,
	Typography
} from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { useConstCallback } from "keycloakify/tools/useConstCallback"
import { type FormEventHandler, useMemo, useState } from "react"
import { mapProviderToIcon } from "../../components/Login/mapProviderToIcon"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {social, realm, url, usernameEditDisabled, login, auth, registrationDisabled} = kcContext

	const {msg, msgStr} = i18n

	const [ isLoginButtonDisabled, setIsLoginButtonDisabled ] = useState(false)

	const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
		e.preventDefault()

		setIsLoginButtonDisabled(true)

		const formElement = e.target as HTMLFormElement

		//NOTE: Even if we login with email Keycloak expect username and password in
		//the POST request.
		formElement.querySelector("input[name='email']")?.setAttribute("name", "username")

		formElement.submit()
	})

	const registrationNode = useMemo(() => {
		if ( !realm.password || !realm.registrationAllowed || registrationDisabled ) {
			return null
		}
		return (
			<div id="kc-registration">
				<Typography>{msg("noAccount")}</Typography>
				<Button
					component={"a"}
					tabIndex={6}
					variant={"contained"}
					color={"secondary"}
					data-testid={"kc-register-button"}
					href={url.registrationUrl}
				>{msg("doRegister")}</Button>
			</div>
		)
	}, [ realm.password, realm.registrationAllowed, registrationDisabled, url.registrationUrl ])

	const socialProvidersNode = useMemo(() => {
		if ( !realm.password || social.providers === undefined || social.providers.length === 0 ) {
			return null
		}

		const nodes = social.providers.map(provider => {
			const Icon = mapProviderToIcon(provider.alias)
			return (
				<Tooltip title={provider.displayName} describeChild key={provider.providerId}>
					<IconButton
						key={provider.providerId}
						component={"a"}
						data-testid={`kc-social-provider-${provider.providerId}`}
						href={provider.loginUrl}
					>
						<Icon stroke={2.3}/>
					</IconButton>
				</Tooltip>
			)
		})

		return (
			<div id="kc-social-providers">
				{nodes}
			</div>
		)
	}, [ realm.password, social.providers ])

	const resetPasswordNode = useMemo(() => {
		if ( !realm.resetPasswordAllowed ) {
			return null
		}
		return (
			<Button
				component={"a"}
				href={url.loginResetCredentialsUrl}
				variant={"outlined"}
				color={"secondary"}
				tabIndex={5}
				data-testid={"kc-reset-password-button"}
			>
				{msg("doForgotPassword")}
			</Button>
		)
	}, [ realm.resetPasswordAllowed, url.loginResetCredentialsUrl ])

	const rememberMeNode = useMemo(() => {
		if ( !realm.rememberMe || usernameEditDisabled ) {
			return null
		}
		return (
			<FormGroup>
				<FormControlLabel
					tabIndex={3}
					id="rememberMe"
					name="rememberMe"
					control={<Checkbox
						defaultChecked={login.rememberMe === "on"}
						disabled={login.rememberMe === "on"}
					/>}
					label={msg("rememberMe")}
					data-testid={"kc-remember-me-checkbox"}
				/>
			</FormGroup>
		)
	}, [ realm.rememberMe, login.rememberMe, usernameEditDisabled ])

	const usernameLabel = !realm.loginWithEmailAllowed
		? "username"
		: realm.registrationEmailAsUsername
			? "email"
			: "usernameOrEmail"

	const usernameAutoCompleteHelper: typeof usernameLabel = usernameLabel === "usernameOrEmail" ? "username" : usernameLabel

	return (
		<Template
			{...{kcContext, i18n, doUseDefaultCss, classes}}
			displayInfo={social.displayInfo}
			displayWide={realm.password && social.providers !== undefined}
			headerNode={msg("doLogIn")}
			infoNode={registrationNode}
		>
			<div id="kc-form">
				{realm.password && (
					<form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post" data-testid="kc-form-login">
						<TextField
							tabIndex={1}
							id={usernameAutoCompleteHelper}
							//NOTE: This is used by Google Chrome auto fill so we use it to
							// tell
							//the browser how to pre fill the form but before submit we put it
							// back to username because it is what keycloak expects.
							name={usernameAutoCompleteHelper}
							defaultValue={login.username ?? ""}
							type={"text"}
							disabled={usernameEditDisabled}
							autoFocus={!usernameEditDisabled}
							autoComplete={usernameEditDisabled ? "off" : undefined}
							label={msg(usernameLabel)}
							fullWidth
							data-testid={`kc-${usernameLabel}`}
						/>
						<TextField
							id="password"
							fullWidth
							tabIndex={2}
							name="password"
							type="password"
							autoComplete="off"
							label={msg("password")}
							data-testid="kc-password"
						/>
						<div id="kc-form-options">
							{rememberMeNode}
						</div>
						{resetPasswordNode}
						<div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
							<input
								type="hidden"
								id="id-hidden-input"
								name="credentialId"
								value={auth.selectedCredential === undefined ? "" : auth.selectedCredential}
							/>
							<Button
								type="submit"
								name="login"
								variant="contained"
								disabled={isLoginButtonDisabled}
								tabIndex={4}
								id="kc-login"
								data-testid="kc-login-button"
							>
								{msgStr("doLogIn")}
							</Button>
						</div>
					</form>
				)}
				{socialProvidersNode}
			</div>
		</Template>
	)
}
