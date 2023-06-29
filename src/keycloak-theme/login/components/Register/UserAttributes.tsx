import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Attribute } from "keycloakify/login/kcContext/KcContext"
import { useFormValidation } from "keycloakify/login/lib/useFormValidation"
import { useEffect, useMemo } from "react"
import { I18n } from "../../i18n"

type GroupedAttributes = {
	group: string | undefined,
	groupAnnotations: Record<string, string> | undefined,
	groupDisplayHeader: string | undefined,
	groupDisplayDescription: string | undefined,
	attribute: Attribute[]
}
type TransformedAttributes = {
	[key: string]: GroupedAttributes
}

function transformAttributes(attributes: Attribute[]): TransformedAttributes {
	let ret: TransformedAttributes = {}

	for ( const attribute of attributes ) {
		const groupId = attribute.group ?? "none"
		if ( groupId in ret ) {
			ret[groupId].attribute.push(attribute)
		} else {
			ret[groupId] = {
				group: attribute.group,
				groupAnnotations: attribute.groupAnnotations,
				groupDisplayHeader: attribute.groupDisplayHeader,
				groupDisplayDescription: attribute.groupDisplayDescription,
				attribute: [ attribute ]
			}
		}
	}

	return ret
}

type Props = {
	kcContext: Parameters<typeof useFormValidation>[0]["kcContext"];
	i18n: I18n;
	onIsFormSubmittableValueChange: (isFormSubmittable: boolean) => void;
}

type ExtendedProps = Props & {
	formValidationDispatch: ReturnType<typeof useFormValidation>["formValidationDispatch"],
	fieldStateByName: ReturnType<typeof useFormValidation>["formValidationState"]["fieldStateByAttributeName"],
}

export function UserAttributes(props: Props) {
	const {kcContext, onIsFormSubmittableValueChange, i18n} = props

	const {
		formValidationState: {fieldStateByAttributeName, isFormSubmittable},
		formValidationDispatch,
		attributesWithPassword
	} = useFormValidation({
		kcContext,
		i18n
	})

	useEffect(() => {
		onIsFormSubmittableValueChange(isFormSubmittable)
	}, [ isFormSubmittable ])

	const transformedAttributes = useMemo(() => transformAttributes(attributesWithPassword), [ attributesWithPassword ])
	const groupedAttributes = useMemo(() =>
		Object.entries(transformedAttributes).map(([ _, group ]) => group), [ transformedAttributes ])

	return (
		<>
			{groupedAttributes.map(group =>
				<AttributeGroup {...props} attributeGroup={group}
								fieldStateByName={fieldStateByAttributeName}
								key={group.group}
								formValidationDispatch={formValidationDispatch}/>)}
		</>
	)
}

function AttributeGroup(props: ExtendedProps & { attributeGroup: GroupedAttributes }) {
	const {groupDisplayHeader, groupDisplayDescription, group, attribute} = props.attributeGroup
	return <>
		<Typography variant={"h4"} component={"label"}>{groupDisplayHeader}</Typography>
		<br/>
		{groupDisplayDescription && groupDisplayDescription !== "" &&
            <Typography variant={"caption"}
						data-testid={`group-description-${group}`}
                        component={"label"}>{groupDisplayDescription}</Typography>
		}
		{attribute.map(attribute =>
            <SingleAttribute {...props} attribute={attribute} key={attribute.name}/>)}
	</>
}

function SingleAttribute(props: ExtendedProps & { attribute: Attribute }) {
	const {validators: {options}, displayName, name, required, readOnly, autocomplete} = props.attribute
	const {value, displayableErrors} = props.fieldStateByName[name]
	const {formValidationDispatch} = props
	const {advancedMsg} = props.i18n

	function getType() {
		switch ( name ) {
			case "password-confirm":
			case "password":
				return "password"
			default:
				return "text"
		}
	}

	const errors = displayableErrors.map(e => e.errorMessage)

	if ( options === undefined ) {

		return <TextField
			type={getType()}
			id={name}
			name={name}
			value={value}
			aria-invalid={displayableErrors.length > 0}
			disabled={readOnly}
			required={required}
			autoComplete={autocomplete}
			fullWidth
			onChange={e => formValidationDispatch({
				action: "update value",
				name,
				newValue: e.target.value
			})}
			onBlur={() => formValidationDispatch({
				action: "focus lost",
				name
			})}
			error={displayableErrors.length > 0}
			helperText={errors}
			label={advancedMsg(displayName ?? "")}
			variant={"outlined"}
			inputProps={{
				'data-testid': `kc-register-attribute-${name}`
			}}
		/>
	}

	return <FormControl fullWidth required={required}>
		<InputLabel>{advancedMsg(displayName ?? "")}</InputLabel>
		<Select
			variant="outlined"
			required={required}
			value={value}
			fullWidth
			onChange={e => formValidationDispatch({
                action: "update value",
                name,
                newValue: e.target.value
            })}
			onBlur={() => formValidationDispatch({
                action: "focus lost",
                name
            })}
			error={displayableErrors.length > 0}
			inputProps={{
				'data-testid': `kc-register-attribute-${name}`
			}}
			id={name}
			name={name}
		>
			{options.options.map(option =>
                <MenuItem key={option} value={option} data-testid={`kc-register-attribute-${name}-${option}`}>
                    {option}
                </MenuItem>
            )}
		</Select>
		<FormHelperText>{errors}</FormHelperText>
	</FormControl>
}