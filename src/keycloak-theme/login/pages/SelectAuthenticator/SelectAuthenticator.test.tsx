import { render, screen, waitFor, within } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "select-authenticator.ftl"
})

describe("SelectAuthenticator", () => {
	it("renders", async () => {
		render(<PageStory />)
		expect(await screen.findByTestId("kc-select-credential-form")).toBeInTheDocument()
		expect(await screen.findByTestId("authexec-hidden-input")).toBeInTheDocument()
	})
})

