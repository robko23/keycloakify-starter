import { Typography } from "@mui/material"
import { CommonProps } from "./types"

export const RealmName = ({templateProps: props, getClassName}: CommonProps) => {
	const msg = props.i18n.msg
	const displayNameHtml = props.kcContext.realm.displayNameHtml

	return <>
		<Typography textAlign={"center"} variant={"h1"} id={"kc-header"} className={getClassName("kcHeaderClass")}>
			{msg("loginTitleHtml", displayNameHtml)}
		</Typography>
	</>
}