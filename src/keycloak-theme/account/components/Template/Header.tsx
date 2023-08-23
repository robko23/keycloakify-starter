import { Button } from "@mui/material"
import { TemplateProps } from "keycloakify/account/TemplateProps"
import { I18n } from "../../i18n"
import { KcContext } from "../../kcContext"
import { Internalization } from "./Internalization"

export const Header = (props: TemplateProps<KcContext, I18n>) => {
	const {
		i18n: {
			msg,
		},
		kcContext: {
			referrer,
			url
		}
	} = props

	return (
		<header data-testid="kc-header">
			<Internalization {...props} children={props.children}/>
			<nav data-testid="kc-navigation"
				 role="navigation">
				{referrer?.url && (
					<Button component={'a'}
							href={referrer.url}
							variant="contained"
							data-testid={"kc-referrer"}>
						{msg("backTo", referrer.name)}
					</Button>
				)}
				<Button component={'a'}
						href={url.getLogoutUrl()}
						data-testid={"kc-logout"}
						variant="contained">
					{msg("doSignOut")}
				</Button>
			</nav>
		</header>
	)
}