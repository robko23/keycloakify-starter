import { createGetKcContext } from "keycloakify/account"

export type KcContextExtension = {
	pageId: "federatedIdentity.ftl",
	federatedIdentity: {
		identities: {
			displayName: string,
			providerId: string,
			userName: string,
			connected: boolean
		}[],
		removeLinkPossible: boolean
	},
	stateChecker: string
} | {
	pageId: "log.ftl",
	log: {
		events: {
			date?: string, // iso-8601
			event: string,
			ipAddress: string,
			client: {
				name?: string,
				clientId: string,
			},
			details: {
				key: string,
				value: string
			}[]
		}
	}
	stateChecker: string
} | {
	pageId: "resource-detail.ftl"
} | {
	pageId: "resources.ftl"
	authorization: {
		resourcesWaitingApproval: {
			permissions: {
				requester: {
					username: string,
					email?: string
				},
				scopes: {
					scope?: {
						displayName?: string,
						name: string
					}
				}[]
			}[],
			displayName?: string,
			name: string
		}[],
		id: string,
		resources: {
			displayName?: string,
			name: string,
			resourceServer: {
				baseUri?: string,
				name: string
			},
			shares?: string[]
		}[],
		sharedResources: {
			displayName?: string,
			name: string,
			ownerName: string,
			resourceServer: {
				baseUri?: string,
				name: string
			},
			permissions: {
				scopes: {
					granted: boolean,
					scope?: string,
					displayName?: string,
					name: string
				}[]
			}[],
			grantedDate: string
		}[],
		resourcesWaitingOthersApproval: {
			id: string,
			displayName?: string,
			name: string,
			ownerName: string,
			permissions: {
				scopes: {
					scope?: string,
					displayName?: string,
					name: string
				}[],
				createdDate: string // iso-8601
			}[]
		}[]
	},
	stateChecker: string
} | {
	pageId: "applications.ftl",
	"applications": {
		"applications": {
			effectiveUrl?: string,
			client: {
				name?: string,
				clientId: string,
				consentRequired: true
			},
			realmRolesAvailable: {
				description?: string,
				name: string
			}[],
			resourceRolesAvailable: {
				[key: string]: {
					roleDescription?: string,
					roleName: string,
					clientId: string,
					clientName?: string
				}[]
			},
			clientScopesGranted?: string[],
			additionalGrants?: string[]
		}[]
	},
	stateChecker: string
} | {
	pageId: "sessions.ftl",
	sessions: {
		sessions: {
			"expires": string, // iso-8601
			"clients": string[],
			"ipAddress": string,
			"started": string, // iso-8601
			"lastAccess": string, // iso-8601
			"id": string // guid v4
		}[]
	},
	stateChecker: string
} | {
	pageId: "totp.ftl",
	mode?: "manual" | "qr",
	totp: {
		enabled: boolean,
		totpSecretEncoded: string,
		totpSecret: string,
		supportedApplications: string[],
		totpSecretQrCode: string,
		policy: {
			initialCounter: string,
			type: "totp" | "hotp",
			codeReusable: boolean,
			lookAheadWindow: string,
			algorithm: "HmacSHA1" | "HmacSHA256" | "HmacSHA512",
			period: string,
			algorithmKey: "SHA1" | "SHA256" | "SHA512",
			digits: string
		},
		qrUrl: string,
		manualUrl: string,
		otpCredentials: {
			id: string,
			userLabel: string
		}[]
	},
	stateChecker: string
}

export const {getKcContext} = createGetKcContext<KcContextExtension>({
	mockData: [
		{
			pageId: "password.ftl",
			locale: {
				currentLanguageTag: "cs"
			}
		},
		{
			pageId: "federatedIdentity.ftl",
			federatedIdentity: {
				identities: [],
				removeLinkPossible: false
			},
			stateChecker: "",
			locale: {
				currentLanguageTag: "cs"
			}
		},
		{
			pageId: "totp.ftl",
			mode: "manual",
			totp: {
				enabled: true,
				totpSecretEncoded: "TOTP SECR ERCO DEFO RMAT TED1",
				totpSecret: "16c9b43ac483",
				supportedApplications: [ "totpAppGoogleName" ],
				totpSecretQrCode: "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",
				policy: {
					initialCounter: "0",
					type: "totp",
					codeReusable: false,
					lookAheadWindow: "1",
					algorithm: "HmacSHA1",
					period: "30",
					algorithmKey: "SHA1",
					digits: "6"
				},
				qrUrl: "#",
				manualUrl: "#",
				otpCredentials: []
			}
		}
	]
})

export const {kcContext} = getKcContext({
	//mockPageId: "password.ftl",
})

export type KcContext = NonNullable<ReturnType<typeof getKcContext>["kcContext"]>;
