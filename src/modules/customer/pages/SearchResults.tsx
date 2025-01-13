import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Box, Button, CircularProgress, Container, Paper, Stack, Typography } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { useSearchRestaurants } from "../hooks";

export const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);
    const initialQuery = params.get("q") || "";

    const [searchTerm, setSearchTerm] = useState(initialQuery);

    const { results, loading, error } = useSearchRestaurants({ searchTerm });
    useEffect(() => {
        const newParams = new URLSearchParams(location.search);
        const newQuery = newParams.get("q") || "";
        setSearchTerm(newQuery);
    }, [location.search]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" component={"h1"} fontWeight={"bold"} sx={{ mb: "3rem" }}>
                Results
            </Typography>

            {/* Loading / Error state */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: "10%" }}>
                    <CircularProgress size={"3rem"} />
                </Box>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Results List */}
            {results.length > 0 ? (
                <Stack spacing={2}>
                    {results.map((restaurant) => (
                        <Paper
                            key={restaurant.id}
                            elevation={2}
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(`/shop/restaurant/${restaurant.id}`)}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Box
                                    component="img"
                                    src={restaurant.image}
                                    alt={restaurant.name}
                                    sx={{
                                        width: 64,
                                        height: 64,
                                        objectFit: "cover",
                                        borderRadius: "8px",
                                        mr: 2,
                                    }}
                                />
                                <Typography variant="h4" fontWeight={"bold"}>
                                    {restaurant.name}
                                </Typography>
                            </Box>
                            <Button
                                onClick={() => navigate(`/shop/restaurant/${restaurant.id}`)}
                                sx={{ alignSelf: { xs: "flex-end", sm: "inherit" }, mt: { xs: "1rem", sm: "0" } }}
                            >
                                See Restaurant
                                <ArrowRightAlt sx={{ ml: 1 }} />
                            </Button>
                        </Paper>
                    ))}
                </Stack>
            ) : (
                !loading && (
                    <Typography
                        variant="h5"
                        fontWeight={"bold"}
                        sx={{ textAlign: "center", mt: "10%", color: "info.light" }}
                    >
                        No restaurants found.
                    </Typography>
                )
            )}
        </Container>
    );
};
