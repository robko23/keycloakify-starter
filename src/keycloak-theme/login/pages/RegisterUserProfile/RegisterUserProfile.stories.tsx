import { ComponentStory, Meta } from "@storybook/react"
import flatten, { unflatten } from "flat"
import { merge } from "lodash"
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "register-user-profile.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "register/RegisterUserProfile",
	args: flatten({
		kcContext: {
			recaptchaRequired: true,
			passwordRequired: true,
			realm: {
				registrationEmailAsUsername: false,
			}
		}
	}),
}

export default meta
export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}

export const GroupedUserAttributes: ComponentStory<typeof PageStory> = flattenedArgs => {
	const extraProps: Parameters<typeof PageStory>[0] = {
		kcContext: {
			profile: {
				attributes: [
					{
						displayName: "Test attr",
						required: true,
						autocomplete: "off",
						name: 'test-attr',
						groupAnnotations: {},
						annotations: {},
						validators: {
							options: {
								options: ["a", "b", "c"]
							}
						},
						group: "group-one",
						groupDisplayHeader: "Group one",
						groupDisplayDescription: "Group one description",
					},
					{
						displayName: "Readonly attr",
						required: false,
                        autocomplete: "off",
                        name:'readonly-attr',
                        groupAnnotations: {},
                        annotations: {},
						readOnly: true,
						validators: {},
						value: "Value",
						group: "group-one",
						groupDisplayHeader: "Group one",
						groupDisplayDescription: "Group one description",
					}
				]
			}
		}
	}
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, extraProps)
	return <PageStory {...props}/>
}
