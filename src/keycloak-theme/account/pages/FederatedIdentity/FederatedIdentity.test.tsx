import { render, screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "federatedIdentity.ftl"
})

describe("FederatedIdentity", () => {
	it("should render", () => {
		render(<PageStory/>)
	})

	it("should have identity", async () => {
		render(<PageStory kcContext={{
			federatedIdentity: {
				identities: [
					{
						connected: true,
						userName: "john.doe",
						providerId: "facebook",
						displayName: "Facebook"
					},
					{
						connected: false,
						userName: "john.doe",
						providerId: "google",
						displayName: "Google"
					}
				],
				removeLinkPossible: false
			}
		}}/>)

		expect(await screen.findByTestId("federated-identity-facebook")).toBeInTheDocument()
		expect(await screen.findByTestId("federated-identity-google")).toBeInTheDocument()
	})

	it("should render remove button", async () => {
		render(<PageStory kcContext={{
			federatedIdentity: {
				identities: [
					{
						connected: true,
						userName: "john.doe",
						providerId: "facebook",
						displayName: "Facebook"
					},
				],
				removeLinkPossible: true
			},
			stateChecker: "state123"
		}}/>)

		const removeForm = await screen.findByTestId("form-facebook-remove")
		expect(removeForm).toBeInTheDocument()

		const stateChecker = removeForm.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")

		const action = removeForm.querySelector("input[name='action']")
		expect(action).toBeInTheDocument()
		expect(action).toHaveValue("remove")

		const providerId = removeForm.querySelector("input[name='providerId']")
		expect(providerId).toBeInTheDocument()
		expect(providerId).toHaveValue("facebook")

	})


	it("should render connect button", async () => {
		render(<PageStory kcContext={{
			federatedIdentity: {
				identities: [
					{
						connected: false,
						userName: "john.doe",
						providerId: "facebook",
						displayName: "Facebook"
					},
				],
				removeLinkPossible: true
			},
			stateChecker: "state123"
		}}/>)

		const removeForm = await screen.findByTestId("form-facebook-add")
		expect(removeForm).toBeInTheDocument()

		const stateChecker = removeForm.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")

		const action = removeForm.querySelector("input[name='action']")
		expect(action).toBeInTheDocument()
		expect(action).toHaveValue("add")

		const providerId = removeForm.querySelector("input[name='providerId']")
		expect(providerId).toBeInTheDocument()
		expect(providerId).toHaveValue("facebook")

	})

	it("should not render remove button", async () => {
		render(<PageStory kcContext={{
			federatedIdentity: {
				identities: [
					{
						connected: true,
						userName: "john.doe",
						providerId: "facebook",
						displayName: "Facebook"
					},
				],
				removeLinkPossible: false
			},
			stateChecker: "state123"
		}}/>)


		await waitFor(() => {
			expect(screen.queryByTestId("form-facebook-remove")).not.toBeInTheDocument()
		})
		await waitFor(() => {
			expect(screen.queryByTestId("form-facebook-add")).not.toBeInTheDocument()
		})
	})

})
