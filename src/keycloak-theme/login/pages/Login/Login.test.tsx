import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login.ftl"
})

describe("Login", () => {
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

	it("renders reset password button", async () => {
		render(<PageStory kcContext={{
			realm: {
				resetPasswordAllowed: true
			}
		}}/>)

		expect(await screen.findByTestId("kc-reset-password-button")).toBeInTheDocument()
	})

	it("does not render reset password button", async () => {
		render(<PageStory kcContext={{
			realm: {
				resetPasswordAllowed: false
			}
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-reset-password-button")).not.toBeInTheDocument()
		})
	})

	it("renders remember me button", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: true
			},
			usernameEditDisabled: false
		}}/>)

		expect(await screen.findByTestId("kc-remember-me-checkbox")).toBeInTheDocument()
	})

	it("does not render remember me button (rememberMe = false)", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: false
			},
			usernameEditDisabled: false
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-remember-me-checkbox")).not.toBeInTheDocument()
		})
	})

	it("does not render remember me button (usernameEditDisabled = true)", async () => {
		render(<PageStory kcContext={{
			realm: {
				rememberMe: true
			},
			usernameEditDisabled: true
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-remember-me-checkbox")).not.toBeInTheDocument()
		})
	})

	it("renders login form", async () => {
		render(<PageStory/>)

		expect(await screen.findByTestId("kc-form-login")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login-button")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-password")).toBeInTheDocument()
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

describe("Template", () => {
	it("renders alert", async () => {
		const alertText = "TESTING ALERT TEXT"
		render(<PageStory kcContext={{
			message: {
				type: "error",
				summary: alertText
			}
		}}/>)

		expect(await screen.findByText(alertText)).toBeInTheDocument()
		expect(await screen.findByTestId("kc-header-message-error")).toBeInTheDocument()
	})

	it("does not render alert", async () => {
		render(<PageStory kcContext={{
			message: undefined
		}}/>)

		await waitFor(() => {
			const el = screen.queryByTestId("kc-header-message-error")
			expect(el).not.toBeInTheDocument()
		})
	})

	it("renders realm name", async () => {
		render(<PageStory kcContext={{
			realm: {
				displayNameHtml: "Test Realm"
			}
		}}/>)

		expect(await screen.findByText("Test Realm")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-header-realm-name")).toBeInTheDocument()
	})
})