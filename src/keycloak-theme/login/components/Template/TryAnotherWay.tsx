import { Button } from "@mui/material"
import { CommonProps } from "./types"

export const TryAnotherWay = ({templateProps: props}: CommonProps) => {
	const {
		kcContext: {
			auth,
			url,
		}, showAnotherWayIfPresent,
		i18n: {msg}
	} = props

	if ( auth === undefined || !auth.showTryAnotherWayLink || !showAnotherWayIfPresent ) {
		return null
	}

	return <form id="kc-select-try-another-way-form" action={url.loginAction} method={"post"}>
		<input type="hidden" name="tryAnotherWay" value="on"/>
		<Button type="submit" variant="contained" id="try-another-way">
			{msg("doTryAnotherWay")}
		</Button>
	</form>
}