import { render, screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "account.ftl"
})

describe("Account", () => {
	it("should render", () => {
		render(<PageStory/>)
	})

	it("should have form", async () => {
		render(<PageStory kcContext={{
			account: {
				username: "test.username",
				email: "test.email@example.com",
				firstName: "test.firstName",
				lastName: "test.lastName"
			},
			realm: {
				registrationEmailAsUsername: false,
				editUsernameAllowed: true
			},
			stateChecker: "state123"
		}}/>)

		const form = await screen.findByTestId("kc-account-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const stateChecker = form.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")
		expect(stateChecker).toHaveAttribute("type", "hidden")

		const username = form.querySelector("input[name='username']")
		expect(username).toBeInTheDocument()
		expect(username).toHaveValue("test.username")
		expect(username).toHaveAttribute("required")
		expect(username).not.toHaveAttribute("disabled")

		const email = form.querySelector("input[name='email']")
		expect(email).toBeInTheDocument()
		expect(email).toHaveValue("test.email@example.com")
		expect(email).toHaveAttribute("required")

		const firstName = form.querySelector("input[name='firstName']")
		expect(firstName).toBeInTheDocument()
		expect(firstName).toHaveValue("test.firstName")
		expect(firstName).toHaveAttribute("required")

		const lastName = form.querySelector("input[name='lastName']")
		expect(lastName).toBeInTheDocument()
		expect(lastName).toHaveValue("test.lastName")
		expect(lastName).toHaveAttribute("required")

		const saveButton = form.querySelector("button[type='submit'][name='submitAction'][value='Save']")
		expect(saveButton).toBeInTheDocument()

		const cancelButton = form.querySelector("button[type='submit'][name='submitAction'][value='Cancel']")
		expect(cancelButton).toBeInTheDocument()
	})

	it("should mark username readonly", async () => {
		render(<PageStory kcContext={{
			account: {
				username: "test.username",
				email: "test.email@example.com",
				firstName: "test.firstName",
				lastName: "test.lastName"
			},
			realm: {
				registrationEmailAsUsername: false,
				editUsernameAllowed: false
			},
			stateChecker: "state123"
		}}/>)

		const form = await screen.findByTestId("kc-account-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const stateChecker = form.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")
		expect(stateChecker).toHaveAttribute("type", "hidden")

		const username = form.querySelector("input[name='username']")
		expect(username).toBeInTheDocument()
		expect(username).toHaveValue("test.username")
		expect(username).not.toHaveAttribute("required")
		expect(username).toHaveAttribute("disabled")

		const email = form.querySelector("input[name='email']")
		expect(email).toBeInTheDocument()
		expect(email).toHaveValue("test.email@example.com")
		expect(email).toHaveAttribute("required")

		const firstName = form.querySelector("input[name='firstName']")
		expect(firstName).toBeInTheDocument()
		expect(firstName).toHaveValue("test.firstName")
		expect(firstName).toHaveAttribute("required")

		const lastName = form.querySelector("input[name='lastName']")
		expect(lastName).toBeInTheDocument()
		expect(lastName).toHaveValue("test.lastName")
		expect(lastName).toHaveAttribute("required")

		const saveButton = form.querySelector("button[type='submit'][name='submitAction'][value='Save']")
		expect(saveButton).toBeInTheDocument()

		const cancelButton = form.querySelector("button[type='submit'][name='submitAction'][value='Cancel']")
		expect(cancelButton).toBeInTheDocument()
	})

	it("should hide username", async () => {
		render(<PageStory kcContext={{
			account: {
				username: "test.username",
				email: "test.email@example.com",
				firstName: "test.firstName",
				lastName: "test.lastName"
			},
			realm: {
				registrationEmailAsUsername: true,
				editUsernameAllowed: false
			},
			stateChecker: "state123"
		}}/>)

		const form = await screen.findByTestId("kc-account-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const stateChecker = form.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")
		expect(stateChecker).toHaveAttribute("type", "hidden")

		const username = form.querySelector("input[name='username']")
		expect(username).toBeNull()

		const email = form.querySelector("input[name='email']")
		expect(email).toBeInTheDocument()
		expect(email).toHaveValue("test.email@example.com")
		expect(email).toHaveAttribute("required")

		const firstName = form.querySelector("input[name='firstName']")
		expect(firstName).toBeInTheDocument()
		expect(firstName).toHaveValue("test.firstName")
		expect(firstName).toHaveAttribute("required")

		const lastName = form.querySelector("input[name='lastName']")
		expect(lastName).toBeInTheDocument()
		expect(lastName).toHaveValue("test.lastName")
		expect(lastName).toHaveAttribute("required")

		const saveButton = form.querySelector("button[type='submit'][name='submitAction'][value='Save']")
		expect(saveButton).toBeInTheDocument()

		const cancelButton = form.querySelector("button[type='submit'][name='submitAction'][value='Cancel']")
		expect(cancelButton).toBeInTheDocument()
	})


	it("should show referrer", async () => {
		render(<PageStory kcContext={{
			account: {
				username: "test.username",
				email: "test.email@example.com",
				firstName: "test.firstName",
				lastName: "test.lastName"
			},
			realm: {
				registrationEmailAsUsername: true,
				editUsernameAllowed: false
			},
			stateChecker: "state123",
			referrer: {
				url: "http://example.com"
			}
		}}/>)

		const form = await screen.findByTestId("kc-account-form")
		const backToApplicationButton = form.querySelector("a[href='http://example.com']")
		expect(backToApplicationButton).toBeInTheDocument()
	})

})
