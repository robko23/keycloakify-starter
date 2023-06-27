import { Button, IconButton, Tooltip, Typography } from "@mui/material"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import { clsx } from "keycloakify/tools/clsx"
import { useConstCallback } from "keycloakify/tools/useConstCallback"
import { type FormEventHandler, useMemo, useState } from "react"
import type { I18n } from "../i18n"
import type { KcContext } from "../kcContext"

import {IconBrandGoogle, IconBrandWindows, IconBrandGithub, IconFileUnknown} from '@tabler/icons-react'

function mapProviderToIcon(provider: string) {
	switch (provider) {
        case "google":
            return IconBrandGoogle
		case "microsoft":
			return IconBrandWindows
		case "github":
			return IconBrandGithub
    }
	return IconFileUnknown
}

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

	const infoNode = useMemo(() => {
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
					href={url.registrationUrl}
				>{msg("doRegister")}</Button>
			</div>
		)
	}, [ realm.password, realm.registrationAllowed, registrationDisabled, url.registrationUrl ])

	const socialProvidersNode = useMemo(() => {
		if (!realm.password || social.providers === undefined || social.providers.length === 0) {
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
						<Icon stroke={2.3} />
					</IconButton>
				</Tooltip>
            )
		})

		return (
			<div id="kc-social-providers">
				{nodes}
			</div>
		)
	}, [realm.password, social.providers])

	return (
		<Template
			{...{kcContext, i18n, doUseDefaultCss, classes}}
			displayInfo={social.displayInfo}
			displayWide={realm.password && social.providers !== undefined}
			headerNode={msg("doLogIn")}
			infoNode={infoNode}
		>
			<div id="kc-form" className={clsx(
				realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
				{realm.password && (
					<form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
						<div className={getClassName("kcFormGroupClass")}>
							{(() => {
								const label = !realm.loginWithEmailAllowed
									? "username"
									: realm.registrationEmailAsUsername
										? "email"
										: "usernameOrEmail"

								const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label

								return (
									<>
										<label htmlFor={autoCompleteHelper}
											   className={getClassName("kcLabelClass")}>
											{msg(label)}
										</label>
										<input
											tabIndex={1}
											id={autoCompleteHelper}
											className={getClassName("kcInputClass")}
											//NOTE: This is used by Google Chrome auto fill so we use it to tell
											//the browser how to pre fill the form but before submit we put it back
											//to username because it is what keycloak expects.
											name={autoCompleteHelper}
											defaultValue={login.username ?? ""}
											type="text"
											{...(usernameEditDisabled
												? {"disabled": true}
												: {
													"autoFocus": true,
													"autoComplete": "off"
												})}
										/>
									</>
								)
							})()}
						</div>
						<div className={getClassName("kcFormGroupClass")}>
							<label htmlFor="password" className={getClassName("kcLabelClass")}>
								{msg("password")}
							</label>
							<input
								tabIndex={2}
								id="password"
								className={getClassName("kcInputClass")}
								name="password"
								type="password"
								autoComplete="off"
							/>
						</div>
						<div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>
							<div id="kc-form-options">
								{realm.rememberMe && !usernameEditDisabled && (
									<div className="checkbox">
										<label>
											<input
												tabIndex={3}
												id="rememberMe"
												name="rememberMe"
												type="checkbox"
												{...(login.rememberMe === "on"
													? {
														"checked": true
													}
													: {})}
											/>
											{msg("rememberMe")}
										</label>
									</div>
								)}
							</div>
							<div className={getClassName("kcFormOptionsWrapperClass")}>
								{realm.resetPasswordAllowed && (
									<span>
                                            <a tabIndex={5} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
								)}
							</div>
						</div>
						<div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
							<input
								type="hidden"
								id="id-hidden-input"
								name="credentialId"
								{...(auth?.selectedCredential !== undefined
									? {
										"value": auth.selectedCredential
									}
									: {})}
							/>
							<input
								tabIndex={4}
								className={clsx(
									getClassName("kcButtonClass"),
									getClassName("kcButtonPrimaryClass"),
									getClassName("kcButtonBlockClass"),
									getClassName("kcButtonLargeClass")
								)}
								name="login"
								id="kc-login"
								type="submit"
								value={msgStr("doLogIn")}
								disabled={isLoginButtonDisabled}
							/>
						</div>
					</form>
				)}
				{socialProvidersNode}
			</div>
		</Template>
	)
}
