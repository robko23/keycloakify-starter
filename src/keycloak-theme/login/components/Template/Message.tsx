import { Alert } from "@mui/material"
import { CommonProps } from "./types"

export const Message = ({templateProps: props, getClassName}: CommonProps) => {
	const {
		displayMessage = true,
		kcContext: {
			message,
			isAppInitiatedAction
		}
	} = props

	if ( !displayMessage || message === undefined || (message.type === "warning" && isAppInitiatedAction) ) {
		return null
	}

	return <Alert severity={message.type} data-testid={`kc-header-message-${message.type}`}>
		<span
			dangerouslySetInnerHTML={{
				__html: message.summary
			}}
		/>
	</Alert>
}