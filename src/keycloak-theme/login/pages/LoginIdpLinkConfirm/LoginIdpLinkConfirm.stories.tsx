import { ComponentStory, Meta } from '@storybook/react'
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-idp-link-confirm.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginIdpLinkConfirm",
}
export default meta

export const Default: ComponentStory<typeof PageStory> = () => {
	return <PageStory />
}

