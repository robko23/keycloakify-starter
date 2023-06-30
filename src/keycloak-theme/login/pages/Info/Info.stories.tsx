import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { merge } from 'lodash'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "info.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "info/Info",
	args: flatten({
		kcContext: {
			message: {
				summary: "test message"
			},
			messageHeader: "Test message header",
			actionUri: "https://action.com",
		}
	}),
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
	})
	return <PageStory {...props}/>
}

export const WithRequiredAction: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			requiredActions: [ "terms_and_conditions" ],
		}
	})
	return <PageStory {...props}/>
}


export const WithRequiredActions: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			requiredActions: [ "terms_and_conditions", "VERIFY_EMAIL", "CONFIGURE_TOTP" ],
		}
	})
	return <PageStory {...props}/>
}

export const WithPageRedirectUri: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
            pageRedirectUri: "https://example.com",
			skipLink: false,
        }
	})
	return <PageStory {...props}/>
}
