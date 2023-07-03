import { ComponentStory, Meta } from '@storybook/react'
import flatten, { unflatten } from 'flat'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "update-email.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/UpdateEmail",
	args: flatten({
		kcContext: {
			isAppInitiatedAction: false
		}
	}),
}
export default meta

export const Default: ComponentStory<typeof PageStory> = flattenedArgs => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}

