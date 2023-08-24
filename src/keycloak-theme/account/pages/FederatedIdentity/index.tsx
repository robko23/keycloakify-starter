import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import React from "react"
import { mapProviderToIcon } from "../../../../mapProviderToIcon"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

type Props = PageProps<Extract<KcContext, { pageId: "federatedIdentity.ftl" }>, I18n>

function FederatedIdentityAction(props: {
	identity: Props["kcContext"]["federatedIdentity"]["identities"][0],
	removeLinkPossible: boolean,
	stateChecker: string,
	msgStr: Props["i18n"]["msgStr"],
	formUrl: string
}) {
	if ( props.identity.connected && props.removeLinkPossible ) {
		return <form action={props.formUrl}
					 method="post"
					 data-testid={`form-${props.identity.providerId}-remove`}>
			<input type="hidden"
				   name="stateChecker"
				   value={props.stateChecker}/>
			<input type="hidden"
				   name="action"
				   value="remove"/>
			<input type="hidden"
				   id="providerId"
				   name="providerId"
				   value={props.identity.providerId}/>
			<Tooltip title={`${props.msgStr("disconnect")} ${props.identity.displayName}`}
					 describeChild>
				<IconButton id={`remove-link-${props.identity.providerId}`}
							type="submit">
					<DeleteIcon/>
				</IconButton>
			</Tooltip>
		</form>
	} else if ( !props.identity.connected ) {
		return <form action={props.formUrl}
					 method="post"
					 data-testid={`form-${props.identity.providerId}-add`}>
			<input type="hidden"
				   name="stateChecker"
				   value={props.stateChecker}/>
			<input type="hidden"
				   name="action"
				   value="add"/>
			<input type="hidden"
				   id="providerId"
				   name="providerId"
				   value={props.identity.providerId}/>
			<Tooltip title={`${props.msgStr("connectWith")} ${props.identity.displayName}`}
					 describeChild>
				<IconButton id={`add-link-${props.identity.providerId}`}>
					<AddIcon/>
				</IconButton>
			</Tooltip>
		</form>
	}
	return null
}

export default function FederatedIdentity(props: Props) {
	const {kcContext, i18n, Template, classes} = props

	const {url, stateChecker, federatedIdentity} = kcContext
	const {msgStr} = i18n


	return (
		<Template {...{kcContext, i18n, classes}} doUseDefaultCss={false}
				  active="social">
			<Typography variant="h2">{msgStr("federatedIdentity")}</Typography>
			<List>
				{federatedIdentity.identities.map((identity) => {
					const Icon = mapProviderToIcon(identity.providerId)
					return (
						<ListItem
							key={identity.providerId}
							data-testid={`federated-identity-${identity.providerId}`}
							secondaryAction={
								<FederatedIdentityAction
									identity={identity}
									removeLinkPossible={kcContext.federatedIdentity.removeLinkPossible}
									stateChecker={stateChecker}
									formUrl={url.socialUrl}
									msgStr={msgStr}/>
							}>
							<ListItemIcon>
								<Icon/>
							</ListItemIcon>
							<ListItemText primary={identity.displayName}/>
						</ListItem>
					)
				})}
			</List>
		</Template>
	)
}
