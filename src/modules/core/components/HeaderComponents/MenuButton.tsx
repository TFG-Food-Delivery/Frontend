import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router";

export const MenuButton = ({ handleOpen }) => {
    const navigate = useNavigate();

    return (
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color: "secondary.main" }}
            onClick={handleOpen}
        >
            <MenuIcon />
        </IconButton>
    );
};
