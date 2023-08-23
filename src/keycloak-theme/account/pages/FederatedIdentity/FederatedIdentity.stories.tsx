import { ComponentStory, Meta } from "@storybook/react"
import flatten, { unflatten } from "flat"
import { merge } from "lodash"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "federatedIdentity.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Federated Identity",
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
			federatedIdentity: {
				removeLinkPossible: true
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

export const OneIdentity: ComponentStory<typeof PageStory> = (flattenedArgs) => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			federatedIdentity: {
				identities: [
					{
						displayName: "Facebook",
						providerId: "facebook",
						userName: "john.doe",
						connected: false
					}
				]
			}
		}
	})
	return <PageStory {...props}/>
}

export const TwoIdentities: ComponentStory<typeof PageStory> = (flattenedArgs) => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			federatedIdentity: {
				identities: [
					{
						displayName: "Github",
						providerId: "github",
						userName: "john.doe",
						connected: false
					},
					{
						displayName: "Google",
						providerId: "google",
						userName: "john.doe.google",
						connected: true
					}
				]
			}
		}
	})
	return <PageStory {...props}/>
}
