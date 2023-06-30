import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "error.ftl"
})

describe("Error", () => {
	it("renders", async () => {
		render(<PageStory />)
		expect(await screen.findByTestId("kc-error-message")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-back-to-application")).toBeInTheDocument()
	})

	it("renders with custom message", async () => {
		render(<PageStory kcContext={{
			message: {
				summary: "Custom message"
			}
		}} />)
        expect(await screen.findByText("Custom message")).toBeInTheDocument()
        expect(await screen.findByTestId("kc-back-to-application")).toBeInTheDocument()
	})

	it("does not render back button", async () => {
		render(<PageStory kcContext={{
            message: {
                summary: "Custom message"
            },
			client: {
				baseUrl: undefined
			}
        }} />)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-back-to-application")).not.toBeInTheDocument()
		})
	})
})
