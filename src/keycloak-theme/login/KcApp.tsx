import { CssBaseline, ThemeProvider } from "@mui/material"
import Fallback, { type PageProps } from "keycloakify/login"
import React, { lazy, Suspense } from "react"
import { useI18n } from "./i18n"
import "./KcApp.css"
import type { KcContext } from "./kcContext"
import { theme } from "./theme"

const Template = lazy(() => import("./Template"))
const TemplateMui = lazy(() => import("./TemplateMui"))

// You can uncomment this to see the values passed by the main app before redirecting.  
//import { foo, bar } from "./valuesTransferredOverUrl";
//console.log(`Values passed by the main app in the URL parameter:`, { foo, bar });

const Login = lazy(() => import("./pages/Login"))
const LoginUsername = lazy(() => import("./pages/LoginUsername"))
const LoginPassword = lazy(() => import("./pages/LoginPassword"))
const WebauthAuthenticate = lazy(() => import("./pages/WebauthnAuthenticate"))
const Info = lazy(() => import("./pages/Info"))
const Error = lazy(() => import("./pages/Error"))
const LoginResetPassword = lazy(() => import("./pages/LoginResetPassword"))
const LoginVerifyEmail = lazy(() => import("./pages/LoginVerifyEmail"))
const LoginOtp = lazy(() => import("./pages/LoginOtp"))
const LoginUpdateProfile = lazy(() => import("./pages/LoginUpdateProfile"))
const LoginUpdatePassword = lazy(() => import("./pages/LoginUpdatePassword"))
const LoginIdpLinkConfirm = lazy(() => import("./pages/LoginIdpLinkConfirm"))
// If you can, favor register-user-profile.ftl over register.ftl, see:
// https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register"))
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile"))
const Terms = lazy(() => import("./pages/Terms"))

// This is like adding classes to theme.properties 
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const classes: PageProps<any, any>["classes"] = {
	// NOTE: The classes are defined in ./KcApp.css
}

export default function KcApp(props: { kcContext: KcContext; }) {

	const {kcContext} = props

	const i18n = useI18n({kcContext})

	if ( i18n === null ) {
		//NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
		//We could display a loading progress but it's usually a matter of milliseconds.
		return null
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Suspense>
				{(() => {
					switch ( kcContext.pageId ) {
						case "login.ftl":
							return <Login {...{kcContext, i18n, classes}} Template={TemplateMui}
										  doUseDefaultCss={true}/>
						case "login-username.ftl":
							return <LoginUsername {...{kcContext, i18n, classes}} Template={TemplateMui}
												  doUseDefaultCss={true}/>
						case "login-password.ftl":
							return <LoginPassword {...{kcContext, i18n, classes}} Template={TemplateMui}
												  doUseDefaultCss={true}/>
						case "webauthn-authenticate.ftl":
							return <WebauthAuthenticate {...{kcContext, i18n, classes}} Template={TemplateMui}
														doUseDefaultCss={true}/>
						case "register.ftl":
							return <Register {...{kcContext, i18n, classes}} doUseDefaultCss={true}
											 Template={TemplateMui}/>
						case "register-user-profile.ftl":
							return <RegisterUserProfile {...{kcContext, i18n, classes}}
														doUseDefaultCss={true} Template={TemplateMui}/>
						case "info.ftl":
							return <Info {...{kcContext, i18n, classes}} doUseDefaultCss={false}
										 Template={TemplateMui}/>
						case "error.ftl":
							return <Error {...{kcContext, i18n, classes}} doUseDefaultCss={false}
										  Template={TemplateMui}/>
						case "login-reset-password.ftl":
							return <LoginResetPassword {...{kcContext, i18n, classes}}
													   doUseDefaultCss={true} Template={TemplateMui}/>
						case "login-verify-email.ftl":
							return <LoginVerifyEmail {...{kcContext, i18n, classes}}
                                                       doUseDefaultCss={true} Template={TemplateMui}/>
						case "login-otp.ftl":
							return <LoginOtp {...{kcContext, i18n, classes}}
                                                       doUseDefaultCss={true} Template={TemplateMui}/>
						case "login-update-profile.ftl":
							return <LoginUpdateProfile {...{kcContext, i18n, classes}}
                                                       doUseDefaultCss={true} Template={TemplateMui}/>
						case "login-update-password.ftl":
							return <LoginUpdatePassword {...{kcContext, i18n, classes}}
                                                       doUseDefaultCss={true} Template={TemplateMui}/>
						case "login-idp-link-confirm.ftl":
							return <LoginIdpLinkConfirm {...{kcContext, i18n, classes}}
                                                       doUseDefaultCss={true} Template={TemplateMui}/>
						case "terms.ftl":
							return <Terms {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>
						default:
							return <Fallback {...{kcContext, i18n, classes}} Template={Template}
											 doUseDefaultCss={true}/>
					}
				})()}
			</Suspense>
		</ThemeProvider>
	)

}
