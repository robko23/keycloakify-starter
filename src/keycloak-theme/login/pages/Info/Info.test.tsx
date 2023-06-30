import { render, screen, waitFor } from "@testing-library/react"
import { describe, it } from "vitest"
import { createPageStory } from "../../createPageStory"

const {PageStory} = createPageStory({
	pageId: "info.ftl"
})

describe("Info", () => {
	it("should render", async () => {
        render(<PageStory kcContext={{
			message: {
				summary: "Test message summary",
			},
			messageHeader: "Test message header"
		}} />)
		expect(await screen.findByText("Test message summary")).toBeInTheDocument()
		expect(await screen.findByText("Test message header")).toBeInTheDocument()
    })

	it("renders fallback header", async () => {
		render(<PageStory kcContext={{
			message: {
				summary: "Test message summary",
			},
			messageHeader: undefined
		}} />)
		const elements = await screen.findAllByText("Test message summary")
		expect(elements).toHaveLength(2)
	})

	it("renders client url", async () => {
		render(<PageStory kcContext={{
			pageRedirectUri: undefined ,
			actionUri: undefined,
			client: {
				baseUrl: "https://example.com"
			}
		}} />)

		const correctLinkElement = await screen.findByTestId("kc-info-client-url")
		expect(correctLinkElement).toBeInTheDocument()
		expect(correctLinkElement).toHaveAttribute("href", "https://example.com")

		await waitFor(() => {
			expect(screen.queryByTestId("kc-info-redirect-url")).not.toBeInTheDocument()
		})
		await waitFor(() => {
			expect(screen.queryByTestId("kc-info-action-url")).not.toBeInTheDocument()
		})
	})

	it("renders action url", async () => {
		render(<PageStory kcContext={{
			pageRedirectUri: undefined ,
			actionUri: "https://example.com/action",
			client: {
				baseUrl: undefined
			}
		}} />)

		const correctLinkElement = await screen.findByTestId("kc-info-action-url")
		expect(correctLinkElement).toBeInTheDocument()
		expect(correctLinkElement).toHaveAttribute("href", "https://example.com/action")

		await waitFor(() => {
			expect(screen.queryByTestId("kc-info-redirect-url")).not.toBeInTheDocument()
		})
		await waitFor(() => {
			expect(screen.queryByTestId("kc-info-client-url")).not.toBeInTheDocument()
		})
	})

	it("renders redirect url", async () => {
		render(<PageStory kcContext={{
            pageRedirectUri: "https://example.com/redirect",
            actionUri: undefined,
            client: {
                baseUrl: undefined
            }
        }} />)

        const correctLinkElement = await screen.findByTestId("kc-info-redirect-url")
        expect(correctLinkElement).toBeInTheDocument()
        expect(correctLinkElement).toHaveAttribute("href", "https://example.com/redirect")

        await waitFor(() => {
            expect(screen.queryByTestId("kc-info-action-url")).not.toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.queryByTestId("kc-info-client-url")).not.toBeInTheDocument()
        })
	})

	it("renders no url", async () => {
		render(<PageStory kcContext={{
            pageRedirectUri: undefined,
            actionUri: undefined,
            client: {
                baseUrl: undefined
            }
        }} />)

        await waitFor(() => {
            expect(screen.queryByTestId("kc-info-redirect-url")).not.toBeInTheDocument()
        })
        await waitFor(() => {
            expect(screen.queryByTestId("kc-info-action-url")).not.toBeInTheDocument()
        })
		await waitFor(() => {
            expect(screen.queryByTestId("kc-info-client-url")).not.toBeInTheDocument()
        })
	})

	it("renders required actions", async () => {
		render(<PageStory kcContext={{
			requiredActions: ["terms_and_conditions"]
		}} />)

		expect(await screen.findByTestId("kc-info-required-actions")).toBeInTheDocument()
	})

	it("does not render required actions", async () => {
		render(<PageStory kcContext={{
            requiredActions: undefined
        }} />)

		await waitFor(() => {
			expect(screen.queryByTestId("kc-info-required-actions")).not.toBeInTheDocument()
		})
	})
})
