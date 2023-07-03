import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material"
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "keycloakify/login/kcContext";
import type { I18n } from "keycloakify/login/i18n";
import { MouseEvent, useRef } from "react";
import { useConstCallback } from "keycloakify/tools/useConstCallback";

import PasswordIcon from '@mui/icons-material/Password';
import KeyIcon from '@mui/icons-material/Key';
import StayCurrentPortraitIcon from '@mui/icons-material/StayCurrentPortrait';

function getIcon(name: string) {
    switch ( name ) {
        case "kcAuthenticatorDefaultClass":
            return <PasswordIcon />;
        case "kcAuthenticatorPasswordClass":
            return <PasswordIcon />;
        case "kcAuthenticatorOTPClass":
            return <StayCurrentPortraitIcon />;
        case "kcAuthenticatorWebAuthnClass":
            return <KeyIcon />;
        case "kcAuthenticatorWebAuthnPasswordlessClass":
            return <KeyIcon />;
        default:
            return <PasswordIcon/>;
    }
}

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, { pageId: "select-authenticator.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    const { url, auth } = kcContext;

    const { msg } = i18n;

    const selectCredentialsForm = useRef<HTMLFormElement>(null);
    const authExecIdInput = useRef<HTMLInputElement>(null);

    const submitForm = useConstCallback(() => {
        selectCredentialsForm.current?.submit();
    });

    const onSelectedAuthenticator = useConstCallback((event: MouseEvent<HTMLDivElement>) => {
        const divElement = event.currentTarget;
        const authExecId = divElement.dataset.authExecId;

        if (!authExecIdInput.current || !authExecId) {
            return;
        }

        authExecIdInput.current.value = authExecId;
        submitForm();
    });

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("loginChooseAuthenticator")}>
            <form
                id="kc-select-credential-form"
                ref={selectCredentialsForm}
                action={url.loginAction}
                method="post"
                data-testid={"kc-select-credential-form"}
            >
                <List>
                    {auth.authenticationSelections.map((authenticationSelection) => (
                        <ListItemButton
                            key={authenticationSelection.authExecId}
                            onClick={onSelectedAuthenticator}
                            data-auth-exec-id={authenticationSelection.authExecId}
                        >
                            <ListItemAvatar>
                                <Avatar>
                                    {getIcon(authenticationSelection.iconCssClass ?? "")}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={msg(authenticationSelection.displayName)}
                                secondary={msg(authenticationSelection.helpText)}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <input
                    type="hidden"
                    id="authexec-hidden-input"
                    name="authenticationExecution"
                    ref={authExecIdInput}
                    data-testid={"authexec-hidden-input"}
                />
            </form>
        </Template>
    );
}
