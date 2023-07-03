import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { merge } from "lodash"
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login-config-totp.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginConfigTotp",
	args: flatten({
		kcContext: {
			mode: "qr",
			isAppInitiatedAction: false
		}
	}),
	argTypes: {
		'kcContext.mode': {
			control: {
				type: "select",
				options: [ 'qr', 'manual' ]
			}
		},
	}
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args} />
}

