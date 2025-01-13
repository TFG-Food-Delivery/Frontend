import { Google } from "@mui/icons-material";
import { Box, Button, Container, Divider, Typography } from "@mui/material";
import { useGoogleSignIn } from "../hooks";
import { useNavigate } from "react-router";

export const ChooseRegister = () => {
    const navigate = useNavigate();
    const { handleGoogleSignIn, isAuthenticating } = useGoogleSignIn();

    const handleClick = () => {
        navigate("/auth/register?form=customer");
    };

    return (
        <Container
            sx={{
                height: "80vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
            }}
        >
            <Box sx={{ m: 10 }}>
                <Typography variant="h2" component={"h1"} sx={{ color: "info.main" }}>
                    Choose your way to register
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    height: "50vh",
                    width: "100%",
                }}
            >
                <Button variant="contained" onClick={handleClick} sx={{ width: "30%" }}>
                    Register
                </Button>
                <Divider orientation="vertical">Or</Divider>
                <Button
                    variant="contained"
                    disabled={isAuthenticating}
                    color="secondary"
                    size="large"
                    sx={{ width: "30%" }}
                    startIcon={<Google />}
                    onClick={handleGoogleSignIn}
                >
                    Sign In with Google
                </Button>
            </Box>
        </Container>
    );
};
