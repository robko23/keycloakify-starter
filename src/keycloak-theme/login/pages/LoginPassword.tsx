import { useMemo, useState } from "react"
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { FormEventHandler } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { Button, Divider, TextField } from "@mui/material"

export default function LoginPassword(props: PageProps<Extract<KcContext, { "pageId": "login-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { realm, url, login } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        formElement.submit();
    });

    const resetPasswordNode = useMemo(() => {
        if ( !realm.resetPasswordAllowed ) {
            return null
        }
        return (
            <Button
                component={"a"}
                href={url.loginResetCredentialsUrl}
                variant={"outlined"}
                color={"secondary"}
                tabIndex={5}
            >
                {msg("doForgotPassword")}
            </Button>
        )
    }, [ realm.resetPasswordAllowed, url.loginResetCredentialsUrl ])

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("doLogIn")}>
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                        <TextField
                            id="password"
                            fullWidth
                            tabIndex={2}
                            name="password"
                            type="password"
                            autoComplete="off"
                            autoFocus
                            label={msg("password")}
                            defaultValue={login.password ?? ""}
                        />
                        {resetPasswordNode}
                        <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
                            <Button
                                type="submit"
                                name="login"
                                variant="contained"
                                disabled={isLoginButtonDisabled}
                                tabIndex={4}
                                id="kc-login"
                            >
                                {msgStr("doLogIn")}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
