import { Card, Container } from "@mui/material"
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate"
import { useGetClassName } from "keycloakify/login/lib/useGetClassName"
import { TemplateProps } from "keycloakify/login/TemplateProps"
import { Content } from "./components/Template/Content"
import { Header } from "./components/Template/Header"
import { RealmName } from "./components/Template/RealmName"
import { I18n } from "./i18n"
import { KcContext } from "./kcContext"

export default function TemplateMui(props: TemplateProps<KcContext, I18n>) {
	const {
		kcContext: {
			url,
		},
		classes
	} = props

	const {getClassName} = useGetClassName({doUseDefaultCss: false, classes})

	const {isReady} = usePrepareTemplate({
		bodyClassName: undefined,
		htmlClassName: getClassName("kcHtmlClass"),
		url,
		doFetchDefaultThemeResources: false,
	})

	if ( !isReady ) {
		return null
	}

	return (
		<Container maxWidth={"lg"} className={getClassName("kcLoginClass")}>
			<Card sx={{p: 3}}>
				<RealmName templateProps={props} getClassName={getClassName}/>
				<Header templateProps={props} getClassName={getClassName}/>
				<Content templateProps={props} getClassName={getClassName}/>
			</Card>
		</Container>
	)
}