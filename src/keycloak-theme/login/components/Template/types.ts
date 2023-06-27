import { KcContext } from "keycloakify/login/kcContext"
import { ClassKey, TemplateProps } from "keycloakify/login/TemplateProps"
import { I18n } from "../../i18n"

export type CommonProps = {
	templateProps: TemplateProps<KcContext, I18n>,
	getClassName: (name: ClassKey) => string
}

