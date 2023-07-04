import { Button, Divider, Link, Typography } from "@mui/material"
import { useRerenderOnStateChange } from "evt/hooks"
import { useDownloadTerms } from "keycloakify/login"
import { evtTermMarkdown } from "keycloakify/login/lib/useDownloadTerms"
import type { PageProps } from "keycloakify/login/pages/PageProps"
import React from "react"
import ReactMarkdown from "react-markdown"
import tos_cs_url from "../../assets/tos_cs.md"
import tos_en_url from "../../assets/tos_en.md"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Terms(props: PageProps<Extract<KcContext, { pageId: "terms.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {msg, msgStr} = i18n

	// NOTE: If you aren't going to customize the layout of the page you can move this hook to
	// KcApp.tsx, see: https://docs.keycloakify.dev/terms-and-conditions
	useDownloadTerms({
		kcContext,
		"downloadTermMarkdown": async ({currentLanguageTag}) => {

			const tos_url = (() => {
				switch ( currentLanguageTag ) {
					case "cs":
						return tos_cs_url
					default:
						return tos_en_url
				}
			})()


			if ( "__STORYBOOK_ADDONS" in window ) {
				// NOTE: In storybook, when you import a .md file you get the content of the file.
				// In Create React App on the other hand you get an url to the file.
				return tos_url
			}

			return await fetch(tos_url).then(response => response.text())

		}
	})

	useRerenderOnStateChange(evtTermMarkdown)

	const {url} = kcContext

	const termMarkdown = evtTermMarkdown.state

	if ( termMarkdown === undefined ) {
		return null
	}

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} displayMessage={false}
				  headerNode={msg("termsTitle")}>
			<div id="kc-terms-text">
				<ReactMarkdown
					components={{
						p: ({node, className, children, ...props}) => {
							return <Typography {...props}>{children}</Typography>
						},
						a: ({node, className, children,...props}) => {
                            return <Link {...props}>{children}</Link>
                        },
						h1: ({node, className, children,...props}) => {
							return <Typography variant="h1" {...props}>{children}</Typography>
						},
						h2: ({node, className, children,...props}) => {
							return <Typography variant="h2" {...props}>{children}</Typography>
						},
						h3: ({node, className, children,...props}) => {
							return <Typography variant="h3" {...props}>{children}</Typography>
						},
						h4: ({node, className, children,...props}) => {
							return <Typography variant="h4" {...props}>{children}</Typography>
						},
						h5: ({node, className, children,...props}) => {
							return <Typography variant="h5" {...props}>{children}</Typography>
						},
						h6: ({node, className, children,...props}) => {
                            return <Typography variant="h6" {...props}>{children}</Typography>
                        },
						hr: ({node, className, children,...props}) => {
							return <Divider {...props} />
						},
					}}
				>
					{termMarkdown}
				</ReactMarkdown>
			</div>
			<form
				className="form-actions"
				action={url.loginAction}
				method="POST"
			>
				<Button
					variant="contained"
					color="success"
					name="accept"
					id="kc-accept"
					type="submit"
					data-testid="kc-accept-button"
				>
					{msgStr("doAccept")}
				</Button>
				<Button
					variant="outlined"
					color="error"
					name="cancel"
					id="kc-decline"
					type="submit"
					data-testid="kc-decline-button"
				>
					{msgStr("doDecline")}
				</Button>
			</form>
			<div className="clearfix"/>
		</Template>
	)
}
