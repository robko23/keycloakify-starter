import { render, screen, waitFor } from "@testing-library/react"
import { it, describe } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-username.ftl"
})
describe("LoginUsername", () => {
	it('renders', async () => {

		render(<PageStory/>)

		expect(await screen.findByTestId("kc-form-login")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login-button")).toBeInTheDocument()
	})

	it("renders register button", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationAllowed: true,
				password: true
			},
			registrationDisabled: false
		}}/>)

		expect(await screen.findByTestId("kc-register-button")).toBeInTheDocument()
	})

	it("does not render register button (registrationAllowed = false)", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationAllowed: false,
				password: true
			},
			registrationDisabled: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-register-button")).not.toBeInTheDocument()
		})
	})

	it("does not render register button (password = false)", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationAllowed: true,
				password: false
			},
			registrationDisabled: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-register-button")).not.toBeInTheDocument()
		})
	})

	it("does not render register button (registrationDisabled = true)", async () => {
		render(<PageStory kcContext={{
			realm: {
				registrationAllowed: true,
				password: true
			},
			registrationDisabled: true
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-register-button")).not.toBeInTheDocument()
		})
	})

	it("renders social providers", async () => {
		render(<PageStory kcContext={{
			social: {
				providers: [
					{
						loginUrl: "https://provider.one/login",
						providerId: "provider-one",
						alias: "Provider one",
						displayName: "Provider one",
					},
					{
						loginUrl: "https://provider.two/login",
						providerId: "provider-two",
						alias: "Provider two",
						displayName: "Provider two",
					}
				]
			}
		}}/>)

		expect(await screen.findByTestId("kc-social-provider-provider-one")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-social-provider-provider-two")).toBeInTheDocument()

	})

	it("renders remember me checkbox", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: true
			},
			usernameHidden: false
		}}/>)

		expect(await screen.findByTestId("kc-remember-me-checkbox")).toBeInTheDocument()
	})

	it("does not render remember me checkbox (rememberMe = false)", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: false
			},
			usernameHidden: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-remember-me-checkbox")).not.toBeInTheDocument()
		})
	})

	it("does not render remember me checkbox (usernameHidden = true)", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: true
			},
			usernameHidden: true
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-remember-me-checkbox")).not.toBeInTheDocument()
		})
	})

	it("renders login form (username)", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: false
			}
		}}/>)
		expect(await screen.findByTestId("kc-username")).toBeInTheDocument()
	})

	it("renders login form (email)", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: true,
				registrationEmailAsUsername: true
			}
		}}/>)
		expect(await screen.findByTestId("kc-email")).toBeInTheDocument()
	})

	it("renders login form (usernameOrEmail)", async () => {
		render(<PageStory kcContext={{
			realm: {
				loginWithEmailAllowed: true,
				registrationEmailAsUsername: false,
			}
		}}/>)
		expect(await screen.findByTestId("kc-usernameOrEmail")).toBeInTheDocument()
	})

	it("renders login form (password = false)", async () => {
		render(<PageStory kcContext={{
			realm: {
				password: false
			}
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-form-login")).not.toBeInTheDocument();
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.queryByTestId("kc-password")).not.toBeInTheDocument()
			// eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
			expect(screen.queryByTestId("kc-login-button")).not.toBeInTheDocument()
		})
	})
})
