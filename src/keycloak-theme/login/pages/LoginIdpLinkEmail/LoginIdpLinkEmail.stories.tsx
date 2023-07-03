import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from "flat"
import { merge } from "lodash"
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login-idp-link-email.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginIdpLinkEmail",
	args: flatten({
		kcContext: {
			brokerContext: {
				username: "example username"
			}
		}
	})
}

export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			idpAlias: "Google"
		}
	})
	return <PageStory {...props}/>
}
