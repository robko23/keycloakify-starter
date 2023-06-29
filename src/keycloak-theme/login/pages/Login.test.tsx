import { render, screen } from "@testing-library/react"
import { createPageStory } from "../createPageStory"

const {PageStory} = createPageStory({
	pageId: "login.ftl"
})

describe("Login", () => {
	it("renders", () => {
		render(<PageStory/>)
		expect(screen.getByText("Přihlásit se")).toBeInTheDocument()
	})
})