import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "register-user-profile.ftl"
})

describe("RegisterUserProfile", () => {
	it('renders form', async () => {
		render(<PageStory/>)
		expect(await screen.findByTestId("kc-register-form")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login-button")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-register-button")).toBeInTheDocument()
	})

	it("renders captcha", async () => {
		render(<PageStory kcContext={{
			recaptchaRequired: true
		}}/>)
		expect(await screen.findByTestId("google-recaptcha")).toBeInTheDocument()
	})

	it("doesn't render captcha", async () => {
		render(<PageStory kcContext={{
			recaptchaRequired: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("google-recaptcha")).not.toBeInTheDocument()
		})
	})

	it("renders default password fields", async () => {
		render(<PageStory kcContext={{
			passwordRequired: true
		}}/>)

		const passwordElement = await screen.findByTestId("kc-register-attribute-password")
		expect(passwordElement).toBeInTheDocument()
		expect(passwordElement).toHaveAttribute("type", "password")
		expect(passwordElement).toHaveAttribute("required")

		const confirmPasswordElement = await screen.findByTestId("kc-register-attribute-password-confirm")
		expect(confirmPasswordElement).toBeInTheDocument()
		expect(confirmPasswordElement).toHaveAttribute("type", "password")
		expect(confirmPasswordElement).toHaveAttribute("required")
	})

	it("does not render default password fields", async () => {
		render(<PageStory kcContext={{
			passwordRequired: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-register-attribute-password")).not.toBeInTheDocument()
		})

		await waitFor(() => {
			expect(screen.queryByTestId("kc-register-attribute-password-confirm")).not.toBeInTheDocument()
		})
	})

	it("renders custom elements (text)", async () => {
		render(<PageStory kcContext={{
			profile: {
				attributes: [
					{
						displayName: "Test attr",
						required: true,
						autocomplete: "off",
						name: 'test-attr',
						groupAnnotations: {},
						annotations: {},
					}
				]
			}
		}}/>)

		const element = await screen.findByTestId("kc-register-attribute-test-attr")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("type", "text")
		expect(element).toHaveAttribute("required")
		expect(element).toHaveAttribute("autocomplete", "off")
		expect(element).toHaveAttribute("name", "test-attr")
		expect(element).toHaveAttribute("id", "test-attr")
	})

	it("renders custom elements (select)", async () => {
		render(<PageStory kcContext={{
			profile: {
				attributes: [
					{
						displayName: "Test attr",
						required: true,
						autocomplete: "off",
						name: 'test-attr',
						groupAnnotations: {},
						annotations: {},
						validators: {
							options: {
								options: ["a", "b"]
							}
						}
					}
				]
			}
		}}/>)

		expect(await screen.findByText("Test attr")).toBeInTheDocument()
		const element = await screen.findByTestId("kc-register-attribute-test-attr")
		expect(element).toBeInTheDocument()
		expect(element).toHaveAttribute("required")
		expect(element).not.toHaveAttribute("autocomplete")
		expect(element).toHaveAttribute("name", "test-attr")

	})

	it('renders group', async () => {
		render(<PageStory kcContext={{
			profile: {
				attributes: [
					{
						displayName: "Test attr",
						required: true,
						autocomplete: "off",
						name: 'test-attr',
						groupAnnotations: {},
						annotations: {},
						group: "test-group",
						groupDisplayHeader: "test-group-header",
						groupDisplayDescription: "test-group-description"
					}
				]
			}
		}}/>)

		expect(await screen.findByText("test-group-header")).toBeInTheDocument()
		expect(await screen.findByText("test-group-description")).toBeInTheDocument()
	})

	it('renders group (without description)', async () => {
		render(<PageStory kcContext={{
			profile: {
				attributes: [
					{
						displayName: "Test attr",
						required: true,
						autocomplete: "off",
						name: 'test-attr',
						groupAnnotations: {},
						annotations: {},
						group: "test-group",
						groupDisplayHeader: "test-group-header",
					}
				]
			}
		}}/>)

		expect(await screen.findByText("test-group-header")).toBeInTheDocument()
		await waitFor(() => {
			expect(screen.queryByTestId("group-description-test-group")).not.toBeInTheDocument()
		})
	})

})
