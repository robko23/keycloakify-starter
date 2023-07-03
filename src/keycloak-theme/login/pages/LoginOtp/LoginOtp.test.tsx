import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-otp.ftl"
})

describe("LoginOtp", () => {
	it("renders", async () => {
		render(<PageStory/>)
		expect(await screen.findByTestId("do-login-header")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-otp-login-form")).toBeInTheDocument()
		expect(await screen.findByTestId("otp")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-login")).toBeInTheDocument()
	})

	const rendersCustomOptions = function () {
		render(<PageStory kcContext={{
			otpLogin: {
				userOtpCredentials: [
					{
						id: "otp1",
						userLabel: "OTP1"
					},
					{
						id: "otp2",
						userLabel: "OTP2"
					}
				]
			}
		}}/>)
	}

	it("renders options", async () => {
		rendersCustomOptions()

		expect(await screen.findByText("OTP1")).toBeInTheDocument()
		expect(await screen.findByText("OTP2")).toBeInTheDocument()
	})

	it('handles interactions', async () => {
		rendersCustomOptions()

		const otp1 = await screen.findByTestId("user-otp-button-otp1")
		const otp2 = await screen.findByTestId("user-otp-button-otp2")

		otp1.click()

		await waitFor(() => {
			expect(screen.queryByTestId("selectedCredentialId")).toHaveValue("otp1")
		})

		otp2.click()

        await waitFor(() => {
            expect(screen.queryByTestId("selectedCredentialId")).toHaveValue("otp2")
        })
	})
})

