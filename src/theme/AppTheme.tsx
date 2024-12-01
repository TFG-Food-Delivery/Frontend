import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { ftdTheme } from "./ftdTheme";

type Props = {};

export const AppTheme: FC<PropsWithChildren<Props>> = ({ children }) => {
    return (
        <ThemeProvider theme={ftdTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};
