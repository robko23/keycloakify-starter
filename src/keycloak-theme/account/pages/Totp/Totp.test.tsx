import { render, screen } from "@testing-library/react"
import { expect } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "totp.ftl"
})

describe("FederatedIdentity", () => {
	it("should render", () => {
		render(<PageStory/>)
	})

	it("should render totp credentials", async () => {
		render(<PageStory kcContext={{
			totp: {
				otpCredentials: [
					{
						id: "google-authenticator",
						userLabel: "Google Authenticator"
					},
					{
						id: "freeotp",
						userLabel: "FreeOTP"
					}
				]
			},
			stateChecker: "state890"
		}}/>)

		const listItemGA = await screen.findByTestId("totp-credential-google-authenticator")
		expect(listItemGA).toBeInTheDocument()

		const formGA = listItemGA.querySelector("form")
		expect(formGA).toBeInTheDocument()
		expect(formGA).toHaveAttribute("method", "post")
		const stateCheckerGA = formGA!.querySelector("input[name='stateChecker']")
		expect(stateCheckerGA).toBeInTheDocument()
		expect(stateCheckerGA).toHaveValue("state890")
		expect(stateCheckerGA).toHaveAttribute("type", "hidden")

		const submitActionGa = formGA!.querySelector("input[name='submitAction']")
		expect(submitActionGa).toBeInTheDocument()
		expect(submitActionGa).toHaveValue("Delete")
		expect(submitActionGa).toHaveAttribute("type", "hidden")

		const credentialIdGA = formGA!.querySelector("input[name='credentialId']")
		expect(credentialIdGA).toBeInTheDocument()
		expect(credentialIdGA).toHaveValue("google-authenticator")
		expect(credentialIdGA).toHaveAttribute("type", "hidden")

		const listItemFO = await screen.findByTestId("totp-credential-freeotp")
		expect(listItemFO).toBeInTheDocument()

		const formFO = listItemFO.querySelector("form")
		expect(formFO).toBeInTheDocument()
		expect(formFO).toHaveAttribute("method", "post")
		const stateCheckerFO = formFO!.querySelector("input[name='stateChecker']")
		expect(stateCheckerFO).toBeInTheDocument()
		expect(stateCheckerFO).toHaveValue("state890")
		expect(stateCheckerFO).toHaveAttribute("type", "hidden")
		const submitActionFO = formFO!.querySelector("input[name='submitAction']")
		expect(submitActionFO).toBeInTheDocument()
		expect(submitActionFO).toHaveValue("Delete")
		expect(submitActionFO).toHaveAttribute("type", "hidden")
		const credentialIdFO = formFO!.querySelector("input[name='credentialId']")
		expect(credentialIdFO).toBeInTheDocument()
		expect(credentialIdFO).toHaveValue("freeotp")
		expect(credentialIdFO).toHaveAttribute("type", "hidden")

	})

	it("should render manual parameters (totp)", async () => {
		render(<PageStory kcContext={{
			mode: "manual",
			totp: {
				totpSecret: "AWESOME TOTP SECRET",
				totpSecretEncoded: "AWESOME TOTP SECRET BUT ENCODED",
				qrUrl: "https://example.com/totp/qr",
				policy: {
					type: "totp",
					algorithmKey: "SHA512",
					digits: "6",
					period: "30"
				}
			},
			stateChecker: "state567"
		}}/>)

		const openDialogButton = await screen.findByTestId("add-totp-credential")
		expect(openDialogButton).toBeInTheDocument()
		openDialogButton.click()

		const form = await screen.findByTestId("kc-totp-settings-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const secretKey = form.querySelector("#kc-totp-secret-key")
		expect(secretKey).toBeInTheDocument()
		expect(secretKey).toHaveTextContent("AWESOME TOTP SECRET BUT ENCODED")

		const qrLink = form.querySelector("#mode-barcode")
		expect(qrLink).toBeInTheDocument()
		expect(qrLink).toHaveAttribute("href", "https://example.com/totp/qr")

		expect(form.querySelector("#kc-totp-type")).toBeInTheDocument()
		expect(form.querySelector("#kc-totp-algorithm")).toBeInTheDocument()
		expect(form.querySelector("#kc-totp-digits")).toBeInTheDocument()
		expect(form.querySelector("#kc-totp-period")).toBeInTheDocument()

		const stateCkecker = form.querySelector("input[name='stateChecker']")
		expect(stateCkecker).toBeInTheDocument()
		expect(stateCkecker).toHaveValue("state567")
		expect(stateCkecker).toHaveAttribute("type", "hidden")

		const totpSecret = form.querySelector("input[name='totpSecret']")
		expect(totpSecret).toBeInTheDocument()
		expect(totpSecret).toHaveValue("AWESOME TOTP SECRET")
		expect(totpSecret).toHaveAttribute("type", "hidden")

		expect(form.querySelector("input[name='totp']")).toBeInTheDocument()
		expect(form.querySelector("input[name='userLabel']")).toBeInTheDocument()

	})

	it("should render qr code", async () => {
		render(<PageStory kcContext={{
			mode: "qr",
			totp: {
				totpSecret: "AWESOME TOTP SECRET",
				totpSecretQrCode: "some base 64 data",
				manualUrl: "https://example.com/totp/manual",
			},
			stateChecker: "state567"
		}}/>)

		const openDialogButton = await screen.findByTestId("add-totp-credential")
		expect(openDialogButton).toBeInTheDocument()
		openDialogButton.click()

		const form = await screen.findByTestId("kc-totp-settings-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const img = form.querySelector("#kc-totp-secret-qr-code")
		expect(img).toBeInTheDocument()
		expect(img).toHaveAttribute("src", "data:image/png;base64, some base 64 data")

		const modeManual = form.querySelector("#mode-manual")
		expect(modeManual).toBeInTheDocument()
		expect(modeManual).toHaveAttribute("href", "https://example.com/totp/manual")

		const stateCkecker = form.querySelector("input[name='stateChecker']")
		expect(stateCkecker).toBeInTheDocument()
		expect(stateCkecker).toHaveValue("state567")
		expect(stateCkecker).toHaveAttribute("type", "hidden")

		const totpSecret = form.querySelector("input[name='totpSecret']")
		expect(totpSecret).toBeInTheDocument()
		expect(totpSecret).toHaveValue("AWESOME TOTP SECRET")
		expect(totpSecret).toHaveAttribute("type", "hidden")

		const totp = form.querySelector("input[name='totp']")
		expect(totp).toBeInTheDocument()

		const userLabel = form.querySelector("input[name='userLabel']")
		expect(userLabel).toBeInTheDocument()
	})

})
