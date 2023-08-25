import { render, screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "applications.ftl"
})

describe("Applications", () => {
	it("should render", async () => {
		render(<PageStory kcContext={{
			stateChecker: "state123",
			applications: {
				applications: [
					{
						client: {
							name: "client1",
							clientId: "client1-id",
							consentRequired: true
						}
					},
					{
						client: {
							name: "client2",
							clientId: "client2-id",
							consentRequired: false
						}
					}
				]
			}
		}}/>)

		const form = await screen.findByTestId("kc-form-applications")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")


		const stateChecker = form.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")

		const referrer = form.querySelector("input[name='referrer']")
		expect(referrer).toBeInTheDocument()
		expect(referrer).toHaveValue("state123")

		const client1Revoke = form.querySelector("button[name='clientId'][value='client1-id']")
		expect(client1Revoke).not.toBeInTheDocument()

		const client2Revoke = form.querySelector("button[name='clientId'][value='client2-id']")
		expect(client2Revoke).not.toBeInTheDocument()

	})

	it("should display revoke button (consentRequired and clientScopesGranted)", async () => {
		render(<PageStory kcContext={{
			stateChecker: "state123",
			applications: {
				applications: [
					{
						client: {
							name: "client1",
							clientId: "client1-id",
							consentRequired: true
						},
						clientScopesGranted: ["scope1"],
						additionalGrants: []
					},
				]
			}
		}}/>)

		const form = await screen.findByTestId("kc-form-applications")
		expect(form).toBeInTheDocument()

		const client1Revoke = form.querySelector("button[name='clientId'][value='client1-id']")
		expect(client1Revoke).toBeInTheDocument()
	})

	it("should hide revoke button (clientScopesGranted)", async () => {
		render(<PageStory kcContext={{
			stateChecker: "state123",
			applications: {
				applications: [
					{
						client: {
							name: "client1",
							clientId: "client1-id",
							consentRequired: false
						},
						clientScopesGranted: ["scope1"],
						additionalGrants: []
					},
				]
			}
		}}/>)

		const form = await screen.findByTestId("kc-form-applications")
		expect(form).toBeInTheDocument()

		const client1Revoke = form.querySelector("button[name='clientId'][value='client1-id']")
		expect(client1Revoke).not.toBeInTheDocument()
	})

	it("should display revoke button (additionalGrants)", async () => {
		render(<PageStory kcContext={{
			stateChecker: "state123",
			applications: {
				applications: [
					{
						client: {
							name: "client1",
							clientId: "client1-id",
							consentRequired: false
						},
						additionalGrants: ["grant1"],
						clientScopesGranted: []
					},
				]
			}
		}}/>)

		const form = await screen.findByTestId("kc-form-applications")
		expect(form).toBeInTheDocument()

		const client1Revoke = form.querySelector("button[name='clientId'][value='client1-id']")
		expect(client1Revoke).toBeInTheDocument()
	})
})
