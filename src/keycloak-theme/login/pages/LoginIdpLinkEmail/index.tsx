import { Link, Typography } from "@mui/material"
import type { KcContext } from "keycloakify/login/kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "keycloakify/login/i18n";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("emailLinkIdpTitle", idpAlias)}>
            <Typography id="instrucion1">
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </Typography>
            <br/>
            <Typography id="instrucion2">
                {msg("emailLinkIdp2")}
                {" "}
                <Link href={url.loginAction}>
                    {msg("doClickHere")}
                </Link>
                {" "}
                {msg("emailLinkIdp3")}
            </Typography>
            <br/>
            <Typography id="instruction3">
                {msg("emailLinkIdp4")}
                {" "}
                <Link href={url.loginAction}>
                    {msg("doClickHere")}
                </Link>
                {" "}
                {msg("emailLinkIdp5")}
            </Typography>
        </Template>
    );
}
