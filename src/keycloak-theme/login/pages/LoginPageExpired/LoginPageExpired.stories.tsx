import { ComponentStory, Meta } from '@storybook/react'
import { createPageStory } from "../../createPageStory"

// https://github.com/storybookjs/storybook/issues/12078#issuecomment-1036316861

const {PageStory} = createPageStory({
	pageId: "login-page-expired.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "login/LoginPageExpired",
}
export default meta

export const Default: ComponentStory<typeof PageStory> = () => {
	return <PageStory/>
}
