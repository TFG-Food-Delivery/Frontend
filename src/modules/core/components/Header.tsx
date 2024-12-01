import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Container, Button } from "@mui/material";

import "./styles.css";
import { Link } from "react-router";

export const Header = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
            <Container maxWidth="xl">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: "secondary.main" }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        component="div"
                        sx={{ flexGrow: 1, color: "primary.main", fontFamily: "Pacifico, Roboto" }}
                    >
                        Food To Door
                    </Typography>
                    <div className="header-auth-btn-group">
                        <Button variant="outlined">
                            <Link to="/auth/login">Log In</Link>
                        </Button>
                        <Button variant="contained" className="ml-3" sx={{ bgcolor: "secondary.main" }}>
                            <Link to="/auth/register">Register</Link>
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
