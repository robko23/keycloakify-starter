import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "logout-confirm.ftl"
})

describe("LogoutConfirm", () => {
	it("renders", async () => {
		render(<PageStory />)

		expect(await screen.findByTestId("kc-logout-confirm-form")).toBeInTheDocument()
		expect(await screen.findByTestId("session-code")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-logout")).toBeInTheDocument()
	})

	it("renders back to application link", async () => {
		render(<PageStory kcContext={{
			logoutConfirm: {
				skipLink: false
			},
			client: {
				baseUrl: "http://localhost:3000"
			}
		}}/>)

		const element = await screen.findByTestId("kc-logout-link")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("href", "http://localhost:3000")
	})

	it("does not render back to application link", async () => {
		render(<PageStory kcContext={{
			logoutConfirm: {
				skipLink: true
			},
			client: {
				baseUrl: "http://localhost:3000"
			}
		}}/>)

		await waitFor(() => {
            expect(screen.queryByTestId("kc-logout-link")).not.toBeInTheDocument()
		})
	})
})