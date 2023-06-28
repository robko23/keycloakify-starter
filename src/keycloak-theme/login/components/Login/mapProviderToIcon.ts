import { IconBrandGithub, IconBrandGoogle, IconBrandWindows, IconFileUnknown } from "@tabler/icons-react"

export function mapProviderToIcon(provider: string) {
	switch ( provider ) {
		case "google":
			return IconBrandGoogle
		case "microsoft":
			return IconBrandWindows
		case "github":
			return IconBrandGithub
	}
	return IconFileUnknown
}