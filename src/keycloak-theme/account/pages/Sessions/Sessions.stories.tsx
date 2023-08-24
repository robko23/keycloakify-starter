import { ComponentStory, Meta } from "@storybook/react"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "sessions.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Sessions",
}

export default meta

export const Default: ComponentStory<typeof PageStory> = () => <PageStory/>
