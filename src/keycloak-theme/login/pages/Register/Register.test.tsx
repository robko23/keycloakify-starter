import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "register.ftl"
})

describe("Register", () => {
	it("renders", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationEmailAsUsername: false,
			},
			passwordRequired: true,
			recaptchaRequired: true
		}} />)

		expect(await screen.findByTestId("kc-register-form")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-firstName")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-lastName")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-email")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-username")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-password")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-password-confirm")).toBeInTheDocument()
		expect(await screen.findByTestId("google-recaptcha")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login-button")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-register-button")).toBeInTheDocument()
	})

	it("does not render username field", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationEmailAsUsername: true,
			},
			passwordRequired: true,
			recaptchaRequired: true
		}} />)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-username")).not.toBeInTheDocument()
		})
	})

	it("does not render password field", async () => {
		render(<PageStory kcContext={{
            passwordRequired: false,
        }} />)

        await waitFor(() => {
            expect(screen.queryByTestId("kc-password")).not.toBeInTheDocument()
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.queryByTestId("kc-password-confirm")).not.toBeInTheDocument()
        })
	})

	it("does not render recaptcha", async () => {
		render(<PageStory kcContext={{
            recaptchaRequired: false,
        }} />)

        await waitFor(() => {
            expect(screen.queryByTestId("google-recaptcha")).not.toBeInTheDocument()
        })
	})
})

