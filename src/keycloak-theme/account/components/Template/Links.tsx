import { Box, Tab, Tabs } from "@mui/material"
import { TemplateProps } from "keycloakify/account/TemplateProps"
import { I18n } from "../../i18n"
import { KcContext } from "../../kcContext"

export const Links = (props: TemplateProps<KcContext, I18n>) => {
	const {kcContext, i18n, active} = props
	const {msg, msgStr} = i18n
	const {features, url, realm} = kcContext

	return (
		<Box sx={{flexGrow: 1, bgcolor: 'background.paper', display: 'flex',}}>
			<Tabs orientation={"vertical"}
				  value={active}
				  variant={"scrollable"}
				  component={"nav"}
				  sx={{borderRight: 1, borderColor: 'divider'}}>
				<Tab value={"account"}
					 label={msg("account")}
					 aria-label={msgStr("account")}
					 component={"a"}
					 data-testid={"account-tab"}
					 href={url.accountUrl}/>
				{features.passwordUpdateSupported && (
					<Tab value={"password"}
						 label={msg("password")}
						 aria-label={msgStr("password")}
						 component={"a"}
						 data-testid={"password-tab"}
						 href={url.passwordUrl}/>
				)}
				<Tab value={"totp"}
					 label={msg("authenticator")}
					 aria-label={msgStr("authenticator")}
					 component={"a"}
					 data-testid={"totp-tab"}
					 href={url.totpUrl}/>
				{features.identityFederation && (
					<Tab value={"social"}
						 label={msg("federatedIdentity")}
						 aria-label={msgStr("federatedIdentity")}
						 component={"a"}
						 data-testid={"social-tab"}
						 href={url.socialUrl}/>
				)}
				<Tab value={"sessions"}
					 label={msg("sessions")}
					 aria-label={msgStr("sessions")}
					 component={"a"}
					 data-testid={"sessions-tab"}
					 href={url.sessionsUrl}/>
				<Tab value={"applications"}
					 label={msg("applications")}
					 aria-label={msgStr("applications")}
					 component={"a"}
					 data-testid={"applications-tab"}
					 href={url.applicationsUrl}/>
				{features.log && (
					<Tab value={"log"}
						 label={msg("log")}
						 aria-label={msgStr("log")}
						 component={"a"}
						 data-testid={"log-tab"}
						 href={url.logUrl}/>
				)}
				{realm.userManagedAccessAllowed && features.authorization && (
					<Tab value={"authorization"}
						 label={msg("myResources")}
						 aria-label={msgStr("myResources")}
						 component={"a"}
						 data-testid={"authorization-tab"}
						 href={url.resourceUrl}/>
				)}
			</Tabs>
			<Box p={2}>
				{props.children}
			</Box>
		</Box>
	)
}