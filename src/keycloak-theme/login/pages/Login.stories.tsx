import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { merge } from 'lodash'
import { createPageStory } from "../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/Login",
	args: flatten({
		kcContext: {
			realm: {
				rememberMe: true,
				password: true,
				registrationAllowed: true,
				resetPasswordAllowed: true,
				internationalizationEnabled: true
			},
			login: {
				username: "test@example.com"
			},
			usernameEditDisabled: false,
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

export const WithSocialLogin: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props: any = merge(args, {
		kcContext: {
			social: {
				displayInfo: true, providers: [
					{loginUrl: 'google', alias: 'google', providerId: 'google', displayName: 'Google'},
					{loginUrl: 'microsoft', alias: 'microsoft', providerId: 'microsoft', displayName: 'Microsoft'},
					{loginUrl: 'github', alias: 'github', providerId: 'github', displayName: 'Github'},
				]
			}
		}
	})
	return <PageStory {...props}/>
}

