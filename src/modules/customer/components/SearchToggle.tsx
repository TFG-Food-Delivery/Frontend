import { Close, Search } from "@mui/icons-material";
import { Box, Collapse, IconButton, InputBase, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

type Props = {
    restaurantName: string;
};

export const SearchToggle = ({ restaurantName }: Props) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        const newUrlParams = new URLSearchParams(location.search);
        newUrlParams.set("q", e.target.value);
        navigate(`?${newUrlParams.toString()}`, { replace: true });
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem", alignItems: "center" }}>
            <IconButton onClick={() => setOpen((prev) => !prev)}>{open ? "" : <Search />}</IconButton>
            <Collapse in={open} orientation="horizontal" collapsedSize={0}>
                <Paper
                    elevation={3}
                    sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: { xs: "100%" },
                        borderRadius: "25px",
                        bgcolor: "#f3f3f3",
                    }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={`Search in ${restaurantName}`}
                        inputProps={{ "aria-label": `search in ${restaurantName}` }}
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                    <IconButton onClick={() => setOpen(false)} aria-label="close-search">
                        <Close />
                    </IconButton>
                </Paper>
            </Collapse>
        </Box>
    );
};
