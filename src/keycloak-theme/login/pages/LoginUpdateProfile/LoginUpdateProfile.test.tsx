import { render, screen, waitFor, within } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-update-profile.ftl"
})

describe("LoginUpdateProfile", () => {
	it("renders", async () => {
		render(<PageStory kcContext={{
			user: {
				editUsernameAllowed: true
			}
		}}/>)
		expect(await screen.findByTestId("kc-update-profile-form")).toBeInTheDocument()
		expect(await screen.findByTestId("username")).toBeInTheDocument()
		expect(await screen.findByTestId("email")).toBeInTheDocument()
		expect(await screen.findByTestId("firstName")).toBeInTheDocument()
		expect(await screen.findByTestId("lastName")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-submit-button")).toBeInTheDocument()
	})

	it("hides username input", async () => {
		render(<PageStory kcContext={{
			user: {
				editUsernameAllowed: false
			}
		}}/>)

		await waitFor(() => {
			expect(screen.queryByTestId("username")).not.toBeInTheDocument()
		})
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

	it("populates default values", async () => {
		render(<PageStory kcContext={{
			user: {
				editUsernameAllowed: true,
				username: "fooUsername",
				email: "foo@bar.baz",
                firstName: "fooFirstName",
                lastName: "fooLastName"
			}
		}}/>)

		const usernameElement = await screen.findByTestId("username")
		expect(within(usernameElement).getByRole("textbox")).toHaveValue("fooUsername")

		const emailElement = await screen.findByTestId("email")
		expect(within(emailElement).getByRole("textbox")).toHaveValue("foo@bar.baz")

		const firstNameElement = await screen.findByTestId("firstName")
		expect(within(firstNameElement).getByRole("textbox")).toHaveValue("fooFirstName")

		const lastNameElement = await screen.findByTestId("lastName")
		expect(within(lastNameElement).getByRole("textbox")).toHaveValue("fooLastName")

	})
})

