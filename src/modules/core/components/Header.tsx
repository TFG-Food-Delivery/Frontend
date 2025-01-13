import { AppBar, Toolbar, Container, Box } from "@mui/material";

import "./styles.css";
import { MenuButton, HeaderLogo, LoginRegisterBtns, SearchBar } from "./HeaderComponents";
import { authStatus, RolesList } from "../../store/auth";
import { useSelector } from "react-redux";
import { UserCart } from "./HeaderComponents/UserCart";
import { Sidebar } from "./Sidebar";
import { useEffect, useState } from "react";

export const Header = () => {
    const { status, role } = useSelector((state: any) => state.auth);
    const [showSidebar, setShowSidebar] = useState(false);
    const handleOpenSidebar = (event: any) => {
        event.stopPropagation();
        setShowSidebar(true);
        document.body.classList.add("sidebar-opened");
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false);
        document.body.classList.remove("sidebar-opened");
    };

    useEffect(() => {
        const handleClickOutside = (event?: MouseEvent) => {
            const sidebarElement = document.querySelector(".sidebar"); // Ajusta el selector según tu componente Sidebar
            if (event && sidebarElement && !sidebarElement.contains(event.target as Node)) {
                handleCloseSidebar();
            }
        };

        if (showSidebar) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showSidebar]);

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "background.default" }}>
                <Container maxWidth="xl">
                    <Toolbar sx={{ padding: 0 }}>
                        <MenuButton handleOpen={handleOpenSidebar} />
                        <HeaderLogo />
                        {status === authStatus.authenticated && role === RolesList.CUSTOMER && (
                            <>
                                <Box sx={{ display: { xs: "none", sm: "block" }, mr: "2rem" }}>
                                    <SearchBar />
                                </Box>
                                <UserCart />
                            </>
                        )}
                        {status === authStatus.notAuthenticated && <LoginRegisterBtns />}
                    </Toolbar>
                </Container>
            </AppBar>
            <Sidebar show={showSidebar} handleCloseSidebar={handleCloseSidebar} />
        </>
    );
};
