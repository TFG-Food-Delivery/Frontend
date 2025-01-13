import { Search } from "@mui/icons-material";
import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const SearchOrdersBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const initialQuery = params.get("q") || "";
        setSearchTerm(initialQuery);
    }, [location.search]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.length < 3) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter" && searchTerm.length >= 3) {
            e.preventDefault();
            navigate(`/orders/completed?q=${encodeURIComponent(searchTerm)}`, { replace: true });
        }
    };

    const handleClick = (e: any) => {
        if (searchTerm.length >= 3) {
            e.preventDefault();
            navigate(`/orders/completed?q=${encodeURIComponent(searchTerm)}`, { replace: true });
        }
    };

    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                alignItems: "center",
                borderRadius: { xs: "10px", sm: "25px" },
                bgcolor: "#f3f3f3",
            }}
        >
            <IconButton
                type="button"
                sx={{ p: "10px" }}
                aria-label="search"
                disabled={searchTerm.length < 3}
                onClick={handleClick}
            >
                <Search />
            </IconButton>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={"Search Orders by ID"}
                inputProps={{ "aria-label": `Search orders by id` }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </Paper>
    );
};
