import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { authStatus, startGoogleSignIn, startLoginNativeUser } from "../../../store/auth";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./validation";
import { joiResolver } from "@hookform/resolvers/joi";
import { AppDispatch } from "../../../store";
import { useNavigate } from "react-router";

export const LoginForm = () => {
    const { status, errorMessage } = useSelector((state: any) => state.auth);
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const isAuthenticating = useMemo(() => status === authStatus.checking, [status]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: joiResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        if (errors === null) {
            console.log("errors:", errors);
            return;
        }
        const ok = await dispatch(startLoginNativeUser(data));
        if (ok) navigate("/");
        else return;
    };

    function handleGoogleSignIn() {
        dispatch(startGoogleSignIn(navigate));
    }

    return (
        <Box
            sx={{
                height: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography
                variant="h2"
                sx={{ margin: "4rem 0", fontFamily: "Pacifico, Roboto", color: "secondary.main", textAlign: "center" }}
            >
                Let's Go!
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <Stack spacing={4} sx={{ alignItems: "center", margin: "7rem auto 3rem" }}>
                    <TextField
                        error={!!errors.password || !!errors.email}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        {...register("email")}
                    />
                    <TextField
                        error={!!errors.password || !!errors.email}
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        required
                        {...register("password")}
                    />
                    {(errors.email || errors.password) && (
                        <Typography color="error">Invalid email/password.</Typography>
                    )}
                    {!(errors.email || errors.password) && errorMessage && (
                        <Alert severity="error">{errorMessage.message}</Alert>
                    )}
                    <Button
                        type="submit"
                        disabled={isAuthenticating}
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ marginBottom: "4rem" }}
                    >
                        Log In
                    </Button>
                </Stack>
            </form>
            <Divider variant="middle" sx={{ width: "30%", margin: "auto" }}>
                Or
            </Divider>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Button
                    variant="contained"
                    disabled={isAuthenticating}
                    color="secondary"
                    size="large"
                    sx={{ margin: "2rem auto 4rem" }}
                    startIcon={<Google />}
                    onClick={handleGoogleSignIn}
                >
                    Sign In with Google
                </Button>
            </div>
        </Box>
    );
};
