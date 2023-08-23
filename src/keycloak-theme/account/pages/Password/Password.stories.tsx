import { ComponentStory, Meta } from "@storybook/react"
import flatten, { unflatten } from "flat"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "password.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Password",
	args: flatten({
		kcContext: {
			message: {
				type: "info",
				summary: "test message"
			},
			referrer: {
				url: "https://example.com",
				name: "example"
			},
			password: {
				passwordSet: true
			}
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

export const Default: ComponentStory<typeof PageStory> = (flattenedArgs) => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}
