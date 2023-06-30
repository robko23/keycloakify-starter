import { Button } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("errorTitle")}>
            <div id="kc-error-message" data-testid="kc-error-message">
                <p className="instruction">{message.summary}</p>
                {client?.baseUrl !== undefined && (
                    <Button
                        variant="contained"
                        component="a"
                        href={client.baseUrl}
                        data-testid="kc-back-to-application"
                    >
                        {msg("backToApplication")}
                    </Button>
                )}
            </div>
        </Template>
    );
}
