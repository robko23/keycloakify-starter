import { render, screen, waitFor } from "@testing-library/react"
import { expect } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "sessions.ftl"
})

describe("Sessions", () => {
	it("should render", async () => {
		render(<PageStory kcContext={{
			stateChecker: "state123"
		}}/>)

		const form = await screen.findByTestId("kc-sessions-form")
		expect(form).toBeInTheDocument()
		expect(form).toHaveAttribute("method", "post")

		const submitButton = form.querySelector("button[type='submit']")
		expect(submitButton).toBeInTheDocument()

		const stateChecker = form.querySelector("input[name='stateChecker']")
		expect(stateChecker).toBeInTheDocument()
		expect(stateChecker).toHaveValue("state123")
	})
})
