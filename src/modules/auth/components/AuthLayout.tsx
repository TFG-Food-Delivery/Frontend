import { Container } from "@mui/material";
import { AuthPage } from "../enum/auth-page.enum";
import { Navigate } from "react-router";
import { LoginForm, RegisterForm } from "./forms";

type Props = {
    authPage: AuthPage;
};

export const AuthLayout = (props: Props) => {
    if (props.authPage === AuthPage.LOGIN) {
        return (
            <Container>
                <LoginForm />
            </Container>
        );
    } else if (props.authPage === AuthPage.REGISTER) {
        return (
            <Container>
                <RegisterForm />
            </Container>
        );
    } else {
        <Navigate to="/404" />;
    }
};
