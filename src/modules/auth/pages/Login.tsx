import { Box } from "@mui/material";
import { AuthLayout } from "../components/AuthLayout";
import { AuthPage } from "../enum/auth-page.enum";

export const LoginPage = () => {
    return (
        <Box>
            <AuthLayout authPage={AuthPage.LOGIN} />
        </Box>
    );
};
