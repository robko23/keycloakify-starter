import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

function formatDateString(isoDate: string, lang: string) {
	return new Date(isoDate).toLocaleString(lang, {
		day: "numeric",
		year: "numeric",
		month: "long",
		weekday: "long",
		hour: "numeric",
		minute: "numeric",
	})
}

export default function Sessions(props: PageProps<Extract<KcContext, { pageId: "sessions.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {url, stateChecker, sessions: {sessions}} = kcContext
	const {currentLanguageTag} = i18n

	const {msgStr} = i18n

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} active="sessions">
			<Typography variant="h2">
				{msgStr("sessionsHtmlTitle")}
			</Typography>

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>{msgStr("ip")}</TableCell>
							<TableCell>{msgStr("started")}</TableCell>
							<TableCell>{msgStr("lastAccess")}</TableCell>
							<TableCell>{msgStr("expires")}</TableCell>
							<TableCell>{msgStr("clients")}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sessions.map(session => (
							<TableRow key={session.id}>
								<TableCell>
									{session.ipAddress}
								</TableCell>
								<TableCell>
									{formatDateString(session.started, currentLanguageTag)}
								</TableCell>
								<TableCell>
									{formatDateString(session.lastAccess, currentLanguageTag)}
								</TableCell>
								<TableCell>
									{formatDateString(session.expires, currentLanguageTag)}
								</TableCell>
								<TableCell>
									{session.clients.join(", ")}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<form method="post" action={url.sessionsUrl} data-testid="kc-sessions-form">
				<input type="hidden" name="stateChecker" value={stateChecker} />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					>
					{msgStr("doLogOutAllSessions")}
				</Button>
			</form>

		</Template>
	)
}
