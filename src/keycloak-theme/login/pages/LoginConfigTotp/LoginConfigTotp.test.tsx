import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-config-totp.ftl"
})

describe("LoginConfigTotp", () => {
	it("renders", async () => {
		render(<PageStory/>)

		expect(await screen.findByTestId("kc-totp-settings-form")).toBeInTheDocument()
		expect(await screen.findByTestId("totpSecret")).toBeInTheDocument()
		expect(await screen.findByTestId("totp")).toBeInTheDocument()
		expect(await screen.findByTestId("userLabel")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-submit-button")).toBeInTheDocument()
	})

	it("renders QR code", async () => {
		render(<PageStory kcContext={{
			mode: "qr"
		}}/>)

		expect(await screen.findByTestId("kc-totp-secret-qr-code")).toBeInTheDocument()
	})

	it("renders manual", async () => {
		render(<PageStory kcContext={{
			mode: "manual"
		}}/>)

		expect(await screen.findByTestId("kc-totp-secret-key")).toBeInTheDocument()
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

})

