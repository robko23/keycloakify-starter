import { render, screen, waitFor, within } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "update-email.ftl"
})

describe("UpdateEmail", () => {
	it("renders", async () => {
		render(<PageStory />)
		expect(await screen.findByTestId("kc-update-email-form")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-email")).toBeInTheDocument()
	})

	it("renders cancel button", async () => {
		render(<PageStory kcContext={{
			isAppInitiatedAction: true
		}}/>)

		const element = await screen.findByTestId("kc-cancel-button")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("type", "submit")
		expect(element).toHaveAttribute("name", "cancel-aia")
		expect(element).toHaveValue("true")

	})

	it("does not render cancel button", async () => {
		render(<PageStory kcContext={{
			isAppInitiatedAction: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-cancel-button")).not.toBeInTheDocument()
		})
	})
})

