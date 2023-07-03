import { render, screen, waitFor, within } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-update-password.ftl"
})

describe("LoginUpdatePassword", () => {
	it("renders", async () => {
		render(<PageStory kcContext={{
			isAppInitiatedAction: false
		}}/>)

		expect(await screen.findByTestId("kc-passwd-update-form")).toBeInTheDocument()

		const usernameElement = await screen.findByTestId("username")
		expect(usernameElement).toBeInTheDocument()
		expect(usernameElement).toHaveAttribute("readonly")
		expect(usernameElement).toHaveStyle("display: none")

		let currentPasswordElement = await screen.findByTestId("current-password")
		expect(currentPasswordElement).toBeInTheDocument()
		expect(currentPasswordElement).toHaveStyle("display: none")

		let newPasswordElement = await screen.findByTestId("new-password")
		expect(newPasswordElement).toBeInTheDocument()
		expect(newPasswordElement).toHaveAttribute("type", "password")

		let passwordConfirmElement = await screen.findByTestId("password-confirm")
		expect(passwordConfirmElement).toBeInTheDocument()
		expect(passwordConfirmElement).toHaveAttribute("type", "password")
	})


	it("renders cancel button and logout checkbox", async () => {
		render(<PageStory kcContext={{
			isAppInitiatedAction: true
		}}/>)

		const element = await screen.findByTestId("kc-cancel-button")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("type", "submit")
		expect(element).toHaveAttribute("name", "cancel-aia")
		expect(element).toHaveValue("true")

		let checkbox = await screen.findByTestId("logout-sessions")
		checkbox = within(checkbox).getByRole("checkbox")
		expect(checkbox).toBeInTheDocument()
		expect(checkbox).toHaveAttribute("name", "logout-sessions")

	})

	it("does not render cancel button and logout checkbox", async () => {
		render(<PageStory kcContext={{
			isAppInitiatedAction: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-cancel-button")).not.toBeInTheDocument()
		})
		await waitFor(() => {
            expect(screen.queryByTestId("logout-sessions")).not.toBeInTheDocument()
        })
	})
})

