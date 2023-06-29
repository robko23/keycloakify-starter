import { render, screen, waitFor } from "@testing-library/react"
import { it, describe } from "vitest"
import { createPageStory } from "../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-password.ftl"
})
describe("LoginPassword", () => {
	it('renders', async () => {

		render(<PageStory/>)

		expect(await screen.findByTestId("kc-password")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login-button")).toBeInTheDocument()
	})

	it('renders forgot password button', async () => {

		render(<PageStory kcContext={{
			realm: {
				resetPasswordAllowed: true
			}
		}}/>)

		expect(await screen.findByTestId("kc-reset-password-button")).toBeInTheDocument()
	})

	it('does not render forgot password button', async () => {

		render(<PageStory kcContext={{
			realm: {
				resetPasswordAllowed: false
			}
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-reset-password-button")).not.toBeInTheDocument()
		})
	})
})