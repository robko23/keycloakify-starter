import { Alert } from "@mui/material"
import { TemplateProps } from "keycloakify/account/TemplateProps"
import { I18n } from "../../i18n"
import { KcContext } from "../../kcContext"

export const Message = (props: TemplateProps<KcContext, I18n>) => {
	const {
		kcContext: {
			message,
		}
	} = props

	if ( message === undefined ) {
		return null
	}

	return <Alert severity={message.type}
				  data-testid={`kc-header-message-${message.type}`}>
		<span
			dangerouslySetInnerHTML={{
				__html: message.summary
			}}
		/>
	</Alert>
}