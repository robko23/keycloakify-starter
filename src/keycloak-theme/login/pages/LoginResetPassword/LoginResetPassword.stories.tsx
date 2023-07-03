import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { merge } from 'lodash'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login-reset-password.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginResetPassword",
	args: flatten({
		kcContext: {
			realm: {
				registrationEmailAsUsername: false,
				loginWithEmailAllowed: true
			},
			auth: {
				showUsername: false,
				attemptedUsername: "test@test.com"
			}
		}
	}),
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}
