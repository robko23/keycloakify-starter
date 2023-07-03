import { render, screen, waitFor, within } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-reset-password.ftl"
})

describe("LoginResetPassword", () => {
	it("renders", async () => {
		render(<PageStory kcContext={{
			auth: undefined
		}} />)
		expect(await screen.findByTestId("kc-reset-password-form")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-email-forgot-title")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-email-instruction")).toBeInTheDocument()
		expect(await screen.findByTestId("username")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-back-to-login-button")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-submit-button")).toBeInTheDocument()
	})

	it("renders attempted username", async () => {
		render(<PageStory kcContext={{
			auth: {
				attemptedUsername: "test@example.com",
				showUsername: true
			}
		}} />)

		const textField = await screen.findByTestId("username")
		const input = within(textField).getByRole("textbox") as HTMLInputElement
		expect(input.value).toBe("test@example.com")

		const title = await screen.findByTestId("kc-attempted-username")
		expect(title).toBeInTheDocument()
		expect(title).toHaveTextContent("test@example.com")

		expect(await screen.findByTestId("reset-login")).toBeInTheDocument()
	})

	it("renders email input", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: true,
				registrationEmailAsUsername: true
			}
		}} />)

		expect(await screen.findByTestId("email")).toBeInTheDocument()
	})

	it("renders username input", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: false,
				registrationEmailAsUsername: false
			}
		}} />)

		expect(await screen.findByTestId("username")).toBeInTheDocument()
	})

	it("renders usernameOrEmail input", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: true,
				registrationEmailAsUsername: false
			}
		}} />)

		expect(await screen.findByTestId("usernameOrEmail")).toBeInTheDocument()
	})
})
