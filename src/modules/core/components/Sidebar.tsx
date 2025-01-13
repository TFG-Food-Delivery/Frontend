import "./styles/sidebarStyles.css";
import {
    Close,
    DeliveryDining,
    HelpOutlineOutlined,
    HomeOutlined,
    InsightsOutlined,
    LogoutOutlined,
    PersonOutlineOutlined,
    ShoppingBagOutlined,
    SpaceDashboardOutlined,
    Store,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { AppDispatch } from "../../store";
import { authStatus, RolesList, startLogout } from "../../store/auth";
import { Box, IconButton } from "@mui/material";
import { SearchBar } from "./HeaderComponents";

type Props = {
    show: boolean;
    handleCloseSidebar: () => void;
};

export const Sidebar = ({ show, handleCloseSidebar }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { status, displayName, photoURL, role } = useSelector((state: any) => state.auth);

    const customerMenuItems = [
        { icon: <HomeOutlined />, label: "Home", path: "/" },
        { icon: <PersonOutlineOutlined />, label: "Profile", path: "/profile" },
        { icon: <ShoppingBagOutlined />, label: "Orders", path: "/orders" },
        { icon: <InsightsOutlined />, label: "Insights", path: "/insights" },
        { icon: <HelpOutlineOutlined />, label: "Help", path: "/help" },
        { icon: <LogoutOutlined />, label: "Log out", path: "/logout" },
    ];

    const commonMenuItems = [
        { icon: <SpaceDashboardOutlined />, label: "Dashboard", path: "/dashboard" },
        { icon: <HelpOutlineOutlined />, label: "Help", path: "/help" },
        { icon: <LogoutOutlined />, label: "Log out", path: "/logout" },
    ];

    const loggedOutMenuItems = [
        {
            icon: <Store />,
            label: "Register as  Restaurant",
            path: `/auth/register?form=${RolesList.RESTAURANT.toLowerCase()}`,
        },
        {
            icon: <DeliveryDining />,
            label: "Register as a Courier",
            path: `/auth/register?form=${RolesList.COURIER.toLowerCase()}`,
        },
        { icon: <HelpOutlineOutlined />, label: "Help", path: "/help" },
    ];

    const handleNavigation = (dest: string) => {
        if (dest === "/logout") {
            dispatch(startLogout());
        } else {
            navigate(dest);
        }
        handleCloseSidebar();
    };

    return (
        <section className="page sidebar-page">
            <aside className={"sidebar " + (show ? "opened" : "")}>
                <div className="inner">
                    <div className="header">
                        <img src={photoURL} className="logo" />
                        <h1>{displayName}</h1>
                        <IconButton
                            onClick={handleCloseSidebar}
                            sx={{ display: { xs: "block", sm: "none" }, position: "absolute", right: "1rem" }}
                        >
                            <Close fontSize="large" />
                        </IconButton>
                    </div>
                    <nav className="menu">
                        {/* Si el rol es CUSTOMER, mostramos todo el menú */}

                        {status === authStatus.notAuthenticated &&
                            loggedOutMenuItems.map((item) => (
                                <button
                                    className={location.pathname === item.path ? "navbtn active" : "navbtn"}
                                    type="button"
                                    onClick={() => handleNavigation(item.path)}
                                    key={item.label}
                                >
                                    {item.icon}
                                    <p>{item.label}</p>
                                </button>
                            ))}

                        {status === authStatus.authenticated && role === RolesList.CUSTOMER && (
                            <>
                                <Box sx={{ display: { xs: "block", sm: "none" }, width: "90%", margin: "auto" }}>
                                    <SearchBar handleCloseSidebar={handleCloseSidebar} />
                                </Box>
                                {customerMenuItems.map((item) => (
                                    <button
                                        className={location.pathname === item.path ? "navbtn active" : "navbtn"}
                                        type="button"
                                        onClick={() => handleNavigation(item.path)}
                                        key={item.label}
                                    >
                                        {item.icon}
                                        <p>{item.label}</p>
                                    </button>
                                ))}
                            </>
                        )}

                        {/* Si no es CUSTOMER, mostramos solo los elementos comunes */}
                        {status === authStatus.authenticated &&
                            role !== RolesList.CUSTOMER &&
                            commonMenuItems.map((item) => (
                                <button
                                    className={location.pathname === item.path ? "navbtn active" : "navbtn"}
                                    type="button"
                                    onClick={() => handleNavigation(item.path)}
                                    key={item.label}
                                >
                                    {item.icon}
                                    <p>{item.label}</p>
                                </button>
                            ))}
                    </nav>
                </div>
            </aside>
        </section>
    );
};
