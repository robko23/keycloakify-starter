import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { merge } from 'lodash'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "error.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "info/Error",
	args: flatten({
		kcContext: {
			client: {
				baseUrl: "https://example.client"
			},
			message: {
				summary: "Oops, something went wrong",
			}
		}
	}),
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args} />
}


export const WithoutBackButton: ComponentStory<typeof PageStory> = flattenedArgs => {
	const enhancedProps: Parameters<typeof PageStory>[0] = {
		kcContext: {
			client: undefined
		}
	}
	const props = merge(unflatten(flattenedArgs), enhancedProps)
	return <PageStory {...props} />
}
