import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "idp-review-user-profile.ftl"
})

describe("IdpReviewUserProfile", () => {
	it("renders", async () => {
		render(<PageStory/>)

		expect(await screen.findByTestId("kc-idp-review-profile-form")).toBeInTheDocument()
		expect(await screen.findByTestId("kc-submit-button")).toBeInTheDocument()
	})
})

