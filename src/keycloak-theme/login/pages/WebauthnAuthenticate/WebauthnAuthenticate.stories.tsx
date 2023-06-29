import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import {merge} from 'lodash'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "webauthn-authenticate.ftl"
})
const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "webauthn/Authenticate",
	args: flatten({
		kcContext: {
			message: {
				type: "info",
				summary: "test message"
			},
			shouldDisplayAuthenticators: true
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

const defaultProps: Parameters<typeof PageStory>[0] = {
	kcContext: {
		authenticators:{
			authenticators: [
				{
					createdAt: "2023-06-28T10:47:39.989801097Z",
					credentialId: "credential-id",
					label: "Test Authenticator",
					transports: {
						iconClass: "test-authenticator-icon",
						displayNameProperties: ["reauthenticate"]
					}
				}
			]
		},
	}
}

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, defaultProps)
	return <PageStory {...props}/>
}
