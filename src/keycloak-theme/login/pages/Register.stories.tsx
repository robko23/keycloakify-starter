import { ComponentMeta, ComponentStory } from "@storybook/react"
import { createPageStory } from "../createPageStory"

const {PageStory} = createPageStory({
	pageId: "register.ftl"
})

export default {
	title: "register/Register",
	component: PageStory,
} as ComponentMeta<typeof PageStory>

export const Default: ComponentStory<typeof PageStory> = () => <PageStory/>


export const WithError: ComponentStory<typeof PageStory> = () => (
	<PageStory
		kcContext={{
			message: {
				type: "error",
				summary: "Something went wrong"
			}
		}}
	/>
)