import { ComponentStory, Meta } from "@storybook/react"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "applications.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Applications",
}

export default meta

export const Default: ComponentStory<typeof PageStory> = () => <PageStory/>
