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
import { clsx } from "keycloakify/tools/clsx"
import { useConstCallback } from "keycloakify/tools/useConstCallback"
import type { FormEventHandler } from "react"
import { useMemo, useState } from "react"
import { mapProviderToIcon } from "../components/Login/mapProviderToIcon"
import type { I18n } from "../i18n"
import type { KcContext } from "../kcContext"

export default function LoginUsername(props: PageProps<Extract<KcContext, { pageId: "login-username.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {getClassName} = useGetClassName({
		doUseDefaultCss,
		classes
	})

	const {social, realm, url, usernameHidden, login, registrationDisabled} = kcContext

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
				<Tooltip title={provider.displayName} describeChild>
					<IconButton
						key={provider.providerId}
						component={"a"}
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

	const rememberMeNode = useMemo(() => {
		if ( !realm.rememberMe || usernameHidden ) {
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
				/>
			</FormGroup>
		)
	}, [realm.rememberMe, login.rememberMe, usernameHidden])

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
			<div id="kc-form" className={clsx(
				realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
				<div
					id="kc-form-wrapper"
					className={clsx(
						realm.password &&
						social.providers && [ getClassName("kcFormSocialAccountContentClass"), getClassName(
							"kcFormSocialAccountClass") ]
					)}
				>
					{realm.password && (
						<form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
							{!usernameHidden && (
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
									autoFocus
									autoComplete={"off"}
									label={msg(usernameLabel)}
									fullWidth
								/>
							)}
							<div id="kc-form-options">
								{rememberMeNode}
							</div>
							<div id="kc-form-buttons">
								<Button
									type="submit"
									name="login"
									variant="contained"
									disabled={isLoginButtonDisabled}
									tabIndex={4}
									id="kc-login"
								>
									{msgStr("doLogIn")}
								</Button>
							</div>
						</form>
					)}
				</div>
				{socialProvidersNode}
			</div>
		</Template>
	)
}
