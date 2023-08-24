import { ComponentStory, Meta } from "@storybook/react"
import flatten, { unflatten } from "flat"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "account.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Account",
	args: flatten({
		kcContext: {
			realm: {
				registrationEmailAsUsername: true,
				editUsernameAllowed: false
			},
			account: {
				username: "example username",
				email: "email@example.com",
				firstName: "John",
				lastName: "Doe",
			},
			referrer: {
				url: "https://example.com",
			}
		}
	})
}

export default meta

export const Default: ComponentStory<typeof PageStory> = (flattenedArgs) => {
	const args: any = unflatten(flattenedArgs)
	return <PageStory {...args}/>
}
