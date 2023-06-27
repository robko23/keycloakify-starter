import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useId } from "react"
import { CommonProps } from "./types"

export const Internalization = ({templateProps: props}: CommonProps) => {
	const {locale} = props.kcContext
	const {labelBySupportedLanguageTag, changeLocale, msg} = props.i18n
	const id = useId()
	const enabled = props.kcContext.realm.internationalizationEnabled &&
		locale !== undefined &&
		locale.supported.length > 1

	const onLanguageChange = (e: SelectChangeEvent) => {
		const langTag = e.target.value
		changeLocale(langTag)
	}

	if ( !enabled ) {
		return null
	}

	return (
		<FormControl fullWidth id={"kc-locale"}>
			<InputLabel id={id}>{msg("language")}</InputLabel>
			<Select
				id={"kc-locale-dropdown"}
				value={locale.currentLanguageTag}
				onChange={onLanguageChange}
			>
				{locale.supported.map(({languageTag}) => (
					<MenuItem
						key={languageTag}
						id={languageTag === locale.currentLanguageTag ? "kc-current-locale-link" : undefined}
						value={languageTag}>
						{labelBySupportedLanguageTag[languageTag]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}