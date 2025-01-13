import { Login } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router";

export const LoginRegisterBtns = () => {
    return (
        <Box className="header-auth-btn-group">
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Button variant="outlined">
                    <Link to="/auth/login">Log In</Link>
                </Button>
            </Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <IconButton component={Link} to="/auth/login">
                    <Login />
                </IconButton>
            </Box>
            <Button variant="contained" className="ml-3" sx={{ bgcolor: "secondary.main" }}>
                <Link to="/auth/register">Register</Link>
            </Button>
        </Box>
    );
};
