import { Card, Container } from "@mui/material"
import { useGetClassName } from "keycloakify/account/lib/useGetClassName"
import { type TemplateProps } from "keycloakify/account/TemplateProps"
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate"
import { Header } from "./components/Template/Header"
import { Links } from "./components/Template/Links"
import { Message } from "./components/Template/Message"
import type { I18n } from "./i18n"
import type { KcContext } from "./kcContext"

export default function Template(props: TemplateProps<KcContext, I18n>) {
	const {kcContext, classes, children} = props

	const {getClassName} = useGetClassName({doUseDefaultCss: false, classes})

	const {url,} = kcContext

	const {isReady} = usePrepareTemplate({
		"doFetchDefaultThemeResources": false,
		url,
		"htmlClassName": undefined,
		"bodyClassName": getClassName("kcBodyClass")
	})

	if ( !isReady ) {
		return null
	}

	return (
		<Container maxWidth="lg">
			<Card sx={{p: 3}}>
				<Header {...props} children={children}/>

				<Links {...props} children={children}/>

				<Message {...props} children={children}/>
			</Card>

		</Container>
	)
}
