import { useState } from "react";
import { Container, Typography, Grid2 as Grid, Button, Box, IconButton, Chip } from "@mui/material";
import { AddCircleOutlineOutlined, Add as AddIcon } from "@mui/icons-material";
import { DishDialog } from "../components/DishDialog";
import { useRestaurantDishes } from "../../customer/hooks";
import { useSelector } from "react-redux";
import { CategoryDialog, DishCard } from "../components";
import { Dish } from "../../customer/types";

export const MenuPage = () => {
    const { uid } = useSelector((state: any) => state.auth);
    const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [isNewDish, setIsNewDish] = useState(false);

    const { data: restaurantData, loading, error, setData } = useRestaurantDishes({ id: uid });
    const handleOpenDialog = ({ dish, categoryId }: { dish?: Dish; categoryId?: string }) => {
        if (dish) {
            setSelectedDish(dish);
            setSelectedCategory(dish.categoryId);
            setIsNewDish(false);
        } else {
            setSelectedDish(null);
            if (categoryId) {
                setSelectedCategory(categoryId);
            }
            setIsNewDish(true);
        }
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setIsCategoryDialogOpen(false);
        setSelectedDish(null);
    };

    const handleOpenNewCategoryDialog = () => {
        setIsCategoryDialogOpen(true);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Typography variant="h3" component="h1" fontWeight="bold">
                    Menu
                </Typography>
            </Box>
            {restaurantData?.length > 0 ? (
                restaurantData.map((category) => (
                    <Box
                        key={category.categoryName}
                        sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                    >
                        <Typography variant="h5" component="h1" fontWeight="bold">
                            {category.categoryName}
                        </Typography>
                        <Grid container spacing={3} sx={{ width: "100%" }}>
                            {category.dishes.map((dish: Dish) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={dish.name}>
                                    <DishCard dish={dish} openDialog={handleOpenDialog} />
                                </Grid>
                            ))}
                            <Grid
                                size={{ xs: 12, sm: 6, md: 4, lg: 12 }}
                                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                            >
                                <IconButton onClick={() => handleOpenDialog({ categoryId: category.categoryId })}>
                                    <AddCircleOutlineOutlined sx={{ fontSize: "3rem", color: "primary.main" }} />
                                </IconButton>
                                {category.dishes.length === 0 && (
                                    <Chip label="Add your first dish" variant="outlined" color="primary" />
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                ))
            ) : (
                <Typography variant="h6" textAlign="center">
                    No hay categorías disponibles
                </Typography>
            )}
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "5rem auto" }}>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenNewCategoryDialog}
                >
                    Add Category
                </Button>
            </Box>

            <DishDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                isNew={isNewDish}
                categoryId={selectedCategory}
                setData={setData}
            />
            <CategoryDialog open={isCategoryDialogOpen} onClose={handleCloseDialog} setData={setData} />
        </Container>
    );
};
