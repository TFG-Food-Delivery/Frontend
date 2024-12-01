import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

export const LoginForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
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

            <form onSubmit={handleSubmit} className="register-form">
                <Stack spacing={4} sx={{ alignItems: "center", maxWidth: "50%", margin: "7rem auto 3rem" }}>
                    <TextField id="email" label="Email" variant="outlined" value={email} fullWidth required />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        type="password"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ marginBottom: "4rem", width: "30%" }}
                    >
                        Register
                    </Button>
                </Stack>
            </form>
            <Divider variant="middle" sx={{ width: "30%", margin: "auto" }}>
                Or
            </Divider>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{ margin: "2rem auto 4rem", width: "30%" }}
                    startIcon={<Google />}
                >
                    Sign In with Google
                </Button>
            </div>
        </Box>
    );
};
