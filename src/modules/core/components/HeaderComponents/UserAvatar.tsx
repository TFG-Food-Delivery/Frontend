import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { startLogout } from "../../../store/auth";

const settings = ["Profile", "Account", "Insights"];

export const UserAvatar = () => {
    const { photoURL, displayName } = useSelector((state: any) => state.auth);
    const userName = `${displayName.split(" ")[0]} ${displayName.split(" ")[1]}`;
    const dispatch = useDispatch<AppDispatch>();

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        setAnchorElUser(null);
        dispatch(startLogout());
    };

    return (
        <Box sx={{ flexDirection: "row", flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Avatar image" src={photoURL} />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                    </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};
