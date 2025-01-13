import { Search } from "@mui/icons-material";
import { Paper, IconButton, InputBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

type Props = {
    handleCloseSidebar?: () => void;
};

export const SearchBar = (props: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && searchTerm.length < 3) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter" && searchTerm.length >= 3) {
            e.preventDefault();

            if (props.handleCloseSidebar) props.handleCloseSidebar();
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    const handleClick = (e: any) => {
        if (searchTerm.length >= 3) {
            e.preventDefault();

            if (props.handleCloseSidebar) props.handleCloseSidebar();
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    useEffect(() => {
        setSearchTerm("");
    }, [location]);

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
                placeholder={"Search Restaurants"}
                inputProps={{ "aria-label": `Search Restaurants` }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </Paper>
    );
};
