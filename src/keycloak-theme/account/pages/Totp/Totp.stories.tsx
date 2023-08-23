import { ComponentStory, Meta } from "@storybook/react"
import flatten, { unflatten } from "flat"
import { merge } from "lodash"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "totp.ftl"
})

const meta: Meta<typeof PageStory> = {
	component: PageStory,
	title: "account/Totp",
	args: flatten({
		kcContext: {
			mode: "manual",
			totp: {
				totpSecretEncoded: "TOTP SECR ERCO DEFO RMAT TED1",
				policy: {
					initialCounter: "0",
					type: "totp",
					period: "30",
					algorithmKey: "SHA1",
					digits: "6",
				},
				qrUrl: "#",
				manualUrl: "#",
			}
		}
	}),
	argTypes: {
		'kcContext.mode': {
			control: {
				type: "select",
				options: [ "manual", "qr" ]
			}
		},
		'kcContext.totp.policy.type': {
			control: {
				type: "select",
				options: [ "totp", "hotp" ]
			}
		}
	}
}

export default meta

export const Default: ComponentStory<typeof PageStory> = (flattenedArgs) => {
	const args: any = unflatten(flattenedArgs)
	const props = merge(args, {
		kcContext: {
			totp: {
				otpCredentials: [
					{
						id: "otp1",
						userLabel: "Google authenticator"
					}
				],
			}
		}
	})
	return <PageStory {...props}/>
}
