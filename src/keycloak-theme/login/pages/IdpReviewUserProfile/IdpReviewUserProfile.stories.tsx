import { ComponentStory, Meta } from '@storybook/react'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "idp-review-user-profile.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/IdpReviewUserProfile",
}
export default meta

export const Default: ComponentStory<typeof PageStory> = () => {
	return <PageStory />
}

export const GroupedUserAttributes: ComponentStory<typeof PageStory> = () => {
	const props: Parameters<typeof PageStory>[0] = {
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
								options: [ "a", "b", "c" ]
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
						name: 'readonly-attr',
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
	return <PageStory {...props}/>
}
