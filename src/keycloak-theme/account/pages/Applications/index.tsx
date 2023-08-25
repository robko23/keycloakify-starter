import {
	Button,
	Link,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from "@mui/material"
import type { PageProps } from "keycloakify/account/pages/PageProps"
import type { I18n } from "../../i18n"
import type { KcContext } from "../../kcContext"

export default function Applications(props: PageProps<Extract<KcContext, { pageId: "applications.ftl" }>, I18n>) {
	const {kcContext, i18n, doUseDefaultCss, Template, classes} = props

	const {url, stateChecker, applications: {applications}} = kcContext

	const {advancedMsgStr, msgStr} = i18n

	return (
		<Template {...{kcContext, i18n, doUseDefaultCss, classes}} active="sessions">
			<Typography variant="h2">
				{msgStr("applicationsHtmlTitle")}
			</Typography>

			<form method="post"
				  action={url.applicationsUrl}
				  data-testid="kc-form-applications">
				<input type="hidden"
					   id="stateChecker"
					   name="stateChecker"
					   value={stateChecker}/>
				<input type="hidden"
					   id="referrer"
					   name="referrer"
					   value={stateChecker}/>

				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									{msgStr("application")}
								</TableCell>
								<TableCell>
									{msgStr("availableRoles")}
								</TableCell>
								<TableCell>
									{msgStr("grantedPermissions")}
								</TableCell>
								<TableCell>
									{msgStr("additionalGrants")}
								</TableCell>
								<TableCell>
									{msgStr("action")}
								</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{applications.map(application => (
								<TableRow key={application.client.clientId}>

									<TableCell>
										{application.effectiveUrl ?
											<Link href={application.effectiveUrl}>
												{advancedMsgStr(application.client.name ?? application.client.clientId)}
											</Link>
											:
											advancedMsgStr(application.client.name ?? application.client.clientId)
										}
									</TableCell>

									<TableCell>
										{application.realmRolesAvailable?.map(
											role => advancedMsgStr(role.description ?? role.name)).join(", ")}
										{Object.values(application.resourceRolesAvailable ?? {}).map(value => (
											<>
												{application.realmRolesAvailable?.length > 0 && ", "}
												{value.map((clientRole, idx, arr) => (
													<>
														{advancedMsgStr(
															clientRole.roleDescription ?? clientRole.roleName)}
														{" "}{msgStr("inResource")}{" "}
														<strong>
															{advancedMsgStr(
																clientRole.clientName ?? clientRole.clientId)}
														</strong>
														{idx !== arr.length - 1 && ", "}
													</>
												))}
											</>
										))}
									</TableCell>

									<TableCell>
										{application.client.consentRequired ?
											application.clientScopesGranted?.map(scope => advancedMsgStr(scope)).join(
												", ") :
											msgStr("fullAccess")
										}
									</TableCell>

									<TableCell>
										{application.additionalGrants?.map(grant => advancedMsgStr(grant)).join(", ")}
									</TableCell>

									<TableCell>
										{(application.client.consentRequired && (application.clientScopesGranted?.length ?? 0) > 0) || (application.additionalGrants?.length ?? 0) > 0 ?
											<Button
												name="clientId"
												value={application.client.clientId}
												type="submit"
												color="primary"
											>
												{msgStr("revoke")}
											</Button> : null
										}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</form>
		</Template>
	)
}
