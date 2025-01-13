import { Typography } from "@mui/material";
import { Link } from "react-router";
import { authStatus, RolesList } from "../../../store/auth";
import { useSelector } from "react-redux";

export const HeaderLogo = () => {
    const { status, role } = useSelector((state: any) => state.auth);
    let homeLink;
    if (status === authStatus.authenticated) {
        switch (role) {
            case RolesList.CUSTOMER: {
                homeLink = "/feed";
                break;
            }
            default: {
                homeLink = "/dashboard";
            }
        }
    } else {
        homeLink = "/";
    }
    return (
        <Link to={homeLink} style={{ flexGrow: "1" }}>
            <Typography
                variant="h4"
                component="div"
                sx={{
                    flexGrow: 1,
                    color: "primary.main",
                    fontFamily: "Pacifico, Roboto",
                    fontSize: { xs: "1.50rem", sm: "inherit" },
                }}
            >
                Food To Door
            </Typography>
        </Link>
    );
};
