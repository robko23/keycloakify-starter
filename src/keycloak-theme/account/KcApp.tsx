import { CssBaseline, ThemeProvider } from "@mui/material"
import type { PageProps } from "keycloakify/account"
import { lazy, Suspense } from "react"
import { theme } from "../../theme"
import { useI18n } from "./i18n"
import type { KcContext } from "./kcContext"

const Template = lazy(() => import("./Template"))
const TemplateMui = lazy(() => import("./TemplateMui"))

const Password = lazy(() => import("./pages/Password"))
const Account = lazy(() => import("./pages/Account"))
const FederatedIdentity = lazy(() => import("./pages/FederatedIdentity"))
const Totp = lazy(() => import("./pages/Totp"))

const classes: PageProps<any, any>["classes"] = {}

const AnyFallback = (props: any) => {
	console.log(props)
	return <h1>Not yet implemented</h1>
}

export default function KcApp(props: { kcContext: KcContext; }) {

	const {kcContext} = props

	const i18n = useI18n({kcContext})

	if ( i18n === null ) {
		return null
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Suspense>
				{(() => {
					switch ( kcContext.pageId ) {
						case "password.ftl":
							return <Password {...{kcContext, i18n, classes}} Template={TemplateMui}
											 doUseDefaultCss={false}/>
						case "account.ftl":
							return <Account {...{kcContext, i18n, classes}} Template={TemplateMui}
											doUseDefaultCss={false}/>
						case "federatedIdentity.ftl":
							return <FederatedIdentity {...{kcContext, i18n, classes}} Template={TemplateMui}
													  doUseDefaultCss={false}/>
						case "totp.ftl":
							return <Totp {...{kcContext, i18n, classes}} Template={TemplateMui}
										 doUseDefaultCss={false}/>
						default:
							return <AnyFallback {...{kcContext, i18n, classes}} Template={Template}
												doUseDefaultCss={false}/>
					}
				})()}
			</Suspense>
		</ThemeProvider>
	)

}
