import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-idp-link-confirm.ftl"
})

describe("LoginIdpLinkConfirm", () => {
	it("renders", async () => {
		render(<PageStory />)

		const updateProfileButton = await screen.findByTestId("update-profile")
		expect(updateProfileButton).toBeInTheDocument()
		expect(updateProfileButton).toHaveAttribute("name", "submitAction")
		expect(updateProfileButton).toHaveAttribute("type", "submit")
		expect(updateProfileButton).toHaveValue("updateProfile")

		const linkAccountButton = await screen.findByTestId("link-account")
		expect(linkAccountButton).toBeInTheDocument()
		expect(linkAccountButton).toHaveAttribute("name", "submitAction")
		expect(linkAccountButton).toHaveAttribute("type", "submit")
		expect(linkAccountButton).toHaveValue("linkAccount")
	})
})

