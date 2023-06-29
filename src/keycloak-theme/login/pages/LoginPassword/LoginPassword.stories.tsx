import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login-password.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginPassword",
	args: flatten({
		kcContext: {
			realm: {
				internationalizationEnabled: true,
				resetPasswordAllowed: true,
			},
			login: {
				password: "super-secret-password",
			},
			message: {
				type: "info",
				summary: "test message"
			},
		}
	}),
	argTypes: {
		'kcContext.message.type': {
			control: {
				type: "select",
				options: [ "info", "error", "success", "warning" ]
			}
		},
	}
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}
