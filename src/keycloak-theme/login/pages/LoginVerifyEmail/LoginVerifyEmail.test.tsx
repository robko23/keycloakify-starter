import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login-verify-email.ftl"
})

describe("LoginVerifyEmail", () => {
	it("renders", async () => {
		render(<PageStory />)
        expect(await screen.findByTestId("verify-email-header")).toBeInTheDocument()
	})
})

