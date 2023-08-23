import { createUseI18n } from "keycloakify/account"

//NOTE: See src/login/i18n.ts for instructions on customization of i18n messages.
export const {useI18n} = createUseI18n({
	cs: {
		language: "Jazyk",
		connectWith: "Propojit s",
		disconnect: "Odpojit",
		doRemove: "Odstranit",
		doAddTotp: "Přidat autentizátor",
	},
	en: {
		language: "Language",
		connectWith: "Connect with",
		disconnect: "Disconnect",
		doRemove: "Remove",
		doAddTotp: "Add authenticator",
	}
})

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
