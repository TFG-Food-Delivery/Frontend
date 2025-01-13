import { useParams } from "react-router";
import { useRestaurantDishes } from "../hooks";
import { useEffect } from "react";
import { Dish } from "../types";
import { Box, Container, Divider, Grid2 as Grid, Paper, Typography } from "@mui/material";
import RestaurantDishCard from "./RestaurantDishCard";

export const RestaurantDishes = ({
    handleOpenDialog,
}: {
    handleOpenDialog: ({ dish, categoryId }: { dish?: Dish; categoryId?: string }) => void;
}) => {
    const { id } = useParams();
    const { data: restaurantData, loading, error } = useRestaurantDishes({ id });

    useEffect(() => {
        if (window.location.hash) {
            const id = window.location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [restaurantData]);

    const scrollToCategory = (categoryName: string) => {
        const element = document.getElementById(categoryName);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                my: "4rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-start",
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: "25%",
                    display: { xs: "none", md: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                    mt: "3rem",
                }}
            >
                <Typography variant="h5" fontWeight={"bold"}>
                    Menu
                </Typography>
                <Divider sx={{ width: "100%", my: 2 }} />
                {restaurantData?.length > 0 &&
                    restaurantData.map((category) => (
                        <Box
                            component={"a"}
                            key={category.categoryName}
                            onClick={() => scrollToCategory(category.categoryName)}
                            sx={{ cursor: "pointer", margin: "0.5rem 0" }}
                        >
                            <Typography variant="h6" fontWeight={"bold"} color="info.dark">
                                {category.categoryName}
                            </Typography>
                        </Box>
                    ))}
            </Paper>
            <Box sx={{ width: { xs: "100%", md: "70%" } }}>
                {restaurantData?.length > 0 ? (
                    restaurantData.map((category) => (
                        <Box
                            id={category.categoryName}
                            key={category.categoryName}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 4,
                                mt: "2rem",
                                mb: "4rem",
                            }}
                        >
                            <Typography variant="h5" component="h1" fontWeight="bold">
                                {category.categoryName}
                            </Typography>
                            <Grid
                                container
                                spacing={3}
                                sx={{ width: "100%", justifyContent: { xs: "center", md: "space-around" } }}
                            >
                                {category.dishes.map((dish: Dish) => (
                                    <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={dish.name}>
                                        <RestaurantDishCard dish={dish} openDialog={handleOpenDialog} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    ))
                ) : (
                    <Typography variant="h6" textAlign="center">
                        No hay categorías disponibles
                    </Typography>
                )}
            </Box>
        </Container>
    );
};
